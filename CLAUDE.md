# CLAUDE.md

## Project

Portfolio site for **YSB Designs** — Yameen, Greater Manchester. One person,
end to end.

Live at https://www.ysbdesigns.uk. Repo: `yameenbux/ysbdesignsportfolio`.

**v3 is live.** It went to `main` on 8 October after being shown and
approved, and ysbdesigns.uk serves it. `main` and
`claude/portfolio-site-spec-2iafjh` are the same commit and should be kept
that way; there is no longer a v2 branch to merge from.

This file is the spec, full stop. v2 "drafting table" is in history at
`c30ceba:CLAUDE.md`, along with the v1 "technical document" and the original
forest-green direction.

v3 replaces the drafting table wholesale: the paper ground, the hairline
rules, the blueprint annotation, the three-sheet hero rig, Archivo /
Instrument Sans / IBM Plex Mono and the left-aligned documentation layout are
all gone.

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
  the `@font-face` rules are at the top of `src/styles/global.css`. Fetched
  from the `@fontsource-variable/*` npm packages and copied in; nothing in
  `package.json` depends on them at build time.
  **`BaseLayout.astro` preloads both files by name**, so swapping a face means
  editing three places — the `@font-face`, the `@theme` token, and the
  preload. Missing the third leaves a 404 on every page. No request
  to fonts.googleapis.com, which keeps the render unblocked, keeps every
  third party off the site, and makes local typography checks real. Two
  families (Space Grotesk, Inter), not three, and still no monospace — see
  "Type".
- **No React, no GSAP, no shadcn.** v3's wheel was ported from a React +
  GSAP ScrollTrigger component by hand — see "The wheel" below for what that
  bought. If a component seems to need a framework, it doesn't.
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
| Tidemark | **Own product**, an iPhone app — built, **not on either store**; own site at tidemark.ysbdesigns.uk | 3 |

Do not imply these were all commissions, and do not imply they are all live.
Taiyabah is community work; say so. Diamond is finished and handed over but
has no public address yet. Tidemark is finished enough to use and is
deliberately not released: its web build is live, the iPhone app has never had
a signed build, and it is on neither the App Store nor Google Play.

### Two groups: work for others, and my own products

**The work index** splits its written-up projects in two — **"Built for
other people"** (three paying clients plus Taiyabah) and **"Built for
myself"** (MasjidOne and Tidemark). A product I own is a different claim from work someone
paid me for, and mixing them lets the products read as clients, which would
be the site inventing a client count.

The homepage does not split: it is the wheel, one ring over everything. See
"Homepage section order".

The split is driven by **`product: true`** in `src/data/projects.js`, not by
matching on the `kind` string — `kind` is display copy and would be a fragile
thing to branch on.

**`status` in `projects.js`** says a project is not simply live. Omit it and
the wheel's read-out shows the pulsing live dot; set it and that exact string
prints in a bordered chip where the dot would be — currently "Not live yet"
for Diamond and "In one masjid" for MasjidOne. The read-out printed the dot
unconditionally until Phase 11; a live indicator on something nobody can
visit, or on a product with no paying customers, is exactly the claim the
copy rules bar, so **anything that is not simply live needs a `status` here.**

**Keep a status to about two words.** It sits inline in a 12px label; a long
one wraps the line it shares with `kind` and `where`.

Client business facts — a trading number, a Gas Safe registration, an office
line — belong in the client's own screenshots, never in YSB's copy. The only
number that appears as text on this site is YSB's own.

### Kept but unlisted

`ellash.html`, `buxtravel.html`, `luxescent.html` are live and indexed, and
must keep building and resolving at their existing URLs. Do not delete them.

**On this branch they are no longer unlisted.** The wheel is one ring over
everything, so they appear on it, and the work index lists them under "Also
built" rather than pretending they do not exist. They are still not written
up as full cases — there is not enough captured material — which is what
`lead` selects for.

### Copy rules

- **No invented metrics, logos, ratings, testimonials or client counts.** Not
  anywhere, not as placeholder text.
