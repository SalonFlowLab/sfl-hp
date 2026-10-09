# リポジトリ作業ガイド

合同会社SFLのコーポレートサイト（Lark・AIの2事業と官公庁入札事業）です。2026-09 のリニューアルで、美容サロン向け（SALON FLOW LAB.）の構成から、一般業種全体に向けた会社案内へ切り替えました。美容向けの旧ページは廃止済みです（旧URLは `_redirects` で301転送）。

## プロジェクト構成

HTML/CSS/JavaScriptのみの静的サイトです。公開対象のファイルは `public/` に集約しています。

- `public/index.html`: トップページ。2026-10-05 にトップ案（FVアニメーション＋本文）へ差し替え、2026-10-08 に最新のトップ案（`sfl-hp-top_1.html`）をもとに全体を作り直した（課題 → 事業概要 → Larkとは → Lark事業：4つの支援 → 写真帯 → 事例 → 講座・研修 → 会社情報 → FAQ → 末尾CTA）。本文は共通部品（`data-sfl`）を使わず、HTML に直接書いている。
- `public/{slug}/index.html`: 各ページ（公開URLは `/{slug}/`）。
- `public/assets/site/`: **新サイトの共通資産**（`css/site.css`、`js/data.js`、`js/site.js`、`img/`）。
- `public/assets/site/css/home.css` / `js/home.js`: **トップページ専用**。`home.css` は `<main class="home">` の中だけに効く（site.css のトークンを使用）。`home.js` は FV の演出（幕 → 業務名＋ツール名のカードが集まりロゴを描く → Lark Base 風のダッシュボードが組み上がる。速度カーブ `SPD` で約9秒）と、本文の改行制御（文節の切れ目に `<wbr>` を入れる。`main.home` の中だけ）。トップの写真は `img/home-*.webp`（トップ案に埋め込まれていた画像を書き出したもの。課題セクションの `home-pains.webp` は 2026-10-08 にオーナーが生成して追加（1024px のため表示幅を 1024px までに抑えている）。すべて「イメージ」と明記）。
- `public/assets/site/css/pages-a.css`〜`pages-d.css`: 下層ページ用の追加スタイル（各ファイル冒頭のコメントに対象ページ）。
- `public/internal/index.html`: 内部向けの集約ページ（仕様・判断・確定待ち・料金掲載箇所など）。`functions/internal/_middleware.js` がプレビュー環境とローカル以外では 404 を返す。**公開ページの内容を追加・削除・変更したら、同じコミットで `/internal/` の該当箇所（情報の整理・仕様書の対応状況・確定待ち・料金の掲載箇所・会議の決定事項）も更新する。**
- `functions/internal/_middleware.js`: `/internal/` をプレビュー限定にするミドルウェア。
- `wrangler.jsonc`: Cloudflare Pages の最小デプロイ設定。
- `public/_headers` / `public/_redirects`: ヘッダーと旧URLの301転送（転送先は最終ページへ直接。連鎖させない）。
- `docs/deployment/`: デプロイメモ。

ビルド工程はありません。静的ファイルを直接編集します。

## 開発・確認コマンド

- `python3 -m http.server 8123 --directory public`: 静的確認のみ。
- `npm run dev`: Cloudflare Pages 相当のプレビュー（Functions・`/internal/` の動作確認はこちら）。
- `npm run check:links`: HTML/CSS と `assets/site/js` 内のサイト内リンク・画像・**ページ間アンカー（#id）**を検査。
- `npm run check:assets`: 未使用アセット検出。
- `npm run check`: すべて。
- `npm run deploy`: Cloudflare Pages へデプロイ（本番反映は必ず確認を取ってから）。

## アーキテクチャ

**共通UIと繰り返し部品は JS が描画します。** `data.js`（`window.SFL`）が単一ソースで、`site.js` が以下を描画します。各HTMLには置き場所だけを書きます。

| 置き場所 | 内容 |
|---|---|
| `<div data-site-header>` / `<div data-site-footer>` | ヘッダー・ドロワー・フッター |
| `data-sfl="courses" data-group="corporate|individual"` | 講座・研修カード（法人→個人の順）。`/services/`・`/courses/` |
| `data-sfl="records"` | 導入・研修・取引実績。`/case-study/` |
| `data-sfl="flow"` | 相談フロー図（主フロー＋希望者のみの分岐）。`/contact/` |

