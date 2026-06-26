import { I, SITE, sectionHead, heroCompact, ctaBand } from './layout.mjs';

const crop = (f) => `assets/images/crops/${f}`;
const iconCard = (icon, title, body) =>
  `<div class="icon-card"><div class="circle">${I[icon]}</div><h3>${title}</h3><p>${body}</p></div>`;
const step = (n, title, body) =>
  `<div class="step"><div class="badge">${n}</div><h3>${title}</h3><p>${body}</p></div>`;
const flowNode = (n, icon, title, body) =>
  `<div class="node"><div class="b">${I[icon]}<span class="n">${n}</span></div><h3>${title}</h3><p>${body}</p></div>`;
const feature = (icon, title, lead, items) =>
  `<div class="feature"><div class="ic">${I[icon]}</div><h3>${title}</h3>${lead ? `<p style="font-size:13px;color:var(--muted);margin-bottom:14px">${lead}</p>` : ''}<ul>${items.map((t) => `<li>${t}</li>`).join('')}</ul></div>`;

const PAGES2 = {};

/* ====================== FOR OWNERS ====================== */
PAGES2['for-owners.html'] = {
  active: 'for-owners',
  title: '開業・運営サポート',
  desc: 'Lucia が実践してきたサロン経営の仕組みを、スクール・システム・コンサルの3つの形でサロンオーナーの方にお届けします。',
  body: `
<section class="owners-hero">
<div class="inner">
<div class="accent-line"></div>
<span class="eyebrow-en">For Salon Owners</span>
<h1>Luciaの仕組みを、<br>あなたのサロンへ。</h1>
<p class="lead">技術だけでなく、集客・顧客管理・リピート設計まで——Lucia が実践してきたサロン経営の仕組みを、スクール・システム・個別サポートの3つの形でご提供します。</p>
</div>
</section>

<section class="section"><div class="container">
<div class="section-head"><span class="eyebrow-en">3 Ways to Start</span><span class="label">あなたのスタート地点に合わせて</span><p class="desc">学びたい段階・導入したい内容・今抱えている課題によって、最適なルートが異なります。</p></div>
<div class="owners-funnel">
<a class="owners-funnel__step" href="#school">
<h3>スクールで<br>学ぶ</h3>
<p>技術・接客・カウンセリング・サロン運営まで一貫して習得するトータルサポートスクール。これからアイリストを目指す方、独立・開業を準備している方に。</p>
<span class="owners-funnel__link">スクールを見る →</span>
<span class="owners-funnel__arrow"><svg viewBox="0 0 14 14" aria-hidden="true"><polyline points="5,3 9,7 5,11"/></svg></span>
</a>
<a class="owners-funnel__step" href="lash-cycle-pro.html">
<h3>システムを<br>導入する</h3>
<p>Lucia が実際に活用するサロン経営管理システム「Lush Cycle Pro」。顧客管理・売上分析・リピート設計を一元化し、すぐに現場で使い始められます。</p>
<span class="owners-funnel__link">Lush Cycle Pro を見る →</span>
<span class="owners-funnel__arrow"><svg viewBox="0 0 14 14" aria-hidden="true"><polyline points="5,3 9,7 5,11"/></svg></span>
</a>
<a class="owners-funnel__step" href="consulting.html">
<h3>個別相談で<br>伴走する</h3>
<p>「何から始めればいい？」「自分のサロンには何が必要？」——Lucia の実績を元に、あなたのサロンの課題を整理し、具体的な改善策をご提案します。</p>
<span class="owners-funnel__link">無料相談を申し込む →</span>
</a>
</div>
</div></section>

<section class="school-redesign" id="school">

<section class="sch-hero">
<div class="container">
<div class="sch-breadcrumb">ホーム ＞ 開業・運営サポート ＞ スクール</div>
<h2>Eyelash School</h2>
<p>美しい技術は、未来を変える。確かな技術と想いを大切に、現場で活躍するアイリストを育成するスクールです。</p>
</div>
</section>

<section class="sch-section">
<div class="container">
<div class="sch-concept-grid">
<div class="sch-photo-card"><img src="assets/images/school/concept-salon.webp" alt="Luciaサロン内観"></div>
<div class="sch-concept-copy">
<span class="sch-eyebrow">— Concept —</span>
<h3>技術を超えた価値を、<br>あなたの未来に。</h3>
<p>Lucia Eyelash School は、技術の習得だけでなく、想い・接客・カウンセリング・サロン運営までを一貫して学べるトータルサポートスクールです。</p>
<p>現場で求められる「実践力」と、お客様に寄り添う「心」を育て、あなたらしいアイリストとして輝く未来を応援します。</p>
</div>
</div>
<div class="sch-features" style="margin-top:48px">
<article class="sch-feature"><img src="assets/images/school/icon-badge.svg" alt=""><h3>実践力</h3><p>現場で即戦力となる実践的なカリキュラム。</p></article>
<article class="sch-feature"><img src="assets/images/school/icon-heart.svg" alt=""><h3>想いを大切に</h3><p>お客様に寄り添うホスピタリティを育みます。</p></article>
<article class="sch-feature"><img src="assets/images/school/icon-book.svg" alt=""><h3>少人数制</h3><p>一人ひとりに寄り添う少人数レッスン。</p></article>
<article class="sch-feature"><img src="assets/images/school/icon-sparkle.svg" alt=""><h3>サロン直営の学び</h3><p>サロンワークを想定した実践的な指導。</p></article>
</div>
</div>
</section>

<section class="sch-section sch-bg-pink">
<div class="container">
<div class="sch-program-wrap">
<div class="sch-program-hero">
<div class="sch-program-copy">
<span class="sch-eyebrow">School Program</span>
<h3>現場で活きる技術とサロン力を、一つのプログラムで。</h3>
<p>目指す未来やレベルに合わせて、必要なすべてを一つのカリキュラムに。実践的な技術とサロンワークの力を、トータルで身につけることができます。</p>
</div>
<img src="assets/images/school/program-training.webp" alt="実技指導">
</div>
<div class="sch-program-table">
<div class="sch-program-row"><div class="sch-program-label">対象</div><p>未経験の方 ／ 技術を見直したい方 ／ サロン就職・独立を目指す方</p></div>
<div class="sch-program-row"><div class="sch-program-label">学べる内容</div><p>基礎理論・衛生管理 ／ LUCIAで提供している施術メニューに合わせた技術研修 ／ LED施術を中心としたエクステ技術 ／ デザイン提案 ／ カウンセリング ／ 接客・サロンワーク ／ サロン運営の基礎</p></div>
<div class="sch-program-row"><div class="sch-program-label">受講スタイル</div><p>少人数 ／ 個別フォロー ／ スケジュール相談可</p></div>
<div class="sch-program-row"><div class="sch-program-label">サポート</div><p>独立相談 ／ 卒業後フォロー ／ 商材相談</p></div>
</div>
</div>
</div>
</section>

<section class="sch-section">
<div class="container">
<div class="sch-info-cards">
<article class="sch-info-card"><img class="sch-photo" src="assets/images/school/recommend-training.webp" alt="こんな方におすすめ"><h3>こんな方におすすめ</h3><ul><li>アイリストとしてデビューしたい</li><li>未経験から技術を身につけたい</li><li>サロン就職・独立を目指したい</li><li>スキルアップ・再就職したい</li></ul></article>
<article class="sch-info-card"><img class="sch-photo" src="assets/images/school/learn-tools.webp" alt="学べること"><h3>学べること</h3><ul><li>まつげエクステの基礎〜応用技術</li><li>カウンセリング・デザイン提案</li><li>衛生管理・安全な施術</li><li>サロンワーク・接客マナー</li></ul></article>
<article class="sch-info-card"><img class="sch-photo" src="assets/images/school/support-salon.webp" alt="受講後のサポート"><h3>受講後のサポート</h3><ul><li>就職・独立サポート</li><li>卒業後の技術フォロー</li><li>材料・商材の相談</li><li>最新技術の勉強会</li></ul></article>
</div>
</div>
</section>

<section class="sch-section" style="padding-top:40px">
<div class="container">
<div class="sch-section-title"><h3>ご相談から受講までの流れ</h3></div>
<div class="sch-flow">
<article class="sch-step"><img src="assets/images/school/icon-chat.svg" alt=""><small>STEP 01</small><h3>ご相談</h3><p>LINEでお気軽にご相談ください。</p></article>
<article class="sch-step"><img src="assets/images/school/icon-clipboard.svg" alt=""><small>STEP 02</small><h3>カウンセリング</h3><p>目標やご不安を伺い、最適なプランをご提案。</p></article>
<article class="sch-step"><img src="assets/images/school/icon-pencil.svg" alt=""><small>STEP 03</small><h3>受講開始</h3><p>一人ひとりに合わせたカリキュラムで学習開始。</p></article>
<article class="sch-step"><img src="assets/images/school/icon-support.svg" alt=""><small>STEP 04</small><h3>実践フォロー</h3><p>卒業後も安心のフォロー体制で成長を支援。</p></article>
</div>
<div class="sch-cta">
<div><h3>まずはお気軽にご相談ください。</h3><p>カリキュラムやスケジュール、受講料について丁寧にご案内いたします。</p></div>
<a class="sch-line-btn" href="${SITE.lineUrl}">${I.line}LINEで相談する</a>
</div>
</div>
</section>

</section>

<section class="lcpro-achievement" aria-labelledby="lcpro-hub-title">
<div class="lcpro-achievement__visual" aria-hidden="true">
<picture>
<source srcset="assets/images/lash-cycle-pro-section.webp" type="image/webp">
<img src="assets/images/lash-cycle-pro-section.jpg" width="1672" height="941" alt="" loading="lazy" decoding="async">
</picture>
</div>
<div class="lcpro-achievement__sr-content">
<p>Lark Master 登壇実績</p>
<p>アイラッシュサロン Lucia がモデルとなった</p>
<h2 id="lcpro-hub-title">Lush Cycle Pro</h2>
<p>次世代のアイラッシュサロン経営管理システム</p>
<p>Eyelash Salon Lucia のサロン運営ノウハウをもとに開発された「Lush Cycle Pro」は、公式 Lark Japan 主催の招待制イベント「Lark Master」にて、導入事例として紹介されました。</p>
</div>
</section>

<section class="section soft"><div class="container">
<div class="section-head"><span class="label">Lucia の実績</span><p class="desc">サロン運営で積み上げたデータが、仕組みの根拠です。</p></div>
<div class="stat-row">
<div class="stat"><strong>92%</strong><div class="name">リピート率</div><div class="note">2024年実績</div></div>
<div class="stat"><strong>86%</strong><div class="name">次回予約率</div><div class="note">2024年実績</div></div>
<div class="stat"><strong>6.2週</strong><div class="name">継続来店サイクル</div><div class="note">2024年実績</div></div>
</div></div></section>

<section class="section"><div class="container"><div class="cta"><div class="ct"><h2>まずはお気軽にご相談ください。</h2><p>スクール・システム・コンサルのどれが合うかわからない場合も、LINEでお聞きします。無料でご案内いたします。</p></div><div class="ca"><a class="btn primary lg" href="consulting.html">無料相談を申し込む</a><a class="btn lg line" href="${SITE.lineUrl}">${I.line}LINEで相談する</a></div></div></div></section>
`,
};

