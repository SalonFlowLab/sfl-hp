# リポジトリ作業ガイド

## プロジェクト構成

このリポジトリは、HTML/CSS/JavaScriptのみで構成された静的サイトです。公開対象のファイルは `public/` に集約しています。

- `public/index.html`: ルート入口ページ。
- `public/pages/NN-page-name/index.html`: 各ページのHTML。
- `public/assets/css/`: 共通スタイルと旧デザイン調整用CSS。
- `public/assets/js/`: 共通ナビゲーションとUIスクリプト。
- `public/assets/images/`, `public/assets/icons/`, `public/assets/textures/`: 画像・アイコン・背景素材。
- `public/assets/pdf/`: 配布用PDF。
- `wrangler.jsonc`: Cloudflare Pages の最小デプロイ設定。
- `public/_headers`: Cloudflare Pages のセキュリティ・キャッシュヘッダー。
- `docs/deployment/`: Cloudflare Pages のデプロイメモ。

ビルド用のソースディレクトリはありません。静的ファイルを直接編集します。セットアップ、デプロイ、テンプレート利用手順を変更する前に `README.md` を確認してください。

## 開発・確認コマンド

- `python3 -m http.server 8123 --directory public`: `http://127.0.0.1:8123/index.html` でローカル確認。
- `npm install`: Cloudflare Pages 用の Wrangler をインストール。
- `npm run dev`: `public/` を Cloudflare Pages 相当の環境でプレビュー。
- `npm run deploy`: Cloudflare Pages へデプロイ。
- `npm run check:links`: HTML/CSS のローカル参照を確認。
- `npm run check:assets`: `public/assets/` 配下の未使用アセットを検出。
- `npm run check`: すべてのチェックを実行。
- `rg "検索語" public`: サイト内の文言・参照を検索。

ビルド工程はありません。Cloudflare Pages が `public/` をそのまま配信します。

テンプレートとして再利用する場合は、`package.json` の `name`、`config.cloudflare_project_name`、`wrangler.jsonc` の `name` を同じ案件名に更新してください。

## コーディング規約

HTML、CSS、JavaScriptは既存の書き方に合わせてください。HTML/CSSは既存と同じ2スペース寄りのインデントを維持し、クラス名は `site-header` や `glass-card` のような説明的な kebab-case を使います。日本語コピーは周辺の文体とトーンに合わせます。

相対パスは既存ルールを維持してください。ルートページは `assets/...`、`public/pages/*/` 配下のページは `../../assets/...` を使います。共通ナビゲーション、ブランド表記、フッターは `public/assets/js/site-chrome.js` が生成します。

## テスト方針

自動テストフレームワークはありません。変更後はローカル表示で対象ページを確認してください。見た目やナビゲーションを変更した場合は、`index.html`、ネストされたページ1つ、直接変更したページを確認します。レスポンシブ表示、リンク、画像、PDF、ブラウザコンソールエラーも確認してください。

HTML、CSS、JavaScript、アセット、パスを変更した場合は、引き渡し前に `npm run check` を実行してください。

## コミット・プルリクエスト

履歴では `feat: LUCIA HP V1・V2 初回コミット` のような簡潔な Conventional Commit 形式が使われています。`feat:`, `fix:`, `docs:`, `chore:` などの `type: summary` 形式を継続してください。

プルリクエストには、変更概要、影響するページやアセット、ローカル確認手順を記載してください。見た目が変わる場合はスクリーンショットも添付します。関連Issueや依頼がある場合はリンクしてください。

## セキュリティ・設定

秘密情報、Cloudflare APIトークン、未公開の顧客情報はコミットしないでください。住所、電話番号、料金、スタッフ名、実績値は公開前に必ず実データとして確認してください。

Cloudflare Pages の仕様確認が必要な場合は、まず以下を参照してください。

- https://developers.cloudflare.com/pages/
- https://developers.cloudflare.com/pages/configuration/headers/
- https://developers.cloudflare.com/pages/configuration/redirects/
- https://developers.cloudflare.com/workers/wrangler/
