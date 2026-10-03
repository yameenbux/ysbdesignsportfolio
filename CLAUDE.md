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
- **Fonts are self-hosted** from `public/fonts/`, latin subset, no italic —
  the `@font-face` rules are at the top of `src/styles/global.css`. There is
  no request to fonts.googleapis.com any more, which removed 710ms of
  render-blocking, removed the only third party on the site, and finally made
  local typography checks real. Archivo is the **wdth-axis** build: the
  standard build has no width axis and would silently render the headings'
  `'wdth' 112` / `88` at normal width.
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

### The lead case studies

Chosen on evidence, not recency — these are the ones with enough captured
material to carry a screenshot-led layout.

| Project | Type — label it accurately | Assets |
|---|---|---|
| Taiyabah Masjid | Community project | 7 captures |
| The Venetian Company | Paying client, live on their own domain | 4 |
| Hair by Chrissy | Paying client | 4 |
| Diamond Heating & Plumbing | Paying client, **built and not live yet** | 3 |
| MasjidOne | **Own product**, running at one masjid — not client work | 4 |

Do not imply these were all commissions, and do not imply they are all live.
Taiyabah is community work; say so. Diamond is finished and handed over but
has no public address yet.

### Two groups: work for others, and my own products

Home and the work index both split the list in two — **"Built for other
people"** (three paying clients plus Taiyabah) and **"Built for myself"**
(MasjidOne). A product I own is a different claim from work someone paid me
for, and mixing them lets the products read as clients, which would be the
site inventing a client count.

The split is driven by **`product: true`** in `src/data/projects.js`, not by
matching on the `kind` string — `kind` is display copy and would be a fragile
thing to branch on.

**`status` in `projects.js`** drives the badge printed over each homepage
shot. Omit it and the project gets the pulsing "Live" chip; set it and that
exact string prints flat instead — currently "Not live yet" for Diamond and
"In one masjid" for MasjidOne. It replaced a boolean, which could only say
live or not and had no way to describe a published marketing site in front of
a part-built product. A Live badge on either is the kind of claim the copy
rules bar, so put the honest label here rather than dropping the badge.

**Keep a status to about two words.** The chip is sized for "Live"; a long one
lies across the shot and covers the client's own logo, which is how
"Built · not live yet" became "Not live yet".

Client business facts — a trading number, a Gas Safe registration, an office
line — belong in the client's own screenshots, never in YSB's copy. The only
number that appears as text on this site is YSB's own.

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

**LinkedIn was removed at the user's request.** It was in the footer of every
page and was the second row of contact.html's "Where and how" list; that
section is now a single paragraph, because a definition list of one term reads
as a list with something missing. There are **two routes on the site**, both
the same number — do not reintroduce a social profile without being asked.

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

Four navigable pages, five case studies, three unlisted.

| URL | Page | In nav |
|---|---|---|
| `/` | Home | — |
| `/work.html` | Work index — the five, in two groups, as cases not cards | yes |
| `/taiyabah.html` | Case study — community project | via work |
| `/venetian.html` | Case study — client, live on own domain | via work |
| `/hairbychrissy.html` | Case study — client | via work |
| `/diamond.html` | Case study — client, built and not live yet | via work |
| `/masjidone.html` | Case study — own product, running at one masjid | via work |
| `/about.html` | About, with services folded in | yes |
| `/contact.html` | Contact | yes |
| `/ellash.html` `/buxtravel.html` `/luxescent.html` | Kept, unlisted | no |
| `/services.html` | Redirects to `/about.html` | no |
| `/privacy.html` | Privacy — what the site collects, which is nothing | footer |
| `/terms.html` | Terms — prices, payment, ownership | footer |
| `/404.html` | Custom 404. `noindex`; GitHub Pages serves it automatically | no |
| `/sitemap.xml` `/robots.txt` | Generated; sitemap is `src/pages/sitemap.xml.js` | no |

