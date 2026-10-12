// Search Console の検索データを取得する（読み取り専用）。
// サービスアカウントのメールを GSC のプロパティにユーザー追加していないと、sites が空になる。
//
//   node scripts/gsc.mjs sites
//   node scripts/gsc.mjs query <siteUrl> [--days 28] [--dims query,page] [--limit 50] [--page-contains /lark]
import { parseArgs } from 'node:util';
import { call, key, searchAnalytics, ymd } from './gsc-client.mjs';

const { positionals, values } = parseArgs({
  allowPositionals: true,
  options: {
    days: { type: 'string', default: '28' },
    dims: { type: 'string', default: 'query' },
    limit: { type: 'string', default: '50' },
    'page-contains': { type: 'string' },
  },
});
const [cmd, site] = positionals;

if (cmd === 'sites') {
  const { siteEntry = [] } = await call('/sites');
  console.log(`account: ${key.client_email}`);
  for (const s of siteEntry) console.log(`${s.siteUrl}\t${s.permissionLevel}`);
} else if (cmd === 'query' && site) {
  // GSC のデータは2〜3日遅れて確定するため、終了日を3日前にする
  const end = new Date(Date.now() - 3 * 864e5);
  const start = new Date(end - (Number(values.days) - 1) * 864e5);
  const dimensions = values.dims.split(',');
  const body = { startDate: ymd(start), endDate: ymd(end), dimensions };
  if (values['page-contains']) {
    body.dimensionFilterGroups = [{ filters: [{ dimension: 'page', operator: 'contains', expression: values['page-contains'] }] }];
  }
  const rows = await searchAnalytics(site, body, Number(values.limit));
  console.log(`# ${body.startDate} 〜 ${body.endDate}`);
  console.log([...dimensions, 'clicks', 'impressions', 'ctr', 'position'].join('\t'));
  for (const r of rows) {
    console.log([...r.keys, r.clicks, r.impressions, (r.ctr * 100).toFixed(1) + '%', r.position.toFixed(1)].join('\t'));
  }
} else {
  console.error('usage: node scripts/gsc.mjs sites | query <siteUrl> [--days 28] [--dims query,page] [--limit 50] [--page-contains /path]');
  process.exit(1);
}