/* ====================== RESERVATION ====================== */
PAGES2['reservation.html'] = {
  active: 'reservation',
  title: 'ご予約・来店案内',
  desc: 'Lucia のご予約方法とご来店の流れ。LINE からご予約・ご相談いただけます。完全予約制のプライベートサロンです。',
  body: `
<div class="reservation-redesign">

<section class="rsv-hero">
<div class="rsv-hero-photo" aria-hidden="true"></div>
<div class="rsv-hero-inner">
<div class="rsv-hero-copy">
<p class="rsv-breadcrumb">ホーム <span>›</span> ご予約・来店案内</p>
<h1>ご予約・来店案内</h1>
<p>Lucia は完全予約制のプライベートサロンです。ご予約方法<br>とご来店の流れをご案内します。</p>
</div>
</div>
</section>

<section class="rsv-book">
<div class="rsv-deco rsv-deco--left" aria-hidden="true"></div>
<div class="rsv-deco rsv-deco--right" aria-hidden="true"></div>
<div class="rsv-book-inner">
<p class="rsv-eyebrow">RESERVATION</p>
<h2 class="rsv-section-title"><span>ご予約はLINEから</span></h2>
<p class="rsv-lead">空き状況の確認から当日予約まで、公式LINEからお気軽にご連絡ください。</p>
<a class="rsv-line-solid" href="${SITE.lineUrl}">${I.line}LINEで予約・相談する</a>
<div class="rsv-notes">
<p>※ご予約確定後、公式LINEより施術同意書フォームをお送りします。来店前にご記入をお願いいたします。</p>
<p>※当日のご予約も承っております。ご来店の際は必ず事前のご予約をお願いいたします。</p>
</div>
</div>
</section>

<section class="rsv-flow-section">
<div class="container">
<div class="rsv-flow-head"><p class="rsv-eyebrow2">VISIT FLOW</p><h2>ご来店の流れ</h2></div>
<div class="steps">
${step('01', 'LINE でご予約', '公式 LINE から空き状況の確認・ご予約をお送りください。')}
${step('02', '同意書のご記入', 'ご予約確定後、公式 LINE より施術前同意書フォームをお送りします。来店前にご記入ください。')}
${step('03', 'カウンセリング', 'お悩みや理想のイメージをお伺いし、まつ毛の状態を確認します。')}
${step('04', 'デザイン確認・施術', '長さ・カール・本数を一緒に決め、リラックスできる空間で丁寧に施術します。')}
${step('05', 'アフター案内', 'ホームケアの方法や注意点、次回のご来店目安をご案内します。')}
</div>
</div>
</section>

<section class="rsv-information">
<div class="rsv-info-inner">
<article class="rsv-card rsv-card--policy">
<div class="rsv-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="6" width="14" height="14" rx="2"/><path d="M8 4v4M16 4v4M5 10h14"/><path d="M8 14h2M14 14h2M8 17h2M14 17h2"/></svg></div>
<h2>キャンセルポリシー</h2>
<span class="rsv-card-rule" aria-hidden="true"></span>
<p>ご予約のキャンセル・変更は、前日19:00までにご連絡をお願いいたします。当日キャンセル・無断キャンセルの場合は、キャンセル料を頂戴する場合がございます。</p>
</article>
<article class="rsv-card rsv-card--faq">
<div class="rsv-card-icon rsv-card-icon--letter" aria-hidden="true">Q</div>
<h2>よくあるご質問</h2>
<dl class="rsv-faq-list">
<div><dt>Q. 持ちはどのくらいですか？</dt><dd>個人差はありますが、3〜4週間ほどが目安です。</dd></div>
<div><dt>Q. コンタクトのままでも大丈夫？</dt><dd>施術中は外していただくことをおすすめしています。</dd></div>
<div><dt>Q. メンズの施術も可能ですか？</dt><dd>はい、メンズの施術も承っております。</dd></div>
</dl>
</article>
</div>
</section>

<section class="rsv-contact-banner">
<div class="rsv-banner-photo" aria-hidden="true"></div>
<div class="rsv-banner-inner">
<h2>ご予約・ご相談はお気軽に。</h2>
<p>当日予約や空き状況も、随時ご案内しております。</p>
</div>
</section>

</div>
`,
};

