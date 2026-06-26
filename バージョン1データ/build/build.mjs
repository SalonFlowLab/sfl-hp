import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { page } from './layout.mjs';
import PAGES from './pages.mjs';
import PAGES2 from './pages2.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ALL = { ...PAGES, ...PAGES2 };

let n = 0;
for (const [file, def] of Object.entries(ALL)) {
  const html = page(def, file);
  writeFileSync(resolve(ROOT, file), html, 'utf8');
  n++;
  console.log('wrote', file, `(${html.length} bytes)`);
}
console.log(`\n✔ ${n} pages generated.`);
