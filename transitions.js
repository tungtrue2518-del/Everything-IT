/* Page-to-page transitions. Loaded in <head> so it is ready before each page first paints.
   - Slides left when you go forward through the menu order, right when you go back.
   - A project card's picture and title morph into the case study page (and back).
   - Browsers without cross-page View Transitions get a simple fade-out / fade-in instead. */
(() => {
  const root = document.documentElement;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const file = url => (new URL(url, location.href).pathname.split('/').pop() || 'index.html');

  // ✏️ Page order used to decide slide direction. Add new pages here.
  const ORDER = [
    'index.html', 'about.html', 'experience.html', 'projects.html',
    'project-m365-migration.html', 'project-user-lifecycle-toolkit.html', 'project-network-redesign.html',
    'project-backup-dr.html', 'project-zero-touch-rollout.html', 'project-monitoring-stack.html',
    'scripts.html', 'contact.html', 'resume.html',
  ];
  const isCase = f => f.startsWith('project-');
  const hasCards = f => f === 'projects.html' || f === 'index.html';

  const direction = (from, to) => {
    const a = ORDER.indexOf(from), b = ORDER.indexOf(to);
    if (a < 0 || b < 0 || a === b) return null;
    return b > a ? 'forward' : 'backward';
  };

  // Give the morphing elements matching names, then clear them when the transition ends
  const name = (pairs, transition) => {
    pairs.forEach(([el, n]) => { if (el) el.style.viewTransitionName = n; });
    transition.finished.finally(() => pairs.forEach(([el]) => { if (el) el.style.viewTransitionName = ''; }));
  };
  const cardFor = target => document.querySelector(`.project__title-link[href="${target}"]`)?.closest('.project');
  // Reveal an element instantly (no fade) so the morph has something to land on
  const showNow = (el, transition) => {
    if (!el) return;
    el.classList.add('is-in', 'no-anim');
    transition.finished.finally(() => el.classList.remove('no-anim'));
  };

  const supported = 'onpagereveal' in window && CSS.supports('view-transition-name: a');

  if (supported) {
    // Leaving a page
    addEventListener('pageswap', e => {
      if (!e.viewTransition || !e.activation) return;
      const from = file(location.href), to = file(e.activation.entry.url);
      const dir = direction(from, to);
      if (dir) e.viewTransition.types?.add(dir);
      if (hasCards(from) && isCase(to)) {
        const card = cardFor(to);
        if (card) name([[card.querySelector('.project__thumb'), 'case-cover'], [card.querySelector('h3'), 'case-title']], e.viewTransition);
      } else if (isCase(from) && hasCards(to)) {
        name([[document.querySelector('.case-cover'), 'case-cover'], [document.querySelector('.page-title'), 'case-title']], e.viewTransition);
      }
    });

    // Arriving on a page
    addEventListener('pagereveal', e => {
      if (!e.viewTransition) return;
      const fromUrl = window.navigation?.activation?.from?.url || document.referrer;
      if (!fromUrl) return;
      const from = file(fromUrl), to = file(location.href);
      const dir = direction(from, to);
      if (dir) e.viewTransition.types?.add(dir);
      if (hasCards(from) && isCase(to)) {
        const cover = document.querySelector('.case-cover'), title = document.querySelector('.page-title');
        showNow(cover, e.viewTransition); showNow(title, e.viewTransition);
        name([[cover, 'case-cover'], [title, 'case-title']], e.viewTransition);
      } else if (isCase(from) && hasCards(to)) {
        const card = cardFor(from);
        if (card) {
          showNow(card, e.viewTransition);
          name([[card.querySelector('.project__thumb'), 'case-cover'], [card.querySelector('h3'), 'case-title']], e.viewTransition);
        }
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