/* ====================== SCHOOL ====================== */
PAGES2['school.html'] = {
  active: 'school',
  title: 'スクール',
  desc: 'Lucia Eyelash School。確かな技術と想いを大切に、現場で活躍するアイリストを育成するスクールです。技術・接客・サロン運営まで一貫して学べるトータルサポートスクール。',
  body: `
<link rel="stylesheet" href="assets/css/legacy-redesign.css">
<div class="legacy-redesign page-school">
<div class="school-redesign" id="school">

<section class="sch-hero">
<div class="container">
<div class="sch-breadcrumb">ホーム ＞ スクール</div>
<h1>Eyelash School</h1>
<p>美しい技術は、未来を変える。確かな技術と想いを大切に、現場で活躍するアイリストを育成するスクールです。</p>
</div>
</section>

<section class="sch-section">
<img class="sch-leaf sch-left" src="assets/images/school/leaf-decoration.svg" alt="">
<img class="sch-leaf sch-right" src="assets/images/school/leaf-decoration.svg" alt="">
<div class="container">
<div class="sch-concept-grid">
<div class="sch-photo-card"><img src="assets/images/school/concept-salon.webp" alt="Luciaサロン内観"></div>
<div class="sch-concept-copy">
<span class="sch-eyebrow">— Concept —</span>
<h2>技術を超えた価値を、<br>あなたの未来に。</h2>
<p>Lucia Eyelash School は、技術の習得だけでなく、想い・接客・カウンセリング・サロン運営までを一貫して学べるトータルサポートスクールです。</p>
<p>現場で求められる「実践力」と、お客様に寄り添う「心」を育て、あなたらしいアイリストとして輝く未来を応援します。</p>
</div>
</div>
<div class="sch-section-title" style="margin-top:90px"><h2>Lucia Eyelash School の特長</h2></div>
<div class="sch-features">
<article class="sch-feature"><img src="assets/images/school/icon-badge.svg" alt=""><h3>実践力</h3><p>現場で即戦力となる実践的なカリキュラム。</p></article>
<article class="sch-feature"><img src="assets/images/school/icon-heart.svg" alt=""><h3>想いを大切に</h3><p>お客様に寄り添うホスピタリティを育みます。</p></article>
<article class="sch-feature"><img src="assets/images/school/icon-book.svg" alt=""><h3>少人数制</h3><p>一人ひとりに寄り添う少人数レッスン。</p></article>
<article class="sch-feature"><img src="assets/images/school/icon-sparkle.svg" alt=""><h3>サロン直営の学び</h3><p>サロンワークを想定した実践的な指導。</p></article>
</div>
</div>
</section>

<section class="sch-section sch-bg-pink">
<div class="container">
<div class="sch-program-wrap">
<div class="sch-program-hero">
<div class="sch-program-copy">
<span class="sch-eyebrow">School Program</span>
<h2>現場で活きる技術とサロン力を、一つのプログラムで。</h2>
<p>目指す未来やレベルに合わせて、必要なすべてを一つのカリキュラムに。実践的な技術とサロンワークの力を、トータルで身につけることができます。</p>
</div>
<img src="assets/images/school/program-training.webp" alt="実技指導">
</div>
<div class="sch-program-table">
<div class="sch-program-row"><div class="sch-program-label">対象</div><p>未経験の方 ／ 技術を見直したい方 ／ サロン就職・独立を目指す方</p></div>
<div class="sch-program-row"><div class="sch-program-label">学べる内容</div><p>基礎理論・衛生管理 ／ LUCIAで提供している施術メニューに合わせた技術研修 ／ LED施術を中心としたエクステ技術 ／ デザイン提案 ／ カウンセリング ／ 接客・サロンワーク ／ サロン運営の基礎</p></div>
<div class="sch-program-row"><div class="sch-program-label">受講スタイル</div><p>少人数 ／ 個別フォロー ／ スケジュール相談可</p></div>
<div class="sch-program-row"><div class="sch-program-label">サポート</div><p>独立相談 ／ 卒業後フォロー ／ 商材相談</p></div>
</div>
</div>
</div>
</section>

<section class="sch-section">
<div class="container">
<div class="sch-info-cards">
<article class="sch-info-card"><img class="sch-photo" src="assets/images/school/recommend-training.webp" alt="こんな方におすすめ"><h3>こんな方におすすめ</h3><ul><li>アイリストとしてデビューしたい</li><li>未経験から技術を身につけたい</li><li>サロン就職・独立を目指したい</li><li>スキルアップ・再就職したい</li></ul></article>
<article class="sch-info-card"><img class="sch-photo" src="assets/images/school/learn-tools.webp" alt="学べること"><h3>学べること</h3><ul><li>まつげエクステの基礎〜応用技術</li><li>カウンセリング・デザイン提案</li><li>衛生管理・安全な施術</li><li>サロンワーク・接客マナー</li></ul></article>
<article class="sch-info-card"><img class="sch-photo" src="assets/images/school/support-salon.webp" alt="受講後のサポート"><h3>受講後のサポート</h3><ul><li>就職・独立サポート</li><li>卒業後の技術フォロー</li><li>材料・商材の相談</li><li>最新技術の勉強会</li></ul></article>
</div>
</div>
</section>

<section class="sch-section" style="padding-top:40px">
<div class="container">
<div class="sch-section-title"><h2>ご相談から受講までの流れ</h2></div>
<div class="sch-flow">
<article class="sch-step"><img src="assets/images/school/icon-chat.svg" alt=""><small>STEP 01</small><h3>ご相談</h3><p>LINEでお気軽にご相談ください。</p></article>
<article class="sch-step"><img src="assets/images/school/icon-clipboard.svg" alt=""><small>STEP 02</small><h3>カウンセリング</h3><p>目標やご不安を伺い、最適なプランをご提案。</p></article>
<article class="sch-step"><img src="assets/images/school/icon-pencil.svg" alt=""><small>STEP 03</small><h3>受講開始</h3><p>一人ひとりに合わせたカリキュラムで学習開始。</p></article>
<article class="sch-step"><img src="assets/images/school/icon-support.svg" alt=""><small>STEP 04</small><h3>実践フォロー</h3><p>卒業後も安心のフォロー体制で成長を支援。</p></article>
</div>
<div class="sch-cta">
<div><h2>まずはお気軽にご相談ください。</h2><p>カリキュラムやスケジュール、受講料について丁寧にご案内いたします。</p></div>
<a class="sch-line-btn" href="${SITE.lineUrl}">${I.line}LINEで相談する</a>
</div>
</div>
</section>

<section class="sch-section sch-bg-subtle">
<div class="container">
<div class="sch-section-title"><h2>スクール修了後の、次のステージへ</h2></div>
<p style="text-align:center;max-width:52em;margin:0 auto 44px;color:var(--ink-soft);font-size:14px;line-height:1.9">技術と接客を身につけたら、今度はサロン経営を仕組み化するフェーズです。Lucia が実際に活用するシステムとサポートをご紹介します。</p>
<div class="sch-next-cards">
<a class="sch-next-card" href="lash-cycle-pro.html">
<h3>Lush Cycle Pro</h3>
<p>Luciaが実際に運営で使うサロン経営管理システム。顧客・売上・リピートを効率化し、独立後すぐに使えます。</p>
<span class="sch-next-link">詳しく見る →</span>
</a>
<a class="sch-next-card" href="consulting.html">
<h3>同業者向け相談</h3>
<p>独立・開業の準備から運営改善まで、Luciaの実績をもとに伴走型でサポートします。まず無料相談から。</p>
<span class="sch-next-link">相談を見る →</span>
</a>
</div>
</div>
</section>

</div>
</div>
`,
};

