# Cloudflare Pages デプロイメモ

- Cloudflare Pages project name: `sfl-hp`
- Framework preset: `None`
- Build command: 空
- Build output directory: `public`

## 環境変数

必須の環境変数はありません。旧・資料請求フォームAPI用の `RESEND_API_KEY` `CONTACT_FROM_EMAIL` `CONTACT_TO_EMAIL` `LARK_CONTACT_WEBHOOK_URL` などは、2026-09 のリニューアルでAPIを廃止したため不要です（Cloudflare 側から削除してよい）。

## 内部向け集約ページ

`/internal/` は `functions/internal/_middleware.js` により、プレビューURL（`<branch>.sfl-hp.pages.dev`）とローカルだけで表示されます。本番ドメインと `sfl-hp.pages.dev` では 404 です。本番デプロイにも固有のハッシュURLが発行され、そこでは表示される点に注意してください（noindex・no-store）。

CLIでデプロイする場合:

```bash
npm run deploy
```
