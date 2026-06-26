// Shared layout, icons and helpers for the Lucia static site generator.

export const SITE = {
  tel: '',
  hours: '9:00〜18:30',
  hoursFull: '9:00〜18:30（不定休）',
  email: '',
  zip: '〒525-0058',
  addr: '滋賀県草津市野路町3001 日替わりサロンtally内',
  access: 'JR南草津駅より徒歩10分・駐車場2台完備',
  lineUrl: 'https://line.me/R/ti/p/@427yvnxn',
  businessLineUrl: 'https://lin.ee/oEVKAsJ',
  instaUrl: 'https://www.instagram.com/azm.eyelash/',
  mapsUrl: 'https://maps.google.com/maps?q=%E6%BB%8B%E8%B3%80%E7%9C%8C%E8%8D%89%E6%B4%A5%E5%B8%82%E9%87%8E%E8%B7%AF%E7%94%BA3001&t=m&z=16&ie=UTF8&iwloc=&output=embed',
  mapsLink: 'https://maps.google.com/maps?q=滋賀県草津市野路町3001',
  siteUrl: 'https://lucia-hp.web.app',
  ogImage: 'https://lucia-hp.web.app/assets/images/lash-cycle-pro-section.jpg',
};

// ---- Inline SVG icons (stroke = currentColor unless noted) ----
const s = (body, extra = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${body}</svg>`;

export const I = {
  line:
    '<svg class="ico-line" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3.2c-5.4 0-9.8 3.5-9.8 7.9 0 3.9 3.5 7.2 8.2 7.8.32.07.76.21.87.49.1.25.07.64.03.89l-.14.84c-.04.25-.2.98.86.53 1.06-.45 5.7-3.36 7.78-5.75 1.43-1.57 2.12-3.17 2.12-5.62 0-4.36-4.4-7.9-9.99-7.9Z"/></svg>',
  instagram: s('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/>'),
  menu: s('<line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/>'),
  close: s('<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>'),
  phone: s('<path d="M5 4h3l1.6 4.2-2 1.3a12 12 0 0 0 5.6 5.6l1.3-2L18 16v3a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2Z"/>'),
  pin: s('<path d="M12 21s7-5.6 7-11a7 7 0 0 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>'),
  clock: s('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
  mail: s('<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m4 7 8 6 8-6"/>'),
  calendar: s('<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M8 3v4M16 3v4"/>'),
  chat: s('<path d="M4 5h16v11H9l-4 3.5V16H4Z"/><path d="M8 9.5h8M8 12.5h5"/>'),
  eye: s('<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="2.6"/>'),
  users: s('<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5.5a3 3 0 0 1 0 5.4M16.5 20a6 6 0 0 0-2.2-4.6"/>'),
  shield: s('<path d="M12 3 5 6v5c0 4.5 3 7.6 7 9 4-1.4 7-4.5 7-9V6Z"/><path d="m9 12 2 2 4-4"/>'),
  heart: s('<path d="M12 20s-7-4.5-7-9.5A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7-2.5C19 10.5 12 20 12 20Z"/>'),
  chart: s('<path d="M4 20V4M4 20h16"/><rect x="7" y="12" width="2.8" height="5"/><rect x="12" y="8" width="2.8" height="9"/><rect x="17" y="10" width="2.8" height="7"/>'),
  sparkle: s('<path d="M12 3.5 13.8 9 19.5 11 13.8 13 12 20.5 10.2 13 4.5 11 10.2 9Z"/>'),
  book: s('<path d="M4 5.5A2 2 0 0 1 6 4h6v15H6a2 2 0 0 0-2 1.2Z"/><path d="M20 5.5A2 2 0 0 0 18 4h-6v15h6a2 2 0 0 1 2 1.2Z"/>'),
  award: s('<circle cx="12" cy="9" r="5"/><path d="m8.5 13-1.5 7 5-2.6 5 2.6-1.5-7"/>'),
  leaf: s('<path d="M4 20c0-9 6-14 16-15-1 10-6 16-15 16a8 8 0 0 1-1 0Z"/><path d="M8 16c3-3 6-5 10-7"/>'),
  monitor: s('<rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M8 20h8M12 16.5V20"/>'),
  smartphone: s('<rect x="7" y="3" width="10" height="18" rx="2.5"/><line x1="11" y1="18" x2="13" y2="18"/>'),
  refresh: s('<path d="M20 11a8 8 0 0 0-14-4l-2 2"/><path d="M4 6v3h3"/><path d="M4 13a8 8 0 0 0 14 4l2-2"/><path d="M20 18v-3h-3"/>'),
  lightbulb: s('<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 1 4 10.5c-.7.7-1 1.3-1 2.5H9c0-1.2-.3-1.8-1-2.5A6 6 0 0 1 12 3Z"/>'),
  doc: s('<path d="M7 3h7l4 4v14H7Z"/><path d="M14 3v4h4"/><path d="M10 13h6M10 16h6"/>'),
  card: s('<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/>'),
  scissors: s('<circle cx="6" cy="7" r="2.4"/><circle cx="6" cy="17" r="2.4"/><path d="M8 8.5 20 18M8 15.5 20 6"/>'),
  palette: s('<path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-1 2-2 0-1.5 1-2 2.2-2H18a3 3 0 0 0 3-3c0-5-4-9-9-9Z"/><circle cx="7.5" cy="11" r="1"/><circle cx="11" cy="7.5" r="1"/><circle cx="15.5" cy="8.5" r="1"/>'),
  megaphone: s('<path d="M4 10v4l9 4V6Z"/><path d="M4 10H3v4h1"/><path d="M16 8a4 4 0 0 1 0 8"/>'),
  search: s('<circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/>'),
  bell: s('<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 20a2 2 0 0 0 4 0"/>'),
  check: s('<path d="m5 12 4 4 10-11"/>'),
  arrow: s('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  map: s('<path d="m9 4 6 2 5-2v14l-5 2-6-2-5 2V6Z"/><path d="M9 4v14M15 6v14"/>'),
  sprout: s('<path d="M12 21v-7"/><path d="M12 14c0-3 2-5 6-5 0 3-2 5-6 5Z"/><path d="M12 14c0-3-2-5-6-5 0 3 2 5 6 5Z"/>'),
  lark: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2 L22 8 L16 9.5 L12 21 L8 9.5 L2 8 Z"/><path d="M12 2 L14.5 0 L13 1.5 Z"/></svg>',
};

// ---- Navigation ----
export const NAV = [
  ['index.html', 'ホーム', 'home'],
  ['about.html', 'サロン紹介', 'about'],
  ['menu.html', 'メニュー', 'menu'],
  ['reservation.html', 'ご予約・来店案内', 'reservation'],
];

const OWNER_ACTIVE_KEYS = new Set(['management', 'lash-cycle-pro', 'ai-tools', 'consulting', 'for-owners', 'school']);

const FOOTER_LINKS = [
  ['index.html', 'ホーム'],
  ['about.html', 'サロン紹介'],
  ['menu.html', 'メニュー・料金'],
  ['reservation.html', 'ご予約・来店案内'],
  ['for-owners.html', '開業・運営サポート'],
  ['lash-cycle-pro.html', 'Lush Cycle Pro'],
  ['ai-tools.html', 'AI・Lark活用'],
  ['management.html', 'サロン運営の仕組み'],
  ['consulting.html', '同業者向け相談'],
  ['for-owners.html#school', 'スクール'],
  ['access.html', 'アクセス'],
  ['contact.html', 'お問い合わせ'],
  ['privacy.html', 'プライバシーポリシー'],
];

export const brand = () =>
  '<a class="brand" href="index.html"><img src="assets/images/logo.jpg" alt="Lucia" class="brand-logo"><span class="brand-text"><span class="brand-mark">Eyelash Salon</span><span class="brand-sub">Lucia</span></span></a>';

const btnReserve = (cls = 'btn small primary') =>
  `<a class="${cls}" href="reservation.html">ご予約はこちら</a>`;
const btnLine = (cls = 'btn small line') =>
  `<a class="${cls}" href="${SITE.lineUrl}">${I.line}LINEで予約・相談する</a>`;
const btnBusinessLine = (cls = 'btn small business') =>
  `<a class="${cls}" href="${SITE.businessLineUrl}">${I.line}事業者様向けLINE</a>`;

export function header(active) {
  const links = NAV.map(
    ([href, label, key]) =>
      `<a href="${href}"${key === active ? ' class="active"' : ''}>${label}</a>`
  ).join('');
  const ownerActive = OWNER_ACTIVE_KEYS.has(active);
  const dropdown = `<div class="nav-dropdown"><a href="for-owners.html" class="nav-dd-trigger${ownerActive ? ' active' : ''}">開業・運営サポート<svg class="dd-caret" viewBox="0 0 10 6" aria-hidden="true"><polyline points="1,1 5,5 9,1"/></svg></a><ul class="nav-dd-menu"><li><a href="lash-cycle-pro.html">Lush Cycle Pro</a></li><li><a href="ai-tools.html">AI・Lark活用</a></li><li><a href="management.html">サロン運営の仕組み</a></li><li><a href="consulting.html">同業者向け相談</a></li><li><a href="for-owners.html#school">スクール</a></li></ul></div>`;
  const drawerLinks = NAV.map(([href, label]) => `<a href="${href}">${label}</a>`).join('') +
    `<div class="d-label">開業・運営サポート</div><a href="for-owners.html" class="d-sub">サポートTOP</a><a href="lash-cycle-pro.html" class="d-sub">Lush Cycle Pro</a><a href="ai-tools.html" class="d-sub">AI・Lark活用</a><a href="management.html" class="d-sub">サロン運営の仕組み</a><a href="consulting.html" class="d-sub">同業者向け相談</a><a href="for-owners.html#school" class="d-sub">スクール</a><a href="access.html">アクセス</a><a href="contact.html">お問い合わせ</a>`;
  return `<header class="site-header"><div class="nav-wrap">${brand()}
<nav class="nav">${links}${dropdown}</nav>
<div class="header-actions">${btnBusinessLine()}${btnLine()}</div>
<button class="mobile-toggle" aria-label="メニューを開く" data-open-drawer>${I.menu}</button>
</div></header>
<div class="drawer" data-drawer><div class="drawer-panel"><button class="d-close" aria-label="閉じる" data-close-drawer>${I.close}</button>${drawerLinks}<div class="d-actions">${btnBusinessLine('btn business')}${btnLine('btn line')}</div></div></div>`;
}

export function footer() {
  const links = FOOTER_LINKS.map(([h, l]) => `<a href="${h}">${l}</a>`).join('');
  return `<footer class="site-footer"><div class="container-wide footer-grid">
<div class="footer-brand">${brand()}
<p class="addr">${SITE.zip}<br>${SITE.addr}<br>営業時間 ${SITE.hoursFull}<br>定休日 不定休</p></div>
<nav class="footer-nav">${links}</nav>
<div class="footer-contact"><div class="footer-btn-group"><a class="btn business" href="${SITE.businessLineUrl}">${I.line}事業者様向けLINE</a><a class="btn line" href="${SITE.lineUrl}">${I.line}LINEで予約・相談する</a></div>
<div class="socials"><a href="${SITE.lineUrl}" aria-label="LINE">${I.chat}</a><a href="${SITE.instaUrl}" aria-label="Instagram">${I.instagram}</a></div></div>
</div><p class="copyright">© <span data-year></span> Eyelash Salon Lucia. All Rights Reserved.</p></footer>`;
}

export function page({ active, title, desc, body }, file = 'index.html') {
  const fullTitle = `${title} | Eyelash Salon Lucia`;
  const pageUrl = `${SITE.siteUrl}/${file === 'index.html' ? '' : file}`;
  const ogImg = SITE.ogImage;
  const isHome = file === 'index.html';

  const jsonLd = isHome
    ? `<script type="application/ld+json">{"@context":"https://schema.org","@type":"BeautySalon","name":"Eyelash Salon Lucia","description":"${desc}","address":{"@type":"PostalAddress","streetAddress":"野路町3001 日替わりサロンtally内","addressLocality":"草津市","addressRegion":"滋賀県","postalCode":"525-0058","addressCountry":"JP"},"url":"${SITE.siteUrl}/","image":"${ogImg}","sameAs":["${SITE.instaUrl}","${SITE.lineUrl}"],"openingHoursSpecification":{"@type":"OpeningHoursSpecification","opens":"09:00","closes":"18:30"}}</script>`
    : `<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"${fullTitle}","description":"${desc}","url":"${pageUrl}","isPartOf":{"@type":"WebSite","url":"${SITE.siteUrl}/","name":"Eyelash Salon Lucia"}}</script>`;

  const lcpPreload = isHome
    ? `<link rel="preload" as="image" type="image/webp" href="assets/images/lash-cycle-pro-section.webp">`
    : '';

  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="format-detection" content="telephone=no,address=no,email=no">
<meta name="theme-color" content="#b08a4f">
<title>${fullTitle}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${pageUrl}">
<meta property="og:type" content="${isHome ? 'website' : 'article'}">
<meta property="og:title" content="${fullTitle}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${pageUrl}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1672">
<meta property="og:image:height" content="941">
<meta property="og:image:alt" content="Lark Master 登壇 — Eyelash Salon Lucia">
<meta property="og:site_name" content="Eyelash Salon Lucia">
<meta property="og:locale" content="ja_JP">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${fullTitle}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${ogImg}">
${jsonLd}
<link rel="icon" href="assets/images/favicon.svg" type="image/svg+xml">
${lcpPreload}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Shippori+Mincho:wght@400;500;600&family=Noto+Sans+JP:wght@300;400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
<div class="page">
${header(active)}
${body}
${footer()}
</div>
<script src="assets/js/main.js" defer></script>
</body>
</html>`;
}

