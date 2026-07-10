# Blog MVP Plan

## Purpose

SFLサイトにブログ（サイト上の表記は「コラム」）機能を追加するためのMVP計画です。初期開発では、運用しやすさ、SEO、実装量のバランスを優先します。

既存のコラム準備ページと公開済みURLを引き継ぎ、正規URLは `/knowledge/` とします。新たに `/blog/` や `/pages/blog/` は作成しません。

## Recommended Architecture

MVPでは、Lark Baseを記事管理画面として使い、サイト側は静的HTMLを生成して配信します。

```text
Lark Base
  Article fields and publishing status

Generation script
  Fetch and validate all records
  Convert Markdown to safe HTML
  Generate the index and article HTML in a staging directory
  Generate sitemap entries
  Replace public/knowledge/ and public/sitemap.xml only after success

Git / Cloudflare Pages
  Commit generated files and serve public/ as static files
```

独自の管理者ページは初期開発しません。投稿、編集、公開ステータス管理はLark Baseで行います。Cloudflare Pages上での自動生成はMVPに含めず、生成済みHTMLをGit管理します。

## Public URL and Output

| Content | Public URL | Output path |
|---|---|---|
| コラム一覧 | `/knowledge/` | `public/knowledge/index.html` |
| 記事詳細 | `/knowledge/{slug}/` | `public/knowledge/{slug}/index.html` |

- 既存の `public/knowledge/index.html` は生成された一覧ページで置き換えます。
- canonical、OGP、sitemapには `https://salonflowlab.com/knowledge/...` を使います。
- 共通アセットは階層に依存しない `/assets/...` のサイトルート相対パスで参照します。
- `/pages/...` は旧URLからのリダイレクト専用とし、記事HTMLを配置しません。
- `public/knowledge/` は生成スクリプトだけが管理するディレクトリとし、手編集しません。

## Lark Base Schema

Lark Baseには次のフィールドを作成します。フィールド名と型は生成スクリプト側でも固定し、想定外の型や値を検出した場合は生成を失敗させます。

| Field | Lark field type | Required | Rules |
|---|---|---:|---|
| `title` | Text | Yes | 前後の空白を除去後、空文字不可 |
| `slug` | Text | Yes | `^[a-z0-9]+(?:-[a-z0-9]+)*$`、全記事で一意 |
| `status` | Single select | Yes | `draft` または `published` |
| `published_at` | Date and time | Published only | Asia/Tokyoとして扱う |
| `updated_at` | Last modified time | Yes | Lark Baseの最終更新日時を使用 |
| `category` | Single select | Yes | MVPでは記事上に表示するだけで、カテゴリ一覧は生成しない |
| `tags` | Multiple select | No | MVPでは記事上に表示するだけで、タグ一覧は生成しない |
| `excerpt` | Text | Yes | 一覧文とmeta descriptionに使用 |
| `body_markdown` | Text | Yes | 許可したMarkdown記法だけをHTML化 |
| `og_image` | URL or Text | No | HTTPS URLまたは`/assets/...`。未指定時は既定画像を使用 |

補足ルール:

- LarkのレコードIDを記事の内部識別子として使用します。
- 公開後のslug変更は禁止します。変更が必要な場合は、旧URLからの301リダイレクトを同じ変更で追加します。
- `status = published` かつ `published_at` が生成時刻以前の記事だけを公開します。未来日の記事は次回生成まで公開されません。
- 日付の表示とsitemapの `lastmod` はAsia/Tokyoを基準にし、HTMLの機械可読値はISO 8601で出力します。
- `og_image` がローカルパスの場合、対象ファイルの存在を生成時に確認し、OGPには本番ドメインを付けた絶対URLを出力します。
- Lark Baseの添付画像をダウンロードして配置する処理と、本文画像のアップロード機能はMVPに含めません。

## MVP Scope

- コラム一覧ページ
- 記事詳細ページ
- カテゴリ、タグの表示
- 公開、下書き、未来日公開の判定
- 投稿日、更新日
- 記事概要文
- OGP画像、meta description、canonical
- Lark Baseから全記事データを取得する生成スクリプト
- Markdownから安全なHTMLへの変換
- 生成物の同期削除
- `public/sitemap.xml` のコラムURL更新
- ローカル参照チェックに通るHTML出力
- 生成処理の自動テスト
- 運用手順のREADME追記

## Out of Scope for MVP

