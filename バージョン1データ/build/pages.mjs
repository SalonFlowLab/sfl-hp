import { I, SITE, sectionHead, heroCompact, ctaBand } from './layout.mjs';

const crop = (f) => `assets/images/crops/${f}`;

const iconCard = (icon, title, body) =>
  `<div class="icon-card"><div class="circle">${I[icon]}</div><h3>${title}</h3><p>${body}</p></div>`;

const step = (n, title, body) =>
  `<div class="step"><div class="badge">${n}</div><h3>${title}</h3><p>${body}</p></div>`;

const flowNode = (n, icon, title, body) =>
  `<div class="node"><div class="b">${I[icon]}<span class="n">${n}</span></div><h3>${title}</h3><p>${body}</p></div>`;

const gItem = (img, title, body) =>
  `<figure class="g-item"><img src="${crop(img)}" alt="${title}のデザイン"><figcaption class="cap"><h3>${title}</h3><p>${body}</p></figcaption></figure>`;

const priceRow = (name, sub, val, best) =>
  `<div class="price-row"><span class="pname">${name}${best ? '<span class="tag-best">人気No.1</span>' : ''}${sub ? `<small>${sub}</small>` : ''}</span><span class="pval">${val}</span></div>`;

const menuBlock = (img, badge, title, desc, rows) =>
  `<div class="menu-block"><div class="pic"><img src="${crop(img)}" alt="${title}"></div><div class="body"><span class="badge">${badge}</span><h3>${title}</h3><p>${desc}</p>${rows}</div></div>`;

const feature = (icon, title, items) =>
  `<div class="feature"><div class="ic">${I[icon]}</div><h3>${title}</h3><ul>${items.map((t) => `<li>${t}</li>`).join('')}</ul></div>`;

const PAGES = {};

