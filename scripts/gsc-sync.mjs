// Search Console の検索データを Lark Base にため、Lark の個別チャットに要約を送る。
// launchd が毎月1・11・21日に実行する（~/Library/LaunchAgents/com.salonflowlab.gsc-sync.plist）。
// Lark は lark-cli の bot 身分で操作する（user トークンは期限切れで無人実行が止まるため）。
// 要約には、この Mac の Claude Code（claude -p）が書く考察を付ける。
// 設定（Base・テーブル・送信先）は ~/.config/gsc/config.json。
//
//   node scripts/gsc-sync.mjs              直近35日分を同期し、要約を送る
//   node scripts/gsc-sync.mjs --days 500   さかのぼって同期（初回）
import { execFile } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseArgs, promisify } from 'node:util';
import { searchAnalytics, ymd } from './gsc-client.mjs';

const configDir = `${homedir()}/.config/gsc`;
const config = JSON.parse(readFileSync(`${configDir}/config.json`, 'utf8'));
// 実行間隔（最長11日）の3倍あれば、Mac が止まっていて1回飛んでも次の実行で埋まる
const { values } = parseArgs({ options: { days: { type: 'string', default: '35' } } });

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
- クリックは1日数件と少ないので、増減は偶然の揺れでもありうる前提で書く。
- このデータから問い合わせ件数は分からない（Search Console は検索結果での表示とクリックだけ）。問い合わせについて推測しない。
- 分からない点は推測せず「質問」で聞く。質問は3つまで。

出力: Lark のメッセージに貼る Markdown。見出しは「**事実**」「**解釈**」「**ほかに考えられる説明**」「**質問**」の4つをこの順で、中身は箇条書き。全体で800字以内。前置き・結び・見出し以外の文は書かない。`;

const tsv = (rows, label) => rows.map((r) => [label(r.keys), r.clicks, r.impressions, (r.ctr * 100).toFixed(1) + '%', r.position.toFixed(1)].join('\t')).join('\n');

async function insight({ cur, prev, now, before, latest }) {
  const since35 = ymd(new Date(latest - 34 * day));
  const range = (r) => ({ startDate: r[0], endDate: r[1] });
  const daily = await searchAnalytics(config.site, { startDate: since35, endDate: ymd(latest), dimensions: ['date'] });
  const pagesCur = await searchAnalytics(config.site, { ...range(cur), dimensions: ['page'] });
  const pagesPrev = await searchAnalytics(config.site, { ...range(prev), dimensions: ['page'] });
  const queries = (await searchAnalytics(config.site, { ...range(cur), dimensions: ['query'] }))
    .sort((a, b) => b.impressions - a.impressions).slice(0, 20);
  const { stdout: commits } = await run('git', ['-C', repoRoot, 'log', `--since=${since35}`, '--date=short', '--format=%ad %s', '--', 'public/']);
  await lark('base', '+record-list', '--base-token', config.baseToken, '--table-id', config.tables.notes,
    '--filter-json', JSON.stringify({ logic: 'and', conditions: [['記入日', '>', `ExactDate(${since35} 00:00:00)`]] }),
    '--output', 'notes.ndjson', '--overwrite');
  const notes = readFileSync(join(workDir, 'notes.ndjson'), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l))
    .filter((n) => n['内容']).map((n) => `${String(n['記入日']).slice(0, 10)} ${n['内容']}`);
  const redirects = readFileSync(join(repoRoot, 'public/_redirects'), 'utf8').split('\n')
    .filter((l) => l.trim() && !l.startsWith('#') && !l.includes('index.html')).join('\n');
  const total = (t) => `クリック ${t.clicks} / 表示回数 ${t.impressions} / CTR ${(t.ctr * 100).toFixed(1)}% / 平均順位 ${t.position.toFixed(1)}`;
  const head = '\tクリック\t表示回数\tCTR\t平均順位';
  const material = [
    '列の意味: クリック＝検索結果から押された回数、表示回数＝検索結果に出た回数、CTR＝クリック÷表示回数、平均順位＝小さいほど上位。',
    'サイトの経緯: 2026-09 にリニューアルし、美容サロン向けから一般業種向けの会社案内に変えた。旧URLは下の「301転送」のとおり新しいページへ転送している。',
    `今回の期間 ${cur[0]}〜${cur[1]}: ${total(now)}`,
    `前回の期間 ${prev[0]}〜${prev[1]}: ${total(before)}`,
    `\n日別（${since35}〜${ymd(latest)}）\n日付${head}\n${tsv(daily, (k) => k[0])}`,
    `\nページ別・今回\nページ${head}\n${tsv(pagesCur, (k) => pagePath(k[0]))}`,
    `\nページ別・前回\nページ${head}\n${tsv(pagesPrev, (k) => pagePath(k[0]))}`,
    `\n検索語句・今回（表示回数の上位20。件数の少ない語句は Google が伏せるため、合計と一致しない）\n語句${head}\n${tsv(queries, (k) => k[0])}`,
    `\nサイト変更（public/ のコミット履歴）\n${commits.trim() || 'なし'}`,
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
  // 「確定済みの最新10日」とその前の10日を比べる（実行日の前日分はまだ確定していないため）
  const dates = await searchAnalytics(config.site, {
    startDate: ymd(new Date(Date.now() - 10 * day)), endDate: ymd(new Date()), dimensions: ['date'],
  });
  const latest = new Date(dates.map((r) => r.keys[0]).sort().at(-1) ?? ymd(new Date(Date.now() - 3 * day)));
  const range = (back) => [ymd(new Date(latest - (back + 9) * day)), ymd(new Date(latest - back * day))];
  const [cur, prev] = [range(0), range(10)];
  const [now, before] = [await totals(...cur), await totals(...prev)];
  const top = async (dim, sortKey) => (await searchAnalytics(config.site, { startDate: cur[0], endDate: cur[1], dimensions: [dim] }))
    .sort((a, b) => b[sortKey] - a[sortKey]).slice(0, 5);
  const [pages, queries] = [await top('page', 'clicks'), await top('query', 'impressions')];
  // 考察が作れなくても数値の要約は送る
  const analysis = await insight({ cur, prev, now, before, latest })
    .catch((e) => `生成できませんでした: ${String(e.message).slice(0, 300)}`);

  const sign = (n, digits = 0) => `${n > 0 ? '+' : n < 0 ? '−' : '±'}${Math.abs(n).toFixed(digits)}`;
  const md = (s) => s.slice(5).replace('-', '/');
  const lines = [
    `**検索データ** ${md(cur[0])}〜${md(cur[1])}（前の10日との比較）`,
    '',
    `- クリック **${now.clicks}**（${sign(now.clicks - before.clicks)}）`,
    `- 表示回数 **${now.impressions}**（${sign(now.impressions - before.impressions)}）`,
    `- CTR **${(now.ctr * 100).toFixed(1)}%**（${sign((now.ctr - before.ctr) * 100, 1)}pt）`,
    `- 平均順位 **${now.position.toFixed(1)}**（${sign(now.position - before.position, 1)}。小さいほど上位）`,
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
  console.log(`report sent: ${cur[0]}〜${cur[1]} ${sent.data?.message_id ?? ''}\n${analysis}`);
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
