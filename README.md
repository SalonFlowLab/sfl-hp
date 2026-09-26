# 合同会社SFL — コーポレートサイト

合同会社SFLのコーポレートサイト（Lark・AI・官公庁入札の3事業）です。HTML/CSS/JavaScriptのみで構成し、Cloudflare Pagesで `public/` をそのまま配信します。2026-09 に美容サロン向け構成から会社案内へリニューアルしました（仕様: Lark文書「SFLコーポレートHP｜公開前の修正・調整箇所」）。

## 公開先

- 本番想定ドメイン: `https://salonflowlab.com`（新ドメインが決まったら canonical・OG・JSON-LD・sitemap・robots を一括置換）
- GitHubリポジトリ: `https://github.com/SalonFlowLab/sfl-hp`
- 内部向け集約ページ: プレビュー環境の `/internal/`（本番では 404）

## 構成

- `public/assets/site/css/site.css`: 新サイト共通スタイル（デザイントークン・部品）。
- `public/assets/site/js/data.js`: 共通データの単一ソース（URL・会社情報・ナビ・3事業・講座・実績・相談フロー）。
- `public/assets/site/js/site.js`: ヘッダー／ドロワー／フッター、事業・講座・実績カード、相談フロー図の描画、スクロール時の登場アニメーション、計測イベント。
- `public/assets/site/js/reskilling-simulator.js`: 人材開発支援助成金の費用試算。
- `public/assets/site/img/`: 新サイトの画像。
- `public/404.html`: 存在しないURLで返す404ページ（無いと Cloudflare Pages がトップを200で返してしまう）。
- `public/_redirects`: 旧URL（廃止した美容向けページ・旧 `/pages/*`）の301転送。
- `public/internal/index.html` + `functions/internal/_middleware.js`: プレビュー限定の内部資料ページ。
- `scripts/check-local-refs.mjs`: HTML/CSS/`assets/site/js` のサイト内リンク・画像・ページ間アンカー検査。
- `scripts/check-unused-assets.mjs`: 未使用アセット検出。

## ページ

| ページ | パス |
|---|---|
| トップ | `/` |
| 事業・サービス（3事業・講座研修・サービス一覧） | `/services/` |
| 法人向けLark・DX研修 | `/lark-dx/` |
| 個人向け講座（Lark・AI・官公庁入札・SFL Academy） | `/courses/` |
| 法人向け生成AI研修 | `/ai-dx-training/` |
| Claude Code・Codex×Lark 初期設定支援 | `/ai-setup/` |
| 人材開発支援助成金の費用試算 | `/reskilling-subsidy-simulator/` |
| 実績・事例 | `/case-study/` |
| 会社案内・代表メッセージ | `/company/` |
| 講師・支援チーム | `/instructors/` |
| 60分無料相談・お問い合わせ | `/contact/` |
| 支援・契約・データ取扱いガイド | `/support-policy/` |
| 情報セキュリティ基本方針 | `/information-security-policy/` |
| プライバシーポリシー | `/privacy/` |

### 廃止したページ

美容向けの旧ページ（`/salon-flow-one/` `/lark-flow-one/` `/ai-flow-one/` `/cycle-pro/` `/faq/` `/download/` `/knowledge/`）は 2026-09-26 に廃止し、`public/_redirects` で内容の近い新ページへ301転送しています。旧ページ・旧資産・資料請求フォームAPI（`functions/api/contact.js`）は git 履歴から参照できます。

## 文言・データの変更

- 事業名・概要、講座（名称・開始時期・募集期）、実績、相談フロー、外部URL、会社情報は `public/assets/site/js/data.js` だけを直せば全ページに反映されます。
- `<head>` の JSON-LD は静的です。会社情報・FAQ・講座名を変えたら該当ページの JSON-LD も直します（FAQ はトップ本文と一致させる）。
- 料金は `/services/` `/lark-dx/` `/ai-setup/` `/support-policy/` などの本文に直接書いています。変更時は `/internal/` の「料金・時間の掲載箇所」を見て全箇所を揃えます。