/* ============================ HOME ============================ */
PAGES['index.html'] = {
  active: 'home',
  title: 'ホーム',
  desc: '滋賀・南草津のアイラッシュサロン Lucia（ルチア）。LEDマツエク・バインドロック・Lカールなど、目元の美しさを丁寧にご提案します。',
  body: `
<section class="lcpro-achievement" aria-labelledby="lcpro-title">
<div class="lcpro-achievement__visual" aria-hidden="true">
<picture>
<source srcset="assets/images/lash-cycle-pro-section.webp" type="image/webp">
<img src="assets/images/lash-cycle-pro-section.jpg" width="1672" height="941" alt="" loading="eager" decoding="async" fetchpriority="high">
</picture>
</div>
<div class="lcpro-achievement__sr-content">
<p>Lark Master 登壇実績</p>
<p>アイラッシュサロン Lucia がモデルとなった</p>
<h2 id="lcpro-title">Lush Cycle Pro</h2>
<p>次世代のアイラッシュサロン経営管理システム</p>
<p>Eyelash Salon Lucia のサロン運営ノウハウをもとに開発された「Lush Cycle Pro」は、公式 Lark Japan 主催の招待制イベント「Lark Master」にて、導入事例として紹介されました。</p>
</div>
</section>

<section class="section soft"><div class="container">
${sectionHead({ en: 'For Salon Owners', label: 'サロン開業・運営に関心のある方へ' })}
<p class="desc txt-center" style="max-width:38em;margin:0 auto 32px">Lucia の実績と仕組みを、スクール・システム・個別サポートの3つの形でご提供しています。</p>
<div class="home-owner-cards">
<a class="home-owner-card" href="for-owners.html#school"><small>School</small><h3>スクール</h3><p>技術・接客・カウンセリング・サロン運営まで一貫して学べるトータルサポートスクール。独立・開業を目指す方に。</p><span>スクールを見る →</span></a>
<a class="home-owner-card accent" href="lash-cycle-pro.html"><small>System</small><h3>Lush Cycle Pro</h3><p>Lucia が実際に使うサロン経営管理システム。顧客管理・売上分析・リピート設計を一元化し、即日稼働可能。</p><span>システムを見る →</span></a>
<a class="home-owner-card" href="consulting.html"><small>Consulting</small><h3>同業者向け相談</h3><p>実績に基づく伴走型サポート。何から始めればいいかわからない方もお気軽にご相談ください。</p><span>無料相談を見る →</span></a>
</div>
<div class="txt-center mt-m"><a class="btn primary" href="for-owners.html">開業・運営サポートの詳細を見る</a></div>
</div></section>

<section class="section"><div class="container">
${sectionHead({ en: 'Our Strength', label: 'Lucia の強み' })}
<div class="grid cols-3">
${iconCard('sparkle', 'LED施術認定店舗', '公式LED施術認定を取得。安全性と品質にこだわったLEDマツエクを提供します。')}
${iconCard('eye', 'LEDバインドロック・LEDマツエクが人気', 'まつ毛へのダメージを抑えながら圧倒的な持ちの良さを実現。お客様から多くのご支持をいただいています。')}
${iconCard('leaf', 'Lカールデザインも人気', '根元からしっかり立ち上げ、目元に立体感と華やかさをプラス。ぱっちりとした印象を求める方から人気のデザインです。')}
</div></div></section>

<section class="section soft"><div class="container">
${sectionHead({ label: 'ご予約・アクセス', h2: '南草津駅より徒歩10分' })}
<div class="access-band">
<div class="access-card"><h3>サロン情報</h3>
<table class="info-table"><tbody>
<tr><th>${I.pin}住所</th><td>${SITE.zip}<br>${SITE.addr}</td></tr>
<tr><th>${I.map}アクセス</th><td>${SITE.access}</td></tr>
<tr><th>${I.clock}営業時間</th><td>${SITE.hoursFull}</td></tr>
<tr><th>${I.calendar}定休日</th><td>不定休</td></tr>
</tbody></table>
<p class="mt-s" style="font-size:13px;color:var(--muted)">ご予約・お問い合わせは LINE または Instagram DM にてお気軽にどうぞ。</p></div>
<div class="access-photo"><img src="${crop('access-hero.jpg')}" alt="Lucia の店内" loading="lazy"></div>
</div></div></section>

<section class="section"><div class="container"><div class="split">
<div class="copy"><span class="label">Lucia の想い</span><h2>施術の時間だけでなく、次回のご来店まで美しさが続くように。</h2>
<p>私たちは、目元の美しさを「デザインする」だけでなく、まつ毛やライフスタイルに合わせて「育てる」ことを大切にしています。丁寧なカウンセリングと確かな技術で、あなたの魅力を引き出します。</p></div>
<div class="ph"><img src="${crop('home-eye.jpg')}" alt="アイラッシュの施術イメージ" loading="lazy"></div>
</div></div></section>
`,
};