/* ====================== MANAGEMENT ====================== */
const resultStat = (val, name, note) =>
  `<div class="stat"><strong>${val}</strong><div class="name">${name}</div><div class="note">${note}</div></div>`;

PAGES2['management.html'] = {
  active: 'management',
  title: 'サロン運営の仕組み',
  desc: 'Lucia が大切にする「サロン運営の仕組み」。集客から予約・施術・アフター・リピートまでを一貫して支えるシステムと、それを支える LINE・Lark・AI・Lush Cycle Pro をご紹介します。',
  body: `
${heroCompact({ crumb: 'サロン運営の仕組み', title: 'サロン運営の仕組み', lead: '出会いからアフターケア、次回予約・リピートまでを一貫して支え、スタッフもお客様も心地よくいられるサロン運営を実現します。', img: 'management-hero.jpg' })}

<section class="section"><div class="container">
${sectionHead({ label: 'Lucia の運営フロー' })}
<div class="flow">
${flowNode('01', 'megaphone', '集客', 'Web・SNS・紹介・広告・SEO')}
${flowNode('02', 'calendar', '予約', 'LINEで24時間受付')}
${flowNode('03', 'chat', 'カウンセリング', '丁寧なヒアリングとデザイン提案')}
${flowNode('04', 'eye', '施術', '高い技術と衛生管理で満足度の高い仕上がり')}
${flowNode('05', 'heart', 'アフター', 'アフターケアと次回提案のご案内')}
${flowNode('06', 'refresh', 'リピート', '次回予約・継続来店で安定した経営を構築')}
</div></div></section>

<section class="section soft"><div class="container">
${sectionHead({ label: '運営を支える仕組み' })}
<div class="grid cols-4">
<a class="card" style="text-decoration:none;display:block" href="ai-tools.html"><h3 style="font-size:19px">LINE</h3><p>予約・リマインド・フォロー配信でつながりを強化。</p></a>
<a class="card" style="text-decoration:none;display:block" href="ai-tools.html"><h3 style="font-size:19px">Lark</h3><p>情報共有・タスク管理でチームの生産性を向上。</p></a>
<a class="card" style="text-decoration:none;display:block" href="ai-tools.html"><h3 style="font-size:19px">AI</h3><p>データ分析・返信サポートで運営を効率化。</p></a>
<a class="card" style="text-decoration:none;display:block" href="lash-cycle-pro.html"><h3 style="font-size:19px">Lush Cycle Pro</h3><p>顧客管理・売上分析・リピート設計で運営を最適化。</p></a>
</div></div></section>

<section class="section"><div class="container">
${sectionHead({ label: '仕組みで生まれる成果' })}
<div class="grid cols-4">
${iconCard('chart', '集客力の向上', 'Web・SNS・紹介の導線設計で、安定した新規集客を実現します。')}
${iconCard('refresh', '業務効率の最適化', '予約・顧客・施術の一元化で、スタッフの負担を軽減します。')}
${iconCard('heart', '顧客満足度の向上', '丁寧なカウンセリングとアフターで、信頼を獲得します。')}
${iconCard('sparkle', 'リピート率の向上', '次回提案と仕組み化で、安定したリピートを実現します。')}
</div></div></section>

<section class="section soft"><div class="container">
${sectionHead({ label: 'Lucia の実績に基づく運営設計', desc: 'これまでのサロン運営で培ったノウハウを、仕組みとして体系化しています。' })}
<div class="stat-row">
${resultStat('92%', 'リピート率', '2024年実績')}
${resultStat('86%', '次回予約率', '2024年実績')}
${resultStat('6.2週', '継続来店サイクル', '2024年実績')}
</div></div></section>

${ctaBand({ h2: 'サロン運営や導入についてのご相談はお気軽に。', p: '同業者向けの相談も承っております。お気軽にお問い合わせください。' })}
`,
};

