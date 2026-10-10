// トップ案の文字の太さ（見出し500・数字600）を全ページで守るための検査。
// 700 以上を使えるのは .button と、トップFVの Lark 画面の模型（Lark の画面を再現するため）だけ。
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../public/', import.meta.url).pathname;
const cssDir = join(root, 'assets/site/css');
const heavy = /font-weight:\s*(700|800|900|bold|bolder)\b/;
const allowed = [/^\.button\b/, /^\.home \.(bar|kpis|pn|dash)\b/];
const errors = [];

for (const file of readdirSync(cssDir).filter((f) => f.endsWith('.css'))) {
  const css = readFileSync(join(cssDir, file), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = m[1].trim();
    if (heavy.test(m[2]) && !allowed.some((re) => re.test(selector))) {
      errors.push(`${file}: ${selector}`);
    }
  }
}

const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
  d.isDirectory() ? walk(join(dir, d.name)) : d.name.endsWith('.html') ? [join(dir, d.name)] : []);
for (const file of walk(root)) {
  if (/style="[^"]*font-weight/.test(readFileSync(file, 'utf8'))) {
    errors.push(`${file.replace(root, '')}: style 属性で font-weight を指定しない`);
  }
}

if (errors.length) {
  console.error('太さの指定がトップ案（見出し500・数字600・ボタンだけ700）と合いません。var(--fw-heading) / var(--fw-number) を使ってください:');
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log('文字の太さ OK');
