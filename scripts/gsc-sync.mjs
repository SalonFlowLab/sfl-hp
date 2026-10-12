// Search Console の検索データを Lark Base にため、Lark の個別チャットに要約を送る。
// launchd が毎月4日に実行し、前月分を前々月と比べる（~/Library/LaunchAgents/com.salonflowlab.gsc-sync.plist）。
// Lark は lark-cli の bot 身分で操作する（user トークンは期限切れで無人実行が止まるため）。
// 要約には、この Mac の Claude Code（claude -p）が書く考察を付ける。
// 設定（Base・テーブル・送信先）は ~/.config/gsc/config.json。
//
//   node scripts/gsc-sync.mjs              直近70日分を同期し、前月の要約を送る
//   node scripts/gsc-sync.mjs --days 500   さかのぼって同期（初回）
import { execFile } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseArgs, promisify } from 'node:util';
import { searchAnalytics, ymd } from './gsc-client.mjs';

const configDir = `${homedir()}/.config/gsc`;
const config = JSON.parse(readFileSync(`${configDir}/config.json`, 'utf8'));
// 実行間隔（1か月）の2倍あれば、Mac が止まっていて1回飛んでも次の実行で埋まる
const { values } = parseArgs({ options: { days: { type: 'string', default: '70' } } });

const workDir = mkdtempSync(join(tmpdir(), 'gsc-sync-'));
const run = promisify(execFile);
const repoRoot = new URL('..', import.meta.url).pathname;

async function lark(...args) {
  for (let attempt = 1; ; attempt++) {
    try {
      const { stdout } = await run('lark-cli', [...args, '--as', 'bot'], { cwd: workDir, maxBuffer: 64 << 20 });
      return JSON.parse(stdout);
    } catch (e) {
      const detail = e.stdout || e.stderr || e.message;
      if (attempt < 5 && /"retryable": ?true/.test(detail)) {
        await new Promise((r) => setTimeout(r, 2 ** attempt * 5000 + Math.random() * 3000));
        continue;
      }
      throw new Error(`lark-cli ${args.slice(0, 2).join(' ')}: ${detail}`);
    }
  }
}

const day = 864e5;
const origin = new URL(config.site).origin;
const pagePath = (url) => url.replace(origin, '') || '/';
const tables = [
  { id: config.tables.daily, dims: ['date'] },
  { id: config.tables.page, dims: ['date', 'page'], field: 'ページ', norm: pagePath },
  { id: config.tables.query, dims: ['date', 'query'], field: '語句', norm: (q) => q },
];

// 日付 >= since のレコードを キー → record_id で返す
async function existingKeys(tableId, since) {
  const sinceFilter = { logic: 'and', conditions: [['日付', '>', `ExactDate(${ymd(new Date(since - day))} 23:59:59.999)`]] };
  const keys = new Map();
  for (let offset = 0; ; offset += 2000) {
    const manifest = await lark('base', '+record-list', '--base-token', config.baseToken, '--table-id', tableId,
      '--field-id', 'キー', '--filter-json', JSON.stringify(sinceFilter),
      '--offset', String(offset), '--output', 'records.ndjson', '--overwrite');
    for (const line of readFileSync(join(workDir, 'records.ndjson'), 'utf8').split('\n').filter(Boolean)) {
      const r = JSON.parse(line);
      keys.set(r['キー'], r.record_id);
    }
    if (!manifest.has_more) return keys;
  }
}

async function inBatches(items, write) {
  for (let i = 0; i < items.length; i += 200) await write(items.slice(i, i + 200));
}

