/**
 * SFL サービス定義（単一ソース）
 *
 * サービス追加・削除時はこのファイルのみ更新してください。
 * - ナビ・フッター: site-chrome.js
 * - お問い合わせ「興味を持ったサービス」: sfl-lead-form.js
 * - サービス一覧ハブ: public/services/index.html にカードを追加
 * - 商品LP: public/{slug}/index.html を新規作成（公開URLは /{slug}/）
 * - sitemap.xml に URL を追加
 */
window.SFL_SERVICES = {
  catalog: [
    {
      slug: 'salon-flow-one',
      label: 'SALON FLOW ONE',
      summary: 'Cycle Proを中核にした美容サロンDX伴走支援'
    },
    {
      slug: 'lark-flow-one',
      label: 'LARK FLOW ONE',
      summary: 'Lark活用の業務改善伴走支援'
    },
    {
      slug: 'ai-flow-one',
      label: 'AI FLOW ONE',
      summary: '企業向けAI顧問プラン'
    }
  ],
  /** FLOW ONE 以外で問い合わせフォームに載せる選択肢（末尾に追加） */
  topicExtras: [
    'Cycle Pro',
    '研修・講座',
    'その他'
  ]
};