/* ====================== ACCESS ====================== */
PAGES2['access.html'] = {
  active: 'access',
  title: 'アクセス',
  desc: 'Lucia へのアクセス。滋賀県草津市野路町、JR南草津駅より徒歩10分・駐車場2台完備。住所・営業時間・道順をご案内します。',
  body: `
${heroCompact({ crumb: 'アクセス', title: 'アクセス', lead: '滋賀・南草津エリアで、目元のお悩みに丁寧に向き合うプライベートサロンです。皆さまのご来店を心よりお待ちしております。', img: 'access-hero.jpg' })}

<section class="section"><div class="container">
${sectionHead({ label: 'Eyelash Salon Lucia' })}
<div class="info-grid">
<table class="info-table"><tbody>
<tr><th>${I.pin}住所</th><td>${SITE.zip}<br>${SITE.addr}</td></tr>
<tr><th>${I.map}アクセス</th><td>JR南草津駅より徒歩10分<br>駐車場2台完備</td></tr>
<tr><th>${I.clock}営業時間</th><td>${SITE.hoursFull}</td></tr>
<tr><th>${I.calendar}定休日</th><td>不定休</td></tr>
<tr><th>${I.chat}ご予約</th><td>LINE・Instagram DM にてお気軽にご連絡ください</td></tr>
</tbody></table>
<div class="map-wrap">
<iframe class="map-frame" src="${SITE.mapsUrl}" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Eyelash Salon Lucia 地図"></iframe>
</div>
</div></div></section>

<section class="section soft"><div class="container">
${sectionHead({ label: '来店までの道順', desc: 'JR南草津駅より徒歩10分' })}
<div class="grid cols-3">
${step('01', 'JR南草津駅 東口', '東口を出て、ロータリーを右手に進み、野路方面へ向かいます。')}
${step('02', '野路町方面へ', '南草津駅から南東へ直進し、野路町3001番地を目指します（徒歩約10分）。')}
${step('03', '日替わりサロンtally内へ', 'めるべーゆ杉 内「日替わりサロンtally」の Lucia にお越しください。駐車場は2台ご用意しています。')}
</div>
<div class="strip mt-l">
<img src="assets/images/store-real.jpeg" alt="Lucia 施術スペース">
<img src="assets/images/store-real.jpeg" alt="Lucia 店内">
<img src="${crop('about-room.jpg')}" alt="施術ルーム">
<img src="${crop('reservation-hero.jpg')}" alt="施術空間">
</div>
<p class="txt-center mt-m"><a class="btn" href="${SITE.mapsLink}" target="_blank" rel="noopener">${I.pin}Google Mapで見る</a></p>
</div></section>
`,
};

/* ====================== CONTACT ====================== */
const radio = (name, label) => `<label><input type="radio" name="${name}" value="${label}">${label}</label>`;

PAGES2['contact.html'] = {
  active: 'contact',
  title: 'お問い合わせ',
  desc: 'Lucia へのお問い合わせ。ご予約・ご相談・サロン運営に関するご質問など、フォームまたは LINE でお気軽にどうぞ。',
  body: `
${heroCompact({ crumb: 'お問い合わせ', title: 'お問い合わせ', lead: 'ご予約・ご相談はどんなことでもお気軽にどうぞ。Lucia が心を込めて対応いたします。', img: 'contact-hero.jpg' })}

<section class="section"><div class="container"><div class="form-layout">
<form class="form-card" onsubmit="return false">
<h2>お問い合わせフォーム</h2>
<div class="field"><label>お問い合わせ種別</label><div class="radios">
${radio('type', '予約・空き状況')}${radio('type', '施術について')}${radio('type', '来店前のご相談')}${radio('type', 'スクールについて')}${radio('type', 'Lush Cycle Pro について')}${radio('type', 'サロン運営相談')}${radio('type', 'AI・Lark・公式LINE活用')}${radio('type', 'その他')}
</div></div>
<div class="field"><label>お名前<span class="req">必須</span></label><input type="text" placeholder="例）山田 葵子"></div>
<div class="field"><label>ふりがな</label><input type="text" placeholder="例）やまだ あおいこ"></div>
<div class="field"><label>メールアドレス<span class="req">必須</span></label><input type="email" placeholder="hana.yamada@example.com"></div>
<div class="field"><label>お問い合わせ内容<span class="req">必須</span></label><textarea placeholder="ご来店希望日や、ご相談内容などをご記入ください。"></textarea></div>
<div class="field"><label><input type="checkbox"> <a href="privacy.html" style="color:var(--gold-deep)">プライバシーポリシー</a>に同意する</label></div>
<button class="btn primary" style="width:100%">内容を確認する</button>
</form>
<div>
<div class="side-card"><h3>${I.line}LINE でのお問い合わせ</h3><p>24時間受付。お気軽にご連絡ください。</p><a class="btn line" style="width:100%" href="${SITE.lineUrl}">${I.line}LINEで予約・相談する</a></div>
<div class="side-card"><h3>${I.clock}営業時間 / 所在地</h3><p>${SITE.hoursFull}（定休日 不定休）</p><p>${SITE.zip} ${SITE.addr}</p><p>2営業日以内にご返信いたします。</p></div>
</div></div></div></section>

<section class="section soft"><div class="container">
${sectionHead({ label: 'ご予約前にご確認ください' })}
<div class="grid cols-4">
${iconCard('calendar', 'ご予約について', 'ご来店の日時が早いほど調整がスムーズです。空き状況はLINEでもご確認いただけます。')}
${iconCard('eye', 'ご来店について', '当日はマスカラ・ビューラーは控えめに。コンタクトは外しての施術をおすすめします。')}
${iconCard('card', 'お支払い方法', '現金・クレジットカード・各種QR決済に対応。会計時にスタッフへお申し付けください。')}
${iconCard('bell', 'キャンセルについて', '前日19:00 までにご連絡ください。当日・無断キャンセルはキャンセル料を頂戴する場合があります。')}
</div></div></section>
`,
};

