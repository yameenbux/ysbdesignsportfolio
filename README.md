# YSB Designs — Portfolio

**Live site → https://ysbdesigns.uk**

The portfolio site for **YSB Designs** — fast, mobile-first websites for small businesses, backed by affordable monthly care plans. Based in Bolton, working with clients anywhere in the UK.

A dependency-free static site built around a fixed desk render whose monitor is a live slot: move down the project list and the screenshot in the screen swaps to match. Plans and pricing live on their own route, off the index.

---

## 🖥️ How the site works

The index is not a scrolling grid of cards. It is three states.

**State A — index.** Split layout: identity block and project list on the left, a fixed desk render on the right. The monitor's screen is a slot — the screenshot composited into it changes with the selected project, and the scene itself never moves. Exactly one project is active at a time, marked by a filled pill and a gold expand icon.

- **Desktop** — pure hover. Moving the cursor down the list changes the preview continuously; a click opens the case study.
- **Mobile** — the whole index fits one screen with no scrolling, so the first tap selects and previews and a second tap on the active item opens it. Both are the same piece of state.

**State A2 — about.** `More` doesn't expand a paragraph inline; it replaces the canvas. The render and list step aside, a portrait takes the right side and bleeds off the edge, and the positioning statement becomes a full bio at a narrow measure. The identity block is the fixed anchor — it does not move between A and A2. Escape closes it.

**State B — case study.** A sticky left rail carries the back button, title, outcome copy and "See it live"; the right side is a stack of large rounded cards. Every screenshot is framed inside a panel card, never placed raw on the page background.

Two details worth knowing:

- **The screen swap crossfades through blank** — the outgoing screenshot fades out, then the incoming one fades up, leaving an empty screen at the midpoint. The label changes immediately, so it leads the screen through the fade. That desync is deliberate.
- **The ambient light is keyed to the screen content.** Blurred, desaturated copies of the current screenshot light the wall behind the monitor and spill across the plinth, crossfading on the same timing. A bright project lifts the whole scene; a dark one lets it fall back.

Both are disabled under `prefers-reduced-motion`, along with the page transition.

---

## 🚀 Featured work

Each project has its own case-study page with outcome copy and a full-page screenshot stack.

### Taiyabah Masjid — digital ecosystem
→ **[/taiyabah.html](https://ysbdesigns.uk/taiyabah.html)**
One project, four connected products built and deployed end to end: a daily-use progressive web app, a public website and two in-building digital signage screens.
*Stack:* Cloudflare Workers (serverless edge) · CI/CD with GitHub Actions · OneSignal push · installable, offline-ready PWA · Python timetable pipeline.
*Live:* [app](https://yameenbux.github.io/Taiyabah-Mosque-App/) · [website](https://yameenbux.github.io/Taiyabah-Mosque-Website-Rebrand/)

### Bux Travel — minibus & private hire
→ **[/buxtravel.html](https://ysbdesigns.uk/buxtravel.html)**
A complete, multi-section website for a Bolton minibus and private-hire operator — services, fleet showcase, coverage area, Google reviews, an online booking form and a full FAQ.
*Stack:* static, responsive HTML/CSS/JS · WhatsApp click-to-chat · booking enquiry form · sitemap/robots/privacy, SEO-ready.
*Live:* [buxtravel](https://yameenbux.github.io/BuxTravel/)

### LuxeScent UK — luxury car diffusers *(client project)*
→ **[/luxescent.html](https://ysbdesigns.uk/luxescent.html)**
A shop-style storefront for a Bolton fragrance brand — product carousel, interactive scent finder, and every CTA deep-linking to the brand's Etsy listings.
*Stack:* static, zero-dependency HTML/CSS/JS · CSS design tokens · IntersectionObserver motion · Formspree · Etsy commerce.
*Live:* [luxescentuk](https://yameenbux.github.io/Luxescentuk/)

> *"Exceeded our expectations. We told YSB he could have free rein to do what he liked — and he over-delivered. Would recommend."*
> — **Zahid, LuxeScent UK** (client)

---

## 📁 Repository structure

```
index.html          Portfolio index — split layout, desk render slot, about state
taiyabah.html       Case study
buxtravel.html      Case study
luxescent.html      Case study (client)
services.html       Plans, pricing and how it works — kept off the index
assets/
  portfolio.css     Index + case-study layout (self-contained, carries the tokens)
  portfolio.js      Selection state, screen swap, about state
  styles.css        Original marketing stylesheet — used by services.html only
  img/
    *-web.jpg       Landscape captures — also the screenshots in the monitor slot
    *-phone.jpg     Portrait captures for the case-study stacks
    taiyabah-tt.jpg     Signage: salah times, main hall
    taiyabah-foyer.jpg  Signage: new-build appeal, foyer
    portrait.svg    Placeholder for the about-state portrait — see Known gaps
CLAUDE.md           Design spec the site is built to
CNAME               Custom domain (ysbdesigns.uk) — do not delete
README.md
```

`portfolio.css` and `styles.css` are deliberately separate: the portfolio pages are self-contained, so `services.html` keeps the original marketing stylesheet without either cascade fighting the other.

## 🛠️ Built with

- Multi-page, dependency-free **HTML / CSS / JavaScript** — no build step, no framework
- CSS custom-property design tokens; the desk render is inline SVG with the screenshot composited into the screen rect as a real `<img>`
- Responsive by construction — the index fits a single screen at every size from 1920×1080 down to 320×568, in both the index and about states
- Accessible — visible keyboard focus, keyboard preview through the list, `prefers-reduced-motion` honoured for the screen swap and the page transition
- Deployed on **GitHub Pages** with a custom domain

## ⚠️ Known gaps

- **The about-state portrait is a placeholder.** `assets/img/portrait.svg` renders as a deliberate empty slot reading *"portrait pending"*. Replace it with a real photograph — shot dark and cropped tight, so it sits on the page background rather than looking pasted on — and update the `src` in `index.html`.
- **Screenshots are served at 760px.** That is roughly 1× in the monitor slot on a desktop display, so it is soft on high-DPI screens. Recapturing at 1920 and adding the wider `srcset` entry is the single biggest visual win available.
- **No light palette.** The site is dark-only by design, and the theme control is omitted entirely rather than shipped with one working state.

## 🌐 Deployment

Commit the whole structure (all `.html` files **and** the `assets/` folder) to the root of `main`, then serve via **Settings → Pages → Deploy from a branch → `main` / `root`**.

Custom domain **ysbdesigns.uk**: four A records to GitHub Pages IPs `185.199.108–111.153`, `www` CNAME to `yameenbux.github.io`, and Enforce HTTPS on. The `CNAME` file in the repo holds the domain — **keep it** when updating files or the custom domain will break.

---

## 📫 Contact

- 🌐 [ysbdesigns.uk](https://ysbdesigns.uk)
- 💬 WhatsApp: **+44 7404 901859**
- ☎️ Phone: **+44 7729 247248**
- 💼 [LinkedIn — Yameen](https://www.linkedin.com/in/yameenbux/)

<sub>YSB Designs is a trading name of YSB Ventures Ltd — registered in England &amp; Wales, company no. 16022339.</sub>
