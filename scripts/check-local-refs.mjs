import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = resolve(root, 'public');
const missing = [];

// JS（site.js）が描画時に付与する id。静的HTMLには無いのでアンカー検査の対象外にする。
const runtimeIdPattern = /^(business|course|record)-/;
// Pages Functions が応答するパス（静的ファイルは無い）
const functionPaths = ['/api/'];

function isExternal(ref) {
  return /^(?:[a-z]+:|\/\/)/i.test(ref);
}

function collectHtmlRefs(html) {
  const refs = [];
  for (const match of html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)) {
    refs.push(match[1]);
  }
  for (const match of html.matchAll(/url\(([^)]+)\)/g)) {
    refs.push(match[1].trim().replace(/^["']|["']$/g, ''));
  }
  return refs;
}

function collectCssRefs(css) {
  return [...css.matchAll(/url\(([^)]+)\)/g)].map((match) =>
    match[1].trim().replace(/^["']|["']$/g, ''),
  );
}

// 新サイトの共通データ・描画スクリプト内のサイト内リンク（'/services/#lark' など）
function collectScriptRefs(js) {
  return [...js.matchAll(/href(?::\s*|=)["']?['"](\/(?!\/)[^'"\s<>]*)['"]/g)].map((match) => match[1]);
}

async function walk(dir) {
  const { readdir } = await import('node:fs/promises');
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const idCache = new Map();
function idsOf(htmlFile) {
  if (!idCache.has(htmlFile)) {
    const html = readFileSync(htmlFile, 'utf8');
    idCache.set(htmlFile, new Set([...html.matchAll(/\sid=["']([^"']+)["']/g)].map((m) => m[1])));
  }
  return idCache.get(htmlFile);
}

function resolveTarget(file, pathOnly) {
  let target = pathOnly.startsWith('/')
    ? resolve(publicDir, `.${pathOnly}`)
    : resolve(dirname(file), pathOnly);
  if (existsSync(target) && statSync(target).isDirectory()) target = resolve(target, 'index.html');
  return target;
}

const siteScripts = new Set([
  resolve(publicDir, 'assets/site/js/data.js'),
  resolve(publicDir, 'assets/site/js/site.js'),
]);

for (const file of await walk(publicDir)) {
  const refs = file.endsWith('.html')
    ? collectHtmlRefs(readFileSync(file, 'utf8'))
    : file.endsWith('.css')
      ? collectCssRefs(readFileSync(file, 'utf8'))
      : siteScripts.has(file)
        ? collectScriptRefs(readFileSync(file, 'utf8'))
        : [];

  for (const ref of refs) {
    if (!ref || isExternal(ref)) continue;
    if (functionPaths.some((prefix) => ref.startsWith(prefix))) continue;
    const [beforeHash, hash = ''] = ref.split('#');
    const pathOnly = beforeHash.split('?', 1)[0];
    const label = `${file.replace(`${root}/`, '')} -> ${ref}`;

    // ページ内アンカー（#id）
    if (!pathOnly) {
      if (hash && file.endsWith('.html') && !runtimeIdPattern.test(hash) && !idsOf(file).has(hash)) missing.push(`${label}（id なし）`);
      continue;
    }

    const target = resolveTarget(file, pathOnly);
    if (!existsSync(target)) {
      missing.push(label);
      continue;
    }
    if (hash && target.endsWith('.html') && !runtimeIdPattern.test(hash) && !idsOf(target).has(hash)) {
      missing.push(`${label}（id なし）`);
    }
  }
}

if (missing.length) {
  console.error('ローカル参照切れがあります:');
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

console.log('ローカル参照 OK');