- **No vendor logos, with one narrow exception: a certification badge the
  issuer actually issued.** Corrected 7 October — an earlier version of this
  rule banned badges outright, which was a misreading and is why
  `src/data/certs.js` exists. A badge may appear only as **the genuine
  artefact**: the image Credly issued for a credential that is held, ideally
  beside its public verification URL, which is the part a reader can check.
  Never a redrawn, approximated or generic Azure mark — Microsoft's badges
  are trademark-governed and issued through Credly under their own terms, so
  a lookalike is a forgery aimed at the one audience most likely to spot it.
  Never a badge on an exam that has not been sat: a `held: false` entry is
  wired never to render one. Everything else stays type-only — no client
  logos, no stack badges, no imagery outside the screenshots.
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

Five navigable pages and nine case studies — six written up, three listed
only. `/engineering.html` is new on 7 October, `/services.html` stopped being
a redirect, and `/tidemark.html` was added on 8 October.

| URL | Page | In nav |
|---|---|---|
| `/` | Home | — |
| `/work.html` | Work index — the written-up six in two groups, then "Also built" | yes |
| `/engineering.html` | **The technical read** — pipelines, data, failure modes | yes |
| `/taiyabah.html` | Case study — community project | via work |
| `/venetian.html` | Case study — client, live on own domain | via work |
| `/hairbychrissy.html` | Case study — client | via work |
| `/diamond.html` | Case study — client, built and not live yet | via work |
| `/masjidone.html` | Case study — own product, running at one masjid | via work |
| `/tidemark.html` | Case study — own product, an iPhone app, not released | via work |
| `/about.html` | About — the candidate page: what I build, how I work, what I want | yes |
| `/contact.html` | Contact | yes |
| `/ellash.html` `/buxtravel.html` `/luxescent.html` | Kept; on the wheel and under "Also built" | via work |
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

Four sections. Revised in Phase 11, when main's content merged in.

1. **The claim, over the corridor** — the positioning sentence and the three
   layers named, on the image stream. No diagram beside it: the wheel below
   is what argues the case, and a second graphic above it would split the
   attention the wheel needs.
2. **The wheel** — every project, one per card, with the read-out naming the
   active one and showing which of the three layers it needed.
3. **Contact** — WhatsApp as the primary action.

**The estimator left the homepage on 7 October** and lives on
`/services.html`. A price calculator is the wrong first impression on a page a
hiring manager lands on, and it sits better beside the prices. The corridor
and the wheel stay: interface / software / infrastructure reads *better* for
this audience than it did for the last one, and the per-project layer bars in
the read-out are the evidence.

Evidence before biography. Two sections have been cut from the homepage and
neither should come back without a reason: the compressed About (the
estimator does more for a visitor deciding whether to get in touch) and the
capability list, which now lives on About under "What I build". Four
sections beat five — the homepage was a thousand pixels longer than the
approved treatment and read as less clean for it.

**The homepage does not split work into groups; the work index does.** The
wheel is one ring over everything, and cutting it in two would halve the
mechanic for no gain. The distinction is carried on the cards instead, by
`kind` and by the status chip.

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

**v2's palette, on a new structure.**

An earlier v3 put all of this in a saturated ultramarine room — deep blue
ground, bone type, a warm sand accent. **The colour was rejected; the
structure was not.** So the palette here is v2's, unchanged and already
approved, and everything else is new: the wheel, the centre axis, Space
Grotesk and Inter, and no monospace.

Do not reintroduce a saturated ground. If a future direction needs one, it is
a new decision, not a return to something that was already turned down.

The problem the blue was solving is still real: every screenshot on this site
is a light-UI capture, and dropped straight onto paper it sits flush and
disappears. It is solved here the way v2 solved it — with a frame. Every shot
sits on a `plane` sheet with a hairline border, and the active card on the
wheel takes the accent border and a lift.

Still a departure from v2 on every axis except colour: centre-axis rather
than left-aligned, the wheel rather than the three-sheet rig, Space Grotesk
and Inter rather than Archivo / Instrument Sans / IBM Plex Mono, and no
monospace.

### Type

**Changed on 10 October.** Was Syne + Karla. Syne is a display face built for
art institutions, chosen while this file described the identity as
"art-institution rather than start-up" — which was before the hiring pivot.
The typeface did not get worse; the audience changed underneath it. Three
pairings were rendered on the real homepage and this one was picked.

