# リポジトリ作業ガイド

合同会社SFL（SALON FLOW LAB.）の静的Webサイトです。

## プロジェクト構成

このリポジトリは、HTML/CSS/JavaScriptのみで構成された静的サイトです。公開対象のファイルは `public/` に集約しています。

- `public/index.html`: ルート入口ページ。
- `public/{slug}/index.html`: 各ページのHTML（公開URLは `/{slug}/`）。
- `public/assets/css/`: 共通スタイルと旧デザイン調整用CSS。
- `public/assets/js/`: 共通ナビゲーションとUIスクリプト。
- `public/assets/images/`, `public/assets/icons/`, `public/assets/textures/`: 画像・アイコン・背景素材。
- `public/assets/pdf/`: 配布用PDF。
- `functions/api/contact.js`: Cloudflare Pages Functions のフォーム受付API。
- `wrangler.jsonc`: Cloudflare Pages の最小デプロイ設定。
- `public/_headers`: Cloudflare Pages のセキュリティ・キャッシュヘッダー。
- `docs/deployment/`: Cloudflare Pages のデプロイメモ。

ビルド用のソースディレクトリはありません。静的ファイルを直接編集します。セットアップ、デプロイ、テンプレート利用手順を変更する前に `README.md` を確認してください。

## 開発・確認コマンド

- `python3 -m http.server 8123 --directory public`: `http://127.0.0.1:8123/index.html` でローカル確認（静的確認のみ）。
- `npm install`: Cloudflare Pages 用の Wrangler をインストール。
- `npm run dev`: `public/` を Cloudflare Pages 相当の環境でプレビュー。フォームAPIの動作確認はこちら。
- `npm run deploy`: Cloudflare Pages へデプロイ。
- `npm run check:links`: HTML/CSS のローカル参照を確認。
- `npm run check:assets`: `public/assets/` 配下の未使用アセットを検出。
- `npm run check`: すべてのチェックを実行。
- `rg "検索語" public`: サイト内の文言・参照を検索。

ビルド工程はありません。Cloudflare Pages が `public/` をそのまま配信します。

テンプレートとして再利用する場合は、`package.json` の `name`、`config.cloudflare_project_name`、`wrangler.jsonc` の `name` を同じ案件名に更新してください。

## アーキテクチャ

**共通UIはJSがランタイム生成します。** ヘッダー・ドロワー・フッターは `public/assets/js/site-chrome.js`、ページ下部CTAは `sfl-wide-cta.js`、問い合わせ・資料請求フォームのマークアップは `sfl-lead-form.js` が生成します。各ページの `index.html` にはこれらのHTMLは書かれていないので、ナビ・フッター・CTA・フォームの変更はJS側で行います。

**サービス定義の単一ソースは `public/assets/js/sfl-services-catalog.js`**（`window.SFL_SERVICES`）です。ナビ・フッター・フォームの「興味を持ったサービス」はここを参照して連動します。サービス追加時の更新箇所: ①catalog定義 ②`public/services/index.html` のカードとJSON-LDのItemList ③`public/{slug}/index.html` の新規LP（`<title>` とService JSON-LDを含む） ④`sitemap.xml`。

**`<head>` のSEO情報**: 全ページに `<title>`、noindexの `knowledge` 以外にJSON-LD（`<script type="application/ld+json">`）があります。値は本文と二重管理なので、料金・FAQ・会社情報を変えたらJSON-LDも同時に直します。料金は各LPのService、FAQは `faq/` のFAQPage（本文と完全一致させる）、会社情報は `index.html` と `company/` の2か所のOrganizationです。

**フォームAPI**: `functions/api/contact.js` が Cloudflare Pages Functions として `/api/contact` で動きます。クライアント側（`contact-form.js`）と同じ検証をサーバー側でも行い、`company_website` ハニーポットを持ちます。環境変数: `RESEND_API_KEY` / `CONTACT_FROM_EMAIL`（メール送信に必須）、`CONTACT_TO_EMAIL`、`LARK_CONTACT_WEBHOOK_URL`（任意）。GitHub Pages プレビュー（`shoma-endo.github.io/sfl-hp`）は静的配信のみで Functions は動きません。

**旧URL**: `public/_redirects` で301転送します（features→cycle-pro、lark→lark-flow-one、flow/pricing→salon-flow-one のアンカー）。`public/pages/` にHTMLは置きません。

## コーディング規約

HTML、CSS、JavaScriptは既存の書き方に合わせてください。HTML/CSSは既存と同じ2スペース寄りのインデントを維持し、クラス名は `site-header` や `glass-card` のような説明的な kebab-case を使います。日本語コピーは周辺の文体とトーンに合わせます。

相対パスは既存ルールを維持してください。ルートページは `assets/...`、`public/{slug}/` 配下のページは `/assets/...` を使います。

## デザイン・CTA・フォームの制約

- ブランドカラーは固定: `#F8F5EF` `#103A71` `#C99A1A` `#E7D3A0` `#1E88E5` `#333333`。構成・密度・見せ方のみ調整し、色は変えない。
- CTAは「お問い合わせ」「資料請求」の2種に統一。公式LINEへの直接誘導CTAは使わない。
- フォームのバリデーションエラーは全体ステータスに集約せず、該当入力欄の直下に表示する。
- 問い合わせ・資料請求のサービス選択肢はページごとに分岐させず同一リストを使う。

## テスト方針

自動テストフレームワークはありません。検証はブラウザ確認 + `npm run check` + `git diff --check` で行います。見た目やナビゲーションを変更した場合は、`index.html`、ネストされたページ1つ、直接変更したページを確認します。レスポンシブ表示、リンク、画像、PDF、ブラウザコンソールエラーも確認してください。

HTML、CSS、JavaScript、アセット、パスを変更した場合は、引き渡し前に `npm run check` を実行してください。フォーム関連を触った場合は追加で以下も実行します。

```bash
node --check public/assets/js/contact-form.js
node --check public/assets/js/sfl-lead-form.js
node --check functions/api/contact.js
```

## コミット・プルリクエスト

コミットは日本語の Conventional Commits（`feat:`, `fix:`, `docs:`, `chore:` などの `type: summary` 形式）を使います。

プルリクエストには、変更概要、影響するページやアセット、ローカル確認手順を記載してください。見た目が変わる場合はスクリーンショットも添付します。関連Issueや依頼がある場合はリンクしてください。

`tasks/lessons.md` は廃止済みです（auto-memory へ移行）。追記しないでください。

## セキュリティ・設定

秘密情報、Cloudflare APIトークン、未公開の顧客情報はコミットしないでください。住所、電話番号、料金、スタッフ名、実績値は公開前に必ず実データとして確認してください。

Cloudflare Pages の仕様確認が必要な場合は、まず以下を参照してください。

- https://developers.cloudflare.com/pages/
- https://developers.cloudflare.com/pages/configuration/headers/
- https://developers.cloudflare.com/pages/configuration/redirects/
- https://developers.cloudflare.com/workers/wrangler/