async function sync(days) {
  // dataState の既定は final なので、確定前の日は API が返さない
  const end = new Date(Date.now() - day);
  const start = new Date(end - (days - 1) * day);
  for (const t of tables) {
    const rows = await searchAnalytics(config.site, { startDate: ymd(start), endDate: ymd(end), dimensions: t.dims });
    const existing = await existingKeys(t.id, start);
    const create = [];
    const update = {};
    for (const r of rows) {
      const [date, raw] = r.keys;
      const label = t.field && t.norm(raw);
      const key = t.field ? `${date} ${label}` : date;
      const fields = {
        キー: key, 日付: date, ...(t.field && { [t.field]: label }),
        クリック: r.clicks, 表示回数: r.impressions, CTR: Number(r.ctr.toFixed(4)), 平均順位: Number(r.position.toFixed(2)),
      };
      if (existing.has(key)) update[existing.get(key)] = fields;
      else create.push(fields);
    }
    await inBatches(create, (batch) => lark('base', '+record-batch-create', '--base-token', config.baseToken,
      '--table-id', t.id, '--json', JSON.stringify({ create_records: batch })));
    await inBatches(Object.entries(update), (batch) => lark('base', '+record-batch-update', '--base-token', config.baseToken,
      '--table-id', t.id, '--json', JSON.stringify({ update_records: Object.fromEntries(batch) })));
    console.log(`${t.dims.join('+')}: ${rows.length} rows (new ${create.length}, updated ${Object.keys(update).length})`);
  }
}

// ダッシュボードはフィルタに相対日付を使えないため、「直近28日」の開始日を毎回書き換える
async function refreshDashboardRange() {
  const since = new Date(`${ymd(new Date(Date.now() - 29 * day))}T00:00:00+09:00`).getTime();
  const filter = { conjunction: 'and', conditions: [{ field_name: '日付', operator: 'isGreater', value: ['ExactDate', since] }] };
  for (const blockId of config.recentBlocks) {
    await lark('base', '+dashboard-block-update', '--base-token', config.baseToken, '--dashboard-id', config.dashboardId,
      '--block-id', blockId, '--data-config', JSON.stringify({ filter }));
  }
}

async function totals(startDate, endDate) {
  const [r] = await searchAnalytics(config.site, { startDate, endDate });
  return r ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
}

const insightRules = `あなたは小さな会社のコーポレートサイトの検索データを読み、仮説を立てる材料を出す相棒です。
分析のゴール: 問い合わせ（60分無料相談。ページは /contact/）を増やす。

守ること:
- 計算や仮説の判定はしない。渡された数値の引用はよいが、新しい集計・比率・有意かどうかの判断はしない。「〜が原因だ」と断定しない。
- 「事実」には、渡されたデータとサイト変更履歴から直接読めることだけを書く。
- 「解釈」には、ユーザーの「気づき」に書かれた見立てを、事実と分けて要約する。記入が無ければ「記入なし」とだけ書く。あなた自身の見立てはここに書かない。
- 「ほかに考えられる説明」には、事実やユーザーの見立てについて考えられる説明を、互いに異なる観点で3つ以上挙げる。どれが正しいかは判定しない。
- 「揺れの目安」（計算済み）を使い、今回の値がふだんの範囲の内か外かを事実に書く。範囲内の増減は偶然の揺れでも説明できると書く。範囲外でも、それだけで原因は決めない。自分では計算しない。
- このデータから問い合わせ件数は分からない（Search Console は検索結果での表示とクリックだけ）。問い合わせについて推測しない。
- 分からない点は推測せず「質問」で聞く。質問は3つまで。

出力: Lark のメッセージに貼る Markdown。見出しは「**事実**」「**解釈**」「**ほかに考えられる説明**」「**質問**」の4つをこの順で、中身は箇条書き。全体で800字以内。前置き・結び・見出し以外の文は書かない。`;

const metricNames = [['clicks', 'クリック'], ['impressions', '表示回数']];

const dayList = (from, to) => {
  const out = [];
  for (let d = new Date(from); d <= new Date(to); d = new Date(+d + day)) out.push(ymd(d));
  return out;
};

// 線形補間のパーセンタイル（p は 0〜1）
const percentile = (sorted, p) => {
  const i = (sorted.length - 1) * p;
  return sorted[Math.floor(i)] + (sorted[Math.ceil(i)] - sorted[Math.floor(i)]) * (i - Math.floor(i));
};

