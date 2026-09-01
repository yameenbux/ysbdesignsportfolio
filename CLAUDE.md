# CLAUDE.md

## Project

Portfolio site for **YSB Designs** — Yameen, Greater Manchester. One person,
end to end.

Live at https://www.ysbdesigns.uk. Repo: `yameenbux/ysbdesignsportfolio`.

**Currently mid-rebrand.** This file is the spec. It replaces the previous
version, which described a dark forest-green site modelled on
moritzpetersen.com — deep `#093526` canvas, Bricolage Grotesque, a 3D desk
render with a screenshot slot and content-keyed ambient light. That direction
is retired. The old spec is in git history at `d62dcfd:CLAUDE.md` if a
decision needs checking, but it is not the spec any more.

The desk render, the ambient bloom, the hover-driven pill list and the
three-state (index / about / case) architecture all go.

## Positioning

> I help new and growing businesses look established online — the website, the
> software behind it and the hosting it runs on, built and deployed end to
> end, so you can point people at something you're proud of.

Voice: **first person singular**. No "we", no "our clients", no claimed
volume, no team language. One person is the offer, not a limitation.

Resolved in Phase 2. The handover's line stopped at "brand, site and hosting",
which the work contradicts — Taiyabah alone is serverless backends, a PWA,
CI/CD and digital signage. A homepage that promises hosting and then shows a
distributed system argues with itself. "The software behind it" carries the
breadth without turning the sentence into a stack list, which is what the old
site did and what the audience does not read.

Audience: someone who found YSB through a search or a referral and is deciding
whether to hand money to a stranger. The site must work for a 20-second scan
and for someone reading a case study end to end.

## Stack

Migrating from hand-written static HTML to a build step.

- **Astro**, static output. No React, no framework integrations. If a component
  seems to need React, it doesn't.
- **Tailwind 4** via `@tailwindcss/vite`. Not `@astrojs/tailwind` — that
  integration supports Astro 3–5 only and is deprecated, and this runs Astro 7.
  Tokens live in `@theme` in `src/styles/global.css`, not a `tailwind.config.js`.
- **GitHub Pages**, custom domain `www.ysbdesigns.uk`. DNS at one.com, unchanged.

### Deploy — read before touching the build

`.github/workflows/deploy.yml` builds the site and publishes `dist/` to Pages
on every push to `main`, plus `workflow_dispatch` for a manual run. The Pages
source is **GitHub Actions**, not a branch. Live since `41767c8`.

`build.format: 'file'` is deliberate: it emits `/ellash.html` rather than
`/ellash/`. Changing it breaks every existing and indexed URL.

`public/CNAME` is the only CNAME and is copied into `dist/` on every build.
The workflow fails the build if it goes missing, because a build that silently
drops it takes the custom domain down while still reporting success.

There is no fallback. The old hand-written HTML was removed in `41767c8`, so
pointing Pages back at a branch would now serve nothing — a bad build has to
be fixed forward or reverted in git.

## Commands

```bash
npm install
npm run dev      # localhost:4321
npm run build    # static output to dist/
npm run preview
```

Run `npm run build` before claiming a change works.

## Content

### The three case studies

Chosen on evidence, not recency — these are the three with enough captured
material to carry a screenshot-led layout.

| Project | Type — label it accurately | Assets |
|---|---|---|
| Taiyabah Masjid | Community project | 5 captures |
| The Venetian Company | Paying client, live on their own domain | 4 |
| Hair by Chrissy | Paying client | 4 |

Do not imply all three were commissions. Taiyabah is community work; say so.

### Kept but unlisted

`ellash.html`, `buxtravel.html`, `luxescent.html` are live and indexed. They
stay building and reachable at their existing URLs, simply not linked from the
work index. This satisfies "every existing URL resolves" with no redirect
machinery. Do not delete them.

### Copy rules

- **No invented metrics, logos, ratings, testimonials or client counts.** Not
  anywhere, not as placeholder text.
- Sentence case, plain verbs, active voice. A button says what happens when
  it is pressed.
- Client-location facts stay as written — "a Bolton masjid", "a Bolton minibus
  operator". Those describe someone else's business. YSB's own location is
  Greater Manchester.
- Case studies are problem → approach → outcome. Screenshots are the hero
  content; the copy explains what the visitor is looking at, because nobody
  recognises these brands the way they'd recognise a well-known product.

## Contact

There is **no email address on the site** and none is planned unless a mailbox
is actually created. Routes are:

- WhatsApp — `07404901859`
- Phone — `tel:+447404901859`
- LinkedIn — `linkedin.com/in/yameenbux`

Resolved in Phase 2. `07404901859` is the correct number. `07729247248` was
wrong and had been on every Call link; fixed in `804ae30`. **One number, used
everywhere** — if a second ever appears, one of them is a bug.

A contact form needs a third-party endpoint (Formspree, Web3Forms) or
`mailto:` — static hosting has no server. Not yet chosen. Until it is, the
existing WhatsApp-first approach stands; it converts better than a form for
this audience anyway.

## Structure

Agreed in Phase 2. Section order and sitemap are settled; Phase 3 builds
against this rather than reopening it.

### Sitemap

Five navigable pages, three case studies, four unlisted.

| URL | Page | In nav |
|---|---|---|
| `/` | Home | — |
| `/work.html` | Work index — the three, as cases not cards | yes |
| `/taiyabah.html` | Case study — community project | via work |
| `/venetian.html` | Case study — client, live on own domain | via work |
| `/hairbychrissy.html` | Case study — client | via work |
| `/about.html` | About, with services folded in | yes |
| `/contact.html` | Contact | yes |
| `/ellash.html` `/buxtravel.html` `/luxescent.html` | Kept, unlisted | no |
| `/services.html` | Redirects to `/about.html` | no |

