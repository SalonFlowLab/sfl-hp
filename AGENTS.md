# リポジトリ作業ガイド

合同会社SFLのコーポレートサイト（Lark・AI・官公庁入札の3事業）です。2026-09 のリニューアルで、美容サロン向け（SALON FLOW LAB.）の構成から、一般業種全体に向けた会社案内へ切り替えました。美容向けの旧ページは廃止済みです（旧URLは `_redirects` で301転送）。

## プロジェクト構成

HTML/CSS/JavaScriptのみの静的サイトです。公開対象のファイルは `public/` に集約しています。

- `public/index.html`: トップページ。
- `public/{slug}/index.html`: 各ページ（公開URLは `/{slug}/`）。
- `public/assets/site/`: **新サイトの共通資産**（`css/site.css`、`js/data.js`、`js/site.js`、`img/`）。
- `public/internal/index.html`: 内部向けの集約ページ（仕様・判断・確定待ち・料金掲載箇所など）。`functions/internal/_middleware.js` がプレビュー環境とローカル以外では 404 を返す。
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
| `data-sfl="businesses"` | 3事業カード |
| `data-sfl="courses" data-group="corporate|individual"` | 講座・研修カード（法人→個人の順） |
| `data-sfl="academy"` | SFL Academy の案内 |
| `data-sfl="records"` | 導入・研修・取引実績（トップ・事例・会社で共通） |
| `data-sfl="flow"` | 相談フロー図（主フロー＋希望者のみの分岐） |

`<body data-active="...">` でナビの現在地を決めます。スクリプトは `data.js` → `site.js` の順に `defer` で読み込みます。

**`<head>` のSEO情報**: 全ページに `<title>`・description・canonical・OG・JSON-LD があります。JSON-LD は静的なので、会社情報・FAQ・講座名を変えたら JSON-LD も同時に直します（FAQ はトップ本文と完全一致）。組織情報は `index.html` の Organization が正で、他ページは `@id` で参照します。

**正規URL**: `https://salonflowlab.com/`（新ドメインが決まったら全ページの canonical・OG・JSON-LD・sitemap・robots を一括置換）。

## デザイン・CTA・文言の制約

- ブランドカラーは固定: `#F8F5EF` `#103A71` `#C99A1A` `#E7D3A0` `#1E88E5` `#333333`。フッターだけ中間の青 `#1A5796`（2026-09-22 打ち合わせで決定）。本文は `#333333`。
- 誠実さ優先。ボタンは角丸控えめ（6px）。アニメーションはセクション登場時の控えめなものだけ（`prefers-reduced-motion` で無効）。
- 開閉（details）は「追加説明」だけに使う。概要・実績・会社情報は常時表示。開閉は見出し行全体を押せる形（`.disclosure`、＋／−表示）。
- 見出し（h2）の末尾に句読点を付けない。
- 主CTAは「60分無料相談」（`/contact/`）。ヘッダー・トップFV・ページ末尾に置き、本文で同じボタンを重ねない。
- 申し込み窓口は「個人事業主・フリーランス＝公式LINE」「法人＝Lark のお問い合わせフォーム（別タブ）」。個人向け講座の受講は別窓口（`/contact/#course-entry`）。
- 対象は一般業種全体。美容は Cycle Pro・Lucia 事例などの実績としてのみ扱い、美容向けの訴求を主にしない。
- 官公庁入札事業は「実施中」の表記（官公庁案件の調査・入札に取り組んでいます）。講座は2026年10月開始。

## コーディング規約

既存の書き方に合わせます。インデント2スペース、クラス名は kebab-case。新ページは `/assets/site/...` の絶対パスで参照します。日本語コピーは周辺の文体に合わせます。

## テスト方針

自動テストフレームワークはありません。`npm run check` + `git diff --check` + ブラウザ確認（トップ・変更ページ・もう1ページ、デスクトップと390px幅、コンソールエラー）で検証します。JS を触ったら `node --check public/assets/site/js/*.js` も実行します。

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