- Display: **Space Grotesk**, 300–700 variable. Geometric and faintly
  technical, which is the register this audience reads in. Carries every
  heading and every button.
  **Its axis stops at 700.** Syne went to 800, so the seven
  `font-weight: 800` declarations were lowered to 700 rather than left to be
  clamped silently by the browser. Do not reintroduce an 800.
  **It is not a monospace**, despite the name — it is a grotesque, and the
  ban a few sections down still holds.
- Body: **Inter**, 100–900 variable, 17px, line-height 1.6. The default body
  face of most developer tooling, which is the point: the page should feel
  native to the people reading it.
- Labels (`.eyebrow`): Inter 12px, 600, uppercase, letter-spacing `0.18em`.
  This is the job the mono did in v2 — done in the body face, because **there
  is no monospace in this system**. Do not add one back.
- Body measure capped at 62ch. h1 up to `clamp(2.9rem, 8.4vw, 6.2rem)`.
- Both are self-hosted (see Stack). Adding a weight means adding a file.

### Colour — v2's, unchanged

```
paper    #E8E6DE   the ground: warm grey drafting paper
paper-2  #DFDCD2   recessed bands; footer
plane    #FBFAF7   a sheet laid on the ground; screenshot mats
ink      #16191C   14.12:1 on paper
ink-2    #5A6068    5.08:1 on paper — AA
blue     #1F45CC    6.04:1 on paper — the accent
signal   #A8410F    4.90:1 on paper — live indicators, the one warm note
line     rgba(22,25,28,.14)
line-2   rgba(22,25,28,.05)
```

Every pair measured, not eyeballed. These are the same values as `main`; do
not re-derive or "refresh" them.

**Blue appears in exactly three places** — the one word the headline turns on,
the active card on the wheel, and the hover state of the primary button. It is
the accent, not a second body colour.

### Layout

- **Colour bands separate sections, not rules.** A section that needs
  separating gets `paper-2`; the footer sits on it.
- `.panel` is a `plane` sheet with a hairline border, for prices, legal copy
  and anything that should read as a document.
- **Screenshots always sit on a `plane` mat with a `line` border.** A light-UI
  capture placed straight on the paper sits flush and disappears — this is the
  single most important rule in the direction, and the reason the earlier
  saturated ground existed at all.
- Centre-axis on the homepage (the wheel is centred by nature); left-aligned
  on the reading pages. 1220px shell.

### The wheel

The signature, in `src/components/Wheel.astro`. Every project on a circle whose
centre is below the viewport; scrolling turns it; whichever card reaches top
dead centre is upright, in full colour, and named in the read-out beneath.

**The rail under the read-out is not decoration and must not be dropped.** A
wheel driven by scroll shows a scanning visitor exactly one project unless
they commit to the whole run, which is the mechanic's one real weakness. The
rail is the way out: it says how many there are, which one you are on, and
jumps to any of them. Real `<button>`s, so the keyboard path is free.

The read-out carries each project's layer bars — which of the three layers it
actually needed. That is where the positioning line stops being a claim and
starts being evidence, project by project, and it is why the hero names the
three layers before the wheel measures against them.

That last part is the whole point. A wheel that only spins is decoration; this
one is a control — the rotation says which project you are looking at and the
read-out is its display. Cards are tangential to the circle, so **the active
card is the only upright one** and you can find it without being told.

Ported by hand from a React + GSAP ScrollTrigger component. What that bought:

- The pin is `position: sticky`, not ScrollTrigger's `pin: true`. Sticky is
  the browser's own mechanism, so the scrollbar keeps its real length, the
  page does not jump on refresh, and a swipe over the wheel scrolls the page
  like a swipe anywhere else. `touch-action` stays `auto` at every width —
  there is no gesture to get wrong.
- The cards are real links. The original used `role="button"` divs, which
  cost the browser's own focus, middle-click and open-in-new-tab.
- ~115KB gzipped of React and GSAP not shipped.

### Motion

Motion is part of the design, and it is structural: it says which project you
are looking at.

