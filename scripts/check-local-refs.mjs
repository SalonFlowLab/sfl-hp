import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = resolve(root, 'public');
const missing = [];

function isExternal(ref) {
  return /^(?:[a-z]+:|\/\/|#)/i.test(ref);
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

for (const file of await walk(publicDir)) {
  const refs = file.endsWith('.html')
    ? collectHtmlRefs(readFileSync(file, 'utf8'))
    : file.endsWith('.css')
      ? collectCssRefs(readFileSync(file, 'utf8'))
      : [];

  for (const ref of refs) {
    if (!ref || isExternal(ref) || ref.startsWith('/')) continue;
    const pathOnly = ref.split(/[?#]/, 1)[0];
    if (!pathOnly) continue;
    const target = resolve(dirname(file), pathOnly);
    if (!existsSync(target)) {
      missing.push(`${file.replace(`${root}/`, '')} -> ${ref}`);
    }
  }
}

if (missing.length) {
  console.error('ローカル参照切れがあります:');
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

console.log('ローカル参照 OK');