/* ====================== AI TOOLS ====================== */
PAGES2['ai-tools.html'] = {
  active: 'management',
  title: 'AI・Lark・公式LINE活用',
  desc: 'Lucia は AI・Lark・公式LINE を連携させ、お客様とのコミュニケーションと運営効率を高めています。サロン運営をスマートにする仕組みをご紹介します。',
  body: `
${heroCompact({ crumb: 'AI・Lark・公式LINE活用', title: 'AI・Lark・公式LINE活用', lead: 'AI・Lark・公式LINE を連携させ、サロンワークに集中できる仕組みを整えています。', img: 'ai-hero.jpg' })}

<section class="section"><div class="container">
${sectionHead({ label: '3つのツールで、サロン運営をスマートに。' })}
<div class="feature-cols">
<div class="feature"><div class="tool-brand"><span class="logo lark">Lark</span><div><h3 style="margin:0">Lark</h3><p style="margin:0">情報をつなぎ、チームをもっと強く。</p></div></div><ul><li>予約・顧客情報・施術履歴を一元管理</li><li>スタッフ間の情報共有をリアルタイムに</li><li>タスク・シフト・研修もスムーズに</li></ul></div>
<div class="feature"><div class="tool-brand"><span class="logo line">LINE</span><div><h3 style="margin:0">公式LINE</h3><p style="margin:0">お客様との信頼関係を、やさしく。</p></div></div><ul><li>ご予約・変更・リマインドを自動化</li><li>施術後のアフターケア・空き案内を配信</li><li>お得な相談やキャンペーンもスムーズに</li></ul></div>
<div class="feature"><div class="tool-brand"><span class="logo ai">AI</span><div><h3 style="margin:0">AI</h3><p style="margin:0">考える時間を創り、クオリティを高める。</p></div></div><ul><li>返信文の作成やFAQをAIがサポート</li><li>ブログ・SNS・LINE文面を効率作成</li><li>データ分析で改善ポイントを提案</li></ul></div>
</div></div></section>

<section class="section soft"><div class="container">
${sectionHead({ label: '連携ワークフロー' })}
<div class="flow">
${flowNode('01', 'chat', '予約・問い合わせ', 'LINE から簡単予約')}
${flowNode('02', 'bell', '自動応答・ご案内', 'LINE で即時にご案内')}
${flowNode('03', 'refresh', '情報集約・管理', 'Lark で一元管理・共有')}
${flowNode('04', 'sparkle', 'AIでサポート', '返信作成・コンテンツ生成')}
${flowNode('05', 'heart', 'ご来店・アフター', '最適なご提案とフォロー')}
</div></div></section>

<section class="section"><div class="container">
${sectionHead({ label: 'Lucia での活用例' })}
<div class="grid cols-4">
${iconCard('monitor', '予約対応の自動化', 'LINE の自動応答で24時間受付。取りこぼしを防ぎます。')}
${iconCard('bell', 'リマインド配信', '来店前に LINE でお知らせし、キャンセルを抑制します。')}
${iconCard('heart', 'アフターケア提案', '一人ひとりに合わせたご提案で、リピートにつなげます。')}
${iconCard('megaphone', 'SNS・ブログ発信', 'AI で下書きを効率化し、発信を継続します。')}
</div></div></section>

<section class="section soft"><div class="container"><div class="cta"><div class="ct"><h2>同じ仕組みに興味がある方へ</h2><p>サロンの成長には、仕組み化とテクノロジーの活用が欠かせません。Lucia の取り組みや導入サポートについて、お気軽にご相談ください。</p></div><div class="ca"><a class="btn primary lg" href="consulting.html">同業者向け相談を見る</a><a class="btn lg" href="contact.html">お問い合わせ</a></div></div></div></section>
`,
};

