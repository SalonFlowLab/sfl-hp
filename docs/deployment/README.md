# Cloudflare Pages デプロイメモ

このプロジェクトは、Cloudflare Pages に静的サイトとしてデプロイします。

## Cloudflare Pages 設定

- Framework preset: `None`
- Build command: 空欄
- Build output directory: `public`
- Cloudflare Pages project name: `lucia-eyelash-salon`
- Wrangler config: `wrangler.jsonc`

## コマンド

```bash
npm install
npm run dev
npm run deploy
```

`npm run dev` は Cloudflare Pages のローカルプレビューを起動します。`npm run deploy` は `package.json` の `config.cloudflare_project_name` に設定されたプロジェクトへ `public/` をアップロードします。

新しいサイトで使う場合は、初回デプロイ前に `package.json` の `config.cloudflare_project_name` と `wrangler.jsonc` の `name` を同じプロジェクト名に変更してください。

## 参考リンク

- https://developers.cloudflare.com/pages/
- https://developers.cloudflare.com/pages/get-started/
- https://developers.cloudflare.com/pages/functions/wrangler-configuration/
- https://developers.cloudflare.com/pages/configuration/headers/
- https://developers.cloudflare.com/pages/configuration/redirects/
- https://developers.cloudflare.com/workers/wrangler/
