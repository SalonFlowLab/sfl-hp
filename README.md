# SFL / SALON FLOW LAB. — Webサイト

合同会社SFL（SALON FLOW LAB.）の静的Webサイトです。HTML/CSS/JavaScriptのみで構成し、Cloudflare Pagesで `public/` をそのまま配信します。

## 公開先

- 本番想定ドメイン: `https://salonflowlab.com`
- GitHubリポジトリ: `https://github.com/SalonFlowLab/sfl-hp`

## 構成

- `public/index.html`: ルートのトップページ。
- `public/{slug}/index.html`: 下層ページの公開HTML。例: `public/services/index.html` は `/services/` で配信します。
- `public/assets/css/sfl.css`: SFL用の共通スタイル。
- `public/assets/js/site-chrome.js`: 共通ヘッダー、ドロワー、フッター生成。
- `public/assets/js/sfl-services-catalog.js`: サービス定義（ナビ・フォームの単一ソース）。
- `public/assets/js/sfl-lead-form.js`: お問い合わせ・資料ダウンロードフォームのマークアップ生成。
- `public/assets/js/contact-form.js`: フォーム送信・クライアント側バリデーション。
- `public/assets/js/sfl-wide-cta.js`: ページ下部の共通CTAブロック生成。
- `public/assets/js/sfl-motion.js`: ホームFVアニメーション・スクロールリビール。
- `public/assets/images/`, `public/assets/icons/`, `public/assets/pdf/`: 画像・アイコン・PDF。
- `public/_headers`: Cloudflare Pagesのセキュリティ・キャッシュヘッダー。
- `public/_redirects`: 旧URLからclean URLへの301リダイレクト。
- `public/robots.txt`, `public/sitemap.xml`: SEO用ファイル。
- `functions/api/contact.js`: Cloudflare Pages Functionsのフォーム受付API。
- `scripts/check-local-refs.mjs`: HTML/CSS内のローカル参照チェック。
- `scripts/check-unused-assets.mjs`: 未使用アセット検出。
- `docs/deployment/README.md`: Cloudflare Pagesデプロイメモ。
- `wrangler.jsonc`: Cloudflare Pages設定。
- `AGENTS.md`: リポジトリ作業ガイド（エージェント向け）。

ビルド工程はありません。静的ファイルを直接編集します。

## ページ

### メインナビ（ヘッダー）

| ページ | パス |
|---|---|
| ホーム | `/` |
| サービス | `/services/` |
| 導入事例 | `/case-study/` |
| 会社概要 | `/company/` |

### サービス・商品LP

| ページ | パス | 備考 |
|---|---|---|
| SALON FLOW ONE | `/salon-flow-one/` | 美容サロン向け月額伴走。Cycle Proを中核ツールとして内包。料金・FAQ・導入の流れを集約 |
| LARK FLOW ONE | `/lark-flow-one/` | Lark活用伴走支援 |
| AI FLOW ONE | `/ai-flow-one/` | 企業向けAI顧問 |
| Cycle Pro | `/cycle-pro/` | SALON FLOW ONEの中核ツール（買い切り初期構築）。サービス一覧ハブのカードではなく、SALON FLOW ONE・FAQからの導線でのみ案内 |

サービス定義の更新元は `public/assets/js/sfl-services-catalog.js` です。`catalog` は FLOW ONE 3商品のみで、サービス一覧ハブ（`public/services/index.html`）のカードもこの3枚。Cycle Proは `topicExtras` に定義され、お問い合わせフォームの選択肢としてのみ登場します。

### その他

| ページ | パス |
|---|---|
| よくある質問 | `/faq/` |
| お問い合わせ | `/contact/` |
| 資料ダウンロード | `/download/` |

`sitemap.xml` に載せる公開対象は上記です。

### URLリダイレクト（`public/_redirects`）

| 旧パス | 転送先 |
|---|---|
| `/pages/home/` | `/` |
| `/pages/services/` | `/services/` |
| `/pages/features/` | `/cycle-pro/#features` |
| `/pages/lark/` | `/lark-flow-one/` |
| `/pages/flow/` | `/salon-flow-one/#flow` |
| `/pages/pricing/` | `/salon-flow-one/#pricing` |

`/services/` などのclean URLは、`public/services/index.html` のように公開パスと同じディレクトリで配信します。`/pages/...` は公開正規URLではなく、旧URLからの301転送だけに使い、HTMLファイルは置きません。

## サービス追加・変更

新しい FLOW ONE 系サービスを増やす場合は、少なくとも以下を更新します。