**URLs keep the `.html` extension.** `build.format: 'file'` is set for that
reason, and new pages inherit it. Directory URLs would mean a permanent second
URL per page plus redirect stubs, to gain nothing a visitor notices.

**`services.html` becomes a redirect**, not a deletion — it is live and
indexed. Its pricing and process content folds into `/about.html`. Use Astro's
`redirects` config, which emits a meta-refresh page on static output. Do not
add the redirect until `/about.html` exists, or it points at a 404.

### Homepage section order

Revised in Phase 5 when the rig and the estimator arrived.

1. **Positioning + the rig** — the claim, and beside it the three-layer
   diagram it describes. No hero container, no viewport-filling name.
2. **Selected work** — the projects in their two groups, each with kind,
   outcome and a layer read-out showing which of the three layers that
   project actually needed. The heading is "Selected work", not "Things I
   have actually shipped" — that line is now the first group's subhead,
   because it is not true of a product with no paying customers yet, and an h2 that
   argues with the card under it is worse than a plainer h2. Outline is
   h2 section → h3 group → h4 project, the same shape the work index uses.
3. **Build your stack** — the estimator. Takes the abstract "three layers"
   claim and makes it something a visitor can price.
4. **Contact** — WhatsApp as the primary action.

Evidence before biography. Two sections have been cut from the homepage and
neither should come back without a reason: the compressed About (the
estimator does more for a visitor deciding whether to get in touch) and the
capability list, which now lives on About under "What I build". Four
sections beat five — the homepage was a thousand pixels longer than the
approved treatment and read as less clean for it.

### Still open

- **Contact form mechanism.** Formspree, Web3Forms or `mailto:`. Needed before
  `/contact.html` is built. WhatsApp-first stands until then.
- **Portrait.** `about.html` wants one; the asset is still the
  `PORTRAIT PENDING` placeholder. Shoot it or design around its absence.

## Aesthetic direction

**Drafting table.** The positioning line names three layers — the website, the
software behind it, the hosting it runs on. The identity is built on that:
paper sheets on a drafting grid, blueprint annotation with leader lines, and
things that come apart so you can see inside. Precise rather than decorative;
the motion exists to show structure, not to entertain.

Chosen from three treatments pitched as working pages. The two rejected
directions were a kinetic editorial one and a dark cinematic evolution of the
old forest-green brand.

### Type

- Display: **Archivo** (variable width). Headings run wide (`wdth 112`);
  secondary heading lines drop to `wdth 88` and `--color-ink-2`.
- Body: **Instrument Sans**, 17px, line-height 1.62.
- Annotation: **IBM Plex Mono**, 11.5px, uppercase, letter-spacing `0.14em`.
  This carries every label, kicker, caption and figure on the site.
- Body measure capped at 68ch. h1 `clamp(2.4rem, 5.6vw, 4rem)`.
- All three are self-hosted (see Stack). Adding a weight or an italic means
  adding a file, not editing a URL.

### Colour — single light theme, deliberately

The paper ground *is* the identity; there is no dark counterpart that means
the same thing. Dark mode is gone rather than half-built, which also retires
the `#1F5A5C`-on-`#131416` accent that shipped at 2.35:1.

```
paper    #E8E6DE   the ground: warm grey drafting paper
paper-2  #DFDCD2   recessed areas
plane    #FBFAF7   a sheet laid on the ground
ink      #16191C   14.12:1 on paper
ink-2    #5A6068    5.08:1 on paper — AA
blue     #1F45CC    6.04:1 on paper — structure, annotation, active state
signal   #A8410F    4.90:1 on paper — live indicators, the one warm note
line     rgba(22,25,28,.14)
grid     rgba(31,69,204,.07)
```

Every pair above was measured, not eyeballed. The brighter `#2D5BFF` and
`#E0632A` from the pitch failed AA on the 11.5px mono labels they are used
for, so both were darkened until they passed.

### Layout

- Hairline rules still separate sections. Sheets carry a 1px border and a
  2px radius; the only shadow on the site is the lift under a floating sheet
  in the hero rig.