/* ============================ ABOUT ============================ */
PAGES['about.html'] = {
  active: 'about',
  title: 'サロン紹介',
  desc: 'Lucia（ルチア）のコンセプト・想い・こだわり。洗練された技術と心地よいプライベート空間で、お一人おひとりの魅力を引き出します。',
  body: `
${heroCompact({ crumb: 'サロン紹介', title: 'サロン紹介', lead: 'Lucia は、洗練された技術と心地よいおもてなしで、お一人おひとりの魅力を引き出す特別な時間をご提供します。', img: 'about-hero.jpg' })}

<section class="section"><div class="container"><div class="split">
<div class="copy"><span class="label">Lucia について</span>
<p class="lead">上質な技術と心地よい空間で、あなた本来の美しさを引き出す。</p>
<p>「目元から、日常の美しさを整える」をコンセプトに、まつげと眉を専門とするプライベートサロンです。一人ひとりの骨格や雰囲気に寄り添い、自然で洗練された仕上がりを大切にしています。</p>
<p>毎日のメイクがもっと楽しく、鏡を見るたびに自信が持てるように。Lucia は、あなたの「なりたい自分」を叶えるパートナーでありたいと考えています。</p></div>
<div class="ph"><img src="${crop('about-eye.jpg')}" alt="目元の施術イメージ"></div></div></div></section>

<section class="section soft"><div class="container"><div class="split reverse">
<div class="ph"><img src="${crop('about-lifestyle.jpg')}" alt="リラックスした時間"></div>
<div class="copy"><span class="label">Lucia の想い</span>
<p>私たちは、ただ「美しくする」だけでなく、心まで満たされる時間をお届けしたいと考えています。丁寧なカウンセリングでお悩みやご希望に寄り添い、高い技術とセンスであなただけの美しさをカタチにします。</p>
<p>日々の中でふと鏡を見たときに、心がふっと軽くなるような——そんな体験を、Lucia で。</p></div></div></div></section>

<section class="section"><div class="container">
${sectionHead({ en: 'Our Value', label: 'Lucia のこだわり' })}
<div class="grid cols-4">
${iconCard('chat', '丁寧なカウンセリング', '目元の状態や理想のイメージを丁寧にお伺いし、最適なデザインをご提案します。')}
${iconCard('sparkle', 'LED施術が約9割', 'LEDマツエクを中心とした安全で持ちの良い施術を、ほぼ全ての施術で採用しています。')}
${iconCard('shield', '安心の衛生管理', '器具の消毒・滅菌を徹底し、清潔で安心していただける環境を整えています。')}
${iconCard('eye', 'LEDバインドロック・Lカールが人気', 'ダメージレスで圧倒的な持ちを誇るLEDバインドロックと、立体感を出すLカールが好評です。')}
</div></div></section>

<section class="section soft"><div class="container"><div class="split">
<div class="copy"><span class="label">プライベート空間</span><h2>落ち着いたプライベート空間</h2>
<p>ベージュとゴールドを基調とした上質な空間で、周りを気にせずリラックスしていただけます。ふと心がほどけるような特別な時間を、Lucia でお過ごしください。</p></div>
<div class="ph"><img src="${crop('about-room.jpg')}" alt="施術ルーム"></div></div></div></section>

<section class="section" id="staff"><div class="container">
${sectionHead({ en: 'Stylist', label: '施術者紹介' })}
<div class="staff-feature">
<div class="staff-feature-photo">
<img src="${crop('azumi.jpg')}" alt="小寺 あづみ — Lucia アイデザイナー">
</div>
<div>
<span class="label">Model Eyelist</span>
<h2 class="staff-name-en">azumi</h2>
<div class="staff-name-ja">小寺 あづみ</div>
<div class="staff-career">管理美容師 ／ アイラッシュ歴10年</div>
<div class="staff-stats">
<div class="ss-item"><strong>10年</strong>アイラッシュ歴</div>
<div class="ss-item"><strong>100名以上</strong>月間担当客数</div>
</div>
<p class="staff-bio">目元の美しさは、その人らしい魅力を引き出す大切なポイントだと考えています。丁寧なカウンセリングを通して、一人ひとりの理想や目元の特徴に寄り添い、持ちの良さと美しさを両立するデザインをご提案します。ナチュラルな仕上がりから、トレンド感のある束感デザインまで。毎日鏡を見るたびに、少し自信が持てるような目元づくりを心がけています。</p>
<div class="staff-detail">
<div class="dt-row"><div class="dk">得意デザイン</div><div class="dv">ナチュラルデザイン・束感デザイン・似合わせデザイン・まつげパーマ</div></div>
<div class="dt-row"><div class="dk">得意なこと</div><div class="dv">丁寧なカウンセリング・目元診断・持続力を考えた施術</div></div>
<div class="dt-row"><div class="dk">資格</div><div class="dv">管理美容師・各種施術資格の複数ディプロマ保有</div></div>
</div>
</div>
</div>
</div></section>

<section class="section soft"><div class="container">
${sectionHead({ label: 'Lucia の接客姿勢' })}
<div class="grid cols-3">
${iconCard('chat', '寄り添うカウンセリング', 'お悩みやご要望を丁寧に伺い、理想の目元を一緒に作り上げます。初めての方も安心してご相談ください。')}
${iconCard('sparkle', '似合うをご提案', '骨格・目の形・なりたい印象に合わせて、あなただけの"似合う"デザインをご提案します。')}
${iconCard('heart', '心地よい時間づくり', '落ち着いた空間で、ゆったりと施術を受けていただけるよう、おもてなしを大切にしています。')}
</div></div></section>

${ctaBand({ h2: 'あなたの魅力を、もっと輝かせるお手伝いを。', p: 'Lucia でお会いできることを、心より楽しみにしております。' })}
`,
};