// 日別の値は0の日が多い偏った分布で正規分布ではないため、合計の範囲は平均±σではなく、
// 基準期間の連続した合計（区間は重なり合う）の5〜95%で取る。曜日の偏りやリニューアル前後の違いは見ていない。
// 基準期間が長くなり曜日の偏りが見えたら、曜日別の基準に切り替える
async function variability(cur) {
  const baseEnd = ymd(new Date(new Date(cur[0]) - day));
  const rows = await searchAnalytics(config.site, {
    startDate: ymd(new Date(new Date(baseEnd) - 364 * day)), endDate: cur[1], dimensions: ['date'],
  });
  const byDate = new Map(rows.map((r) => [r.keys[0], r]));
  // GSC は表示0の日を返さないので0で埋める。データの始まりより前は含めない
  const first = rows.map((r) => r.keys[0]).sort()[0];
  const baseDays = first ? dayList(first, baseEnd) : [];
  const curDays = dayList(...cur);
  // 連続した合計が20区間に満たないと、5〜95% の幅が当てにならない
  if (baseDays.length - curDays.length + 1 < 20) return null;
  const value = (date, metric) => byDate.get(date)?.[metric] ?? 0;
  const result = { base: [baseDays[0], baseEnd], n: baseDays.length, days: curDays.length };
  for (const [metric] of metricNames) {
    const xs = baseDays.map((d) => value(d, metric));
    const mean = xs.reduce((a, b) => a + b, 0) / xs.length;
    const sd = Math.sqrt(xs.reduce((a, x) => a + (x - mean) ** 2, 0) / (xs.length - 1));
    const sums = xs.slice(0, xs.length - curDays.length + 1)
      .map((_, i) => xs.slice(i, i + curDays.length).reduce((a, b) => a + b, 0)).sort((a, b) => a - b);
    // 合計は整数なので、範囲も整数に寄せて内外の判定と表示をそろえる
    const [low, high] = [Math.ceil(percentile(sums, 0.05)), Math.floor(percentile(sums, 0.95))];
    const total = curDays.reduce((a, d) => a + value(d, metric), 0);
    result[metric] = {
      mean, sd, low, high, total, inside: total >= low && total <= high, dayLimit: mean + 2 * sd,
      n: xs.length, zeroDays: xs.filter((x) => x === 0).length, windows: sums.length,
      spikes: curDays.filter((d) => value(d, metric) > mean + 2 * sd).map((d) => `${d}（${value(d, metric)}）`),
    };
  }
  return result;
}

const tsv = (rows, label) => rows.map((r) => [label(r.keys), r.clicks, r.impressions, (r.ctr * 100).toFixed(1) + '%', r.position.toFixed(1)].join('\t')).join('\n');

