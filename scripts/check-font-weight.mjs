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

// JS が描く図（FVのツール名カードなど）もゴシック体。明朝体はFVのロゴ下の「SALON FLOW LAB.」（S.txt）だけ。
const jsDir = join(root, 'assets/site/js');
for (const file of readdirSync(jsDir).filter((f) => f.endsWith('.js'))) {
  readFileSync(join(jsDir, file), 'utf8').split('\n').forEach((line, i) => {
    if (/Serif JP|Mincho/.test(line) && !line.includes('S.txt=')) errors.push(`${file}:${i + 1}: 図の中の文字は明朝体にしない`);
  });
}

if (errors.length) {
  console.error('文字の太さ・書体の指定がルール（見出し500・数字600・ボタンだけ700、図の中はゴシック体）と合いません:');
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log('文字の太さ OK');