**URLs keep the `.html` extension.** `build.format: 'file'` is set for that
reason, and new pages inherit it. Directory URLs would mean a permanent second
URL per page plus redirect stubs, to gain nothing a visitor notices.

**`services.html` becomes a redirect**, not a deletion — it is live and
indexed. Its pricing and process content folds into `/about.html`. Use Astro's
`redirects` config, which emits a meta-refresh page on static output. Do not
add the redirect until `/about.html` exists, or it points at a 404.

### Homepage section order

1. **Positioning** — the sentence, set as a statement. No hero container, no
   viewport-filling name. Name and role live in the nav; the first thing on
   the page is the claim.
2. **Selected work** — the three case studies, each as label / name / one line
   of outcome / thumbnail, separated by rules. This section does the
   convincing, so it sits above anything about Yameen.
3. **What I do** — a short capability list, mono labels, no icons. Three or
   four lines. Not a services grid.
4. **About, compressed** — two or three sentences, then a link to
   `/about.html`.
5. **Contact** — WhatsApp as the primary action, phone and LinkedIn beside it.

Evidence before biography, because goal 1 says lead with positioning and the
strongest projects. The CTA appears both inline at the end and in the footer,
because goal 3 says a convinced visitor needs something obvious to do.
Sections 3 and 4 are deliberately thin — they serve the reader who is already
interested, not the scanner.

### Still open

- **Contact form mechanism.** Formspree, Web3Forms or `mailto:`. Needed before
  `/contact.html` is built. WhatsApp-first stands until then.
- **Portrait.** `about.html` wants one; the asset is still the
  `PORTRAIT PENDING` placeholder. Shoot it or design around its absence.

## Aesthetic direction

**Technical document.** Reads like well-set engineering documentation or a
technical journal — a specification, a systems paper, a good changelog.
Information-dense, restrained, typographic. Artefacts are the hero content,
not decoration.

### Type

- Headings and body: **IBM Plex Sans**.
- Labels, metadata, eyebrows, code: **IBM Plex Mono**, uppercase, ~11px,
  letter-spacing `0.08em`. This is the primary technical signal — section
  labels, dates, tags, project metadata.
- Body 16–17px, line-height 1.6, measure capped at **68ch**. Never full-width
  prose.
- Modest heading scale: h1 `clamp(2rem, 4vw, 3rem)`. Restraint over size.

### Colour

Light is default and primary. Dark must work but is secondary — and is
optional if it costs time.

```
Light                          Dark
  bg       #FAFAF8               bg       #131416
  surface  #F2F2EE               surface  #1B1D20
  ink      #17181A               ink      #E8E8E4
  muted    #6B7076               muted    #92979D
  rule     #DFDFD9               rule     #2A2D31

  accent   #1F5A5C   deep teal — one token, both themes
```

Accent covers **under 5%** of any screen: links, one hover state, the active
tag. Never a gradient. Never on a large fill. Define it once as a Tailwind
token; never hardcode the hex.

### Layout

- 12-column grid. **Hairline rules (1px, `rule`) are the main structural
  device.** Borders separate content — not shadows, not rounded cards.
- 8px spacing base. Dense but not cramped: sections breathe via rules and
  alignment, not large empty margins.
- Border-radius **2px maximum**. Effectively square.
- Left-aligned throughout. No centred body text.
- Metadata sits in a narrow column against the main content — a documentation
  layout, not a marketing layout.

### Motion

Near-zero. Opacity fades and 2–4px translations only, 150–200ms, ease-out. No
parallax, no scroll-jacking, no 3D tilt, no staggered reveal cascades. Honour
`prefers-reduced-motion` by disabling all of it.

The marquee on `services.html` goes. (It is on that page only — the homepage
never had one.)

### Explicitly forbidden

This direction sits one wrong decision away from the cloned engineer-portfolio
template. Do not produce:

- Dark navy or near-black default background
- Neon or electric accents (cyan, lime, violet) on dark
- Terminal or command-prompt motifs, blinking cursors, typewriter effects
- Gradient text, glassmorphism, glow effects, animated mesh backgrounds
- Card grids with rounded corners and drop shadows
- Emoji as section iconography
- Viewport-filling hero containing only a name

## Sequence

**Phase 1 — migrate, don't redesign. DONE.** Astro scaffolded, all eight pages
ported verbatim, Pages workflow added, old HTML deleted once the live site was
confirmed. Every original URL still resolves.

**Phase 2 — structure. DONE.** See `## Structure` above.

**Phase 3 — rebrand, page by page.** Homepage → work index → case study
template → about → services → contact. One page per prompt, one commit each.

**Phase 4 — ship.** Lighthouse 95+ performance and accessibility, CLS < 0.1.
Every previous URL resolves. `CNAME` in `dist/`. Contact route verified.

## Working rules

- **Port first, rebrand second. Never both in one commit.**
- Read the file before editing it. Do not assume structure from this document.
- Structure before pixels.
- One concern per change. No opportunistic refactors, dependency bumps or
  file moves.
- Do not add a library when Tailwind or an existing dependency covers it.
- Tailwind utilities only; no CSS modules or styled-components.
- Images need explicit width/height, and always an `alt`.
- One `h1` per page; headings form a single logical hierarchy.
- After any change: `npm run build`, then check the affected route at **375px
  and 1440px**, in both themes if dark is in.
- If a request conflicts with this document, say so rather than working
  around it.

## Standing note

Building the site is not the same as getting clients, and it is easier.
Time-box this. The current site is already good enough to send to a prospect.