async function insight({ cur, prev, now, before, spread }) {
  const notesSince = ymd(new Date(Date.now() - 40 * day));
  const range = (r) => ({ startDate: r[0], endDate: r[1] });
  const daily = await searchAnalytics(config.site, { startDate: prev[0], endDate: cur[1], dimensions: ['date'] });
  const pagesCur = await searchAnalytics(config.site, { ...range(cur), dimensions: ['page'] });
  const pagesPrev = await searchAnalytics(config.site, { ...range(prev), dimensions: ['page'] });
  const queries = (await searchAnalytics(config.site, { ...range(cur), dimensions: ['query'] }))
    .sort((a, b) => b.impressions - a.impressions).slice(0, 20);
  // 本番は main への反映で公開されるため、作業ブランチのコミットは含めず main の履歴だけを見る。
  // PR のマージは件名が「Merge pull request …」なので、本文1行目（PR の題名）を使う
  const { stdout: log } = await run('git', ['-C', repoRoot, 'log', 'main', '--first-parent', `--since=${prev[0]}`,
    '--date=short', '--format=%cd%x1f%s%x1f%b%x1e', '--', 'public/']);
  const commits = log.split('\x1e').map((c) => c.trim()).filter(Boolean).map((c) => {
    const [date, subject, body] = c.split('\x1f');
    const title = subject.startsWith('Merge pull request') ? body.split('\n').find((l) => l.trim()) ?? subject : subject;
    return `${date} ${title}`;
  }).join('\n');
  await lark('base', '+record-list', '--base-token', config.baseToken, '--table-id', config.tables.notes,
    '--filter-json', JSON.stringify({ logic: 'and', conditions: [['記入日', '>', `ExactDate(${notesSince} 00:00:00)`]] }),
    '--output', 'notes.ndjson', '--overwrite');
  const notes = readFileSync(join(workDir, 'notes.ndjson'), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l))
    .filter((n) => n['内容']).map((n) => `${String(n['記入日']).slice(0, 10)} ${n['内容']}`);
  const redirects = readFileSync(join(repoRoot, 'public/_redirects'), 'utf8').split('\n')
    .filter((l) => l.trim() && !l.startsWith('#') && !l.includes('index.html')).join('\n');
  const total = (t) => `クリック ${t.clicks} / 表示回数 ${t.impressions} / CTR ${(t.ctr * 100).toFixed(1)}% / 平均順位 ${t.position.toFixed(1)}`;
  const head = '\tクリック\t表示回数\tCTR\t平均順位';
  const material = [
    '列の意味: クリック＝検索結果から押された回数、表示回数＝検索結果に出た回数、CTR＝クリック÷表示回数、平均順位＝小さいほど上位。',
    `サイトの経緯: ${config.renewalDate} に、美容サロン向けの旧サイトから一般業種向けの会社案内へのリニューアルを本番公開した（main へのマージ）。旧URLは下の「301転送」のとおり新しいページへ転送している。`,
    `今回の期間 ${cur[0]}〜${cur[1]}: ${total(now)}`,
    `前回の期間 ${prev[0]}〜${prev[1]}: ${total(before)}`,
    spread
      ? [`\n揺れの目安（スクリプトで計算済み。基準期間 ${spread.base[0]}〜${spread.base[1]} の${spread.n}日。データの無い日は0。基準期間は${spread.base[1] < config.renewalDate ? 'すべてリニューアル前' : spread.base[0] >= config.renewalDate ? 'すべてリニューアル後' : 'リニューアルの前後をまたぐ'}）`,
        ...metricNames.map(([m, name]) => {
          const v = spread[m];
          return `- ${name}: 1日あたり平均 ${v.mean.toFixed(2)}・標準偏差 ${v.sd.toFixed(2)}（0の日が${v.n}日中${v.zeroDays}日ある偏った分布で、正規分布ではない）。` +
            `${spread.days}日合計のふだんの範囲（基準期間の連続した${spread.days}日合計${v.windows}区間の5〜95%。区間は重なり合う）${v.low}〜${v.high}、今回 ${v.total} は${v.inside ? '範囲内' : '範囲外'}。` +
            `1日の上限（平均+2σ）${v.dayLimit.toFixed(1)} を超えた日: ${v.spikes.join('、') || 'なし'}`;
        })].join('\n')
      : '\n揺れの目安: 基準期間のデータが足りないため出していない',
    `\n日別（${prev[0]}〜${cur[1]}）\n日付${head}\n${tsv(daily, (k) => k[0])}`,
    `\nページ別・今回\nページ${head}\n${tsv(pagesCur, (k) => pagePath(k[0]))}`,
    `\nページ別・前回\nページ${head}\n${tsv(pagesPrev, (k) => pagePath(k[0]))}`,
    `\n検索語句・今回（表示回数の上位20。件数の少ない語句は Google が伏せるため、合計と一致しない）\n語句${head}\n${tsv(queries, (k) => k[0])}`,
    `\n本番に反映したサイト変更（main の public/ の履歴。日付は反映日）\n${commits || 'なし'}`,
    `\n301転送（旧URL 転送先 ステータス）\n${redirects}`,
    `\nユーザーの気づき\n${notes.join('\n') || '記入なし'}`,
  ].join('\n');
  const claude = run('claude', ['-p', '--tools', '', '--setting-sources', '', '--strict-mcp-config', '--disable-slash-commands',
    '--no-session-persistence', '--system-prompt', insightRules], { cwd: workDir, timeout: 300000, maxBuffer: 8 << 20 });
  claude.child.stdin.end(material);
  const { stdout } = await claude;
  // 指示に反して前置きが付くことがあるため、最初の見出しより前は捨てる
  const start = stdout.indexOf('**事実**');
  return (start >= 0 ? stdout.slice(start) : stdout).trim();
}

