# Everything-IT
My Work Collection — a resume / portfolio website.

## Preview
Open `index.html` in a browser. No build step and no dependencies.

## Publish (free) with GitHub Pages
Settings → Pages → Source: **Deploy from a branch** → choose the branch and `/ (root)` → Save.

## Make it yours
Everything you need to edit is in `index.html`. Search for `Your Name`, `you@example.com`,
`Company Name`, `University Name` and the `href="#"` project links, and replace them.

- **Photo:** in the About section, replace `<span>YN</span>` inside `.avatar` with `<img src="photo.jpg" alt="Your Name">`.
- **Colors:** pick a preset with the palette button in the nav (Indigo, Emerald, Sunset, Ocean), or edit the
  `--a1-l / --a2-l / --a3-l` (light) and `--a1-d / --a2-d / --a3-d` (dark) values at the top of `styles.css`.
- **Testimonials:** replace the sample quotes, or delete the `#testimonials` section.
- **Activity tile:** the heatmap in About is decorative sample data; swap in a real GitHub chart if you like (see the comment in `index.html`).
- **Intro animation:** edit the boot lines in `script.js`, or delete the `#boot` element to turn it off.
- **Typing words in the hero:** edit `data-words` on `#typed`.
- **Resume button:** prints the page as a clean, one-column resume (save as PDF). To link a PDF instead, see the comment above the button.
- **Contact form:** opens the visitor's email app. To receive messages without that, point the form at a service such as Formspree.

## Files
- `index.html` — content and structure
- `styles.css` — design system: light/dark themes, layout, animation, print styles
- `script.js` — boot intro, theme + accent switcher, command menu (⌘K / Ctrl+K / `/`), hero network animation,
  cursor and magnetic effects, scroll reveal, counters, typing effect, project filters, contact form

## Keyboard shortcuts
`⌘K` / `Ctrl+K` or `/` opens the command menu · `T` toggles light/dark
