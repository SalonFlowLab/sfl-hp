/**
 * SFL サービス定義（単一ソース）
 *
 * サービス追加・削除時はこのファイルのみ更新してください。
 * - ナビ・フッター: site-chrome.js
 * - お問い合わせ「興味を持ったサービス」: sfl-lead-form.js
 * - サービス一覧ハブ: pages/services/index.html にカードを追加
 * - 商品LP: pages/{slug}/index.html を新規作成
 * - sitemap.xml に URL を追加
 */
window.SFL_SERVICES = {
  catalog: [
    {
      slug: 'salon-flow-one',
      label: 'SALON FLOW ONE',
      summary: '美容サロン向け月額伴走サポート'
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