- Metadata in a narrow column against the content — the documentation layout
  survives from the previous direction.
- Left-aligned throughout. 8px spacing base.

### Motion

Motion is now part of the design rather than something to minimise, but it is
still structural:

- The hero rig separates on pointer movement and can be dragged or keyed
  apart. It settles to a resting spread so it reads as three sheets.
- Below 700px the sheets overlap in a tight fan and their labels move to a
  legend under the rig. Labelling each sheet in place forced them apart,
  which cost a third of the hero screenshot — 128px against the treatment's
  189px. The screenshot is the hero; the labels are not. There is no
  cursor on a phone and drag would fight the page scroll, so **scroll drives
  the spread**: the sheets fan apart over the first ~420px of the page. Plus
  a staggered entrance on load, which is the motion a touch visitor sees
  first. It must animate on a phone — a rig that only responds to a cursor is
  a rig that does nothing on the device most visitors arrive on.
- `touch-action` must never be `none` on the rig at phone width: blocking it
  means a swipe over the hero does not scroll the page at all.
- The rig's height must clear the stack at **full** spread, not at rest. The
  sheets are absolutely positioned so they never grow the box, and at maximum
  spread the bottom one lands on whatever follows.
- Scroll reveals: 14px rise and a fade, 700ms.
- Hover: 2px lift on buttons, a slow scale on project shots.

Rules that hold:

- `prefers-reduced-motion` — and only that, not screen width — collapses the
  rig to a static labelled stack and disables every transition.
- A layer anchored with `left:50%` plus `translateX(-50%)` puts its
  untransformed box past the viewport and into `scrollWidth`, which reads as
  phantom horizontal scroll even though nothing looks wrong. Anchor with
  `left:0; right:0; margin-inline:auto` instead — and if you do, **delete the
  `translateX(-50%)` from the rig's JS transform in the same edit**. The two
  are one mechanism; orphaning either half drags the sheets half their own
  width out of their column and under the hero paragraph.
- The rig's leader-line labels need about 190px to the right of the sheets.
  Below 1180px the column cannot spare it, so the labels move to the legend
  under the rig — the same trade the phone deck makes. Do not try to bound the
  label box with `right:0`: `.anno`'s containing block is its own layer, so it
  resolves against a 340px sheet and collapses the box to zero width.
- `touch-action` is gated on `(pointer: coarse)`, not on width. A tablet at
  768px is above the deck breakpoint but still has no cursor, and `none` there
  means a swipe over the hero cannot scroll the page.
- The rig stops requesting frames when it settles *and* when it scrolls out
  of view.
- Reveals are applied only under `.js` — a script error must never leave the
  page blank below the fold.

### Explicitly forbidden

- Dark navy or near-black grounds; neon or electric accents
- Gradient text, glassmorphism, glow, animated mesh backgrounds
- Terminal motifs, typewriter effects, blinking cursors
- Rounded drop-shadowed card grids
- Emoji as section iconography
- Parallax on text, scroll-jacking, staggered reveal cascades
- Motion that does not describe structure

## Sequence

**Phase 1 — migrate, don't redesign. DONE.** Astro scaffolded, all eight pages
ported verbatim, Pages workflow added, old HTML deleted once the live site was
confirmed. Every original URL still resolves.

**Phase 2 — structure. DONE.** See `## Structure` above.

**Phase 3 — rebrand, page by page. DONE.** Homepage, work index, about
(services folded in), contact, and all six case studies off one
CaseLayout — including the three unlisted ones, so nothing is left on the
retired design.

**Phase 4 — ship. DONE.** All eleven historically-live URLs resolve,
services.html redirects to about.html, CNAME lands in dist/, and one phone
number and one WhatsApp number appear site-wide.

**Phase 5 — "drafting table" rebrand. DONE.** The technical-document direction
shipped and read as too plain. Replaced across all ten pages. Lighthouse
99/100/100/100 on the homepage (the interactive one) and 100 across work,
about, contact and the case template; CLS 0.000 everywhere.

