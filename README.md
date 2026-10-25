# Everything-IT
My Work Collection: a multi-page resume / portfolio website.

## Preview
Open `index.html` in a browser. No build step and no dependencies.

## Publish (free) with GitHub Pages
Settings → Pages → Source: **Deploy from a branch** → choose the branch and `/ (root)` → Save.

## Pages
| File | What it is |
|---|---|
| `index.html` | Home: intro, links to every page, featured projects |
| `about.html` | Bio, skills, testimonials |
| `experience.html` | Work timeline and certifications |
| `projects.html` | All projects with filters |
| `project.html` | Case study page; shows the project named after `#` (for example `project.html#backup-dr`) |
| `gallery.html` | Photo gallery of your work with filters and a full-screen viewer |
| `scripts.html` | Script library with copy buttons and language filters |
| `contact.html` | Contact details and form |
| `resume.html` | Printable one-page resume (Print / Save as PDF) |
| `404.html` | "Page not found" page (GitHub Pages uses it automatically) |

Moving between pages slides left or right depending on direction, and a project card's picture and title
morph into its case study page (Chrome, Edge and Safari 18+). Other browsers get a simple fade.
The site opens in light mode; switching to dark spreads out in a circle from the button, and filters glide cards into place.
The slide order follows the menu order in `site.js`.

Other motion: headings rise in word by word, cards tilt gently toward the pointer, icons draw their
outlines, buttons ripple, the tech strip speeds up while scrolling, and the hero, project pictures and footer move with the scroll (newer browsers). Everything
switches off for visitors who set "reduce motion" on their device.

## Make it yours
- **Your name, initials, email and links:** edit them once at the top of `site.js`. The menu, footer and
  command menu on every page use them.
- **Thai / English:** the EN | TH switch in the menu changes the language and remembers the choice.
  First-time visitors get Thai if their browser is set to Thai, otherwise English.
  - Page text: each English element carries its Thai version in `data-th="..."`
    (for example `<h2 data-th="ผลงาน<em>เด่น</em>">Featured <em>projects</em></h2>`). When you change the English,
    change the `data-th` next to it too. Form placeholders use `data-th-placeholder`, screen-reader labels `data-th-label`.
  - Projects: each project in `site.js` has a `th: { ... }` block with the Thai text. Leave a field out and
    the English is shown instead.
  - Menu, buttons and messages built by the scripts use `SITE.t('English', 'ไทย')`.
- **Text inside pages** (hero, about, resume, page titles) still has samples such as `Your City, Country` and `Company Name`.
  Use *Find and replace in files* in your editor (for example VS Code: `Ctrl+Shift+H`) for those.
- **Photo:** in `about.html`, replace `<span>PL</span>` inside `.avatar` with `<img src="photo.jpg" alt="Purinat Lexuthai">`.
- **Projects:** all projects live in one list, `SITE.projects` in `site.js`. Each entry fills its card on
  `projects.html`, its case study on `project.html`, and the command menu. Set `featured: true` to show it on
  the home page. To add a project, copy one entry and edit it; no new file is needed.
- **Scripts:** in `scripts.html`, copy one `<article class="script-card">` block per script. Set `data-cat`
  and the badge to `powershell`, `python` or `bash` so the filters work.
- **Resume:** edit the text in `resume.html`. It prints on one A4 / Letter page.
- **Photos (Gallery):**
  1. Put your photos in `images/gallery/` (JPG or WebP, about 1600 px on the long side keeps pages fast).
  2. In `gallery.html`, each photo is one `<figure class="shot">` block. Replace its placeholder
     `<div class="shot__media ph ...">…</div>` with
     `<img class="shot__media" src="images/gallery/your-photo.jpg" alt="What the photo shows" loading="lazy">`.
  3. Edit the caption (category, title, place · year) and set `data-cat` to `infra`, `network`, `support`,
     `people` or `awards` so the filters work. Add or delete `<figure>` blocks freely; any photo shape works.
  4. The "Behind the scenes" strip on the home page uses the same kind of tiles; swap those too.
- **Colors:** the site uses a navy palette. Edit the `--a1-l / --a2-l / --a3-l` (light) and
  `--a1-d / --a2-d / --a3-d` (dark) values at the top of `styles.css` to change it.
- **Testimonials, heatmap and case study text** are samples. Replace them or delete those blocks.
- **Contact form:** opens the visitor's email app. To receive messages directly, point the form at a
  service such as Formspree.

Comments marked `EDIT:` in the code show where to edit.

## Files
- `*.html`: the pages (each holds only its own content)
- `site.js`: your details, the menu, the footer and the projects list, shared by every page
- `styles.css`: design system (light/dark themes, layout, animation, page transitions, print styles)
- `transitions.js`: saved theme, page-to-page transitions (slide direction, card-to-case-study morph, fallback fade)
- `script.js`: light/dark switch, command menu, animations, filters,
  copy buttons, contact form

## Keyboard shortcuts
`⌘K` / `Ctrl+K` or `/` opens the command menu (jump to any page or project) · `T` toggles light/dark
