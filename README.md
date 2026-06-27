# Sample Eyelash Salon — Webサイト

Sample Eyelash Salon の静的Webサイトです。HTML/CSS/JavaScriptのみで構成し、公開対象のファイルは `public/` に集約しています。

## 構成

- `public/index.html`: ルート入口ページ。
- `public/pages/`: 各ページのHTML。URL構造は `pages/NN-page-name/index.html` 形式です。
- `public/assets/css/`: 共通スタイルと旧デザイン調整用CSS。
- `public/assets/js/`: 共通ナビゲーション、UI挙動、ページ補助スクリプト。
- `public/assets/images/`, `public/assets/icons/`, `public/assets/textures/`: 画像・アイコン・背景素材。
- `public/assets/pdf/`: 配布用PDF。
- `wrangler.jsonc`: Cloudflare Pages の最小デプロイ設定。
- `public/_headers`: Cloudflare Pages で適用するセキュリティ・キャッシュヘッダー。
- `docs/deployment/`: Cloudflare Pages のデプロイメモ。

## ページ一覧

ホーム / サロン紹介 / メニュー・料金 / ご予約・来店案内 / スクール / サロン運営の仕組み / サロン運営システム / 同業者向け相談 / アクセス / お問い合わせ / プライバシーポリシー / AI・業務ツール・公式LINE活用

## 初回セットアップ

Node.js と npm が使える環境で、リポジトリ直下から以下を実行します。

```bash
npm install
npm run check
```

`npm install` は Cloudflare Pages 用の Wrangler をインストールします。`npm run check` はHTML/CSS内のローカル参照と未使用アセットを確認します。

## コマンド一覧

```bash
npm run dev          # Cloudflare Pages のローカルプレビュー
npm run deploy       # Cloudflare Pages へデプロイ
npm run check        # 全チェックを実行
npm run check:links  # HTML/CSS のローカル参照チェック
npm run check:assets # 未使用アセットチェック
```

## ローカル確認

リポジトリ直下で以下を実行します。

```bash
python3 -m http.server 8123 --directory public
```

ブラウザで `http://127.0.0.1:8123/index.html` を開いて確認してください。個別ページは例として `http://127.0.0.1:8123/pages/02-salon/index.html` のようにアクセスします。

Cloudflare Pages と同じ実行環境で確認する場合は以下を使います。

```bash
npm run dev
```

## 編集方針

ビルド工程はありません。HTML、CSS、JavaScriptを直接編集します。共通ヘッダー・フッターは `public/assets/js/site-chrome.js` が挿入するため、ナビゲーションや共通導線の変更はこのファイルも確認してください。

アセット参照は既存の相対パスを維持してください。ページ配下のHTMLでは `../../assets/...`、ルートの `public/index.html` では `assets/...` を使います。

## デプロイ

Cloudflare Pages にデプロイします。

Cloudflare Pages のGit連携では、Framework presetを `None`、Build commandを空、Build output directoryを `public` に設定します。CLIで直接デプロイする場合は以下を実行します。

```bash
npm run deploy
```

Cloudflare側のプロジェクト名は `hp-template-site` を既定値にしています。別案件で使う場合は `package.json` の `config.cloudflare_project_name` と `wrangler.jsonc` の `name` を同じ値に変更してください。

CLIデプロイにはCloudflareアカウントへのログインが必要です。未ログインの場合はWranglerの案内に従って認証してください。

## Cloudflare 参考リンク

- [Cloudflare Pages 公式ドキュメント](https://developers.cloudflare.com/pages/)
- [Cloudflare Pages の始め方](https://developers.cloudflare.com/pages/get-started/)
- [Wrangler によるデプロイ](https://developers.cloudflare.com/pages/functions/wrangler-configuration/)
- [`_headers` の設定](https://developers.cloudflare.com/pages/configuration/headers/)
- [`_redirects` の設定](https://developers.cloudflare.com/pages/configuration/redirects/)
- [Wrangler 公式ドキュメント](https://developers.cloudflare.com/workers/wrangler/)

## テンプレート利用時の差し替え

新しい案件で使う場合は、公開前に以下を案件用の内容へ置き換えてください。

### サイト基本情報

- `README.md`: サイト名、ページ一覧、Cloudflare Pages プロジェクト名
- `package.json`: `name` と `config.cloudflare_project_name`
- `wrangler.jsonc`: `name`
- `public/assets/js/site-chrome.js`: ブランド表記、住所、営業時間、定休日、フッター表記

### ページ本文・メタ情報

- `public/pages/*/index.html`: ページ本文、`title`、`meta description`、OGPテキスト
- `public/pages/01-top/index.html`: トップページの訴求、強み、住所、導線
- `public/pages/02-salon/index.html`: サロン紹介、コンセプト、こだわり、接客姿勢
- `public/pages/03-menu-price/index.html`: メニュー名、料金、注意事項
- `public/pages/04-reservation/index.html`: 予約方法、来店フロー、キャンセル案内
- `public/pages/06-school/index.html`: スクール内容、カリキュラム、導線
- `public/pages/07-operation-system/index.html`: 運営フロー、実績、サポート内容
- `public/pages/08-management-system/index.html`: サロン運営システム名、説明文、機能、導入CTA
- `public/pages/09-consulting/index.html`: 相談メニュー、対象者、実績、PDF導線
- `public/pages/10-access/index.html`: 住所、アクセス、Google Maps 埋め込み、道順
- `public/pages/11-contact/index.html`: 問い合わせ種別、フォーム項目、連絡先
- `public/pages/12-privacy-policy/index.html`: 事業者名、問い合わせ窓口、個人情報の扱い
- `public/pages/13-ai-tools/index.html`: 利用ツール名、活用例、導入サポート文言

### リンク・外部サービス

- `public/assets/js/site-chrome.js`: お客様向けLINE、事業者向けLINE、Instagramリンク
- `public/pages/*/index.html`: CTA、LINEリンク、PDFリンク、Google Mapsリンク
- `public/assets/pdf/`: 配布PDFの差し替え

### 画像・アセット

- `public/assets/images/logo.jpg`: ロゴ
- `public/assets/images/favicon.svg`: ファビコン
- `public/assets/images/`: 店舗写真、人物写真、ヒーロー画像、OGP用画像
- `public/assets/textures/`: 背景テクスチャ
- `public/assets/icons/`: 必要に応じてアイコン

### Cloudflare 設定

- `public/_headers`: セキュリティヘッダー、キャッシュ設定
- `docs/deployment/README.md`: Cloudflare Pages プロジェクト名、運用メモ

## 公開前チェック

公開前に以下を確認してください。

- `npm run check` が成功すること。
- 主要ページを `npm run dev` で目視確認すること。
- ナビゲーション、CTA、LINEリンク、PDFリンク、Google Maps埋め込みが正しいこと。
- 住所・電話番号・料金・スタッフ名・実績値が公開用データであること。
- ロゴ、ファビコン、OGPに使う画像が案件用になっていること。

チェックコマンド:

```bash
npm run check
```

## 補足

Google Fontsを読み込むため、最終確認はオンライン環境でも実施してください。フォーム送信や予約連携などのバックエンド機能は含まれていません。必要な場合は Cloudflare Pages Functions や外部フォームサービスを別途追加してください。