**外部URLは `data.js` の `urls` が正です。** HTML には `<a data-url="キー">` だけを書き、`site.js` が href を入れます（`href` に同じURLを直接書くと `npm run check:links` が失敗します）。

`<body data-active="...">` でナビの現在地を決めます。スクリプトは `data.js` → `site.js` の順に `defer` で読み込みます（トップだけ続けて `home.js`）。

**トップFVの演出（`home.js`）**: 初回は自動再生し、同じタブの2回目以降（`sessionStorage` の `sflfv6`）と `prefers-reduced-motion` では最終状態だけを表示。この判定は `index.html` の `<head>` の短いスクリプトでも行い、表示前に `html.fv-skip` を付けて幕・縦書きを隠す（リロード時に最初のコマが一瞬見えるのを防ぐため。条件を変えるときは `home.js` と両方直す）。操作ボタンは置かない（2026-10-05、オーナーの意向で「待たせても演出を見せる」方針。スキップ・再生／一時停止ボタンを削除）。動きを止める手段が無いため、アクセシビリティ基準 WCAG 2.2.2（自動で5秒以上動く表示には停止手段）は満たさない。`prefers-reduced-motion` の端末では演出せず最終状態を表示する（この分岐は消さない）。h1・サブコピー・FVのCTAは演出の後半で表示される。ロゴは SVG パスで描き、下に「SALON FLOW LAB.」の文字を描く（2026-10-05 の指示でトップ案のまま。ヘッダー・フッター・OG画像・JSON-LD のロゴは文字なし）。ダッシュボードは装飾扱い（`aria-hidden`、「※画面はイメージです」）。ダッシュボードとツール名カードの色は Lark・各ツールの画面を表すため、ブランドカラーに置き換えない（2026-10-08 決定）。

**`<head>` のSEO情報**: 全ページに `<title>`・description・canonical・OG・JSON-LD があります。JSON-LD は静的なので、会社情報・FAQ・講座名を変えたら JSON-LD も同時に直します（FAQ はトップ本文と完全一致。現在6問（トップ案の8問のうち、回答が未記入の「費用」「期間」は外している）。旧URL `/faq/` の転送先は `/#faq` なので、トップのFAQ欄の `id="faq"` は消さない）。組織情報は `index.html` の Organization が正で、他ページは `@id` で参照します。

**正規URL**: `https://salonflowlab.com/`（新ドメインが決まったら全ページの canonical・OG・JSON-LD・sitemap・robots を一括置換）。

## デザイン・CTA・文言の制約

