/* Shared site content and layout. Loaded at the top of <body> on every page.
   ✏️ Edit your details and projects here once; every page picks them up. */
const SITE = {
  name: 'Your Name',
  initials: 'YN',
  email: 'you@example.com',
  linkedin: 'https://www.linkedin.com/',
  github: 'https://github.com/',

  // Menu order. It is also the order pages slide in (left = forward).
  pages: [
    ['index.html', 'Home'], ['about.html', 'About'], ['experience.html', 'Experience'],
    ['projects.html', 'Projects'], ['gallery.html', 'Gallery'], ['scripts.html', 'Scripts'],
    ['contact.html', 'Contact'], ['resume.html', 'Resume'],
  ],

  // ✏️ Sample projects: replace with your real ones. Each opens at project.html#<id>.
  // featured: true shows it on the home page. icon: cloud | code | network | shield | phone | chart
  projects: [
    {
      id: 'm365-migration', category: 'cloud', icon: 'cloud', featured: true,
      title: 'Microsoft 365 Migration',
      summary: 'Planned and executed a staged mailbox and file migration for 300 users across 3 offices, with training sessions and a rollback plan.',
      tags: ['Exchange Online', 'SharePoint', 'Entra ID'],
      role: 'Project lead', time: '4 months · 2024', team: '3 engineers',
      stack: 'Exchange Online, SharePoint, Entra ID, PowerShell',
      overview: 'The company ran an ageing on-premises Exchange server and shared drives that only worked over VPN. The goal was to move every mailbox and team folder to Microsoft 365 without disrupting daily work.',
      challenge: 'Three offices, 300 users, 2 TB of mail and no maintenance window longer than a weekend. Several departments relied on shared mailboxes and old public folders that nobody fully understood.',
      steps: [
        'Audited every mailbox, shared folder and permission, and mapped them to new Teams and SharePoint sites.',
        'Ran a pilot with 15 users to test the migration tooling and collect feedback.',
        'Migrated in four weekend waves, each with a tested rollback plan.',
        'Held short training sessions and published a one-page "what changed" guide.',
      ],
      results: [['300+', 'users migrated'], ['0', 'mailboxes lost'], ['-60%', 'VPN support tickets']],
      lessons: 'A pilot group finds the problems a plan never will. Clear, early communication mattered as much as the technical work.',
    },
    {
      id: 'user-lifecycle-toolkit', category: 'automation', icon: 'code', featured: true,
      title: 'User Lifecycle Toolkit',
      summary: 'PowerShell module that creates accounts, assigns licenses, groups and devices from a single HR form, and reverses it all when someone leaves.',
      tags: ['PowerShell', 'Graph API', 'Git'],
      role: 'Author and maintainer', time: '2 months · 2023', team: 'Solo, reviewed by IT team',
      stack: 'PowerShell, Microsoft Graph, Entra ID, Git',
      overview: 'Onboarding a new employee took around 45 minutes of clicking across five admin portals, and offboarding was often incomplete.',
      challenge: 'Every department needed different groups, licenses and shared drives. Mistakes meant new hires waited days for access, and leavers kept access they should have lost.',
      steps: [
        'Mapped each department to a role template stored in a simple JSON file.',
        'Wrote a PowerShell module that reads the HR form and calls Microsoft Graph to create the account, licenses and group memberships.',
        'Added an offboarding command that disables sign-in, converts the mailbox and removes access in one step.',
        'Logged every action so changes can be audited and rolled back.',
      ],
      results: [['45 → 5', 'minutes per new hire'], ['~10 h', 'saved each week'], ['100%', 'leavers fully offboarded']],
      lessons: 'Templates beat custom logic. Keeping the role definitions in a readable file let HR suggest changes without touching code.',
    },
    {
      id: 'network-redesign', category: 'infra', icon: 'network', featured: true,
      title: 'Office Network Redesign',
      summary: 'Segmented a flat network into VLANs for staff, guests, IoT and servers, and added a site-to-site VPN and monitoring dashboards.',
      tags: ['VLAN', 'Firewall', 'VPN'],
      role: 'Network engineer', time: '6 weeks · 2022', team: '2 engineers',
      stack: 'VLANs, Firewall rules, Site-to-site VPN, SNMP monitoring',
      overview: 'Every device, from laptops to printers to guest phones, shared one flat network. One infected device could reach everything.',
      challenge: 'The redesign had to happen with no downtime during office hours, using mostly the existing switches.',
      steps: [
        'Inventoried every device and grouped them into staff, guest, IoT and server zones.',
        'Built VLANs and firewall rules that allow only the traffic each zone needs.',
        'Connected the second office with a site-to-site VPN.',
        'Added monitoring dashboards and alerts for link health and bandwidth.',
      ],
      results: [['4', 'isolated network zones'], ['0', 'hours of office downtime'], ['2', 'sites connected']],
      lessons: 'Good documentation of the old network saved more time than any tool. Label everything before you change anything.',
    },
    {
      id: 'backup-dr', category: 'infra', icon: 'shield',
      title: 'Backup & DR Overhaul',
      summary: 'Replaced ad-hoc backups with an automated 3-2-1 strategy, tested restores every quarter, and cut recovery time from days to hours.',
      tags: ['Veeam', 'Azure Blob', 'Runbooks'],
      role: 'Lead administrator', time: '3 months · 2022', team: '2 engineers',
      stack: 'Veeam, Azure Blob Storage, Immutable backups, Runbooks',
      overview: 'Backups ran on a USB drive that someone swapped "most weeks". Nobody had ever tested a full restore.',
      challenge: 'Protect 40 servers against hardware failure and ransomware on a small budget, and prove that restores actually work.',
      steps: [
        'Defined recovery targets with each department: how much data they can lose and how fast they need it back.',
        'Set up local backups plus immutable off-site copies in Azure (the 3-2-1 rule).',
        'Wrote step-by-step disaster recovery runbooks.',
        'Scheduled quarterly restore tests and recorded the results.',
      ],
      results: [['3 days → 4 h', 'full recovery time'], ['40', 'servers protected'], ['4×', 'restore tests per year']],
      lessons: 'A backup you have not restored is only a hope. Regular tests turned DR from a document into a habit.',
    },
    {
      id: 'zero-touch-rollout', category: 'cloud', icon: 'phone',
      title: 'Zero-Touch Device Rollout',
      summary: 'Autopilot and Intune deployment so new laptops ship straight to employees and set themselves up on first sign-in.',
      tags: ['Intune', 'Autopilot', 'Compliance'],
      role: 'Endpoint lead', time: '3 months · 2024', team: '2 engineers',
      stack: 'Windows Autopilot, Intune, Compliance policies, Defender',
      overview: 'Each new laptop was imaged by hand, which took about three hours and needed someone in the office.',
      challenge: 'Remote and hybrid staff needed working, secure laptops on day one, without IT touching the device.',
      steps: [
        'Registered devices with the supplier so they enrol in Autopilot automatically.',
        'Built Intune profiles for apps, Wi-Fi, security baselines and BitLocker.',
        'Added compliance policies so only healthy devices can reach company data.',
        'Piloted with one team, then rolled out company-wide.',
      ],
      results: [['3 h → 25 min', 'setup per laptop'], ['100%', 'devices encrypted'], ['0', 'office visits needed']],
      lessons: 'Start with a small, strict baseline and add exceptions only when someone needs them.',
    },
    {
      id: 'monitoring-stack', category: 'automation', icon: 'chart',
      title: 'Monitoring & Alerting Stack',
      summary: 'Python scripts and dashboards that watch disks, certificates, backups and licenses, and post alerts to Teams before users notice.',
      tags: ['Python', 'Grafana', 'Teams webhooks'],
      role: 'Author', time: 'Ongoing · since 2023', team: 'Solo',
      stack: 'Python, Grafana, Prometheus, Teams webhooks',
      overview: 'Problems were found when users called the help desk: a full disk, an expired certificate, a failed backup.',
      challenge: 'Catch the common failures early without paying for a large monitoring platform.',
      steps: [
        'Listed the ten incidents that caused the most tickets last year.',
        'Wrote small Python checks for each one: disk space, certificate expiry, backup status, license counts.',
        'Sent results to Grafana dashboards and posted alerts to a Teams channel.',
        'Tuned thresholds to avoid alert fatigue.',
      ],
      results: [['-40%', 'incident tickets'], ['10', 'automated checks'], ['0', 'expired certificates since']],
      lessons: 'Alert on what needs action, not on everything. A quiet channel gets read.',
    },
  ],
};

