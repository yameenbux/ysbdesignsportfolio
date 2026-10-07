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

> I build and operate small production systems single-handed — multi-tenant
> Postgres, edge compute, and CI that refuses to ship what it has not seen
> run.

**Pivoted to a hiring audience on 7 October.** The line above replaces "I help
new and growing businesses look established online…", which was a freelance
services pitch. The site's job is now to get Yameen hired into a **platform /
DevOps / infrastructure** role; freelance work continues, but it is no longer
what the site leads with.

Voice: **first person singular**. No "we", no "our clients", no claimed
volume, no team language. One person is the offer, not a limitation — and for
this audience it is also the point: working alone means there is nowhere to
hand a problem on to.

Resolved in Phase 2. The handover's line stopped at "brand, site and hosting",
which the work contradicts — Taiyabah alone is serverless backends, a PWA,
CI/CD and digital signage. A homepage that promises hosting and then shows a
distributed system argues with itself. "The software behind it" carries the
breadth without turning the sentence into a stack list, which is what the old
site did and what the audience does not read.

**Audience, from 7 October: a hiring manager or technical recruiter** deciding
whether to interview. The site must survive a 20-second scan *and* a reader
who opens a workflow file to check a claim. The second one is new and it is
the harder test: **every technical claim has to point at something public.**

The previous audience — a prospect deciding whether to hand money to a
stranger — is now served by `/services.html` alone, which is deliberately not
in the nav.

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
- **No logos or vendor badges at all — including certification badges that
  are genuinely earned.** Confirmed 7 October. The certifications are set as
  text and stay that way. Four reasons, so this is not re-argued:
  Microsoft's certification badges are trademark-governed and issued through
  Credly with their own usage terms, and a generic Azure mark is not that
  badge; a coloured vendor logo is wrong against a type-only palette with no
  imagery outside the screenshots; the booked exam has no badge to show, so a
  badge row would either sit half-empty or imply one that has not been
  earned; and the exam code in plain text is the part a reader can verify,
  while the badge is decoration.
- Sentence case, plain verbs, active voice. A button says what happens when
  it is pressed.
- Client-location facts stay as written — "a Bolton masjid", "a Bolton minibus
  operator". Those describe someone else's business. YSB's own location is
  Greater Manchester.
- Case studies are problem → approach → outcome. Screenshots are the hero
  content; the copy explains what the visitor is looking at, because nobody
  recognises these brands the way they'd recognise a well-known product.

## Contact

Three routes, since the 7 October pivot:

- WhatsApp — `07404901859`
- Phone — `tel:+447404901859`
- Email — `yameen_bee@hotmail.co.uk`

**Email was added on 7 October and reverses the long-standing "no address"
position.** That position was taken for a prospect, and prospects do message a
mobile; the audience is now a hiring manager, and recruiters email. A `mailto:`
collects nothing, needs no endpoint and adds no third party, so the privacy
page stays true — it was updated in the same commit to say that an email sits
in a mailbox with an email provider.

**It is a hotmail.co.uk address on a site at ysbdesigns.uk.** Flagged to the
user as a small credibility cost for this audience; the domain and one.com
hosting are already there if a `yameen@ysbdesigns.uk` box is ever wanted.
Until then this is the real address and a real address beats a smart one.

**LinkedIn was removed at the user's request.** It was in the footer of every
page and was the second row of contact.html's "Where and how" list; that
section is now a single paragraph, because a definition list of one term reads
as a list with something missing. The off-site profile link stays off — do not
reintroduce a social profile without being asked.

Resolved in Phase 2. `07404901859` is the correct number. `07729247248` was
wrong and had been on every Call link; fixed in `804ae30`. **One number, used
everywhere** — if a second ever appears, one of them is a bug.

A contact form would need a third-party endpoint (Formspree, Web3Forms) or
`mailto:`, because static hosting has no server. **Decided on 5 October: there
is no form.** WhatsApp and the phone number are the two routes, and that is
the position rather than a placeholder for one. Do not add a form, an endpoint
or an address without being asked.

## Structure

Agreed in Phase 2. Section order and sitemap are settled; Phase 3 builds
against this rather than reopening it.

### Sitemap

Five navigable pages, five case studies, three unlisted. `/engineering.html`
is new on 7 October and `/services.html` stopped being a redirect.