/* ============================ MENU ============================ */
PAGES['menu.html'] = {
  active: 'menu',
  title: 'メニュー・料金',
  desc: 'Lucia のメニュー・料金一覧。LEDバインドロック・LEDマツエク・学生割引・リペアメニューも充実。価格はすべて税込です。',
  body: `
${heroCompact({ crumb: 'メニュー・料金', title: 'メニュー・料金', en: 'Menu &amp; Price', lead: 'ひとりひとりの目元とご希望に合わせ、最適なデザインと施術をご提案します。', img: 'menu-hero.jpg' })}
<style>.note-tag{font-size:12px;color:var(--muted);margin:4px 0 10px;}</style>

<section class="section tight"><div class="container">

<div class="menu-block"><div class="body"><span class="badge">LED EYELASH EXTENSION</span><h3>LEDバインドロック</h3><p>LED光で硬化するバインドロック技術。持ちの良さとダメージレスを両立した人気No.1メニューです。</p>
${priceRow('80束', '', '¥7,000')}
${priceRow('100束', '', '¥7,500')}
${priceRow('120束', '', '¥8,000')}
${priceRow('140束', '', '¥8,500')}
${priceRow('160束', '', '¥9,000')}
</div></div>

<div class="menu-block"><div class="body"><span class="badge">LED EYELASH EXTENSION</span><h3>LEDマツエク</h3><p>LEDで硬化するシングルラッシュ。自然な仕上がりと持ちの良さが特徴です。</p>
${priceRow('100本', '', '¥6,500')}
${priceRow('120本', '', '¥7,000')}
${priceRow('140本', '', '¥7,500')}
${priceRow('160本', '', '¥8,500')}
</div></div>

<div class="menu-block"><div class="body"><span class="badge">LED EYELASH EXTENSION</span><h3>LEDワンホンマツエク</h3><p>韓国発のワンホン技術をLEDで。ボリュームと自然さを兼ね備えたデザインです。</p>
${priceRow('120本', '', '¥8,200')}
${priceRow('140本', '', '¥8,700')}
${priceRow('160本', '', '¥9,200')}
</div></div>

<div class="menu-block"><div class="body"><span class="badge">REGULAR</span><h3>《通常》バインドロック</h3><p class="note-tag">※ご新規様のご予約はお受けしておりません</p>
${priceRow('100束', '', '¥7,200')}
${priceRow('120束', '', '¥7,700')}
${priceRow('140束', '', '¥8,200')}
</div></div>

<div class="menu-block"><div class="body"><span class="badge">STUDENT ONLY</span><h3>学生限定メニュー</h3><p>学生証のご提示でご利用いただける特別価格です。（社会人の方はご利用いただけません）</p>
${priceRow('LEDバインドロック 80束', '', '¥6,500')}
${priceRow('LEDバインドロック 100束', '', '¥7,000')}
${priceRow('LEDバインドロック 120束', '', '¥7,500')}
${priceRow('LEDマツエク 100本', '', '¥6,000')}
${priceRow('LEDマツエク 120本', '', '¥6,500')}
${priceRow('LEDマツエク 140本', '', '¥7,000')}
</div></div>

<div class="menu-block"><div class="body"><span class="badge">REPAIR</span><h3>リペア（付け足し）</h3><p class="note-tag">※他店施術のリペアはお受けしておりません</p>
${priceRow('LEDバインドロック', '目安40〜50束', '¥4,700')}
${priceRow('LEDマツエク', '目安45〜55本', '¥4,200')}
${priceRow('《通常》バインドロック', '目安40〜50束', '¥4,000')}
</div></div>

<p class="txt-center" style="font-size:12px;color:var(--muted)">※表示価格はすべて税込です。デザインや本数はカウンセリングのうえ決定いたします。</p>
</div></section>

<section class="section soft"><div class="container"><div class="grid cols-3">
<div class="card"><h3>初めての方へ</h3><p>はじめての方も、カウンセリングで目元の状態やご希望を丁寧にお伺いしてから施術いたします。</p></div>
<div class="card"><h3>施術時間の目安</h3><p>LEDバインドロック 約85〜145分／LEDマツエク 約85〜115分／リペア 約55分が目安です。</p></div>
<div class="card"><h3>ご予約前の注意事項</h3><p>当日はマスカラ・ビューラーを控えめに。コンタクトは外しての施術をおすすめします。</p></div>
</div></div></section>

${ctaBand({ h2: '理想の目元で、毎日をもっと美しく。', p: 'ご予約・ご相談はお気軽にどうぞ。' })}
`,
};

