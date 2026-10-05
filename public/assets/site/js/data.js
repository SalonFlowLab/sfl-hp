/* 合同会社SFL サイト共通データ（単一ソース）
   ナビ・フッター・事業カード・講座カード・実績カード・相談フロー図はここを参照して描画する。
   文言を変えるときはここだけ直せば、トップ・サービス・会社・事例・問い合わせの全ページに反映される。
   ※ <head> の JSON-LD は静的なので、事業名・講座名・会社情報を変えたら各ページの JSON-LD も同時に直す。 */
(() => {
  const urls = {
    line: 'https://lin.ee/NrJGMVt',
    contactForm: 'https://bjp66vk3my8x.jp.larksuite.com/share/base/form/shrjpRix2tACyaiGsWFkjy98FYk',
    note: 'https://note.com/sfl_lark_dx_ai',
    larkRegister: 'https://www.larksuite.com/global/register?app_id=1001&lang=ja-JP&lead_page=plans__ssg_ja_jp&lead_platform=website&lead_position=nav&redirect_uri=https%3A%2F%2Fwww.larksuite.com%2Fgetstarted%3Fdisable_cross_redirect%3Dtrue&registration_process=global_register',
    larkCourse: 'https://dandeproject.com/lark/sfl/lp/',
    larkOfficial: 'https://www.larksuite.com/ja_jp/',
    // 講座の申込・説明会フォーム（Lark Base）。旧ChatGPTサイトの内容はサイト内ページ（/ai-course/ など）へ移設済み
    aiCourseApply: 'https://becomerich.jp.larksuite.com/share/base/form/shrjp7Lv52QkW28LOi8gQyhXekg?prefill_%E8%AC%9B%E5%BA%A7=AI%E5%B0%8E%E5%85%A5%E8%AC%9B%E5%BA%A7&hide_%E8%AC%9B%E5%BA%A7=1&hide_%E9%80%81%E4%BF%A1%E6%97%A5%E6%99%82=1&from=navigation',
    aiCourseBriefing: 'https://becomerich.jp.larksuite.com/share/base/form/shrjpPw3TOhNOfv4LgFiO4rKiGe?prefill_%E8%AA%AC%E6%98%8E%E4%BC%9A%E7%A8%AE%E5%88%A5=AI%E5%B0%8E%E5%85%A5%E8%AC%9B%E5%BA%A7&hide_%E8%AA%AC%E6%98%8E%E4%BC%9A%E7%A8%AE%E5%88%A5=1&from=navigation',
    procurementApply: 'https://becomerich.jp.larksuite.com/share/base/form/shrjpsdH9uV4HtO0KkMp9YnD46e?from=navigation',
    procurementBriefing: 'https://becomerich.jp.larksuite.com/share/base/form/shrjpUGpZAHOf9CHcvfZqbmj1zh?prefill_%E8%AA%AC%E6%98%8E%E4%BC%9A%E7%A8%AE%E5%88%A5=%E5%AE%98%E5%85%AC%E5%BA%81%E5%85%A5%E6%9C%AD%E8%AC%9B%E5%BA%A7&hide_%E8%AA%AC%E6%98%8E%E4%BC%9A%E7%A8%AE%E5%88%A5=1&from=navigation',
    academyMail: 'mailto:info@salonflowlab.com?subject=SFL%20Academy%E5%8D%92%E6%A5%AD%E7%94%9F%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%83%86%E3%82%A3%E3%81%AE%E7%9B%B8%E8%AB%87',
    supportDeskMail: 'mailto:info@salonflowlab.com?subject=SFL%20Lark%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%83%87%E3%82%B9%E3%82%AF%E5%88%A9%E7%94%A8%E7%9B%B8%E8%AB%87&body=SFL%20Lark%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%83%87%E3%82%B9%E3%82%AF%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E7%9B%B8%E8%AB%87%E3%82%92%E5%B8%8C%E6%9C%9B%E3%81%97%E3%81%BE%E3%81%99%E3%80%82',
    luciaSite: 'https://eyelash-salon-lucia.lucia20200524.chatgpt.site/#top',
    uniqs: 'https://www.uniq-s.co.jp/'
  };

  const company = {
    name: '合同会社SFL',
    representative: '大城 未緒',
    representativeTitle: '代表社員',
    postal: '〒651-0084',
    address: '兵庫県神戸市中央区磯辺通1丁目1番18号 カサベラ国際プラザビル707号室',
    area: '神戸市中央区 / 全国オンライン',
    corporateNumber: '8140003023662'
  };

  const nav = [
    { href: '/services/', label: '事業・サービス', key: 'services' },
    { href: '/services/#corporate-training', label: '法人研修', key: 'training' },
    { href: '/courses/', label: '個人向け講座', key: 'courses' },
    { href: '/case-study/', label: '実績・事例', key: 'case-study' },
    { href: '/company/', label: '会社案内', key: 'company' },
    { href: '/instructors/', label: '講師・支援体制', key: 'instructors' }
  ];

  // 講座・研修: 法人向け → 個人向けの順（仕様書 09）。個人向けは /courses/ の各講座の説明へリンクする
  const courses = [
    {
      id: 'lark-dx-training', group: 'corporate', topic: 'Lark', name: 'SFL DX(Lark)研修',
      description: '法人向けリスキリングのLark研修。自社業務を題材に、Lark・Baseによる業務改善と仕組みづくりを実践します。',
      href: '/lark-training/', action: '研修の内容・料金を見る'
    },
    {
      id: 'ai-training', group: 'corporate', topic: 'AI', name: 'SFL AI研修',
      description: '調査・資料作成・業務改善からWebアプリ制作まで、自社業務での生成AI活用を学びます。',
      href: '/ai-dx-training/', action: '研修のカリキュラムを見る'
    },
    {
      id: 'lark-intro', group: 'individual', topic: 'Lark', name: 'SFL Lark導入講座',
      description: '基本操作からBaseの設計・構築まで、仕事で使うLarkのスキルを学びます。',
      href: '/courses/#lark-intro', action: '講座の内容・料金を見る'
    },
    {
      id: 'ai-course', group: 'individual', topic: 'AI', name: 'SFL AI導入講座',
      description: 'AI・プログラミング初心者向け。ChatGPTでWebアプリをつくる体験編（4時間）から、希望者はCodexで保存機能の実装・公開まで学ぶ仕事編（6時間）へ進めます。',
      href: '/ai-course/', action: '講座の内容・料金を見る'
    },
    {
      id: 'public-procurement-course', group: 'individual', topic: '官公庁入札', name: 'SFL 官公庁入札講座',
      description: '国の仕事（官公庁案件）の探し方・条件確認・見積もりを、未経験から90分×全5コマで学ぶオンライン講座です。',
      href: '/public-procurement-course/', action: '講座の内容・料金を見る'
    }
  ];


  // 導入・研修・取引実績（トップ・事例・会社の3ページで共通）
  const records = [
    { id: 'hair-salon', category: '導入・研修・伴走支援', title: 'ヘアーサロン（静岡県）', result: '5店舗に導入', description: '静岡県のヘアーサロン5店舗で、Cycle Proの導入、Lark（DX）研修、伴走支援の実績があります。' },
    { id: 'real-estate', category: '企業向けAI研修', title: '不動産業界（広島県）', result: '現在実施中', description: '広島県の不動産業界で、企業向けのAI研修を実施しています。' },
    { id: 'online-assistant', category: '企業向けLark研修', title: 'オンライン秘書事業の企業', result: 'Lark研修 提供済', description: 'オンライン秘書事業を行う企業に、Lark研修を提供しました。' },
    { id: 'public-procurement', category: '官公庁入札・取引', title: '官公庁入札・取引', result: '陸上自衛隊 等', description: '陸上自衛隊等に関する官公庁入札・取引の実績があります。' }
  ];

  // 相談フロー（仕様書 06）: 主フロー ①→② ＋ 希望者のみの分岐
  const flow = {
    main: [
      { step: 'STEP 01', title: '無料相談', meta: '60分・無料', text: '現在の業務やお困りごと、実現したいことを伺います。利用するサービスをこの段階で決める必要はありません。' },
      { step: 'STEP 02', title: 'ご提案・お見積もり', meta: 'ご契約は任意', text: '伺った課題に合わせて教育・構築・伴走などをご提案し、内容・支援範囲・費用をお見積もりします。' }
    ],
    branch: {
      tag: '希望者のみ・有料',
      title: '業務整理・フロー図作成',
      text: '現在の業務を詳しくヒアリングし、フロー図にまとめます。終わったらご提案へ進むことも、業務整理だけで終えることもできます。'
    }
  };

  window.SFL = { urls, company, nav, courses, records, flow };
})();