| URL | Page | In nav |
|---|---|---|
| `/` | Home | — |
| `/work.html` | Work index — the five, in two groups, as cases not cards | yes |
| `/engineering.html` | **The technical read** — pipelines, data, failure modes | yes |
| `/taiyabah.html` | Case study — community project | via work |
| `/venetian.html` | Case study — client, live on own domain | via work |
| `/hairbychrissy.html` | Case study — client | via work |
| `/diamond.html` | Case study — client, built and not live yet | via work |
| `/masjidone.html` | Case study — own product, running at one masjid | via work |
| `/about.html` | About — the candidate page: what I build, how I work, what I want | yes |
| `/contact.html` | Contact | yes |
| `/ellash.html` `/buxtravel.html` `/luxescent.html` | Kept, unlisted | no |
| `/services.html` | **Freelance work** — process, prices, estimator. Not in nav | footer |
| `/privacy.html` | Privacy — what the site collects, which is nothing | footer |
| `/terms.html` | Terms — prices, payment, ownership | footer |
| `/404.html` | Custom 404. `noindex`; GitHub Pages serves it automatically | no |
| `/sitemap.xml` `/robots.txt` | Generated; sitemap is `src/pages/sitemap.xml.js` | no |

**URLs keep the `.html` extension.** `build.format: 'file'` is set for that
reason, and new pages inherit it. Directory URLs would mean a permanent second
URL per page plus redirect stubs, to gain nothing a visitor notices.

**`services.html` was a redirect to `/about.html` from Phase 3 until
7 October**, when the pivot gave it its content back. The `redirects` entry in
`astro.config.mjs` is gone — it would shadow the real page. The commercial
data (four steps, three price tiers, seven FAQs) lives in
`src/data/services.js` so the two pages stop sharing a file, and the numbers
are carried verbatim because they are real business terms.

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
3. **Contact** — WhatsApp as the primary action.

**The estimator left the homepage on 7 October** and lives on
`/services.html`. A price calculator is the wrong first impression on a page a
hiring manager lands on, and it sits better beside the prices. The rig stays:
interface / software / infrastructure reads *better* for this audience than it
did for the last one, and the per-project layer bars are the evidence.

Evidence before biography. Two sections have been cut from the homepage and
neither should come back without a reason: the compressed About (the
estimator does more for a visitor deciding whether to get in touch) and the
capability list, which now lives on About under "What I build". Four
sections beat five — the homepage was a thousand pixels longer than the
approved treatment and read as less clean for it.

### Settled, 5 October

All three sat in "Still open" for months. They are decisions now, not
questions, and reopening one needs a reason rather than a mood.

- **No contact form** — that part still holds, and there is still no endpoint
  and no third-party processor. **The no-email half was reversed on 7 October**
  when the audience changed: see "## Contact". Three routes now, still no form. It keeps the site
  with no third-party processor, no form endpoint and nothing for the privacy
  page to disclose. The cost is real and accepted: somebody who will not
  message or ring a stranger has no way in.
- **No portrait, permanently.** `about.html` carries no image at all and is
  built not to want one; the orphaned `PORTRAIT PENDING` placeholder has been
  deleted rather than left inviting someone to wire it up. The page argues
  with words and evidence instead of a face.
- **No testimonials for now.** Not a copy-rules problem — real ones would be
  welcome — simply none collected. The case studies carry the whole job of
  convincing a stranger until that changes.

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

**Phase 13 — Taiyabah re-checked against its repositories. DONE.** Four repos
back it; two had moved. The screens and the home display are untouched since
September, so the write-up for those still stands. The app and the website
rebrand had both changed substantially.

- **The app is on Google Play**, as a Trusted Web Activity verified against
  both signing certificates so a store install opens with no browser bar. The
  case study said only "an installable app". It is still installable from the
  web as well, and both facts are now on the page.
- **Four staff areas became an Admin Centre.** The masjid publishes its own
  prayer timetable a year at a time, writes notices, edits the appeal figure
  and the hall rates, opens and closes adult classes, pulls Gift Aid rows for
  HMRC, tracks food bank volunteers and charity collections, and pushes a
  notification to every phone with the app — without a developer and without
  pushing to GitHub. That is the outcome the old copy understated most.
- **Six roles and three gates, all in Postgres.** The sharpest piece is the
  **imam's inbox**: no imam address exists anywhere to be harvested, the
  question is a row the app cannot read back, and the table has Row Level
  Security on with *no policies at all* and every grant revoked — denial by
  default, reachable only through functions that check the role themselves.
  The check deliberately does not fall back to `admin`.