- ブランドカラーは固定: `#F8F5EF` `#103A71` `#C99A1A` `#E7D3A0` `#1E88E5` `#333333`。フッターだけ中間の青 `#1A5796`（2026-09-22 打ち合わせで決定）。本文は `#333333`。
- 書体は全ページ明朝体（`site.css` の `--font`: Noto Serif JP → ヒラギノ明朝 → 游明朝。英数字も同じ）。ゴシック体の指定を足さない。
- 誠実さ優先。ボタンは角丸控えめ（6px）。アニメーションはセクション登場時の控えめなものだけ（`prefers-reduced-motion` で無効）。例外はトップFVの演出（2026-10-05 にトップ案を採用）。
- 主CTA「60分無料相談」のボタンは全ページ同じ部品（`.button .button-consult`＝金地に濃紺文字・太字・末尾に「→」。トップのFV・末尾も同じ部品を使い、FVのボタンには演出用の目印として `.btn` も付ける。2026-10-05 決定。金地に白文字はコントラスト不足のため使わない）。金のボタンは「60分無料相談」専用で、他のボタンは紺（`.button-primary`）・白枠（`.button-secondary`）を使う。トップの金の文字（英字見出し・ラベル・会社概要の項目名）は下層ページのルール（金は文字色に使わない）と食い違ったままで、確定待ち（`/internal/` の確定待ち）。
- 開閉（details）は「追加説明」だけに使う。概要・実績・会社情報は常時表示。開閉は見出し行全体を押せる形（`.disclosure`、＋／−表示。トップのFAQだけは `home.css` の独自スタイル）。
- 見出し（h2）の末尾に句読点を付けない。
- 主CTAは「60分無料相談」（`/contact/`）。ヘッダー・トップFV・ページ末尾に置き、本文で同じボタンを重ねない。
- 申し込み窓口は「個人事業主・フリーランス＝公式LINE」「法人＝Lark のお問い合わせフォーム（別タブ）」。個人向け講座の受講は別窓口（`/courses/#entry`）。
- 法人向けと個人向けは「事業の相談（法人・個人事業主）」と「個人の学び（講座）」で分ける。個人向け講座は `/courses/` に集約し、法人研修のページ（`/lark-dx/` `/ai-dx-training/`）に個人向けの内容を混ぜない。
- 講座・研修・サポートの詳細はサイト内ページに置く（`/lark-training/` `/ai-course/` `/public-procurement-course/` `/academy/` `/support-desk/`）。旧 ChatGPT サイト（*.chatgpt.site）へはリンクしない（Lucia 事例サイトのみ例外）。申込・説明会は Lark Base のフォーム（`data.js` の `urls`）。ログインしないと見られないリンク（共有されていない Lark Base 本体など）は置かない（2026-10-05、Cycle Pro の見本リンクをサイト全体から削除）。
- 対象は一般業種全体。美容は Cycle Pro・Lucia 事例などの実績としてのみ扱い、美容向けの訴求を主にしない。
- 事業紹介は Lark・AI を主要事業（2本柱）とし、官公庁入札事業も事業として載せる（2026-10-08 方針変更。2026-09-29 に事業紹介から外していたものを戻した）。トップの事業概要は Lark・AI の2カード＋その下に官公庁入札事業の帯（リンク先は `/public-procurement-course/`）。官公庁入札の講座・取引実績（陸上自衛隊 等）は従来どおり。2026-10-09 に `/services/`（`#public-procurement` のブロック）・会社ページの事業内容・フッターも3事業の表記に戻した。`/contact/` の相談テーマは2事業の表記のままで、官公庁入札事業を足すかは未決（`/internal/` の確定待ち）。
- 講座の表示価格は正規の受講料（18万円・税別）に統一する。開講日・期別の料金・割引・募集状況は各講座の詳細ページ（`/ai-course/` `/public-procurement-course/` など）にだけ書き、トップ・`/courses/`・`/services/` などには書かない（2026-09-29 打ち合わせで決定）。
- SFL Academy はトップ・`/courses/`・`/services/`・`/company/` で前面に出さず、講座詳細ページから案内する。

## コーディング規約

既存の書き方に合わせます。インデント2スペース、クラス名は kebab-case。新ページは `/assets/site/...` の絶対パスで参照します。日本語コピーは周辺の文体に合わせます。

## テスト方針

自動テストフレームワークはありません。`npm run check` + `git diff --check` + ブラウザ確認（トップ・変更ページ・もう1ページ、デスクトップと390px幅、コンソールエラー）で検証します。JS を触ったら `node --check public/assets/site/js/*.js` も実行します。トップFVを確認するときは、演出の途中と終了後（約9秒後）の両方を見ます。

## コミット・プルリクエスト

日本語の Conventional Commits（`feat:` `fix:` `docs:` `chore:` など）。PR には変更概要・影響ページ・確認手順を書き、見た目が変わる場合はスクリーンショットを添付します。

`tasks/lessons.md` は廃止済みです（auto-memory へ移行）。追記しないでください。

## セキュリティ・設定

秘密情報、Cloudflare APIトークン、未公開の顧客情報はコミットしないでください。住所、電話番号、料金、スタッフ名、実績値は公開前に必ず実データとして確認してください。

- https://developers.cloudflare.com/pages/
- https://developers.cloudflare.com/pages/configuration/headers/
- https://developers.cloudflare.com/pages/configuration/redirects/
- https://developers.cloudflare.com/pages/functions/middleware/
- https://developers.cloudflare.com/workers/wrangler/
