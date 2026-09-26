/* 合同会社SFL サイト共通UI
   - ヘッダー / ドロワー / フッター（[data-site-header] [data-site-footer]）
   - 共通部品（[data-sfl="businesses|courses|records|flow"]）
   - セクション登場アニメーション（[data-reveal]）
   - 計測イベント（gtag があるときだけ送信）
   データは data.js の window.SFL を参照する。data.js → site.js の順で読み込むこと。 */
(() => {
  const SFL = window.SFL;
  if (!SFL) return;
  document.documentElement.classList.add('js');

  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ext = 'target="_blank" rel="noopener noreferrer"';
  const arrow = (external) => '<span class="arrow" aria-hidden="true">' + (external ? '↗' : '→') + '</span>';
  const linkAttrs = (item) => 'href="' + esc(item.href) + '"' + (item.external ? ' ' + ext : '');
  const newTab = (external) => (external ? '<span class="visually-hidden">（新しいタブで開く）</span>' : '');

  /* ---------- Header / Drawer ---------- */
  const active = document.body.dataset.active || '';
  const navLinks = SFL.nav.map((item) => '<a href="' + item.href + '"' + (item.key === active ? ' aria-current="page"' : '') + '>' + esc(item.label) + '</a>').join('');

  const header = document.querySelector('[data-site-header]');
  if (header) {
    header.outerHTML = ''
      + '<a class="skip-link" href="#main">本文へスキップ</a>'
      + '<header class="site-header"><div class="shell site-header-inner">'
      + '<a class="brand" href="/" aria-label="合同会社SFL ホーム"><img src="/assets/site/img/sfl-logo.jpg" alt="" width="44" height="44"><span><strong>合同会社SFL</strong><small>Lark・AI・官公庁入札</small></span></a>'
      + '<nav class="global-nav" aria-label="メインナビゲーション">' + navLinks + '</nav>'
      + '<a class="button button-primary button-small header-cta" href="/contact/">60分無料相談' + arrow() + '</a>'
      + '<button class="menu-button" type="button" aria-expanded="false" aria-controls="site-drawer" aria-label="メニューを開く"><span></span><span></span><span></span></button>'
      + '</div></header>'
      + '<div class="drawer" id="site-drawer" hidden><nav aria-label="モバイルナビゲーション">'
      + '<a href="/">ホーム<span aria-hidden="true">→</span></a>'
      + SFL.nav.map((item) => '<a href="' + item.href + '"' + (item.key === active ? ' aria-current="page"' : '') + '>' + esc(item.label) + '<span aria-hidden="true">→</span></a>').join('')
      + '<a href="' + SFL.urls.note + '" ' + ext + '>SFL公式note<span aria-hidden="true">↗</span></a>'
      + '</nav><a class="button button-primary" href="/contact/">60分無料相談' + arrow() + '</a></div>';

    const button = document.querySelector('.menu-button');
    const drawer = document.getElementById('site-drawer');
    const setOpen = (open) => {
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      drawer.hidden = !open;
      document.body.classList.toggle('drawer-open', open);
    };
    button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
    drawer.addEventListener('click', (event) => { if (event.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !drawer.hidden) { setOpen(false); button.focus(); }
    });
    window.matchMedia('(min-width: 1081px)').addEventListener('change', (event) => { if (event.matches) setOpen(false); });
  }

  /* ---------- Footer ---------- */
  const footer = document.querySelector('[data-site-footer]');
  if (footer) {
    const col = (title, items) => '<div class="footer-col"><h2>' + title + '</h2><ul>'
      + items.map((item) => '<li><a ' + linkAttrs(item) + '>' + esc(item.label) + (item.external ? ' ↗' + newTab(true) : '') + '</a></li>').join('')
      + '</ul></div>';
    const c = SFL.company;
    footer.outerHTML = '<footer class="site-footer"><div class="shell footer-main">'
      + '<div class="footer-brand">'
      + '<a class="brand" href="/"><img src="/assets/site/img/sfl-logo.jpg" alt="" width="44" height="44" loading="lazy"><span><strong>合同会社SFL</strong><small>LARK / AI / PUBLIC PROCUREMENT</small></span></a>'
      + '<p>Larkを軸に、業務改善・構築・教育・伴走支援を提供。AI・官公庁入札の事業にも取り組んでいます。</p>'
      + '<address>' + esc(c.postal) + '<br>' + esc(c.address) + '</address>'
      + '<p class="note" style="color:rgba(255,255,255,.75)">合同会社SFLはLark Japanの代理店ではありません。</p>'
      + '<div class="footer-actions"><a href="' + SFL.urls.note + '" ' + ext + '>SFL公式note ↗</a></div>'
      + '</div>'
      + col('BUSINESS', [
        { href: '/services/#lark', label: 'Lark事業' },
        { href: '/services/#ai', label: 'AI事業' },
        { href: '/services/#public-procurement', label: '官公庁入札事業' },
        { href: '/services/#corporate-training', label: '法人研修' },
        { href: '/courses/', label: '個人向け講座' },
        { href: '/services/#service-list', label: 'ご相談いただけるサービス' },
        { href: '/reskilling-subsidy-simulator/', label: '人材開発支援助成金の費用試算' }
      ])
      + col('COMPANY', [
        { href: '/company/', label: '会社案内・代表メッセージ' },
        { href: '/case-study/', label: '実績・事例' },
        { href: '/instructors/', label: '講師・支援体制' },
        { href: '/support-policy/', label: '支援・契約・データ取扱いガイド' },
        { href: '/information-security-policy/', label: '情報セキュリティ基本方針' },
        { href: '/privacy/', label: 'プライバシーポリシー' }
      ])
      + col('CONTACT', [
        { href: '/contact/', label: '60分無料相談・お問い合わせ' },
        { href: SFL.urls.contactForm, label: '法人の相談フォーム', external: true },
        { href: SFL.urls.line, label: 'LINEで業務の相談（個人事業主）', external: true },
        { href: '/courses/#entry', label: '個人向け講座の受講について' },
        { href: SFL.urls.larkRegister, label: 'Lark公式｜アカウント登録', external: true }
      ])
      + '</div><div class="shell footer-bottom"><p>法人番号 ' + esc(c.corporateNumber) + '</p><p>© 2026 SFL LLC.</p></div></footer>';
  }

  /* ---------- Shared components ---------- */
  const render = {
    businesses: () => SFL.businesses.map((b) => ''
      + '<a class="card card-link business-card" id="business-' + b.id + '" href="' + b.href + '" data-reveal>'
      + '<div class="card-head"><span class="card-num">' + b.number + '</span><span class="en">' + b.en + '</span></div>'
      + '<h3>' + esc(b.name) + '</h3><p>' + esc(b.summary) + '</p>'
      + '<div class="card-foot"><span class="text-link">' + esc(b.action) + arrow() + '</span></div></a>').join(''),

    courses: (el) => SFL.courses.filter((course) => !el.dataset.group || course.group === el.dataset.group).map((course) => ''
      + '<article class="card course-card" id="course-' + course.id + '" data-reveal>'
      + '<div class="card-head"><span class="tag">' + esc(course.topic) + '</span>' + (course.status ? '<span class="course-status">' + esc(course.status) + '</span>' : '') + '</div>'
      + '<h3>' + esc(course.name) + '</h3><p>' + esc(course.description) + '</p>'
      + '<div class="card-foot"><a class="text-link" ' + linkAttrs(course) + '>' + esc(course.action) + arrow(course.external) + newTab(course.external) + '</a></div></article>').join(''),


    records: () => SFL.records.map((r) => ''
      + '<article class="card record-card" id="record-' + r.id + '" data-reveal>'
      + '<span class="tag tag-outline">' + esc(r.category) + '</span>'
      + '<h3>' + esc(r.title) + '</h3><p class="record-result">' + esc(r.result) + '</p><p>' + esc(r.description) + '</p></article>').join(''),

    flow: () => {
      const f = SFL.flow;
      const node = (n) => '<div class="flow-node"><span class="flow-step">' + n.step + '</span><h3>' + esc(n.title) + '</h3><span class="flow-meta">' + esc(n.meta) + '</span><p>' + esc(n.text) + '</p></div>';
      return '<div class="flow" role="group" aria-label="無料相談からご提案までの流れ">'
        + '<div class="flow-main">' + node(f.main[0]) + '<div class="flow-arrow" aria-hidden="true"></div>' + node(f.main[1]) + '</div>'
        + '<div class="flow-branch-wrap"><div class="flow-branch-line" aria-hidden="true"></div>'
        + '<div class="flow-branch"><span class="tag tag-outline">' + esc(f.branch.tag) + '</span><h3>' + esc(f.branch.title) + '</h3><p>' + esc(f.branch.text) + '</p></div></div>'
        + '<p class="flow-caption">標準の流れは「無料相談 → ご提案・お見積もり」。業務整理はご希望の方だけが選べる、任意の有料メニューです。</p>'
        + '</div>';
    }
  };
  document.querySelectorAll('[data-sfl]').forEach((el) => {
    const fn = render[el.dataset.sfl];
    if (fn) el.innerHTML = fn(el);
  });

  /* ---------- Reveal on scroll ---------- */
  const revealTargets = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Analytics（リンク先のパスのみ送る。クエリや入力値は送らない） ---------- */
  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target.closest('a') : null;
    if (!target || typeof window.gtag !== 'function') return;
    const href = target.getAttribute('href') || '';
    const name = target.dataset.analyticsEvent
      || (href.includes('lin.ee') ? 'line_button_click' : '')
      || (href.includes('/share/base/form/') ? 'contact_form_open' : '')
      || (href.startsWith('/contact') ? 'free_consultation_start' : '');
    if (!name) return;
    let linkUrl;
    try { const u = new URL(href, location.origin); linkUrl = u.origin + u.pathname; } catch (e) { /* noop */ }
    window.gtag('event', name, { link_url: linkUrl, page_path: location.pathname, transport_type: 'beacon' });
  });
})();
