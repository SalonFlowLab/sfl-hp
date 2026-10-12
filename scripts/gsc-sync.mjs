// Search Console の検索データを Lark Base にため、週1回 Lark の個別チャットに要約を送る。
// launchd から毎日実行する（~/Library/LaunchAgents/com.salonflowlab.gsc-sync.plist）。
// Lark は lark-cli の bot 身分で操作する（user トークンは期限切れで無人実行が止まるため）。
// 設定（Base・テーブル・送信先）は ~/.config/gsc/config.json、週報の送信記録は state.json。
//
//   node scripts/gsc-sync.mjs                 直近10日分を同期し、今週の週報が未送信なら送る
//   node scripts/gsc-sync.mjs --days 500      さかのぼって同期（初回）
//   node scripts/gsc-sync.mjs --report-now    送信記録に関係なく週報を送る
import { execFile } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseArgs, promisify } from 'node:util';
import { searchAnalytics, ymd } from './gsc-client.mjs';

const configDir = `${homedir()}/.config/gsc`;
const config = JSON.parse(readFileSync(`${configDir}/config.json`, 'utf8'));
const statePath = `${configDir}/state.json`;
const { values } = parseArgs({
  options: {
    days: { type: 'string', default: '10' },
    'report-now': { type: 'boolean', default: false },
  },
});

const workDir = mkdtempSync(join(tmpdir(), 'gsc-sync-'));
const run = promisify(execFile);

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

function isoWeek(d) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
  const week = Math.ceil(((t - Date.UTC(t.getUTCFullYear(), 0, 1)) / day + 1) / 7);
  return `${t.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

async function totals(startDate, endDate) {
  const [r] = await searchAnalytics(config.site, { startDate, endDate });
  return r ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
}

async function report(week) {
  // 週報は「確定済みの最新7日」とその前の7日を比べる（月曜時点では前日分がまだ確定していないため）
  const dates = await searchAnalytics(config.site, {
    startDate: ymd(new Date(Date.now() - 10 * day)), endDate: ymd(new Date()), dimensions: ['date'],
  });
  const latest = new Date(dates.map((r) => r.keys[0]).sort().at(-1) ?? ymd(new Date(Date.now() - 3 * day)));
  const range = (back) => [ymd(new Date(latest - (back + 6) * day)), ymd(new Date(latest - back * day))];
  const [cur, prev] = [range(0), range(7)];
  const [now, before] = [await totals(...cur), await totals(...prev)];
  const top = async (dim, sortKey) => (await searchAnalytics(config.site, { startDate: cur[0], endDate: cur[1], dimensions: [dim] }))
    .sort((a, b) => b[sortKey] - a[sortKey]).slice(0, 5);
  const [pages, queries] = [await top('page', 'clicks'), await top('query', 'impressions')];

  const sign = (n, digits = 0) => `${n > 0 ? '+' : n < 0 ? '−' : '±'}${Math.abs(n).toFixed(digits)}`;
  const md = (s) => s.slice(5).replace('-', '/');
  const lines = [
    `**検索データ週報** ${md(cur[0])}〜${md(cur[1])}（前の7日との比較）`,
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
  ];
  await lark('im', '+messages-send', '--user-id', config.userOpenId, '--markdown', lines.join('\n'), '--idempotency-key', `gsc-report-${week}`);
  console.log(`report sent: ${cur[0]}〜${cur[1]}`);
}

try {
  await sync(Number(values.days));
  await refreshDashboardRange();
  const week = isoWeek(new Date());
  const state = existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')) : {};
  if (values['report-now'] || state.lastReportWeek !== week) {
    await report(values['report-now'] ? `${week}-${Date.now()}` : week);
    writeFileSync(statePath, JSON.stringify({ ...state, lastReportWeek: week }));
  }
} catch (e) {
  console.error(e);
  await lark('im', '+messages-send', '--user-id', config.userOpenId, '--text', `GSC 集計でエラー: ${String(e.message).slice(0, 500)}`)
    .catch((notifyError) => console.error(notifyError));
  process.exitCode = 1;
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