/* ====================== CONSULTING ====================== */
PAGES2['consulting.html'] = {
  active: 'management',
  title: '同業者向け相談',
  desc: 'Luciaが実践してきた仕組みとノウハウを、同じ目線で丁寧にお伝えします。集客・スタッフ育成・業務効率化など、サロンオーナー様の課題に伴走します。',
  body: `
<div class="cs-hero">
  <div class="cs-hero-copy">
    <span class="cs-eyebrow">SALON OWNER CONSULTING</span>
    <h1>同業者向け相談</h1>
    <div class="cs-ornament" aria-hidden="true"></div>
    <p class="lead">Luciaが実践してきた仕組みとノウハウを、<br>同じ目線で丁寧にお伝えします。</p>
    <div class="cs-proof-row">
      <div class="cs-proof">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M8 20h8M12 16.5V20"/></svg>
        <p>現場で磨いた<br>リアルなノウハウ</p>
      </div>
      <div class="cs-proof">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.5a3 3 0 0 1 0 5.4M16.5 20a6 6 0 0 0-2.2-4.6"/></svg>
        <p>10年・月100名以上の<br>実績から学べる</p>
      </div>
      <div class="cs-proof">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>
        <p>売上・集客・定着まで<br>伴走サポート</p>
      </div>
    </div>
  </div>
  <div class="cs-hero-image" role="img" aria-label="Luciaサロン内観"></div>
</div>

<!-- ノウハウ① -->
<section class="cs-knowhow">
  <div class="container">
    <div class="cs-section-header">
      <span class="cs-eyebrow">KNOW-HOW DOCUMENT</span>
      <h2>ノウハウ① — Luciaのサロン運営資料</h2>
      <span class="cs-section-divider" aria-hidden="true"></span>
      <p style="font-size:13px;color:var(--muted);margin-top:12px">Luciaが実際に使っているサロン運営ノウハウ資料の一部をご覧いただけます。</p>
    </div>
    <div class="knowhow-viewer" id="kh1-viewer">
      <div class="kh-canvas-wrap"><canvas id="kh1-canvas"></canvas></div>
      <div class="knowhow-nav">
        <button class="kh-prev" id="kh1-prev" aria-label="前のページ">‹</button>
        <span class="kh-counter"><span id="kh1-cur">1</span> / <span id="kh1-total">—</span></span>
        <button class="kh-next" id="kh1-next" aria-label="次のページ">›</button>
      </div>
      <div class="knowhow-dots" id="kh1-dots"></div>
    </div>
  </div>
</section>
<style>
.cs-knowhow{padding:64px 0;background:#faf7f2;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.knowhow-viewer{max-width:960px;margin:0 auto}
.kh-canvas-wrap{border-radius:10px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.12);background:#f5f1ec;line-height:0;user-select:none}
#kh1-canvas{width:100%;height:auto;display:block}
.knowhow-nav{display:flex;align-items:center;justify-content:center;gap:20px;margin-top:20px}
.kh-prev,.kh-next{width:44px;height:44px;border-radius:50%;border:1px solid var(--gold);background:#fff;color:var(--gold-deep);font-size:22px;line-height:1;cursor:pointer;display:grid;place-items:center;transition:.2s}
.kh-prev:hover,.kh-next:hover{background:var(--gold);color:#fff}
.kh-prev:disabled,.kh-next:disabled{opacity:.35;cursor:default}
.kh-counter{font-size:13px;color:var(--muted);font-family:var(--serif);letter-spacing:.08em;min-width:56px;text-align:center}
.knowhow-dots{display:flex;justify-content:center;gap:8px;margin-top:12px}
.kh-dot{width:8px;height:8px;border-radius:50%;background:var(--line);border:none;cursor:pointer;padding:18px;box-sizing:content-box;transition:.2s}
.kh-dot.active{background:var(--gold)}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script>
(function(){
  pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  var canvas=document.getElementById('kh1-canvas'),ctx=canvas.getContext('2d');
  var dotsEl=document.getElementById('kh1-dots');
  var curEl=document.getElementById('kh1-cur'),totEl=document.getElementById('kh1-total');
  var prevBtn=document.getElementById('kh1-prev'),nextBtn=document.getElementById('kh1-next');
  var pdfDoc=null,cur=1,rendering=false,pending=null;
  pdfjsLib.getDocument('assets/pdf/knowhow1.pdf').promise.then(function(doc){
    pdfDoc=doc;var total=doc.numPages;totEl.textContent=total;
    for(var i=1;i<=total;i++){(function(n){var d=document.createElement('button');d.className='kh-dot'+(n===1?' active':'');d.setAttribute('aria-label',n+'ページ目');d.addEventListener('click',function(){goTo(n);});dotsEl.appendChild(d);})(i);}
    renderPage(1);
  });
  function renderPage(num){if(rendering){pending=num;return;}rendering=true;pdfDoc.getPage(num).then(function(page){var vp=page.getViewport({scale:2});canvas.width=vp.width;canvas.height=vp.height;page.render({canvasContext:ctx,viewport:vp}).promise.then(function(){rendering=false;cur=num;curEl.textContent=num;prevBtn.disabled=(num===1);nextBtn.disabled=(num===pdfDoc.numPages);document.querySelectorAll('#kh1-dots .kh-dot').forEach(function(d,i){d.classList.toggle('active',i+1===num);});if(pending!==null){var p=pending;pending=null;renderPage(p);}});})}
  function goTo(n){if(!pdfDoc||n<1||n>pdfDoc.numPages||n===cur)return;renderPage(n);}
  prevBtn.addEventListener('click',function(){goTo(cur-1);});
  nextBtn.addEventListener('click',function(){goTo(cur+1);});
})();
</script>

<!-- こんなオーナー様におすすめ -->
<section class="cs-recommend">
  <div class="container">
    <div class="cs-section-header">
      <span class="cs-eyebrow">RECOMMENDED</span>
      <h2>こんなオーナー様におすすめです</h2>
      <span class="cs-section-divider" aria-hidden="true"></span>
    </div>
    <div class="cs-recommend-grid">
      <article class="cs-feature-card"><div class="cs-circle-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V4M4 20h16"/><rect x="7" y="12" width="2.8" height="5"/><rect x="12" y="8" width="2.8" height="9"/><rect x="17" y="10" width="2.8" height="7"/></svg></div><h3>売上や集客を<br>安定させたい</h3><p>新規集客やサービス単価を見直し、安定したサロン経営を実現したい。</p></article>
      <article class="cs-feature-card"><div class="cs-circle-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.5a3 3 0 0 1 0 5.4M16.5 20a6 6 0 0 0-2.2-4.6"/></svg></div><h3>スタッフ育成に<br>悩んでいる</h3><p>スタッフの技術・接客・育成に課題を感じている。離職を防ぎたい。</p></article>
      <article class="cs-feature-card"><div class="cs-circle-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg></div><h3>時間をつくりたい</h3><p>日々の業務を整え、サロンワークに集中できる時間をつくりたい。</p></article>
      <article class="cs-feature-card"><div class="cs-circle-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5 13.8 9 19.5 11 13.8 13 12 20.5 10.2 13 4.5 11 10.2 9Z"/></svg></div><h3>サロンを拡大・<br>成長させたい</h3><p>仕組み化で次のステージへ進み、理想のサロンをつくりたい。</p></article>
    </div>
  </div>
</section>

<!-- 相談テーマ -->
<section class="cs-themes">
  <div class="container">
    <div class="cs-section-header">
      <span class="cs-eyebrow">CONSULTATION THEMES</span>
      <h2>相談テーマ</h2>
      <span class="cs-section-divider" aria-hidden="true"></span>
    </div>
    <div class="cs-theme-grid">
      <div class="cs-theme-item"><div class="cs-round-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8 8 0 0 0-14-4l-2 2"/><path d="M4 6v3h3"/><path d="M4 13a8 8 0 0 0 14 4l2-2"/><path d="M20 18v-3h-3"/></svg></div><b>サロン運営の悩み</b></div>
      <div class="cs-theme-item"><div class="cs-round-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4l9 4V6Z"/><path d="M4 10H3v4h1"/><path d="M16 8a4 4 0 0 1 0 8"/></svg></div><b>集客・リピート</b></div>
      <div class="cs-theme-item"><div class="cs-round-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v11H9l-4 3.5V16H4Z"/><path d="M8 9.5h8M8 12.5h5"/></svg></div><b>予約・LINE活用</b></div>
      <div class="cs-theme-item"><div class="cs-round-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M8 20h8M12 16.5V20"/></svg></div><b>Lark活用</b></div>
      <div class="cs-theme-item"><div class="cs-round-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5 13.8 9 19.5 11 13.8 13 12 20.5 10.2 13 4.5 11 10.2 9Z"/></svg></div><b>AI活用</b></div>
      <div class="cs-theme-item"><div class="cs-round-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V4M4 20h16"/><rect x="7" y="12" width="2.8" height="5"/><rect x="12" y="8" width="2.8" height="9"/><rect x="17" y="10" width="2.8" height="7"/></svg></div><b>Lush Cycle Pro</b></div>
      <div class="cs-theme-item"><div class="cs-round-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2 2 0 0 1 6 4h6v15H6a2 2 0 0 0-2 1.2Z"/><path d="M20 5.5A2 2 0 0 0 18 4h-6v15h6a2 2 0 0 1 2 1.2Z"/></svg></div><b>採用・スクール</b></div>
    </div>
  </div>
</section>

<!-- Luciaだから話せること／ご相談の流れ -->
<section class="cs-knowledge-wrap">
  <div class="container">
    <div class="cs-knowledge">
      <div class="cs-knowledge-card cs-botanical">
        <h2>LUCIA だから話せること</h2>
        <ul>
          <li><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="4,12 9,17 20,6"/></svg>実店舗で実績を積み重ねてきた"再現性のある仕組み"</li>
          <li><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="4,12 9,17 20,6"/></svg>うまくいったこと、失敗したことも全てお伝えします</li>
          <li><svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="4,12 9,17 20,6"/></svg>サロンの規模やフェーズに合わせた、現実的な改善提案</li>
        </ul>
      </div>
      <div class="cs-knowledge-card">
        <h2>ご相談の流れ</h2>
        <div class="cs-flow">
          <div><div class="cs-flow-num">01</div><b>お問い合わせ</b><small>フォーム・LINEより<br>ご連絡ください</small></div>
          <em>›</em>
          <div><div class="cs-flow-num">02</div><b>ヒアリング<br>（無料）</b><small>現状や課題を丁寧に<br>お伺いします</small></div>
          <em>›</em>
          <div><div class="cs-flow-num">03</div><b>ご提案・<br>アドバイス</b><small>課題に合った施策を<br>ご提案します</small></div>
          <em>›</em>
          <div><div class="cs-flow-num">04</div><b>アフター<br>フォロー</b><small>実行後の振り返りと<br>継続サポート</small></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- あなたのサロンの伴走者として -->
<section class="cs-operator">
  <div class="cs-operator-inner">
    <div class="cs-portrait-wrap">
      <img src="assets/images/crops/azumi.jpg" alt="Lucia アイデザイナー／管理美容師 小寺 あづみ">
    </div>
    <div class="cs-operator-copy">
      <span class="cs-eyebrow">ABOUT OPERATOR</span>
      <h2>あなたのサロンの伴走者として</h2>
      <div class="cs-ornament" aria-hidden="true"></div>
      <h3>「お客様の美しさ」と「サロンの成長」を両立する</h3>
      <p class="nm">Lucia アイデザイナー／管理美容師　小寺 あづみ</p>
      <p>10年の現場経験を経て、集客・予約・接客・リピートまでのサロン運営ノウハウをお伝えします。仕組みを整えることで、お客様にも自分にも心地よい働き方が実現できると信じています。</p>
      <div class="cs-stats">
        <div><strong>10年</strong><span>アイラッシュ歴</span></div>
        <div><strong>月100名以上</strong><span>担当客数</span></div>
        <div><strong>管理美容師</strong><span>国家資格保有</span></div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cs-cta">
  <div class="cs-cta-inner">
    <h2>まずはお気軽にご相談ください。</h2>
    <p>初めてのご相談にも、あなたのサロンに合わせたご提案でお応えいたします。</p>
    <a class="btn primary lg" href="contact.html" style="margin-top:24px;display:inline-block">無料相談を申し込む</a>
  </div>
</section>
`,
};

