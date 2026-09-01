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

> I help new and growing businesses look established online — brand, site and
> hosting handled end to end, so you can point people at something you're
> proud of.

Voice: **first person singular**. No "we", no "our clients", no claimed
volume, no team language. One person is the offer, not a limitation.

> **Flagged, unresolved.** This line is narrower than what the site says today
> ("Websites, apps, backends, cloud. Designed, built and deployed end to end.")
> and narrower than the full-stack breadth Taiyabah actually demonstrates —
> serverless backends, a PWA, CI/CD, digital signage. It was agreed in the
> handover; it is recorded here as agreed. If the intent was to lead softer on
> the homepage while the case studies carry the technical depth, that works.
> If the breadth was meant to survive, this line needs rewriting before the
> homepage is built.

Audience: someone who found YSB through a search or a referral and is deciding
whether to hand money to a stranger. The site must work for a 20-second scan
and for someone reading a case study end to end.

## Stack

Migrating from hand-written static HTML to a build step.

- **Astro**, static output. No React, no framework integrations. If a component
  seems to need React, it doesn't.
- **Tailwind** via `@astrojs/tailwind`.
- **GitHub Pages**, custom domain `www.ysbdesigns.uk`. DNS at one.com, unchanged.

### Deploy — read before touching the build

Today Pages serves the **repo root** directly; there is no `.github/workflows/`
and no build step. Astro changes that. Either commit `dist/`, or add an Actions
workflow that builds and publishes it. Adding the workflow is the intended
route, but it is a deploy-configuration change, not just code — treat it as its
own commit and verify the site still serves before moving on.

`CNAME` currently sits at the repo root and must end up in `dist/` after every
build, or the custom domain drops.

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
- Phone — `tel:+447729247248`
- LinkedIn — `linkedin.com/in/yameenbux`

> **Open item.** The two numbers disagree. WhatsApp goes to `07404901859`,
> the Call link dials `07729247248`. One of them is wrong. Resolve before
> building the contact page.

A contact form needs a third-party endpoint (Formspree, Web3Forms) or
`mailto:` — static hosting has no server. Not yet chosen. Until it is, the
existing WhatsApp-first approach stands; it converts better than a form for
this audience anyway.

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

**Phase 1 — migrate, don't redesign.** Scaffold Astro alongside the existing
HTML; delete nothing. Build `BaseLayout.astro` (head, nav, footer). Then port
pages one at a time, content and appearance unchanged, one commit each.
Confirm every existing URL still resolves. Only then delete the old HTML.

**Phase 2 — structure.** Propose sitemap and homepage section order in
markdown. No code. Agree it, then commit it here under `## Structure`.

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