**Phase 6 — the pre-launch audit. DONE.** Privacy, terms, a custom 404, an
FAQ on About, `robots.txt`, a generated sitemap, `og:image` and Twitter card,
a favicon in the current palette, and the fonts brought in-house. Two real
bugs fell out of it: 184px of horizontal overflow from the rig's annotations
at 1440, and 82–104px more between 768 and 960 from the `left:50%` anchor.
Lighthouse, measured for the first time with the actual webfonts:
96/100/100/100 on the homepage, 98–99 elsewhere, CLS 0.000 throughout.

**Phase 8 — catch the site up with the work. DONE.** Two projects' worth of
new material, gathered from the source repositories rather than from memory:

- **Taiyabah** grew a website rebrand with accounts and four staff portals —
  hall and nikāḥ bookings with Stripe deposits and a thirty-minute date hold,
  adult course sign-ups, a madrasah portal, and roles enforced in the database
  rather than the interface. Two new captures. Stated as staged, not live: the
  masjid's own hall-hire page says online booking is not switched on, and
  `robots.txt` there blocks crawlers pending the domain move.
- **Diamond Heating & Plumbing**, a new client case study. Its screenshots did
  not exist, so the site was built from source and rendered at 1440 and 390.

Checked before publishing: the venue-portal capture uses Ofcom's reserved
`07700 900xxx` drama range, not real bookings.

**Phase 9 — stack lines and copy re-checked against the repositories. DONE.**
Every project visible on the site was read from its source repo rather than
from the existing copy, and the `role` / `stack` lines now name real
technologies instead of capability words.

What had actually gone stale:

- **Hair by Chrissy** was described as "a plain Node server, a JSON store and
  hand-written front end, no framework and no dependencies". It is now a Node
  API on Render with **Supabase/Postgres and Stripe Checkout** behind it, plus
  a dashboard Chrissy runs her own diary from. The case study also implied the
  published link runs the booking engine — it does not: GitHub Pages cannot,
  so that copy deliberately falls back to **enquiry mode**, and the write-up
  now says so.
- **Bux Travel** was described as one site with sections. It is **twenty
  pages** — one per vehicle size, per job and per town — with Node tooling for
  WebP, the sitemap and cache-stamping.
- **Venetian** is Astro, Tailwind and TypeScript; **Diamond** is Next.js 15
  static export with TypeScript, Tailwind 4 and shadcn/ui; **Taiyabah** runs a
  Cloudflare Worker, OneSignal push, Supabase/Postgres, Stripe and a Python
  build.

Two things that had drifted structurally: the work index hardcoded "Three
projects" and now reads `lead.length`, and four meta descriptions ran past
where Google truncates. All are now under 160 characters.

**A stale `description` costs three times.** It is the meta description, the
`og:description` and the `twitter:description`, so the phrase that was wrong
about Hair by Chrissy appeared three times in that page's head after the body
copy had already been fixed. Grep the built HTML, not the source.

**Phase 10 — MasjidOne. DONE.** Added as a fifth lead case and the first
entry that is not client work: a product putting a masjid's madrasah and its
congregation on one Supabase Postgres, with a `masjid_id` on every table.

Its repository is only the marketing site; the platform lives elsewhere, and
the write-up says so rather than implying the whole thing is built. Three
constraints came from MasjidOne's own `CLAUDE.md` and are binding here too:
**never claim a feature that is not built** (the madrasah portal and parent
access are in development), never say no competitor does the whole masjid,
and compliance is a commitment rather than a fact. The pricing screenshot is
the best evidence for all of it — their own plan cards read *in development*
and *live*.

The architecture SVG was rendered and rejected: it relies on a font that is
not available here, so mermaid's text metrics overflow every box and the
labels clip. Do not ship it without the font.

`YSB Ventures Ltd` appears in that repository's README and is deliberately
**not** carried across — the limited-company details were removed from this
site at the user's request and stay off.