async function report() {
  // 前月（1日〜末日）を前々月と比べる。GSC は2〜3日遅れて確定するので、月の3日より前に実行すると前月末が欠ける
  const today = new Date();
  const month = (back) => [new Date(Date.UTC(today.getFullYear(), today.getMonth() - back, 1)),
    new Date(Date.UTC(today.getFullYear(), today.getMonth() - back + 1, 0))].map(ymd);
  const [cur, prev] = [month(1), month(2)];
  const [now, before] = [await totals(...cur), await totals(...prev)];
  const top = async (dim, sortKey) => (await searchAnalytics(config.site, { startDate: cur[0], endDate: cur[1], dimensions: [dim] }))
    .sort((a, b) => b[sortKey] - a[sortKey]).slice(0, 5);
  const [pages, queries] = [await top('page', 'clicks'), await top('query', 'impressions')];
  const spread = await variability(cur);
  // 考察が作れなくても数値の要約は送る
  const analysis = await insight({ cur, prev, now, before, spread })
    .catch((e) => `生成できませんでした: ${String(e.message).slice(0, 300)}`);

  const sign = (n, digits = 0) => `${n > 0 ? '+' : n < 0 ? '−' : '±'}${Math.abs(n).toFixed(digits)}`;
  const label = (s) => `${s.slice(0, 4)}年${Number(s.slice(5, 7))}月`;
  const lines = [
    `**検索データ** ${label(cur[0])}（${label(prev[0])}との比較）`,
    '',
    `- クリック **${now.clicks}**（${sign(now.clicks - before.clicks)}）`,
    `- 表示回数 **${now.impressions}**（${sign(now.impressions - before.impressions)}）`,
    `- CTR **${(now.ctr * 100).toFixed(1)}%**（${sign((now.ctr - before.ctr) * 100, 1)}pt）`,
    `- 平均順位 **${now.position.toFixed(1)}**（${sign(now.position - before.position, 1)}。小さいほど上位）`,
    ...(spread ? [
      `- 1日あたり（基準${spread.n}日）: ` + metricNames.map(([m, name]) => `${name} 平均${spread[m].mean.toFixed(2)}・標準偏差${spread[m].sd.toFixed(2)}`).join('／'),
      `- ふだんの範囲（過去の${spread.days}日合計の5〜95%）: ` + metricNames.map(([m, name]) => {
        const v = spread[m];
        return `${name} ${v.low}〜${v.high}（今回${v.total}・${v.inside ? '範囲内' : '範囲外'}）`;
      }).join('／'),
    ] : []),
    '',
    '**ページ上位（クリック順）**',
    ...(pages.length ? pages.map((r, i) => `${i + 1}. ${pagePath(r.keys[0])}　${r.clicks}クリック・${r.impressions}表示`) : ['なし']),
    '',
    '**検索語句上位（表示回数順）**',
    ...(queries.length ? queries.map((r, i) => `${i + 1}. ${r.keys[0]}　${r.impressions}表示・${r.clicks}クリック`) : ['なし']),
    '',
    `[ダッシュボードを開く](${config.dashboardUrl})`,
    '',
    '---',
    '**考察（LLM）**',
    analysis,
    '',
    `質問への答えや気づきは [気づきテーブル](${config.notesUrl}) へ。次回の考察に入ります。`,
  ];
  const sent = await lark('im', '+messages-send', '--user-id', config.userOpenId, '--markdown', lines.join('\n'), '--idempotency-key', `gsc-report-${Date.now()}`);
  console.log(`report sent: ${sent.data?.message_id ?? ''}\n${lines.join('\n')}`);
}

try {
  await sync(Number(values.days));
  await refreshDashboardRange();
  await report();
} catch (e) {
  console.error(e);
  await lark('im', '+messages-send', '--user-id', config.userOpenId, '--text', `GSC 集計でエラー: ${String(e.message).slice(0, 500)}`)
    .catch((notifyError) => console.error(notifyError));
  process.exitCode = 1;
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