## デザイン・CTA方針

- ブランドカラー: `#F8F5EF`, `#103A71`, `#C99A1A`, `#E7D3A0`, `#1E88E5`, `#333333`。フッターは中間の青 `#1A5796`。
- 主CTAは「60分無料相談」（`/contact/`）。窓口は個人事業主・フリーランス＝公式LINE、法人＝Larkのお問い合わせフォーム（別タブ）、個人向け講座＝`/courses/#entry` から各講座の案内ページ。
- 開閉は追加説明だけ。概要・実績・会社情報は常時表示。

## コマンド

```bash
npm install
npm run dev
npm run check:links
npm run check:assets
npm run check
npm run deploy
```

ローカル確認（静的サーバー）:

```bash
python3 -m http.server 8123 --directory public
# http://127.0.0.1:8123/index.html
```

`npm run dev` は Wrangler による Cloudflare Pages 相当のプレビューです。`/services/` などのclean URL、redirect、`/internal/` のプレビュー限定配信の確認にはこちらを使います。

Cloudflare PagesのBuild output directoryは `public` です。

## Cloudflare Pages

- Project name: `sfl-hp`
- Framework preset: `None`
- Build command: 空
- Build output directory: `public`
- Production branch: `main`
- Functions: `functions/internal/_middleware.js` が `/internal/` をプレビュー環境とローカルだけで表示します。

詳しい手順は `docs/deployment/README.md` を参照してください。

## お問い合わせ

サイト内にフォームは置いていません。個人事業主・フリーランスは公式LINE、法人は Lark のお問い合わせフォーム（別タブ）、個人向け講座は各講座の案内ページへ案内します（URL は `data.js`）。旧フォームAPI用の Cloudflare 環境変数（`RESEND_API_KEY` など）は不要になりました。

## アクセス解析

全ページに GA4（Google Analytics 4）タグを設置しています（測定ID: `G-63J47P3D1P`）。

- **検索流入**: Google Search Consoleで計測。GA4とリンク済みの場合はGA4の「トラフィック獲得」レポートでも検索経由が分かります。
- **SNS等の流入**: GA4の「トラフィック獲得」レポートでリファラー・参照元/メディア別に確認できます。ただしSNSアプリ内ブラウザ（Instagram/X/Facebookアプリ内の埋め込みブラウザ等）はリファラーを送らないことが多く、`(direct)`扱いになりがちです。発信ごとに流入経路を正確に追いたい場合は、投稿リンクにUTMパラメータ（例: `?utm_source=instagram&utm_medium=social&utm_campaign=xxx`）を付けて運用してください。
- **クリック計測**: `public/assets/site/js/site.js` が、公式LINE（`line_button_click`）・Larkのお問い合わせフォーム（`contact_form_open`）・`/contact/` への遷移（`free_consultation_start`）のクリック時に GA4 イベントを送ります（リンク先のパスのみ送信）。
- **ローカル確認**: DevToolsのNetworkタブで `google-analytics.com/g/collect` へのリクエストとイベント名（`en=`）を確認できます。`gtag`はホスト名を見ずに送信するため、localhostでもGA4のリアルタイムレポート/DebugViewに反映されます（本番トラフィックと混ざるので、Chrome拡張「Google Analytics Debugger」で`debug_mode`を有効にしてDebugViewで見るとノイズを避けられます）。

## 確認ポイント

変更後は最低限、以下を確認します。

```bash
npm run check
git diff --check
```

見た目やナビゲーションを変更した場合は、ホーム・変更したページ・ネストされたページを1つずつブラウザで確認します。レスポンシブ表示（390px幅）、リンク、画像、コンソールエラーも見てください。

JS を変更した場合は、以下も確認します。

```bash
node --check public/assets/site/js/*.js
node --check functions/internal/_middleware.js
```

## テンプレートとして再利用する場合

`package.json` の `name`、`config.cloudflare_project_name`、`wrangler.jsonc` の `name` を同じ案件名に更新してください。公開前に住所・電話番号・料金・スタッフ名・実績値が実データか確認してください。
