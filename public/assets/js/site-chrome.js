(() => {
  const lineSvg = '<svg class="ico-line" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3.2c-5.4 0-9.8 3.5-9.8 7.9 0 3.9 3.5 7.2 8.2 7.8.32.07.76.21.87.49.1.25.07.64.03.89l-.14.84c-.04.25-.2.98.86.53 1.06-.45 5.7-3.36 7.78-5.75 1.43-1.57 2.12-3.17 2.12-5.62 0-4.36-4.4-7.9-9.99-7.9Z"/></svg>';
  const navItems = [
    { slug: '01-top', label: 'ホーム', key: 'home' },
    { slug: '02-salon', label: 'サロン紹介', key: 'salon' },
    { slug: '03-menu-price', label: 'メニュー', key: 'menu' },
    { slug: '04-reservation', label: 'ご予約・来店案内', key: 'reservation' },
  ];
  const ownerKeys = new Set(['support', 'school', 'operation', 'lcp', 'ai', 'consulting']);
  const ownerItems = [
    { slug: '08-management-system', label: 'サロン運営システム', key: 'lcp' },
    { slug: '13-ai-tools', label: 'AI・業務ツール活用', key: 'ai' },
    { slug: '07-operation-system', label: 'サロン運営の仕組み', key: 'operation' },
    { slug: '09-consulting', label: '同業者向け相談', key: 'consulting' },
    { slug: '06-school', label: 'スクール', key: 'school' },
  ];
  const footerItems = [
    { slug: '01-top', label: 'ホーム' },
    { slug: '02-salon', label: 'サロン紹介' },
    { slug: '03-menu-price', label: 'メニュー・料金' },
    { slug: '04-reservation', label: 'ご予約・来店案内' },
    { slug: '08-management-system', label: 'サロン運営システム' },
    { slug: '13-ai-tools', label: 'AI・業務ツール活用' },
    { slug: '07-operation-system', label: 'サロン運営の仕組み' },
    { slug: '09-consulting', label: '同業者向け相談' },
    { slug: '06-school', label: 'スクール' },
    { slug: '10-access', label: 'アクセス' },
    { slug: '11-contact', label: 'お問い合わせ' },
    { slug: '12-privacy-policy', label: 'プライバシーポリシー' },
  ];
  const pageHref = (slug) => `../${slug}/index.html`;
  const headerMount = document.querySelector('[data-site-header]');
  const active = headerMount?.dataset.active || '';
  const navLinks = navItems.map((item) => `<a href="${pageHref(item.slug)}" class="${active === item.key ? 'active' : ''}">${item.label}</a>`).join('');
  const dropdownLinks = ownerItems.map((item) => `<li><a href="${pageHref(item.slug)}" class="${active === item.key ? 'active' : ''}">${item.label}</a></li>`).join('');
  if (headerMount) {
    headerMount.outerHTML = `<header class="site-header"><div class="nav-wrap"><a class="brand" href="${pageHref('01-top')}"><img src="../../assets/images/logo.jpg" alt="サンプルサロン" class="brand-logo"><span class="brand-text"><span class="brand-mark">Eyelash Salon</span><span class="brand-sub">サンプルサロン</span></span></a>
<nav class="nav">${navLinks}<div class="nav-dropdown"><a href="${pageHref('06-school')}" class="nav-dd-trigger ${ownerKeys.has(active) ? 'active' : ''}">開業・運営サポート<svg class="dd-caret" viewBox="0 0 10 6" aria-hidden="true"><polyline points="1,1 5,5 9,1"/></svg></a><ul class="nav-dd-menu">${dropdownLinks}</ul></div></nav>
<div class="header-actions"><a class="btn small btn-business" href="https://example.com/business-line">${lineSvg}事業者様向けLINE</a><a class="btn small line" href="https://example.com/customer-line">${lineSvg}お客様のご予約</a></div>
<button class="mobile-toggle" aria-label="メニューを開く" data-open-drawer><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg></button>
</div></header>`;
  }
  const drawerMount = document.querySelector('[data-site-drawer]');
  if (drawerMount) {
    const drawerLinks = [
      ...navItems.map((item) => `<a href="${pageHref(item.slug)}">${item.label}</a>`),
      '<div class="d-label">開業・運営サポート</div>',
      ...ownerItems.map((item) => `<a href="${pageHref(item.slug)}" class="d-sub">${item.label}</a>`),
      '<a href="../10-access/index.html">アクセス</a>',
      '<a href="../11-contact/index.html">お問い合わせ</a>',
    ].join('');
    drawerMount.outerHTML = `<div class="drawer" data-drawer><div class="drawer-panel"><button class="d-close" aria-label="閉じる" data-close-drawer><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg></button>${drawerLinks}<div class="d-actions"><div class="footer-btn-group"><a class="btn btn-business" href="https://example.com/business-line">${lineSvg}事業者様向けLINE</a><a class="btn line" href="https://example.com/customer-line">${lineSvg}お客様のご予約</a></div></div></div></div>`;
  }
  const footerMount = document.querySelector('[data-site-footer]');
  if (footerMount) {
    const footerLinks = footerItems.map((item) => `<a href="${pageHref(item.slug)}">${item.label}</a>`).join('');
    footerMount.outerHTML = `<footer class="site-footer"><div class="container-wide footer-grid">
<div class="footer-brand"><a class="brand" href="${pageHref('01-top')}"><img src="../../assets/images/logo.jpg" alt="サンプルサロン" class="brand-logo"><span class="brand-text"><span class="brand-mark">Eyelash Salon</span><span class="brand-sub">サンプルサロン</span></span></a>
<p class="addr">〒000-0000<br>サンプル県サンプル市サンプル町1-2-3<br>営業時間 10:00〜19:30<br>定休日 日曜日・祝日</p></div>
<nav class="footer-nav">${footerLinks}</nav>
<div class="footer-contact"><div class="footer-btn-group"><a class="btn btn-business" href="https://example.com/business-line">${lineSvg}事業者様向けLINE</a><a class="btn line" href="https://example.com/customer-line">${lineSvg}お客様のご予約</a></div>
<div class="socials"><a href="https://example.com/customer-line" aria-label="LINE"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-4 3.5V16H4Z"/><path d="M8 9.5h8M8 12.5h5"/></svg></a><a href="https://example.com/instagram" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/></svg></a></div></div>
</div><p class="copyright">© <span data-year></span> Sample Eyelash Salon. All Rights Reserved.</p></footer>`;
  }
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  const drawer = document.querySelector('[data-drawer]');
  const open = document.querySelector('[data-open-drawer]');
  if (drawer && open) {
    const close = () => {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    };
    open.addEventListener('click', () => {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    drawer.addEventListener('click', (event) => {
      if (event.target === drawer || event.target.closest('[data-close-drawer]') || event.target.tagName === 'A') close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });
  }
})();