- 独自管理者ページ
- ログイン、権限管理
- リッチテキストエディタ
- サイト上での記事投稿、編集
- コメント機能
- 検索機能
- 人気記事ランキング
- 関連記事の自動推薦
- アクセス解析と記事データの連動
- Lark Docs、Lark Wiki本文の高度なHTML変換
- カテゴリ、タグ別の一覧ページ
- 一覧ページのページネーション
- Lark Base添付画像の自動取り込み
- Cloudflare Pages上での自動生成、デプロイ連携

## Markdown and HTML Safety

Markdown変換には保守されているライブラリを使い、次を満たす設定またはサニタイズ処理を必須とします。

- Markdown内の生HTMLは無効化または除去します。
- `script`、`style`、`iframe`、イベントハンドラ属性を出力しません。
- リンク先は `https:`、`http:`、サイトルート相対パスを許可し、`javascript:` などの危険なURLスキームを拒否します。
- 画像の参照先は `https:` または存在確認済みのサイトルート相対パスだけを許可します。HTTPSの本番ページでmixed contentになるため、画像の `http:` URLは生成エラーにします。
- `title`、`excerpt`、カテゴリ、タグなど、本文以外の値もHTMLと属性値に応じてエスケープします。
- 外部リンクには `rel="noopener noreferrer"` を付与します。
- 見出し、段落、リスト、引用、強調、リンク、画像、コード、コードブロックをMVPで許可する基本記法とします。
- Markdown変換後の見出し階層が、ページの`h1`と矛盾しないようにします。記事タイトルだけを`h1`とし、本文は`h2`以下にします。

## Generation Lifecycle

生成処理は既存の公開物を壊さないよう、候補となる `public/` ツリー全体を事前検証してから、バックアップ付きで昇格します。一時ツリー、現行ツリー、バックアップは、ディレクトリのrenameを利用できる同一ファイルシステム上に配置します。

1. 前回の中断を示すトランザクション記録またはバックアップがあれば、現行 `public/` の整合性を確認し、必要に応じてバックアップを復元してから開始します。
2. Lark APIのページネーションを処理して全レコードを取得します。
3. 必須項目、型、status、日付、slug、slug重複、予約語を検証します。
4. 現在の `public/` を元に候補ツリーを作り、その中の `knowledge/` と `sitemap.xml` を新しい生成物へ置き換えます。
5. 候補ツリーに対してリンク、ローカル画像、必須SEOタグ、同期削除を検証します。
6. `npm run check` 相当の検査を候補ツリーを対象に実行します。検査スクリプトは検査対象のpublicルートを指定できるようにし、現行ツリーを昇格前に変更しません。
7. すべて成功したらトランザクション記録を作成し、現行 `public/` をバックアップ名へrenameした後、候補ツリーを `public/` へrenameします。
8. 昇格後に整合性確認と `git diff --check` を実行します。どちらかのrenameまたはいずれかの確認が失敗した場合は、候補ツリーを退避し、バックアップを `public/` へ戻してからエラー終了します。
9. 昇格後のすべての確認が成功した場合だけ、バックアップとトランザクション記録を削除します。

同期ルール:

- draftへ戻した記事、削除した記事、slugを変更した記事の古いHTMLは、ディレクトリ置換によって削除します。
- Lark APIエラー、変換エラー、検証エラー、昇格エラーが発生した場合は、処理開始前と同じ `public/` を維持またはバックアップから復元します。
- 生成途中のファイルはGit管理対象外の一時ディレクトリに置きます。
- プロセス強制終了などで昇格が中断しても、バックアップとトランザクション記録を残し、次回実行時に処理開始前の状態へ復旧できるようにします。
- 同じ入力で連続実行した場合に差分が出ない、決定的な出力にします。
- sitemap内のブログURLは追記ではなく同期し、古いURLを残しません。ブログ以外の既存URLは維持します。

## SEO Output Requirements

一覧ページと記事ページには、内容に応じて次を出力します。

- 一意な `<title>`
- meta description
- canonical
- `og:title`、`og:description`、`og:url`、`og:image`
- `og:type`。一覧は `website`、記事は `article`
- Twitter Card
- 記事の `article:published_time`、`article:modified_time`
- 記事の公開日、更新日の機械可読な `datetime`
- sitemapの公開URLと `lastmod`

公開ページには `index, follow` を適用します。draftと未来日の記事はHTML自体を生成せず、sitemapにも含めません。Article構造化データは実装時に工数と検証方法を確認し、対応する場合は記事HTMLの値と一致させます。

