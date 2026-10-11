/* Loaded in <head> on every page, before anything paints.
   - Applies the saved theme and accent colour (no flash of the wrong theme).
   - Page-to-page transitions: slide left going forward through the menu order, right going back;
     a project card's picture and title morph into its case study (and back).
   - Browsers without cross-page View Transitions get a simple fade-out / fade-in instead. */
(() => {
  const root = document.documentElement;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const file = url => (new URL(url, location.href).pathname.split('/').pop() || 'index.html');
  // A page's identity: the file name, plus the project id for the case study page
  const key = url => {
    const u = new URL(url, location.href), f = file(url);
    return f === 'project.html' ? f + u.hash : f;
  };

  // Saved theme / accent, and the boot intro on the first visit to the home page
  try {
    const t = localStorage.getItem('theme'); if (t) root.dataset.theme = t;
    const a = localStorage.getItem('accent'); if (a) root.dataset.accent = a;
    if (file(location.href) === 'index.html' && !sessionStorage.getItem('booted') && !reduceMotion) root.classList.add('is-booting');
  } catch (e) {}

  // Slide order = menu order from site.js, with every project right after Projects
  const order = () => {
    const site = typeof SITE === 'undefined' ? { pages: [], projects: [] } : SITE; // defined in site.js
    const pages = site.pages.map(([h]) => h);
    pages.splice(pages.indexOf('projects.html') + 1, 0, ...site.projects.map(p => `project.html#${p.id}`));
    return pages;
  };
  const isCase = k => k.startsWith('project.html');
  const hasCards = k => k === 'projects.html' || k === 'index.html';
  const direction = (from, to) => {
    const list = order(), a = list.indexOf(from), b = list.indexOf(to);
    if (a < 0 || b < 0 || a === b) return null;
    return b > a ? 'forward' : 'backward';
  };

  // Give the morphing elements matching names, then clear them when the transition ends
  const name = (pairs, transition) => {
    pairs.forEach(([el, n]) => { if (el) el.style.viewTransitionName = n; });
    transition.finished.finally(() => pairs.forEach(([el]) => { if (el) el.style.viewTransitionName = ''; }));
  };
  const cardFor = k => document.querySelector(`.project__title-link[href="${k}"]`)?.closest('.project');
  const cardPair = card => [[card.querySelector('.project__thumb'), 'case-cover'], [card.querySelector('h3'), 'case-title']];
  const casePair = () => [[document.querySelector('.case-cover'), 'case-cover'], [document.querySelector('.page-title'), 'case-title']];
  // Reveal an element instantly (no fade) so the morph has something to land on
  const showNow = (el, transition) => {
    if (!el) return;
    el.classList.add('is-in', 'no-anim');
    transition.finished.finally(() => el.classList.remove('no-anim'));
  };

  if ('onpagereveal' in window && CSS.supports('view-transition-name: a')) {
    addEventListener('pageswap', e => {
      if (!e.viewTransition || !e.activation) return;
      const from = key(location.href), to = key(e.activation.entry.url);
      const dir = direction(from, to);
      if (dir) e.viewTransition.types?.add(dir);
      if (hasCards(from) && isCase(to)) {
        const card = cardFor(to);
        if (card) name(cardPair(card), e.viewTransition);
      } else if (isCase(from) && hasCards(to)) {
        name(casePair(), e.viewTransition);
      }
    });

    addEventListener('pagereveal', e => {
      if (!e.viewTransition) return;
      const fromUrl = window.navigation?.activation?.from?.url || document.referrer;
      if (!fromUrl) return;
      const from = key(fromUrl), to = key(location.href);
      const dir = direction(from, to);
      if (dir) e.viewTransition.types?.add(dir);
      if (hasCards(from) && isCase(to)) {
        const pairs = casePair();
        pairs.forEach(([el]) => showNow(el, e.viewTransition));
        name(pairs, e.viewTransition);
      } else if (isCase(from) && hasCards(to)) {
        const card = cardFor(from);
        if (card) { showNow(card, e.viewTransition); name(cardPair(card), e.viewTransition); }
      }
    });
  } else if (!reduceMotion) {
    // Fallback: fade the page out before following a link to another page of this site
    root.classList.add('no-xvt');
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || !url.pathname.endsWith('.html') || url.pathname === location.pathname) return;
      e.preventDefault();
      root.classList.add('is-leaving');
      setTimeout(() => { location.href = url.href; }, 260);
    });
    addEventListener('pageshow', e => { if (e.persisted) root.classList.remove('is-leaving'); });
  }
})();
