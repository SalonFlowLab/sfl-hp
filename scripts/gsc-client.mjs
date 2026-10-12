// Search Console API の読み取り専用クライアント（Node 標準のみ）。
// 鍵はリポジトリに置かない。既定は ~/.config/gsc/sa.json（GSC_KEY で変更可）。
import { createSign } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';

const keyFile = process.env.GSC_KEY ?? `${homedir()}/.config/gsc/sa.json`;
export const key = JSON.parse(readFileSync(keyFile, 'utf8'));
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

export async function call(path, init = {}) {
  const res = await fetch(`${api}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${await accessToken()}`, 'Content-Type': 'application/json' },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`${path}: ${JSON.stringify(json)}`);
  return json;
}

// API の1回あたりの上限は 25000 行。limit を省くと startRow で全件たどる
export async function searchAnalytics(site, body, limit = Infinity) {
  const rows = [];
  while (rows.length < limit) {
    const rowLimit = Math.min(25000, limit - rows.length);
    const res = await call(`/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
      method: 'POST',
      body: JSON.stringify({ ...body, rowLimit, startRow: rows.length }),
    });
    rows.push(...(res.rows ?? []));
    if ((res.rows?.length ?? 0) < rowLimit) break;
  }
  return rows;
}

export const ymd = (d) => d.toISOString().slice(0, 10);