- **The website is still staged.** `robots.txt` there still blocks crawlers
  pending the move to the masjid's own domain, so "finished and staged" was
  correct and stays. Online booking and the madrasah application form are both
  deliberately published as previews that cannot send.
- **iOS is the open item**, blocked on a D-U-N-S number for the charity.

**Two standing constraints came out of this.** First, **the staff portals
cannot be screenshotted from here** — every one of them is behind a sign-in
against the live database, which holds children's records including medical
and SEND notes. The existing venue capture is safe because it was taken
against drama-range data; do not try to extend the set by signing in. Second,
that repository publishes **role counts and a roll size**. Those are the
masjid's operational facts, not YSB's, and they stay off this site for the
same reason MasjidOne's pupil counts do.

The app screenshot was retaken because the old one predated the current
design; it needs no sign-in and shows only a public timetable.

**Phase 14 — every project re-checked, 5 October. DONE.** Push dates compared
against the date each project's copy was last verified, then only the ones that
had moved were read. **Unchanged and still correct: Venetian, Hair by Chrissy,
Diamond, èllash, LuxeScent and Taiyabah's two screen repos.** Four had moved.

- **MasjidOne** now states a canonical **five products**, and that list carries
  a warning in its own repository because it has been got wrong twice — a
  capability PDF went out omitting the website, and the correction still
  omitted the in-mosque screens. This site said "four surfaces" and left out
  the parent portal, so it is now the five, named their way. Its form Worker
  also moved from Cloudflare Email to **Resend**. Its pricing became banded by
  madrasah size, which this site never quoted, so nothing there had to change —
  and 0% commission on giving is still accurate.
- **Taiyabah's app** runs in **three languages**, and its Qur'anic, hadith and
  duʿā text is checked verbatim against source on every build. Both were
  missing here. "Verified against both signing certificates" became "verified
  through Google's Digital Asset Links", because the fingerprint count is now
  three and a number that moves does not belong in copy.
- **Taiyabah's website** calls it **seven staff areas behind one sign-in**, so
  that is the phrasing used rather than a list implying a count.
- **Bux Travel** gained a working **email route beside WhatsApp** (Web3Forms),
  a reference that ties the WhatsApp message, the logged record and the
  acknowledgement together, quotation/invoice/receipt templates, an email
  signature, a review page and a printable review card, and the deposit stated
  on the page. It also **removed the aggregateRating it had declared about
  itself** — which is the same rule this site keeps, so it is worth saying.

**Two things found and deliberately not published.** Taiyabah has a **native
React Native rebuild** under way to replace the Trusted Web Activity; its own
README says steps 1 and 2 of 4 are done and *"nothing here is on the Play
listing yet"*, so it stays off a portfolio governed by "never claim a feature
that is not built". And the **MasjidOne platform is being built inside the
Taiyabah website's database** — migrations for billing, plans and "every call
names its masjid" landed there on 5 October. That is a genuinely good story,
but it is a week old and still moving; revisit it when it settles rather than
describing a half-applied migration as architecture.

Also noted: **Bux Travel solved its static-hosting form with Web3Forms.** That
was written while this site's own form was still an open question. It is not
one any more — see "Settled, 5 October": there is deliberately no form here.

**Phase 15 — re-checked, 7 October.** Push dates against the 5 October check:
three repos had moved, and the rest had not. **Unchanged: Venetian, Hair by
Chrissy, Diamond, èllash, LuxeScent, Bux Travel and Taiyabah's two screen
repos.**

- **Taiyabah's native rebuild is now feature-complete**, and so it goes on the
  page. On 5 October it was two steps of four with nothing on the Play
  listing, which is why it was held back then; it now carries every screen the
  web app has, is exercised on a real Android emulator in CI, and three of its
  forms write through the same Postgres functions the website calls, so the
  office gets one queue rather than two. **Its release position is stated, not
  implied**: it is deliberately not on the Play listing, and the web app stays
  live and maintained until the native one is better.
- **The iOS line was wrong by omission.** It said the blocker was the Apple
  account. There are two: the rebuild runs on Android and does not yet run on
  an iPhone, and the account is still in Apple's queue. The copy now says
  both, because "waiting on an account" implied code that was ready.
- **MasjidOne needed no change at all.** Its five-product list, the Resend
  route, the support console being the one page touching the real platform,
  and all three of its Postgres gates were re-read and are still exactly as
  this site describes them. Billing by Direct Debit was built in those two
  days but is gated behind an unset endpoint, so it is not claimed.