- The wheel turns with scroll over ~2600px of travel (2100px below 760px),
  one full revolution.
- Cards fade, shrink and desaturate by **angular distance from top dead
  centre**, over 78°. Not 60°: at six cards the step was exactly 60, so the
  two neighbours sat on the cutoff and blinked in and out as the wheel
  turned. **The cutoff is a constant and the step is `360 / n`** — adding a
  project moves every card, so re-check that no card lands on 78 and that the
  ring is not crowded. At eight the step is 45.
- Scroll reveals: 18px rise and a fade, 700ms, staggered 80ms in fours.
- Hover: 2px lift on buttons, an underline that draws itself on text links, a
  slow scale on project shots.

Rules that hold:

- **The ring is a point, not a box.** It was a 2r square, and Chromium painted
  a 1px seam around its bounding edges — two diagonals across the stage when
  the ring was rotated, a rectangle when it was not — with no border,
  background or outline anywhere in the page to account for it. A zero-size
  element has no edge to seam. Each spoke carries its own `--a` and the script
  advances all six; **do not go back to rotating the container.**
- Nothing in the wheel needs `overflow: hidden` below `.stage`. Clipping a box
  that is exactly the circle's bounding square is what produced the seam
  above, and cards more than 78° from the top are already at opacity 0.
- **Only the active card is named.** On a faded card the label composited to
  2:1 against the ground — a real contrast failure, and the read-out already
  names the active project.
- `prefers-reduced-motion` — and only that, not screen width — turns the wheel
  into a plain grid of the same links, drops the sticky pin and the scroll
  budget, and disables every transition.
- The wheel stops requesting frames when it scrolls out of view.
- **The rail needs `position: relative` and a z-index above the spokes.** The
  spokes are absolutely positioned, so they paint over a static sibling
  however late it comes in the DOM — the cards were lying across the rail and
  swallowing its clicks, which showed up as a target-size failure rather than
  as anything visible.
- Rail ticks clear 24x24 with padding, not by growing the visible mark; the
  tick itself stays a 3px rule.
- Tabbing to a card turns the wheel to bring it to the top, so the keyboard
  path shows what the pointer path shows rather than focusing a card nobody
  can see.
- Reveals are applied only under `.js` — a script error must never leave the
  page blank below the fold.
- `scroll-behavior: smooth` is set on `html`. Any script that scrolls the page
  in steps must pass `behavior: 'instant'` or it will not land where it asks.

### Explicitly forbidden

- Gradient text, glassmorphism, glow, animated mesh backgrounds
- Terminal motifs, typewriter effects, blinking cursors
- Emoji as section iconography
- Parallax on text
- A second accent colour, or blue used as a body colour
- A saturated or dark ground — tried as "Ultramarine" and rejected
- Monospace anywhere (Space Grotesk is a grotesque, not mono — see "Type")
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

**Phase 7 — v3. ON THIS BRANCH, NOT LIVE.** A third direction
built around a scroll-driven radial gallery, ported from a React + GSAP
component into vanilla Astro rather than by installing React, GSAP and
shadcn — which would have overridden four rules in this file at a cost of
~115KB gzipped. All thirteen pages rebuilt.

Built first in a saturated ultramarine palette, which was rejected on the
colour alone; the structure was kept and the palette reverted to v2's. Verified across 13 pages × 375 /
768 / 1440: no horizontal overflow, one h1 each, every image with alt and
dimensions, no reveal left hidden, no empty links. Lighthouse 97/100/100/100
on the homepage and 100 across work, about and the case template; CLS 0.000
throughout. Keyboard, estimator arithmetic, reduced-motion and off-screen
frame pausing all exercised directly. Lighthouse 97/100/100/100 on the
homepage and 100 across work, about, contact and the case template.

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

`YSB Ventures Ltd` appears in that repository's README and was deliberately
**not** carried across — the limited-company details had been removed from
this site at the user's request. **Superseded by Phase 18**, which puts the
registered details in the footer as a statutory disclosure. They still do not
appear in body copy or on a case study.