1. `public/assets/js/sfl-services-catalog.js` — サービス定義
2. `public/services/index.html` — サービス一覧カード
3. `public/{slug}/index.html` — 商品LPの新規作成
4. `public/sitemap.xml` — 公開URLの追加

ナビ・フッター・お問い合わせの「興味を持ったサービス」は `sfl-services-catalog.js` を参照するため、通常は同ファイルの更新だけで連動します。

## デザイン・CTA方針

- ベースカラーはブランドガイド準拠: `#F8F5EF`, `#103A71`, `#C99A1A`, `#E7D3A0`, `#1E88E5`, `#333333`。
- CTAは「お問い合わせ」と「資料ダウンロード」に統一しています。
- 公式LINEへの直接誘導CTAは使いません。ホームFVの「公式LINEと連携可能」バッジは連携訴求の表示であり、外部LINEへの遷移リンクではありません。
- 共通ヘッダー・フッター・ドロワーは `site-chrome.js` で生成します。
- ホームFVの右ビジュアルは実写真1枚（`public/assets/images/hero-salon-devices.jpg`）です。CSSで組んだダッシュボードのモックではなく、`sfl.css` の `.sfl-hero-photo img` で `mask-image` により縁をクリーム背景へ溶け込ませています。差し替える場合は同じ比率でクロップし、ファイル名を変えるなら `sfl.css` 側の参照も更新してください。

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

`npm run dev` は Wrangler による Cloudflare Pages 相当のプレビューです。`/services/` などのclean URL、redirect、フォームAPIの動作確認にはこちらを使います。

Cloudflare PagesのBuild output directoryは `public` です。

## Cloudflare Pages

- Project name: `sfl-hp`
- Framework preset: `None`
- Build command: 空
- Build output directory: `public`
- Production branch: `main`
- Functions API: `functions/api/contact.js` が `/api/contact` として動作します。

詳しい手順は `docs/deployment/README.md` を参照してください。

## フォーム送信

お問い合わせと資料ダウンロードは `/api/contact` へ送信します。送信内容はメール送信し、Lark webhookが設定されている場合はLarkチャットにも通知します。Larkアプリ認証情報が設定されている場合は、Lark Baseにもレコードを登録します。

フォーム項目:

- 会社名
- 氏名
- メールアドレス
- 電話番号
- 興味を持ったサービス
- お問い合わせ内容
- プライバシーポリシー同意

フロントエンドでは入力中にメールアドレスと電話番号の形式を検証し、各入力欄の直下にエラーメッセージを表示します。Cloudflare Pages Functions側でも同じ項目を送信時に検証します。スパム対策として `company_website` のハニーポット項目も送信対象に含めています。

Cloudflare Pagesの環境変数:

- `RESEND_API_KEY`: メール送信用のResend APIキー。
- `CONTACT_FROM_EMAIL`: 送信元メールアドレス。例: `SFL <noreply@salonflowlab.com>`。
- `CONTACT_TO_EMAIL`: 受信先メールアドレス。未設定時は `salonflowlab2603@gmail.com`。
- `LARK_CONTACT_WEBHOOK_URL`: Larkチャット通知用webhook URL。後から追加可能。
- `LARK_APP_ID`: Lark Base登録に使うLarkアプリのApp ID。
- `LARK_APP_SECRET`: Lark Base登録に使うLarkアプリのApp Secret。
- `LARK_BASE_APP_TOKEN`: 登録先BaseのApp Token。未設定時は `D1AibzS8jarDOAs4o05jmVtApVg`。
- `LARK_BASE_TABLE_ID`: 登録先テーブルID。未設定時は `tblAMGB9DW5hHD9r`。
- `LARK_API_BASE_URL`: Lark APIのベースURL。未設定時は `https://open.larksuite.com`。

`LARK_CONTACT_WEBHOOK_URL` とLark Base登録用の環境変数が未設定でもフォーム送信は継続します。`RESEND_API_KEY` と `CONTACT_FROM_EMAIL` はメール送信に必須です。

## 確認ポイント

変更後は最低限、以下を確認します。

```bash
npm run check
git diff --check
```

見た目やナビゲーションを変更した場合は、ホーム・変更したページ・ネストされたページを1つずつブラウザで確認します。レスポンシブ表示、リンク、画像、PDF、コンソールエラーも見てください。

フォーム周りを変更した場合は、以下も確認します。

```bash
node --check public/assets/js/contact-form.js
node --check public/assets/js/sfl-lead-form.js
node --check functions/api/contact.js
```

## テンプレートとして再利用する場合

`package.json` の `name`、`config.cloudflare_project_name`、`wrangler.jsonc` の `name` を同じ案件名に更新してください。公開前に住所・電話番号・料金・スタッフ名・実績値が実データか確認してください。