/* ============================ WORKS ============================ */
const workCard = (cat, key, img, body, spec) =>
  `<div class="work-card" data-cat="${key}"><img src="${crop(img)}" alt="${cat}の施術事例"><div class="wc"><h3>${cat}</h3><p>${body}</p><div class="spec">${spec}</div></div></div>`;

const starSvg =
  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3.2l2.5 5.4 5.9.6-4.4 4 1.2 5.8L12 17.8 6.8 19l1.2-5.8-4.4-4 5.9-.6z"/></svg>';
const voice = (title, body, who) =>
  `<div class="voice"><div class="stars" role="img" aria-label="5つ星評価">${starSvg.repeat(5)}</div><h3>${title}</h3><p>${body}</p><div class="who">${who}</div></div>`;

PAGES['works.html'] = {
  active: 'works',
  title: '施術事例',
  desc: 'Lucia の施術事例ギャラリー。ナチュラル・上品・ラッシュリフト・アイブロウなど、目元デザインの実例とお客様の声をご紹介します。',
  body: `
${heroCompact({ crumb: '施術事例', title: '施術事例', lead: 'Lucia がご提案する目元デザインの実例です。繊細で洗練されたデザインの数々をご覧ください。', img: 'works-hero.jpg' })}

<section class="section"><div class="container">
${sectionHead({ en: 'Gallery', label: 'デザインギャラリー' })}
<div class="filter" data-filter>
<button class="active" data-cat="all">すべて</button>
<button data-cat="natural">ナチュラル</button>
<button data-cat="elegant">上品</button>
<button data-cat="lift">ラッシュリフト</button>
<button data-cat="brow">アイブロウ</button>
</div>
<div class="work-grid">
${workCard('ナチュラル', 'natural', 'home-eye.jpg', '自然な美しさを引き出す柔らかな印象。', 'Cカール／0.15mm／9〜11mm')}
${workCard('上品', 'elegant', 'menu-eye-2.jpg', '上向きカールで華やかな大人の印象に。', 'Dカール／0.10mm／10〜12mm')}
${workCard('ラッシュリフト', 'lift', 'menu-eye-3.jpg', '根元から立ち上げ、ぱっちりとした目元に。', 'カールデザイン／上下')}
${workCard('アイブロウ', 'brow', 'about-eye.jpg', 'ふんわりとした毛流れで自然な印象に。', 'ストレートライン／WAX込')}
${workCard('ナチュラル', 'natural', 'menu-eye-1.jpg', 'デカ目に頼らない、抜け感のあるナチュラル。', 'Cカール／0.12mm／8〜11mm')}
${workCard('上品', 'elegant', 'home-eye.jpg', '目尻に長さを足し、洗練された目元へ。', 'CCカール／0.15mm／11〜13mm')}
${workCard('ラッシュリフト', 'lift', 'menu-eye-2.jpg', '自まつ毛を生かした、ナチュラルなカール。', 'ナチュラルカール／上のみ')}
${workCard('アイブロウ', 'brow', 'menu-eye-3.jpg', '骨格を整え、顔全体の印象を美しく。', 'デザインスタイリング／カラー')}
</div>
<p class="txt-center mt-m" style="font-size:12px;color:var(--muted)">※効果・仕上がりには個人差があります。デザインや本数はカウンセリングのうえご提案・決定いたします。</p>
</div></section>

<section class="section soft"><div class="container">
${sectionHead({ en: 'Voice', label: 'お客様の声' })}
<div class="voices">
${voice('自然で上品な仕上がりに感動', 'なりたい印象を丁寧にカウンセリングしてくださり、ナチュラルなのに目元の印象が変わりました。毎日のメイクがとても楽になりました。', '30代・会社員')}
${voice('持ちが良くて大満足です', 'まつ毛の状態も丁寧に説明してくれて安心でした。仕上がりも持ちも良く、定期的に通っています。', '20代・会社員')}
${voice('眉でこんなに変わるなんて', 'アイブロウのデザインを変えただけで顔全体の印象がすっきり。併せてお願いして本当によかったです。', '40代・主婦')}
</div></div></section>

${ctaBand({ h2: 'あなたに似合う目元デザインを、Lucia で。', p: 'ご予約・空き状況のご確認はこちらから。' })}
`,
};

