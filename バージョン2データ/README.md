# Lucia Eyelash Salon — Webサイト

リファレンス見本（`assets/images/reference/`）を基に、HTML/CSS で再現したコーポレートサイトです。

## 公開URL（確認用）
- https://lucia-hp.web.app （Firebase: `hp-kakuninyou` / site `lucia-hp`）
- デプロイ手順・固定情報は `cloud.md` を参照。

## ページ一覧（全14ページ）
ホーム / サロン紹介 / メニュー・料金 / 施術事例 / スタッフ / ご予約・来店案内 /
スクール / サロン運営の仕組み / アクセス / お問い合わせ /
AI・Lark・公式LINE活用 / 同業者向け相談 / Lash Cycle Pro / プライバシーポリシー

## 構成（重要）
- **見本のフルページ画像（`assets/images/reference/`）はサイトには使用していません**（照合用のみ）。
- 写真は `assets/images/crops/`（セクション別に切り出した素材）、アイコンは inline SVG を使用。
- テキストが焼き込まれた素材（コース名・フロー帯など）は HTML で再構築しています。

## 編集とビルド
HTML は `build/` 内の Node 生成器でまとめて生成しています（共通ヘッダー/フッター/ヘッドを一元管理）。

```bash
# ページ内容を編集
build/pages.mjs      # home, about, menu, works, staff
build/pages2.mjs     # reservation, school, management, access, contact, ai-tools, consulting, lash-cycle-pro, privacy
build/layout.mjs     # 共通head/header/footer/アイコン/ヘルパー

# 再生成（リポジトリ直下で）
node build/build.mjs
```
- 共通スタイル: `assets/css/styles.css`
- 共通スクリプト（年号・モバイルメニュー・施術事例フィルタ）: `assets/js/main.js`
- `build/` は開発用でデプロイ対象外（`firebase.json` の `ignore`）。

## ローカル確認
```bash
python3 -m http.server 8123   # → http://127.0.0.1:8123/index.html
```
※ 見出しの明朝体・「Lucia」ロゴは Google Fonts（Shippori Mincho / Cormorant Garamond / Noto Sans JP）を読み込むため、オンライン環境で確認してください。

## デプロイ
```bash
firebase deploy --only hosting:lucia-hp --project hp-kakuninyou
```
`firebase deploy` 単体は禁止（部門CLAUDE.md §6）。必ず `--only hosting:lucia-hp --project hp-kakuninyou` を明示。

## 補足
- 住所・電話番号・料金・実績値・スタッフ名はデザイン見本上の仮情報を含みます。公開前に実データへ差し替えてください。
