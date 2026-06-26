import { readdir, readFile } from 'node:fs/promises';
import { dirname, extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const assetDir = resolve(root, 'public/assets');
const searchableExtensions = new Set([
  '.html',
  '.css',
  '.js',
  '.mjs',
  '.json',
  '.jsonc',
  '.md',
  '.txt',
  '.svg',
]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const allFiles = await walk(root);
const assets = (await walk(assetDir)).filter((file) => !file.endsWith('.DS_Store'));
const searchable = allFiles.filter((file) => {
  const rel = relative(root, file);
  return !rel.startsWith('.git/') && !rel.startsWith('node_modules/') && searchableExtensions.has(extname(file));
});

const documents = await Promise.all(
  searchable.map(async (file) => [file, await readFile(file, 'utf8')]),
);

const unused = [];

for (const asset of assets) {
  const assetRel = relative(root, asset);
  const publicRel = assetRel.replace(/^public\//, '');
  const basename = asset.split('/').pop();
  const referenced = documents.some(([file, text]) => {
    if (file === asset) return false;
    return (
      text.includes(assetRel) ||
      text.includes(publicRel) ||
      text.includes(`../${publicRel}`) ||
      text.includes(`../../${publicRel}`) ||
      text.includes(basename)
    );
  });
  if (!referenced) unused.push(assetRel);
}

if (unused.length) {
  console.error('未使用アセットがあります:');
  for (const file of unused) console.error(`- ${file}`);
  process.exit(1);
}

console.log('未使用アセットはありません');