/* ============================ STAFF ============================ */
PAGES['staff.html'] = {
  active: 'staff',
  title: 'スタッフ',
  desc: 'Lucia のアイデザイナー・小寺あづみ。管理美容師・アイラッシュ歴10年。月100名以上のお客様を担当する現役アイリストが、あなたの理想の目元を丁寧に叶えます。',
  body: `
${heroCompact({ crumb: 'スタッフ', title: 'スタッフ紹介', lead: '一人ひとりの目元と向き合い、あなたの「なりたい」を丁寧に形にします。', img: 'staff-hero.jpg' })}

<section class="section"><div class="container">
<div class="staff-feature">
<div class="staff-feature-photo">
<img src="${crop('azumi.jpg')}" alt="小寺 あづみ — Lucia アイデザイナー">
</div>
<div>
<span class="label">Model Eyelist</span>
<h2 class="staff-name-en">azumi</h2>
<div class="staff-name-ja">小寺 あづみ</div>
<div class="staff-career">管理美容師 ／ アイラッシュ歴10年</div>
<div class="staff-stats">
<div class="ss-item"><strong>10年</strong>アイラッシュ歴</div>
<div class="ss-item"><strong>100名以上</strong>月間担当客数</div>
</div>
<p class="staff-bio">目元の美しさは、その人らしい魅力を引き出す大切なポイントだと考えています。丁寧なカウンセリングを通して、一人ひとりの理想や目元の特徴に寄り添い、持ちの良さと美しさを両立するデザインをご提案します。ナチュラルな仕上がりから、トレンド感のある束感デザインまで。毎日鏡を見るたびに、少し自信が持てるような目元づくりを心がけています。</p>
<div class="staff-detail">
<div class="dt-row"><div class="dk">得意デザイン</div><div class="dv">ナチュラルデザイン・束感デザイン・似合わせデザイン・まつげパーマ</div></div>
<div class="dt-row"><div class="dk">得意なこと</div><div class="dv">丁寧なカウンセリング・目元診断・持続力を考えた施術</div></div>
<div class="dt-row"><div class="dk">資格</div><div class="dv">管理美容師・各種施術資格の複数ディプロマ保有</div></div>
</div>
</div>
</div>
</div></section>

<section class="section soft"><div class="container">
${sectionHead({ label: 'Lucia の接客姿勢' })}
<div class="grid cols-3">
${iconCard('chat', '寄り添うカウンセリング', 'お悩みやご要望を丁寧に伺い、理想の目元を一緒に作り上げます。初めての方も安心してご相談ください。')}
${iconCard('sparkle', '似合うをご提案', '骨格・目の形・なりたい印象に合わせて、あなただけの"似合う"デザインをご提案します。')}
${iconCard('heart', '心地よい時間づくり', '落ち着いた空間で、ゆったりと施術を受けていただけるよう、おもてなしを大切にしています。')}
</div></div></section>

${ctaBand({ h2: 'あなたの理想の目元を、azumi が叶えます。', p: 'ご予約・ご相談はお気軽にどうぞ。' })}
`,
};

export default PAGES;