## Publishing Workflow

MVPでは手動生成・Gitデプロイを採用します。

1. 編集者がLark Baseで記事を作成し、まず `draft` で保存します。
2. ローカル環境で `npm run generate:blog` を実行します。
3. `npm run check`、`git diff --check`、ローカル表示確認を行います。
4. 公開内容と生成・削除差分をレビューします。
5. 問題がなければ生成ファイルをcommitし、通常のCloudflare Pagesデプロイ手順で公開します。

生成スクリプト用の認証情報:

- `LARK_APP_ID`
- `LARK_APP_SECRET`
- `LARK_BLOG_BASE_APP_TOKEN`
- `LARK_BLOG_TABLE_ID`
- 必要な場合のみ `LARK_API_BASE_URL`。未指定時は `https://open.larksuite.com`

秘密情報は環境変数またはGit管理外のローカル設定で渡し、ソース、生成HTML、READMEへ値を記録しません。Larkアプリには対象Baseの読み取りに必要な最小権限だけを付与します。

## Estimated Effort

余裕込みの概算です。Lark Base添付画像の自動取り込みと自動デプロイは含みません。

| Work item | Estimate |
|---|---:|
| Lark Base設計 | 1.0 day |
| Lark API取得、ページネーション、検証 | 1.5-2.0 days |
| Markdown変換、サニタイズ | 1.0-1.5 days |
| HTML生成、同期削除、失敗時保護 | 2.0 days |
| コラム一覧、記事詳細テンプレート | 2.0 days |
| SEO、OGP、sitemap対応 | 1.0 day |
| 自動テスト、ローカル確認、修正 | 1.5 days |
| 運用手順、README更新 | 0.5 day |
| Buffer | 1.0-2.5 days |

Total: 11.5-14.0 days

## Implementation Notes

- 生成スクリプトはNode.jsで実装し、`npm run generate:blog` から実行できるようにします。
- 共通ヘッダー、フッターは既存の `public/assets/js/site-chrome.js` を使います。
- ブログ用スタイルは既存の `public/assets/css/sfl.css` に追加し、既存デザインとレスポンシブ方針に合わせます。
- 一覧は公開日の降順、同日時の場合はslugの昇順とし、出力順を決定的にします。
- ページネーションはMVP対象外です。記事数増加時の導入目安は、初期運用後に表示速度と記事数を見て決定します。
- 予約slugとして `assets`、`api`、`pages`、`knowledge`、`index.html` など、サイト構成や生成処理と衝突する値を拒否します。
- Markdown変換ライブラリとサニタイズライブラリは、実装時点で保守状況とライセンスを確認して選定します。

## Verification and Acceptance Criteria

### Automated verification

- `npm run check`
- `git diff --check`
- 生成スクリプトのテスト
- 同一入力で2回生成しても2回目に差分が出ない
- draft、削除、slug変更のテストで古い記事HTMLとsitemap URLが残らない
- 不正slug、slug重複、必須項目不足、不正日付で安全に失敗する
- HTML特殊文字を含む各フィールドが正しくエスケープされる
- 危険なHTML、属性、URLスキームが出力されない
- `http:` の本文画像とOGP画像が生成エラーになる
- Lark API失敗時に既存公開ファイルが変更されない
- 候補ツリーの検証失敗、2段階のrename失敗、昇格後の整合性確認または `git diff --check` の失敗で、処理開始前の `public/` が復元される
- 昇格途中で終了した状態を再現し、次回実行時にバックアップから復旧できる
- canonical、OGP、sitemapのURLが一致する
- ローカル指定のOGP画像が実在する

### Browser verification

- コラム一覧ページ
- 記事詳細ページ
- ホーム
- 既存のネストページ1つ
- デスクトップ、タブレット、モバイル幅
- ヘッダー、ドロワー、フッター、CTA、記事内リンク
- 画像、長いタイトル、長いURL、コードブロック、表がある場合の横幅
- キーボード操作とフォーカス表示
- ブラウザコンソールエラー
- canonical、OGP、構造化データを実装した場合はその検証結果
- 生成後の `public/sitemap.xml`

## Future Enhancements

- 独自管理者ページ
- Lark Docs本文取り込み
- 画像アップロード運用の整備
- 関連記事
- 検索
- RSS
- タグ、カテゴリ別一覧
- 一覧ページのページネーション
- Cloudflare Pagesでの自動生成、デプロイ連携