/* ====================== LASH CYCLE PRO ====================== */
PAGES2['lash-cycle-pro.html'] = {
  active: 'management',
  title: 'Lush Cycle Pro',
  desc: '現場の声から生まれた、サロン運営サポートシステム Lush Cycle Pro。予約管理から顧客管理・売上分析までを一つにまとめ、日々の業務を効率化します。',
  body: `
<section class="hero"><img class="hero-image" src="${crop('lash-hero.jpg')}" alt="Lush Cycle Pro の画面">
<div class="hero-watermark"><div class="m" style="font-size:40px">Lush Cycle Pro</div></div>
<div class="inner"><nav class="breadcrumb"><a href="index.html">ホーム</a><span class="sep">›</span><a href="management.html">サロン運営の仕組み</a><span class="sep">›</span><span>Lush Cycle Pro</span></nav>
<div class="eyebrow">アイラッシュサロン Lucia がモデルとなった</div>
<h1><span class="en">Lush Cycle Pro</span></h1>
<p class="lead">現場の声から生まれた、アイリストのための経営管理システム。Lucia のサロン運営ノウハウを基盤に開発され、予約・顧客管理から売上分析まで日々の業務を一つにまとめます。</p>
</div></section>

<div class="award-band">${I.award}<div><div class="aw-title">Lark Master — Official Lark Japan</div><div class="aw-sub">Eyelash Salon Lucia のサロン運営ノウハウをモデルに開発されたシステムとして、公式 Lark Japan 主催の招待制イベント「Lark Master」にて発表されました。</div></div></div>

<section class="section"><div class="container">
${sectionHead({ label: '主な機能' })}
<div class="grid cols-4">
${iconCard('calendar', '予約管理', '予約・変更・キャンセルを一元管理。ダブルブッキングも防止します。')}
${iconCard('users', '顧客情報管理', 'お客様の情報・施術履歴を安全に管理し、リピートにつなげます。')}
${iconCard('doc', '同意書', '電子同意書でペーパーレス化。署名・保管をオンラインで完結。')}
${iconCard('eye', 'カルテ', '施術履歴・デザイン・写真を一元管理。次回提案も簡単に。')}
</div>
<div class="grid cols-3 mt-m">
${iconCard('chart', '売上管理', '売上・入金・メニュー別集計を自動化。日次・月次の確認がシンプルに。')}
${iconCard('search', '分析', '予約状況・顧客動向をグラフで可視化。データに基づく運営をサポート。')}
${iconCard('refresh', 'スタッフ共有', 'スタッフ間で情報・タスクを共有。チーム全体の連携と生産性を向上。')}
</div></div></section>

<section class="section soft"><div class="container">
${sectionHead({ label: '導入で得られること' })}
<div class="grid cols-3">
${iconCard('clock', '業務を効率化', '日々の管理業務を自動化し、施術やお客様対応に集中できます。')}
${iconCard('heart', '顧客満足度の向上', '履歴やデザインを把握して丁寧な接客。リピート率と信頼を高めます。')}
${iconCard('sprout', 'サロンの成長を支援', 'データに基づく改善で、売上アップと安定経営を実現します。')}
</div></div></section>

<section class="section"><div class="container"><div class="cta"><div class="ct"><h2>導入相談・デモのご案内</h2><p>サロンの規模や運営スタイルに合わせて、最適なプランをご提案します。お気軽にご相談ください。</p></div><div class="ca"><a class="btn primary lg" href="contact.html">導入相談をする</a><a class="btn lg line" href="${SITE.lineUrl}">${I.line}LINEで相談する</a></div></div></div></section>
`,
};

/* ====================== PRIVACY ====================== */
PAGES2['privacy.html'] = {
  active: '',
  title: 'プライバシーポリシー',
  desc: 'Lucia Eyelash Salon のプライバシーポリシー（個人情報保護方針）。',
  body: `
${heroCompact({ crumb: 'プライバシーポリシー', title: 'プライバシーポリシー', lead: 'Lucia Eyelash Salon（以下「当サロン」）は、お客様の個人情報の保護に努めます。', img: 'about-hero.jpg' })}
<section class="section"><div class="container prose">
<h2>1. 個人情報の取得について</h2><p>当サロンは、ご予約・お問い合わせ・施術の際に、お名前・連絡先・メールアドレス等の個人情報を、適法かつ公正な手段により取得します。</p>
<h2>2. 利用目的</h2><p>取得した個人情報は、ご予約の確認・施術のご案内・お問い合わせへの対応・サービス向上のための連絡に利用します。</p>
<h2>3. 第三者提供</h2><p>当サロンは、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。</p>
<h2>4. 安全管理</h2><p>個人情報への不正アクセス・紛失・漏えい等を防止するため、適切な安全管理措置を講じます。</p>
<h2>5. 開示・訂正・削除</h2><p>ご本人からの個人情報の開示・訂正・削除のご請求に対し、適切かつ速やかに対応します。</p>
<h2>6. お問い合わせ窓口</h2><p>本ポリシーに関するお問い合わせは、LINE よりご連絡ください。</p>
<p class="mt-m" style="font-size:12px;color:var(--muted)">制定日：2024年1月1日</p>
</div></section>
`,
};

export default PAGES2;
