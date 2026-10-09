/* Portfolio — interactions (no dependencies). Shared by every page. */

/* ✏️ Site settings: edit these once and they apply on every page */
const SITE = {
  email: 'you@example.com',
  pages: [
    ['index.html', 'Home'], ['about.html', 'About'], ['experience.html', 'Experience'],
    ['projects.html', 'Projects'], ['scripts.html', 'Scripts'], ['contact.html', 'Contact'], ['resume.html', 'Resume'],
  ],
  projects: [
    ['project-m365-migration.html', 'Microsoft 365 Migration'],
    ['project-user-lifecycle-toolkit.html', 'User Lifecycle Toolkit'],
    ['project-network-redesign.html', 'Office Network Redesign'],
    ['project-backup-dr.html', 'Backup & DR Overhaul'],
    ['project-zero-touch-rollout.html', 'Zero-Touch Device Rollout'],
    ['project-monitoring-stack.html', 'Monitoring & Alerting Stack'],
  ],
};

(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(pointer: fine)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const cssVar = name => getComputedStyle(root).getPropertyValue(name).trim();

  /* ---------- Toast ---------- */
  const toast = $('#toast');
  let toastTimer;
  const showToast = msg => {
    toast.textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-on'), 2200);
  };

  /* ---------- Boot intro ---------- */
  if (root.classList.contains('is-booting') && !$('#boot')) root.classList.remove('is-booting');
  if (root.classList.contains('is-booting')) {
    const boot = $('#boot'), log = $('#boot-log'), bar = $('.boot__bar span', boot);
    const lines = [
      'initializing portfolio…',
      'mounting /experience ........ <b>ok</b>',
      'loading skills.json ......... <b>ok</b>',
      'starting network services ... <b>ok</b>',
      'welcome.',
    ];
    lines.forEach((line, i) => setTimeout(() => {
      log.innerHTML += line + '\n';
      bar.style.width = ((i + 1) / lines.length) * 100 + '%';
    }, 120 + i * 230));
    setTimeout(() => {
      boot.classList.add('is-done');
      setTimeout(() => root.classList.remove('is-booting'), 700);
      try { sessionStorage.setItem('booted', '1'); } catch (e) {}
    }, 120 + lines.length * 230 + 250);
  }

  /* ---------- Theme + accent ---------- */
  const listeners = [];
  const onColorsChange = fn => listeners.push(fn);
  const colorsChanged = () => listeners.forEach(fn => fn());

  const isDark = () => (root.dataset.theme ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
  const toggleTheme = () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    store('theme', next);
    colorsChanged();
  };
  $('#theme-toggle').addEventListener('click', toggleTheme);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', colorsChanged);

  const accentBtn = $('#accent-btn');
  const accentMenu = $('#accent-menu');
  const setAccent = name => {
    if (name === 'indigo') delete root.dataset.accent; else root.dataset.accent = name;
    store('accent', name);
    $$('button', accentMenu).forEach(b => b.setAttribute('aria-checked', String(b.dataset.accent === name)));
    colorsChanged();
  };
  $$('button', accentMenu).forEach(b => {
    b.setAttribute('aria-checked', String(b.dataset.accent === (root.dataset.accent || 'indigo')));
    b.addEventListener('click', () => { setAccent(b.dataset.accent); setAccentMenu(false); });
  });
  const setAccentMenu = open => {
    accentMenu.hidden = !open;
    accentBtn.setAttribute('aria-expanded', String(open));
  };
  accentBtn.addEventListener('click', e => { e.stopPropagation(); setAccentMenu(accentMenu.hidden); });
  document.addEventListener('click', e => { if (!accentMenu.hidden && !accentMenu.contains(e.target)) setAccentMenu(false); });

  /* ---------- Mobile menu ---------- */
  const burger = $('#nav-burger');
  const links = $('#nav-links');
  const setMenu = open => {
    links.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  };
  burger.addEventListener('click', () => setMenu(!links.classList.contains('is-open')));
  $$('a', links).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { setMenu(false); setAccentMenu(false); }
  });

  /* ---------- Scroll: nav border, progress bar, back-to-top ---------- */
  const nav = $('.nav');
  const bar = $('#scroll-progress');
  const toTop = $('#to-top');
  const toTopFill = $('#to-top-fill');
  const RING = 2 * Math.PI * 22;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    bar.style.width = p * 100 + '%';
    nav.classList.toggle('is-scrolled', scrollY > 8);
    toTop.classList.toggle('is-on', scrollY > 600);
    toTopFill.style.strokeDashoffset = RING * (1 - p);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll (staggered within a group) ---------- */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const siblings = $$(':scope > .reveal', en.target.parentElement);
      en.target.style.transitionDelay = Math.min(Math.max(siblings.indexOf(en.target), 0), 6) * 70 + 'ms';
      en.target.classList.add('is-in');
      revealObs.unobserve(en.target);
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => revealObs.observe(el));

  /* ---------- Count-up stats ---------- */
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

  /* ---------- Typing effect ---------- */
  const typed = $('#typed');
  if (typed && !reduceMotion) {
    const words = JSON.parse(typed.dataset.words);
    let w = 0, i = words[0].length, deleting = true;
    const step = () => {
      typed.textContent = words[w].slice(0, i);
      if (deleting) {
        if (i-- === 0) { deleting = false; w = (w + 1) % words.length; i = 0; }
      } else if (i++ === words[w].length) {
        deleting = true;
        return setTimeout(step, 1800);
      }
      setTimeout(step, deleting ? 45 : 85);
    };
    setTimeout(step, 2600);
  }

  /* ---------- Hero network canvas ---------- */
  const canvas = $('#net');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    const hero = $('.hero');
    let w, h, dpr, nodes = [], color = '', running = false, raf;
    const mouse = { x: -9999, y: -9999 };
    const LINK = 130;

    const readColor = () => { color = cssVar('--accent'); };
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = hero.clientWidth; h = hero.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.round((w * h) / 16000), 80);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color; ctx.strokeStyle = color;
      for (const n of nodes) {
        if (!reduceMotion) {
          n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
          const dx = mouse.x - n.x, dy = mouse.y - n.y, d = Math.hypot(dx, dy);
          if (d < 160 && d > 1) { n.x += dx / d * 0.25; n.y += dy / d * 0.25; }
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.globalAlpha = (1 - d / LINK) * 0.35;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < 180) {
          ctx.globalAlpha = (1 - md / 180) * 0.6;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.globalAlpha = 0.75;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (running && !reduceMotion) raf = requestAnimationFrame(draw);
    };
    const start = () => { if (!running) { running = true; draw(); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    readColor(); resize(); draw();
    onColorsChange(() => { readColor(); if (!running || reduceMotion) draw(); });
    let rt;
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { resize(); draw(); }, 150); });
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    });
    hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });
    if (!reduceMotion) {
      new IntersectionObserver(([en]) => (en.isIntersecting ? start() : stop())).observe(hero);
      document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    }
  }

  /* ---------- Pointer effects: spotlight, card glow, tilt, magnet, cursor ring ---------- */
  if (finePointer && !reduceMotion) {
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

    $$('.btn, .icon-btn').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });

    const ring = $('.cursor-ring');
    let rx = 0, ry = 0, tx = 0, ty = 0, ringRaf = 0;
    const follow = () => {
      rx += (tx - rx) * 0.2; ry += (ty - ry) * 0.2;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      ringRaf = Math.abs(tx - rx) + Math.abs(ty - ry) > 0.1 ? requestAnimationFrame(follow) : 0;
    };
    addEventListener('pointermove', e => {
      tx = e.clientX; ty = e.clientY;
      ring.classList.add('is-on');
      ring.classList.toggle('is-hover', !!e.target.closest('a, button, .project, input, textarea, [role="option"]'));
      if (!ringRaf) ringRaf = requestAnimationFrame(follow);
    }, { passive: true });
    addEventListener('pointerdown', () => ring.classList.add('is-down'));
    addEventListener('pointerup', () => ring.classList.remove('is-down'));
    document.addEventListener('pointerleave', () => ring.classList.remove('is-on'));
  }

  /* ---------- Activity heatmap (decorative sample) ---------- */
  const heat = $('#heat-grid');
  if (heat) {
    let seed = 7;
    const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const weeks = 22;
    let total = 0;
    const frag = document.createDocumentFragment();
    for (let c = 0; c < weeks; c++) {
      for (let r = 0; r < 7; r++) {
        const weekend = r === 0 || r === 6;
        const v = rand() * (weekend ? 0.55 : 1) + c / weeks * 0.25;
        const level = v > 0.9 ? 4 : v > 0.7 ? 3 : v > 0.5 ? 2 : v > 0.3 ? 1 : 0;
        total += level * 3;
        const i = document.createElement('i');
        i.dataset.l = level;
        i.style.transitionDelay = c * 25 + r * 10 + 'ms';
        frag.append(i);
      }
    }
    heat.append(frag);
    $('#heat-total').textContent = total.toLocaleString();
  }

  /* ---------- Filters (projects + scripts pages) ---------- */
  const filters = $$('.filter');
  filters.forEach(btn => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    filters.forEach(b => {
      b.classList.toggle('is-active', b === btn);
      b.setAttribute('aria-pressed', String(b === btn));
    });
    $$('main [data-cat]').forEach(p => {
      const show = f === 'all' || p.dataset.cat === f;
      p.classList.toggle('is-hidden', !show);
      if (show) p.classList.add('is-in');
    });
  }));

  /* ---------- Case study: highlight current section in "On this page" ---------- */
  const tocLinks = $$('.case__toc a');
  if (tocLinks.length) {
    const tocObs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        tocLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    $$('.case__body section[id]').forEach(s => tocObs.observe(s));
  }

  /* ---------- Copy email / code, print resume ---------- */
  const email = SITE.email;
  const copyText = async (text, done) => {
    try { await navigator.clipboard.writeText(text); showToast(done); }
    catch (e) { showToast('Copy failed: select the text and copy it manually'); }
  };
  const copyEmail = () => copyText(email, 'Email copied to clipboard');
  $$('.copy-btn').forEach(btn => btn.addEventListener('click', copyEmail));
  $$('.code__copy').forEach(btn => btn.addEventListener('click', () => {
    copyText(btn.parentElement.querySelector('code').textContent, 'Script copied to clipboard');
    btn.textContent = 'Copied';
    setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
  }));
  $('#print-resume')?.addEventListener('click', () => window.print());

  /* ---------- Light syntax colouring for script cards ---------- */
  const KEYWORDS = {
    powershell: /^(if|else|elseif|foreach|function|param|return|import-module)$/i,
    python: /^(import|from|def|return|for|in|with|as|if|else|elif|print)$/,
    bash: /^(set|if|then|fi|for|do|done|find|sort|tail|cut|xargs|rm)$/,
  };
  const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  $$('pre[data-lang] code').forEach(code => {
    const kw = KEYWORDS[code.parentElement.dataset.lang];
    // comments | strings | $variables | words — wrapped in \0 markers, so odd split parts are tokens
    const tokens = /#[^\n]*|"(?:[^"\\]|\\.)*"|'[^']*'|\$\(?[\w:.]+\)?|\b[A-Za-z][\w-]*\b/g;
    code.innerHTML = code.textContent
      .replace(tokens, '\u0000$&\u0000')
      .split('\u0000')
      .map((part, i) => {
        if (i % 2 === 0) return esc(part);
        if (part.startsWith('#')) return `<span class="tok-c">${esc(part)}</span>`;
        if (/^["']/.test(part)) return `<span class="tok-s">${esc(part)}</span>`;
        if (part.startsWith('$')) return `<span class="tok-v">${esc(part)}</span>`;
        if (kw && kw.test(part)) return `<span class="tok-k">${esc(part)}</span>`;
        if (/^[A-Z][a-z]+-[A-Z]\w+$/.test(part)) return `<span class="tok-f">${esc(part)}</span>`;
        return esc(part);
      }).join('');
  });

  /* ---------- Command palette (⌘K / Ctrl+K / "/") ---------- */
  const dlg = $('#cmdk');
  const input = $('#cmdk-input');
  const list = $('#cmdk-list');
  const ICON = {
    go: '<path d="M5 12h14m-6-6l6 6-6 6"/>',
    theme: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    print: '<path d="M6 9V3h12v6M6 18H4v-7h16v7h-2M8 14h8v7H8z"/>',
    dot: '<circle cx="12" cy="12" r="5"/>',
  };
  const here = location.pathname.split('/').pop() || 'index.html';
  const go = href => () => { location.href = href; };
  const commands = [
    ...SITE.pages.filter(([href]) => href !== here)
      .map(([href, label]) => ({ group: 'Pages', label, icon: 'go', run: go(href) })),
    ...SITE.projects.filter(([href]) => href !== here)
      .map(([href, label]) => ({ group: 'Projects', label, icon: 'go', run: go(href) })),
    { group: 'Actions', label: 'Toggle light / dark theme', icon: 'theme', hint: 'T', run: toggleTheme },
    { group: 'Actions', label: 'Copy email address', icon: 'copy', run: copyEmail },
    { group: 'Actions', label: 'Open printable resume', icon: 'print', run: go('resume.html') },
    ...['indigo', 'emerald', 'sunset', 'ocean'].map(a => ({
      group: 'Accent color', label: a[0].toUpperCase() + a.slice(1), icon: 'dot', accent: a, run: () => setAccent(a),
    })),
  ];
  let visible = [], active = 0;

  const render = () => {
    const q = input.value.trim().toLowerCase();
    visible = commands.filter(c => (c.group + ' ' + c.label).toLowerCase().includes(q));
    active = Math.min(active, Math.max(visible.length - 1, 0));
    list.innerHTML = '';
    if (!visible.length) { list.innerHTML = '<li class="cmdk__empty">No results</li>'; return; }
    let group = '';
    visible.forEach((c, i) => {
      if (c.group !== group) {
        group = c.group;
        const g = document.createElement('li');
        g.className = 'cmdk__group'; g.setAttribute('role', 'presentation'); g.textContent = group;
        list.append(g);
      }
      const li = document.createElement('li');
      li.className = 'cmdk__item'; li.id = 'cmd-' + i;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', String(i === active));
      const swatch = c.accent ? ` style="color:${$(`[data-accent="${c.accent}"]`, accentMenu).style.getPropertyValue('--sw')}"` : '';
      li.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"${swatch}>${ICON[c.icon]}</svg><span></span>${c.hint ? `<small>${c.hint}</small>` : ''}`;
      li.querySelector('span').textContent = c.label;
      li.addEventListener('click', () => runCmd(i));
      li.addEventListener('pointermove', () => { if (active !== i) { active = i; highlight(); } });
      list.append(li);
    });
    input.setAttribute('aria-activedescendant', 'cmd-' + active);
  };
  const highlight = () => {
    $$('.cmdk__item', list).forEach(li => li.setAttribute('aria-selected', String(li.id === 'cmd-' + active)));
    const el = document.getElementById('cmd-' + active);
    el?.scrollIntoView({ block: 'nearest' });
    input.setAttribute('aria-activedescendant', 'cmd-' + active);
  };
  const runCmd = i => { const c = visible[i]; if (!c) return; dlg.close(); c.run(); };
  const openCmdk = () => {
    if (dlg.open) return;
    input.value = ''; active = 0; render();
    dlg.showModal();
    input.focus();
  };

  $('#cmdk-open').addEventListener('click', openCmdk);
  input.addEventListener('input', () => { active = 0; render(); });
  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); active = (active + 1) % visible.length; highlight(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active = (active - 1 + visible.length) % visible.length; highlight(); }
    else if (e.key === 'Enter') { e.preventDefault(); runCmd(active); }
  });
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  document.addEventListener('keydown', e => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName);
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); dlg.open ? dlg.close() : openCmdk(); }
    else if (e.key === '/' && !typing && !dlg.open) { e.preventDefault(); openCmdk(); }
    else if (e.key.toLowerCase() === 't' && !typing && !dlg.open && !e.metaKey && !e.ctrlKey && !e.altKey) toggleTheme();
  });
  if (!/Mac|iPhone|iPad/.test(navigator.platform)) $$('kbd').forEach(k => { if (k.textContent === '⌘K') k.textContent = 'Ctrl K'; });

  /* ---------- Contact form → opens the visitor's email app ----------
     ✏️ To use a form service (Formspree, etc.), set the form's action/method and remove this handler. */
  const form = $('#contact-form');
  const note = $('#form-note');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    $$('input, textarea', form).forEach(f => {
      const valid = f.checkValidity() && f.value.trim() !== '';
      f.closest('.field').classList.toggle('has-error', !valid);
      if (!valid) ok = false;
    });
    if (!ok) { note.textContent = 'Please fill in all fields with a valid email.'; return; }
    const d = new FormData(form);
    const subject = encodeURIComponent(`Portfolio enquiry from ${d.get('name')}`);
    const body = encodeURIComponent(`${d.get('message')}\n\n— ${d.get('name')} (${d.get('email')})`);
    location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    note.textContent = 'Opening your email app…';
  });

  /* ---------- Footer year ---------- */
  $('#year').textContent = new Date().getFullYear();
})();
