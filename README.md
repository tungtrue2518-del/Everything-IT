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
| `project-*.html` | One case study per project (overview, challenge, steps, results, lessons) |
| `scripts.html` | Script library with copy buttons and language filters |
| `contact.html` | Contact details and form |
| `resume.html` | Printable one-page resume (Print / Save as PDF) |
| `404.html` | "Page not found" page (GitHub Pages uses it automatically) |

Moving between pages slides left or right depending on direction, and a project card's picture and title
morph into its case study page (Chrome, Edge and Safari 18+). Other browsers get a simple fade.
Switching theme or accent color spreads out in a circle from the button, and filters glide cards into place.
To add a page to the slide order, add it to `ORDER` at the top of `transitions.js`.

## Make it yours
- **Your name, email and links** appear on every page. Use *Find and replace in files* in your editor
  (for example VS Code: `Ctrl+Shift+H`) to replace `Your Name`, `you@example.com`, `Company Name`,
  `University Name`, and the LinkedIn / GitHub links.
- **Email used by the copy button and command menu:** edit `SITE.email` at the top of `script.js`.
- **Photo:** in `about.html`, replace `<span>YN</span>` inside `.avatar` with `<img src="photo.jpg" alt="Your Name">`.
- **Projects:** each project has a card in `projects.html` (and three on `index.html`) plus its own
  `project-*.html` page. To add one, copy an existing case study file, edit it, add a card, and add it to
  `SITE.projects` in `script.js` so it shows up in the command menu.
- **Scripts:** in `scripts.html`, copy one `<article class="script-card">` block per script. Set `data-cat`
  and the badge to `powershell`, `python` or `bash` so the filters work.
- **Resume:** edit the text in `resume.html`. It prints on one A4 / Letter page.
- **Colors:** pick a preset with the palette button in the nav (Indigo, Emerald, Sunset, Ocean), or edit the
  `--a1-l / --a2-l / --a3-l` (light) and `--a1-d / --a2-d / --a3-d` (dark) values at the top of `styles.css`.
- **Testimonials, heatmap and case study text** are samples. Replace them or delete those blocks.
- **Contact form:** opens the visitor's email app. To receive messages directly, point the form at a
  service such as Formspree.

Lines marked ✏️ in the HTML show where to edit.

## Files
- `*.html`: the pages
- `styles.css`: design system (light/dark themes, layout, animation, page transitions, print styles)
- `transitions.js`: page-to-page transitions (slide direction, card-to-case-study morph, fallback fade)
- `script.js`: site settings (`SITE`), theme + accent switcher, command menu, animations, filters,
  copy buttons, contact form

## Keyboard shortcuts
`⌘K` / `Ctrl+K` or `/` opens the command menu (jump to any page or project) · `T` toggles light/dark