**Phase 11 — main merged in. DONE.** This branch was three commits behind
`main` and carried none of Diamond, MasjidOne or the two-group split. Merged
rather than rebuilt, keeping v3's design on every axis and taking main's
content wholesale.

`projects.js` was the real work: the two sides had incompatible shapes. v3
had `all` (six, for the wheel) with `lead` spreading `...all[0]`, `...all[1]`,
`...all[2]`; main had a flat `lead` of five, self-contained. Merged to one
array of eight with `lead` derived by predicate — **`all.filter(p =>
p.problem)`** — because index-based spreading breaks silently the moment the
wheel is reordered, and reordering it is exactly what adding a project does.

v3's prose was stale and main's was not: v3 branched before Phase 9 re-checked
every stack line against its repository, so all five write-ups came from main.
Only the wheel's `line` copy is v3's, and Taiyabah's was rewritten because it
predated the portals and the bookings.

Three things the merge broke that the build would not have caught:

- **The wheel's read-out printed the live dot unconditionally**, so Diamond
  and MasjidOne arrived badged as live. A project with a `status` now prints
  that string in a bordered chip instead. This was latent before the merge —
  there was simply nothing on the wheel that was not live.
- **The corridor cycles `i % images.length` over nine card slots**, so the
  two new screenshots would have been invisible appended at the end. The list
  is now nine, one per project.
- **"All 6, written up"** on the wheel's header, and "Six projects, three
  written up" on the 404, were both wrong before the merge and wronger after.
  The header now reads "See all n"; only `lead` is written up.

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

`YSB Ventures Ltd` is named in that repository; it is not carried into the
case study copy, though Phase 18 now discloses it in the footer.

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

**Phase 18 — the company disclosure line, 8 October.** Reverses the standing
removal of the limited-company details, for two reasons that arrived together
and both point the same way.

First, **the rule**: if `YSB Ventures Ltd` is the trading entity, UK
disclosure requirements put the registered name, place of registration,
company number and registered office on its business website. The site is
that website. The earlier removal was an editorial decision about tone, taken
without this being weighed.

Second, **Apple**. An organisation enrolment is the only route that can
display a trade name — an individual account shows your legal name and Apple
does not accept trading names at all — and Apple checks the organisation's
website against the D&B record. A site with no mention of the entity gives
the reviewer nothing to match.

**It is a footer line on every page, and nothing more.** Not body copy, not a
case study, not an About section. The hiring pages are untouched:

> YSB Designs is a trading name of YSB Ventures Ltd, registered in England and
> Wales, company number …. Registered office: ….

**`src/data/company.js` gates it on `number` **and** `office` both being set**,
and both ship empty. A disclosure missing either is worse than none, and a
wrong company number is a false statement about a real entity — Companies
House is refused by the agent proxy here, so the two facts have to come from
the user rather than be guessed. `vat` is optional.

Set in the **body face at 13px**, not `.eyebrow`: that label style is
uppercase with wide tracking, which at sentence length is unreadable. It is
a full-width flex item in `.foot-in`, so it takes its own row beneath both
columns — it must not sit inside `.foot-meta`, which is right-aligned.

**The trading-name construction is the load-bearing part.** "YSB Designs is a
trading name of YSB Ventures Ltd" is what reconciles a site branded YSB
Designs with an entity called something else — and it is the same sentence
Apple needs to be true.

**Phase 19 — Tidemark, 8 October.** A second own-product case, and the first
iPhone app on the site. Asked for by name as "the iOS Tracker"; the repository
is `yameenbux/Tracker` and the product is **Tidemark**, which is the name the
site uses.

**I had previously excluded this repository from the portfolio, and that was
wrong.** The note said it held personal health data including an intimate
habit column. Re-read from source: the habits are water, steps, sleep, veg, no
alcohol and the like, and **no personal data is committed to the repository at
all**. The exclusion is lifted and the reasoning corrected rather than quietly
dropped.

What is genuinely sensitive is what the app *can* hold on a user's own phone —
body photos, measurements and a GLP-1 medication companion. So:

- **Every screenshot is from invented demonstration data**, seeded into a local
  web build (`npx expo export --platform web`) through `localStorage` under
  `tracker_state_v1`. Thirteen weeks of weigh-ins generated from a seeded PRNG,
  no real person's numbers.