(() => {
  const CATEGORY = { cloud: 'Cloud', automation: 'Automation', infra: 'Infrastructure' };
  const ICON = {
    cloud: '<path d="M7 18a4 4 0 0 1-.7-7.9A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z"/>',
    code: '<path d="M8 9l-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"/>',
    network: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v5M12 12l-6 5M12 12l6 5"/>',
    shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    phone: '<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M11 18h2"/>',
    chart: '<path d="M4 19V5M4 19h16M8 15l3-4 3 2 5-6"/>',
    arrow: '<path d="M5 12h14m-6-6l6 6-6 6"/>',
    back: '<path d="M19 12H5m6 6l-6-6 6-6"/>',
    github: '<path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5a3 3 0 0 0-.9-2.3c3-.3 6.1-1.5 6.1-6.6A5.2 5.2 0 0 0 18.8 5 4.8 4.8 0 0 0 18.7 1.5S17.6 1.2 15 3a12.4 12.4 0 0 0-6 0C6.4 1.2 5.3 1.5 5.3 1.5A4.8 4.8 0 0 0 5.2 5a5.2 5.2 0 0 0-1.4 3.6c0 5.1 3.1 6.3 6.1 6.6a3 3 0 0 0-.9 2.3V21"/>',
    download: '<path d="M12 3v12m0 0l-5-5m5 5l5-5M5 21h14"/>',
  };
  const svg = (name, attrs = ' aria-hidden="true"') => `<svg viewBox="0 0 24 24"${attrs}>${ICON[name]}</svg>`;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const here = location.pathname.split('/').pop() || 'index.html';
  const MOCK = '<div class="mock"><div class="mock__bar"><i></i><i></i><i></i></div><div class="mock__body"><div class="mock__side"><span></span><span></span><span></span><span></span></div><div class="mock__main"><span class="mock__line"></span><span class="mock__line mock__line--s"></span><div class="mock__chart"><b></b><b></b><b></b><b></b><b></b><b></b><b></b></div></div></div></div>';
  // Insert HTML where the calling <script> tag sits, so content is there before the page first paints
  const put = html => document.currentScript.insertAdjacentHTML('beforebegin', html);
  const thumbNo = p => SITE.projects.indexOf(p) % 6 + 1;

  /* ---------- Header (runs immediately: site.js sits at the top of <body>) ---------- */
  const active = here.startsWith('project') ? 'projects.html' : here;
  const links = SITE.pages.filter(([h]) => h !== 'index.html' && h !== 'resume.html')
    .map(([h, t]) => `<a href="${h}"${h === active ? ' class="is-active" aria-current="page"' : ''}>${t}</a>`).join('');
  put(`
  <div class="cursor-ring" aria-hidden="true"></div>
  <div class="grain" aria-hidden="true"></div>
  <div class="spotlight" aria-hidden="true"></div>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="nav" id="top">
    <div class="container nav__inner">
      <a href="index.html" class="brand" aria-label="Home"><span class="brand__mark">${SITE.initials}</span><span class="brand__name">${esc(SITE.name)}</span></a>
      <nav class="nav__links" id="nav-links" aria-label="Primary">${links}</nav>
      <div class="nav__actions">
        <button class="kbd-btn" id="cmdk-open" type="button" aria-label="Open command menu" title="Command menu">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><span>Search</span><kbd>⌘K</kbd>
        </button>
        <div class="swatch-wrap">
          <button class="icon-btn" id="accent-btn" aria-label="Change accent color" aria-expanded="false" aria-controls="accent-menu" title="Accent color">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.5 0-.4-.2-.8-.4-1.1-.3-.3-.4-.6-.4-1 0-.8.7-1.4 1.5-1.4H16a5 5 0 0 0 5-5C21 6.5 17 3 12 3z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10.5" cy="7.5" r="1"/><circle cx="15" cy="7.5" r="1"/></svg>
          </button>
          <div class="swatches" id="accent-menu" role="menu" hidden>
            <p>Accent</p>
            <button role="menuitemradio" data-accent="indigo" aria-label="Indigo" style="--sw:#6d6dfa"></button>
            <button role="menuitemradio" data-accent="emerald" aria-label="Emerald" style="--sw:#10b981"></button>
            <button role="menuitemradio" data-accent="sunset" aria-label="Sunset" style="--sw:#f97362"></button>
            <button role="menuitemradio" data-accent="ocean" aria-label="Ocean" style="--sw:#0ea5e9"></button>
          </div>
        </div>
        <button class="icon-btn" id="theme-toggle" aria-label="Toggle color theme" title="Toggle theme">
          <svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          <svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
        </button>
        <a class="btn btn--primary btn--sm nav__cta" href="resume.html"${here === 'resume.html' ? ' aria-current="page"' : ''}>${svg('download')} Resume</a>
        <button class="icon-btn nav__burger" id="nav-burger" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>
    <div class="scroll-progress" aria-hidden="true"><span id="scroll-progress"></span></div>
  </header>`);

  /* ---------- Footer, back-to-top, command menu, toast: <script>SITE.footer()</script> ---------- */
  SITE.footer = () => put(`
  <footer class="footer">
    <div class="container">
      <div class="footer__top-row">
        <a href="contact.html" class="footer__cta">Let's work together <span aria-hidden="true">↗</span></a>
        <nav class="footer__links" aria-label="Footer">
          ${SITE.pages.filter(([h]) => h !== 'index.html').map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}
          <a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
          <a href="${SITE.github}" target="_blank" rel="noopener">GitHub</a>
        </nav>
      </div>
      <p class="footer__word" aria-hidden="true">${esc(SITE.name)}</p>
      <div class="footer__inner">
        <p>© <span id="year"></span> ${esc(SITE.name)}. Built with care.</p>
        <p class="footer__hint">Tip: press <kbd>⌘K</kbd> to jump anywhere · <kbd>T</kbd> toggles theme</p>
      </div>
    </div>
  </footer>
  <a href="#top" class="to-top" id="to-top" aria-label="Back to top">
    <svg class="to-top__ring" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="22"/><circle class="to-top__fill" cx="24" cy="24" r="22" id="to-top-fill"/></svg>
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5m-6 6l6-6 6 6"/></svg>
  </a>
  <dialog class="cmdk" id="cmdk" aria-label="Command menu">
    <div class="cmdk__search">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
      <input id="cmdk-input" type="text" placeholder="Type a page, project or command…" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="cmdk-list" aria-autocomplete="list">
      <kbd>esc</kbd>
    </div>
    <ul class="cmdk__list" id="cmdk-list" role="listbox"></ul>
    <div class="cmdk__foot"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> select</span></div>
  </dialog>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>`);

  /* ---------- Project cards: <script>SITE.cards('featured' | 'all')</script> ---------- */
  SITE.cards = which => put(SITE.projects.filter(p => which === 'all' || p.featured).map(p => `
          <article class="project reveal" data-cat="${p.category}">
            <div class="project__thumb project__thumb--${thumbNo(p)}" aria-hidden="true">${MOCK}${svg(p.icon, '')}</div>
            <div class="project__body">
              <p class="project__cat">${CATEGORY[p.category]}</p>
              <h3><a class="project__title-link" href="project.html#${p.id}">${esc(p.title)}</a></h3>
              <p>${esc(p.summary)}</p>
              <ul class="tags tags--sm">${p.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
              <span class="project__link" aria-hidden="true">Case study <span>→</span></span>
            </div>
          </article>`).join(''));

  /* ---------- One case study page for every project: <script>SITE.caseStudy()</script> ---------- */
  const caseHTML = p => {
    const i = SITE.projects.indexOf(p), n = SITE.projects.length;
    const prev = SITE.projects[(i - 1 + n) % n], next = SITE.projects[(i + 1) % n];
    return `
    <section class="hero hero--page">
      <div class="hero__bg" aria-hidden="true"></div>
      <div class="container">
        <nav class="crumbs reveal" aria-label="Breadcrumb"><a href="index.html">Home</a> <span aria-hidden="true">/</span> <a href="projects.html">Projects</a> <span aria-hidden="true">/</span> <span aria-current="page">${esc(p.title)}</span></nav>
        <p class="eyebrow reveal">${CATEGORY[p.category]}</p>
        <h1 class="page-title reveal">${esc(p.title)}</h1>
        <p class="hero__lead reveal">${esc(p.summary)}</p>
        <dl class="case-meta reveal">
          <div><dt>Role</dt><dd>${esc(p.role)}</dd></div>
          <div><dt>Timeline</dt><dd>${esc(p.time)}</dd></div>
          <div><dt>Team</dt><dd>${esc(p.team)}</dd></div>
          <div><dt>Stack</dt><dd>${esc(p.stack)}</dd></div>
        </dl>
      </div>
    </section>
    <div class="container">
      <div class="case-cover project__thumb project__thumb--${thumbNo(p)} reveal" aria-hidden="true">${MOCK}${svg(p.icon, '')}</div>
    </div>
    <section class="section">
      <div class="container case">
        <nav class="case__toc" aria-label="On this page">
          <p>On this page</p>
          <a href="#overview">Overview</a><a href="#challenge">The challenge</a><a href="#approach">What I did</a><a href="#results">Results</a><a href="#lessons">Lessons learned</a>
        </nav>
        <article class="case__body">
          <section id="overview" class="reveal"><h2>Overview</h2><p>${esc(p.overview)}</p></section>
          <section id="challenge" class="reveal"><h2>The challenge</h2><p>${esc(p.challenge)}</p></section>
          <section id="approach" class="reveal"><h2>What I did</h2><ol class="steps">${p.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol></section>
          <section id="results" class="reveal"><h2>Results</h2><dl class="case-stats">${p.results.map(([v, l]) => `<div class="case-stat"><dt>${esc(l)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></section>
          <section id="lessons" class="reveal"><h2>Lessons learned</h2><p>${esc(p.lessons)}</p></section>
          <p class="case__actions reveal">
            <a class="btn btn--ghost" href="${SITE.github}" target="_blank" rel="noopener">${svg('github')} View code</a>
            <a class="btn btn--primary" href="contact.html">Talk about a similar project ${svg('arrow')}</a>
          </p>
        </article>
      </div>
    </section>
    <section class="section section--alt">
      <div class="container">
        <nav class="case-nav" aria-label="More projects">
          <a class="case-nav__link reveal" href="project.html#${prev.id}"><span class="case-nav__dir">${svg('back')} Previous</span><span class="case-nav__title">${esc(prev.title)}</span></a>
          <a class="case-nav__link case-nav__link--next reveal" href="project.html#${next.id}"><span class="case-nav__dir">Next ${svg('arrow')}</span><span class="case-nav__title">${esc(next.title)}</span></a>
        </nav>
      </div>
    </section>`;
  };
  SITE.projectFromHash = () => SITE.projects.find(p => p.id === location.hash.slice(1)) || SITE.projects[0];
  SITE.caseStudy = () => {
    const p = SITE.projectFromHash();
    document.title = `${p.title} — ${SITE.name}`;
    put(`<div id="case">${caseHTML(p)}</div>`);
  };
  SITE.caseHTML = caseHTML;
})();
