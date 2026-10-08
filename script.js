/* Portfolio — interactions (no dependencies) */
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* Theme toggle */
  $('#theme-toggle').addEventListener('click', () => {
    const current = root.dataset.theme ||
      (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* Mobile menu */
  const burger = $('#nav-burger');
  const links = $('#nav-links');
  const setMenu = open => {
    links.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  };
  burger.addEventListener('click', () => setMenu(!links.classList.contains('is-open')));
  $$('a', links).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* Nav border + scroll progress */
  const nav = $('.nav');
  const bar = $('#scroll-progress');
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + '%';
    nav.classList.toggle('is-scrolled', scrollY > 8);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Active section in nav */
  const navMap = new Map($$('a', links).map(a => [a.getAttribute('href').slice(1), a]));
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      navMap.forEach(a => a.classList.remove('is-active'));
      navMap.get(en.target.id)?.classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  navMap.forEach((_, id) => { const s = document.getElementById(id); if (s) sectionObs.observe(s); });

  /* Reveal on scroll (staggered within a group) */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const siblings = $$('.reveal', en.target.parentElement);
      en.target.style.transitionDelay = Math.min(siblings.indexOf(en.target), 6) * 70 + 'ms';
      en.target.classList.add('is-in');
      revealObs.unobserve(en.target);
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => revealObs.observe(el));

  /* Count-up stats */
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, to = +el.dataset.to;
      countObs.unobserve(el);
      if (reduceMotion) { el.textContent = to; return; }
      const start = performance.now(), dur = 1400;
      const tick = now => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  $$('.count').forEach(el => countObs.observe(el));

  /* Typing effect */
  const typed = $('#typed');
  if (typed && !reduceMotion) {
    const words = JSON.parse(typed.dataset.words);
    let w = 0, i = words[0].length, deleting = true;
    const step = () => {
      const word = words[w];
      typed.textContent = word.slice(0, i);
      if (deleting) {
        if (i-- === 0) { deleting = false; w = (w + 1) % words.length; i = 0; }
      } else if (i++ === words[w].length) {
        deleting = true;
        return setTimeout(step, 1800);
      }
      setTimeout(step, deleting ? 45 : 85);
    };
    setTimeout(step, 2200);
  }

  /* Cursor spotlight (page + cards) and terminal tilt */
  const fine = matchMedia('(pointer: fine)').matches;
  if (fine && !reduceMotion) {
    addEventListener('pointermove', e => {
      root.style.setProperty('--mx', e.clientX + 'px');
      root.style.setProperty('--my', e.clientY + 'px');
    }, { passive: true });

    $$('.card, .skill-card, .project, .cert').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--x', e.clientX - r.left + 'px');
        el.style.setProperty('--y', e.clientY - r.top + 'px');
      });
    });

    $$('.tilt').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* Project filters */
  const filters = $$('.filter');
  filters.forEach(btn => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    filters.forEach(b => {
      b.classList.toggle('is-active', b === btn);
      b.setAttribute('aria-pressed', String(b === btn));
    });
    $$('.project').forEach(p => {
      const show = f === 'all' || p.dataset.cat === f;
      p.classList.toggle('is-hidden', !show);
      if (show) p.classList.add('is-in');
    });
  }));

  /* Toast */
  const toast = $('#toast');
  let toastTimer;
  const showToast = msg => {
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-on'), 2200);
  };

  /* Copy email */
  $$('.copy-btn').forEach(btn => btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(btn.dataset.copy); showToast('Email copied to clipboard'); }
    catch (e) { showToast(btn.dataset.copy); }
  }));

  /* Print resume */
  $('#print-resume')?.addEventListener('click', () => window.print());

  /* Contact form → opens the visitor's email app (no backend needed).
     ✏️ To use a form service (Formspree, etc.), set the form's action/method and remove this handler. */
  const form = $('#contact-form');
  const note = $('#form-note');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    $$('input, textarea', form).forEach(f => {
      const valid = f.checkValidity() && f.value.trim() !== '';
      f.closest('.field').classList.toggle('has-error', !valid);
      if (!valid) ok = false;
    });
    if (!ok) { note.textContent = 'Please fill in all fields with a valid email.'; return; }
    const d = new FormData(form);
    const to = $('.copy-btn')?.dataset.copy || '';
    const subject = encodeURIComponent(`Portfolio enquiry from ${d.get('name')}`);
    const body = encodeURIComponent(`${d.get('message')}\n\n— ${d.get('name')} (${d.get('email')})`);
    location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    note.textContent = 'Opening your email app…';
  });

  /* Footer year */
  $('#year').textContent = new Date().getFullYear();
})();