**Phase 12 — MasjidOne re-checked against its repository. DONE.** Seventy
commits had landed there since the case study was written, and the write-up had
gone wrong in the **expensive direction**: it said the madrasah portal and
parent access "are not built yet". Both are built and enforcing, and that
repository's own `CLAUDE.md` records the same error being corrected on its
site on 1 October 2026 — features were tagged *in development* because their
tables were empty. **Zero rows means nobody has used it yet, not that it does
not exist.** The test is whether the functions exist and enforce, not whether
rows do.

What the copy now says, split the way that repository splits it, because the
two halves are genuinely at different stages:

- **The congregation side runs every day** in a Bolton masjid — a year of
  prayer times published, jamāʿah notifications firing off the timetable on
  their own. That is defensible and was being needlessly withheld.
- **The madrasah side is built and holds that masjid's full roll**, but no
  register has been marked on it, so it is *not* described as running. "Built"
  and "in a masjid" are the limit; "running" and "in daily use" are not, and
  must not be borrowed from the congregation half.
- **Nothing is said about reach.** The notifications go to a handful of
  devices. "It runs every day" is true; "a congregation uses it" is not, and
  the demo's reach fixture is invented sample data that must never appear in a
  sentence about a real masjid.

The stale pricing screenshot was deleted rather than recaptioned: it showed
*in development* tags that no longer exist anywhere on that site. Two
screenshots replace it, both from the demonstration tenant on invented data
with its banner in frame — a teacher's register, and parent access, which is
the single best evidence for the thing the old copy denied.

The case study links out to **masjidone.co.uk**, confirmed live by the user.
It could not be checked from here — the agent proxy refuses that host, as it
does ysbdesigns.uk — so the screenshots were taken from a local build of that
repository rather than from the live site.

`YSB Ventures Ltd` is named in that repository and is still deliberately not
carried across.

### Known, unfixed

- **Lighthouse scores are still local.** They are no longer font-blocked, but
  they are measured against `python -m http.server`, which sends no cache
  headers — GitHub Pages will differ.
- **Images are JPEG.** Lighthouse offers ~15KB from WebP on a below-fold
  image. Not worth an image pipeline yet.
- **Portrait** is still absent by choice; About is built not to want one.
- **Contact form mechanism** is still unchosen. WhatsApp-first stands.
- **Analytics: none, deliberately.** Adding any is what would make the privacy
  policy legally required rather than merely honest, and a cookie-based one
  (GA4) would also need a consent banner. A cookieless one (Plausible,
  Cloudflare Web Analytics) would not. Unchosen.
- **The terms page states real commercial terms.** Every clause on it was
  already published on About or follows from it. Anything added there is a
  commitment, so it is not a page to pad.

## Working rules

- **Port first, rebrand second. Never both in one commit.**
- Read the file before editing it. Do not assume structure from this document.
- Structure before pixels.
- One concern per change. No opportunistic refactors, dependency bumps or
  file moves.
- Do not add a library when Tailwind or an existing dependency covers it.
- Tailwind utilities for layout; recurring visual primitives (`.label`,
  `.btn`, `.sheet`, `.chip`, `.wire`, `.pulse`, `.anno`, `.rv`) live in
  `@layer components` in `src/styles/global.css`. Component-local CSS goes in
  the `.astro` file's own `<style>`. No CSS modules or styled-components.
- Anything interactive needs a keyboard path and an `aria` state, and must
  behave under `prefers-reduced-motion`.
- Never put `.rv` on a `display:contents` element — it generates no box, so
  IntersectionObserver never fires and the content stays hidden for good.
- Images need explicit width/height, and always an `alt`.
- One `h1` per page; headings form a single logical hierarchy.
- After any change: `npm run build`, then check the affected route at **375px
  and 1440px**, in both themes if dark is in.
- `privacy.html` describes what the site actually does. Adding an analytics
  script, a form endpoint or a third-party embed makes it untrue — update it
  in the same commit.
- If a request conflicts with this document, say so rather than working
  around it.

## Standing note

Building the site is not the same as getting clients, and it is easier.
Time-box this. The current site is already good enough to send to a prospect.
