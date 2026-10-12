// Search Console の検索データを取得する（読み取り専用）。
// 鍵はリポジトリに置かない。既定は ~/.config/gsc/sa.json（GSC_KEY で変更可）。
// サービスアカウントのメールを GSC のプロパティにユーザー追加していないと、sites が空になる。
//
//   node scripts/gsc.mjs sites
//   node scripts/gsc.mjs query <siteUrl> [--days 28] [--dims query,page] [--limit 50] [--page-contains /lark]
import { createSign } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { parseArgs } from 'node:util';

const keyFile = process.env.GSC_KEY ?? `${homedir()}/.config/gsc/sa.json`;
const key = JSON.parse(readFileSync(keyFile, 'utf8'));
const api = 'https://www.googleapis.com/webmasters/v3';

async function accessToken() {
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const body = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: key.token_uri,
    iat: now,
    exp: now + 3600,
  })}`;
  const sig = createSign('RSA-SHA256').update(body).sign(key.private_key, 'base64url');
  const res = await fetch(key.token_uri, {
    method: 'POST',
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${body}.${sig}` }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`token: ${JSON.stringify(json)}`);
  return json.access_token;
}

async function call(path, init = {}) {
  const res = await fetch(`${api}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${path}: ${JSON.stringify(json)}`);
  return json;
}

const ymd = (d) => d.toISOString().slice(0, 10);
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
  const body = { startDate: ymd(start), endDate: ymd(end), dimensions, rowLimit: Number(values.limit) };
  if (values['page-contains']) {
    body.dimensionFilterGroups = [{ filters: [{ dimension: 'page', operator: 'contains', expression: values['page-contains'] }] }];
  }
  const { rows = [] } = await call(`/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  console.log(`# ${body.startDate} 〜 ${body.endDate}`);
  console.log([...dimensions, 'clicks', 'impressions', 'ctr', 'position'].join('\t'));
  for (const r of rows) {
    console.log([...r.keys, r.clicks, r.impressions, (r.ctr * 100).toFixed(1) + '%', r.position.toFixed(1)].join('\t'));
  }
} else {
  console.error('usage: node scripts/gsc.mjs sites | query <siteUrl> [--days 28] [--dims query,page] [--limit 50] [--page-contains /path]');
  process.exit(1);
}