**The D-U-N-S detail was pulled back after it was written.** The first draft
named the specific error in the charity's D&B record. That is the client's
administrative business, not YSB's, and the rule a few sections up says so —
the copy now says the record needed correcting without publishing what was
wrong with it.

**Still deliberately unpublished: the MasjidOne platform living inside the
Taiyabah website's database.** Migrations 140–144 landed over those same two
days, with billing among them. Two days ago this was "revisit when it
settles"; it has not settled, it has accelerated. Same answer.

**Phase 16 — pivot to a hiring audience, 7 October.** Asked for a more
technical portfolio to support a cloud career. Flagged first that this
conflicts with the whole spec — the audience was a paying prospect and the
positioning was a services pitch — and offered three shapes. **Pivot chosen,
targeting platform / DevOps.**

**`/engineering.html` is the new centre of gravity.** Four sections, and the
rule governing all of them is that **every claim points at a public file**:

- **Delivery.** Not a list of tools — the gates. `native-release.yml` asks
  the GitHub API for a successful smoke run at this exact `head_sha` and
  refuses to build a Play bundle without one. `android-build.yml` asks
  Google's Digital Asset Links API whether the live site verifies, rather
  than trusting the `assetlinks.json` in the repository. CI asserts the
  native app and the website agree on copy, links and colour. The Worker
  deploy re-requests itself and fails if it is not answering.
- **Data and access.** One Postgres with `masjid_id not null` on every table;
  RLS with *no policies at all* as denial-by-default; `is_aal2()` on platform
  admin; `health_check()` catching a table built without its tenant column;
  166 tracked migrations.
- **What it runs on**, which ends by saying plainly that **none of this is
  AWS, Azure or GCP.** Cloudflare, Supabase, GitHub Actions and Render.
  Claiming hyperscaler experience would be the exact failure mode the copy
  rules exist to prevent.
- **Things that broke.** Five green iOS builds that had never executed any of
  the project's code; a reconciler that threw every time it had work and was
  green for weeks because nothing queued; zero rows read as "not built". Each
  with what changed as a result.

**The client material moved rather than going.** `about.html` is the candidate
page now — what I build, how I work, what I am looking for. The process,
prices, estimator and pre-booking FAQs went to `/services.html`, which stopped
being a redirect, and the data behind them went to `src/data/services.js`.
Freelance work is still reachable from About and the footer; it is just not
what a recruiter is made to read.

**One bug, caught by the sweep and entirely mine.** The fourth nav item pushed
the header 46px past 375px — on *every* page, including ones never touched,
which is what identified it as the shared layout rather than the new pages.
The header row now wraps and the nav gap tightens below `sm`, rather than
abbreviating a label.

**Certifications are pending.** The user has some and is sending the list.
There is deliberately **no placeholder slot** on About: the copy rules bar
claiming anything unevidenced, and that includes training.

**Phase 17 — certifications and an email address, 7 October.** The two things
the pivot was waiting on.

- **AZ-900 (Microsoft Azure Fundamentals) is held** and is on About.
  **AZ-104 (Azure Administrator) is booked and not sat**, and is listed
  under a separate "Booked" term, in italics, described as *a plan rather
  than a qualification*. A booked exam is a real fact and shows direction;
  it is not a credential, and the markup must never let it read as one.
  **If it is passed, move it up. If it is postponed, take it off** — this is
  the one claim on the site with an expiry date.
- **The Azure certificate does not soften the experience caveat.** About now
  says it outright: the certificate is Azure, the systems are not, and a
  fundamentals exam is not production experience. That sentence is load
  bearing — without it, an Azure badge next to a list of cloud work implies
  Azure cloud work.
- **Email is live as a third route**, in the footer and on Contact. The
  privacy page was updated in the same commit, as the working rules require:
  "there is no contact form" and "nothing on this site collects your name,
  email address or anything else" both stay true of a `mailto:`, but the
  "when you get in touch" and data-rights paragraphs now name email.

### Known, unfixed

- **Lighthouse scores are still local.** They are no longer font-blocked, but
  they are measured against `python -m http.server`, which sends no cache
  headers — GitHub Pages will differ.
- **Images are JPEG.** Lighthouse offers ~15KB from WebP on a below-fold
  image. Not worth an image pipeline yet.
- **Portrait and contact form are settled, not open** — see "Settled,
  5 October" above. Neither is a gap waiting to be filled.
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
