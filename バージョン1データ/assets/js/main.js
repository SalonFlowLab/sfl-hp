// Lucia Eyelash Salon — common scripts

// current year in footer
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// mobile drawer
(function () {
  const drawer = document.querySelector('[data-drawer]');
  if (!drawer) return;
  const open = document.querySelector('[data-open-drawer]');
  const close = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };
  open && open.addEventListener('click', () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer || e.target.closest('[data-close-drawer]') || e.target.closest('a')) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();

// works gallery filter
(function () {
  const bar = document.querySelector('[data-filter]');
  if (!bar) return;
  const cards = document.querySelectorAll('.work-card');
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    bar.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    cards.forEach((c) => {
      c.style.display = cat === 'all' || c.dataset.cat === cat ? '' : 'none';
    });
  });
})();