// ---- Small composition helpers used across pages ----
export const heroCompact = ({ active, crumb, title, lead, img, eyebrow, watermark = false, en }) => {
  const trail = `<nav class="breadcrumb"><a href="index.html">ホーム</a><span class="sep">›</span><span>${crumb}</span></nav>`;
  return `<section class="hero compact"><img class="hero-image" src="assets/images/crops/${img}" alt="">
${watermark ? '<div class="hero-watermark"><div class="m">Lucia</div><div class="s">Eyelash Salon</div></div>' : ''}
<div class="inner">${trail}${eyebrow ? `<div class="eyebrow">${eyebrow}</div>` : ''}<h1>${title}${en ? ` <span class="en">${en}</span>` : ''}</h1><p class="lead">${lead}</p></div></section>`;
};

export const sectionHead = ({ label, en, h2, desc }) =>
  `<div class="section-head">${en ? `<span class="eyebrow-en">${en}</span>` : ''}${label ? `<span class="label">${label}</span>` : ''}${h2 ? `<h2>${h2}</h2>` : ''}${desc ? `<p class="desc">${desc}</p>` : ''}</div>`;

export const ctaBand = ({ h2, p }) =>
  `<section class="section soft"><div class="container"><div class="cta"><div class="ct"><h2>${h2}</h2><p>${p}</p></div><div class="ca"><a class="btn lg line" href="${SITE.lineUrl}">${I.line}LINEで予約・相談する</a></div></div></div></section>`;