- **The Body tab is deliberately not captured**, and the medication companion
  is not screenshotted either. Both are real features and the case study can
  describe them; a frame of either next to the owner's own brand invites a
  reader to infer whose regimen it is.

The write-up's strongest claim is the one the repository makes loudest: **no
server, no account**, because weight, medication and body photos are a special
category under UK GDPR, with the costs written down beside the decision — no
sync, no recovery without a backup, no remote switch. Also carried across:
Holt's linear smoothing in `src/core/trend.ts`, CI that fails when coverage
drops below its floor, and a job that loads the live web app every six hours.

**Held back, because the repository holds them back:** Apple Health, iCloud
sync and widgets are not built and its README forbids describing them as
features anywhere. Three things are written and unit-tested but not proven on
a device — Plus purchase and restore, iOS file encryption while locked, and
the production hardening plugin. The page says all of it.

**One real bug fell out of this.** `sitemap.xml.js` kept its own hand-written
list of every URL, so adding `tidemark.astro` built an eighteenth page that the
sitemap silently did not list. The case studies now derive from `projects.js`;
only the navigable pages are listed by hand, because each carries its own
priority.

Noted for the Apple conversation: that repository records the **Apple Developer
enrolment for YSB Ventures Ltd as in review**, which is the organisation
enrolment route — the only one that can display a trading name.

**Phase 20 — Tidemark re-checked, 9 October.** Ten merges landed there in a
day, and **two claims published yesterday had already gone wrong in opposite
directions.**

- **Overclaimed.** The page said the web build was live and linked to it as
  "Open the web build". Its Pages workflow now labels that address
  `/app/` — **the owner's private test build, not a product**, `noindex`.
  Corrected, and the link now goes to the product site.
- **Underclaimed.** The page said widgets were not built, taken from that
  repository's README. **Widgets are built**: 237 lines across
  `LockWidget.tsx`, `TrendWidget.tsx` and `sync.ts`, and its own site tags
  them *In testing*. This is the Phase 12 error again and it is worth naming:
  **a README is a claim, not evidence.**

**That repository currently contradicts itself** — its README still says
widgets are not built while its product site says they are built and in
testing. Flagged to the user as their bug, not carried into this site's copy;
where the two disagree, **the newer and more specific source wins**, which
here is the site.

**Tidemark has its own domain: `tidemark.ysbdesigns.uk`**, a subdomain of this
one, with the old `yameenbux.github.io/Tracker` addresses redirecting to it.
One workflow publishes the site, the privacy policy, the original single-file
tracker and the test build.

Its own site sorts features into three tiers and **this site now uses its
words rather than paraphrasing**: nine *in the app*, widgets *in testing*,
Apple Watch *coming soon*. The Watch is the one to watch — there are
convincing Apple Watch images in that repository and **they are designs, not
screenshots**, which its own caption says outright. Do not let them become
evidence of a built feature.

Also carried across, because it is the best platform-engineering detail in
that repository: **the Pages build job is least-privilege.** The job that runs
`npm ci`, and so every dependency's install scripts, holds `contents: read`
and nothing else; only a separate deploy job holds `pages: write`. A
compromised postinstall script cannot publish.

### Known, unfixed

- **The corridor hero costs the homepage 7 Lighthouse points.** 90/100/100/100
  with it, against the 97 recorded for the wheel-only homepage above. LCP is
  3.6s; FCP 1.1s, Speed Index 1.1s and TBT 0ms are all fine, so it is the hero
  imagery alone. Measured on `d59e6e7` and after the Phase 11 merge with an
  identical result, so this is the corridor, not the merge. The corridor went
  in "for evaluation" and has not been ruled on — this is the number that
  should decide it.

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
- Recurring visual primitives (`.eyebrow`, `.btn`, `.panel`, `.live`,
  `.ul-draw`, `.rv`) live in `@layer components` in `src/styles/global.css`.
  Component-local CSS goes in the `.astro` file's own `<style>`. v3 uses
  scoped CSS rather than Tailwind utility soup for layout; no CSS modules or
  styled-components.
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
