# CLAUDE.md

## Project

Portfolio site for **YSB Designs** — Yameen, Greater Manchester. One person,
end to end.

Live at https://www.ysbdesigns.uk. Repo: `yameenbux/ysbdesignsportfolio`.

**This branch is v3 and is NOT live.** `main` still carries
v2, "drafting table", and that is what ysbdesigns.uk serves. Do not merge this
branch without being asked — the whole point of it is to be looked at first.

This file is the spec for **this branch**. The v2 spec is on `main`; the v1
"technical document" and the original forest-green direction are in history.

v3 replaces the drafting table wholesale: the paper ground, the hairline
rules, the blueprint annotation, the three-sheet hero rig, Archivo /
Instrument Sans / IBM Plex Mono and the left-aligned documentation layout are
all gone.

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
  the `@font-face` rules are at the top of `src/styles/global.css`. No request
  to fonts.googleapis.com, which keeps the render unblocked, keeps every
  third party off the site, and makes local typography checks real. Two
  families in v3 (Syne, Karla), not three: there is no monospace.
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
| MasjidOne | **Own product**, part-built — not client work | 3 |

Do not imply these were all commissions, and do not imply they are all live.
Taiyabah is community work; say so. Diamond is finished and handed over but
has no public address yet.

### Two groups: work for others, and my own products

**The work index** splits its written-up projects in two — **"Built for
other people"** (three paying clients plus Taiyabah) and **"Built for
myself"** (MasjidOne). A product I own is a different claim from work someone
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
for Diamond and "In development" for MasjidOne. The read-out printed the dot
unconditionally until Phase 11; a live indicator on something nobody can
visit, or on a product that is part-built, is exactly the claim the copy
rules bar, so **anything that is not live needs a `status` here.**

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
| `/masjidone.html` | Case study — own product, in development | via work |
| `/about.html` | About, with services folded in | yes |
| `/contact.html` | Contact | yes |
| `/ellash.html` `/buxtravel.html` `/luxescent.html` | Kept; on the wheel and under "Also built" | via work |
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

Four sections. Revised in Phase 11, when main's content merged in.

1. **The claim, over the corridor** — the positioning sentence and the three
   layers named, on the image stream. No diagram beside it: the wheel below
   is what argues the case, and a second graphic above it would split the
   attention the wheel needs.
2. **The wheel** — every project, one per card, with the read-out naming the
   active one and showing which of the three layers it needed.
3. **Build your stack** — the estimator. Takes the abstract "three layers"
   claim and makes it something a visitor can price.
4. **Contact** — WhatsApp as the primary action.

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

### Still open

- **Contact form mechanism.** Formspree, Web3Forms or `mailto:`. Needed before
  `/contact.html` is built. WhatsApp-first stands until then.
- **Portrait.** `about.html` wants one; the asset is still the
  `PORTRAIT PENDING` placeholder. Shoot it or design around its absence.

## Aesthetic direction

**v2's palette, on a new structure.**

An earlier v3 put all of this in a saturated ultramarine room — deep blue
ground, bone type, a warm sand accent. **The colour was rejected; the
structure was not.** So the palette here is v2's, unchanged and already
approved, and everything else is new: the wheel, the centre axis, Syne and
Karla, and no monospace.

Do not reintroduce a saturated ground. If a future direction needs one, it is
a new decision, not a return to something that was already turned down.

The problem the blue was solving is still real: every screenshot on this site
is a light-UI capture, and dropped straight onto paper it sits flush and
disappears. It is solved here the way v2 solved it — with a frame. Every shot
sits on a `plane` sheet with a hairline border, and the active card on the
wheel takes the accent border and a lift.

Still a departure from v2 on every axis except colour: centre-axis rather
than left-aligned, the wheel rather than the three-sheet rig, Syne and Karla
rather than Archivo / Instrument Sans / IBM Plex Mono, and no monospace.

### Type

- Display: **Syne**, 400–800 variable. Wide, slightly odd, art-institution
  rather than start-up. Carries every heading and every button.
- Body: **Karla**, 200–800 variable, 17px, line-height 1.6.
- Labels (`.eyebrow`): Karla 12px, 600, uppercase, letter-spacing `0.18em`.
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
- Monospace anywhere
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

`YSB Ventures Ltd` appears in that repository's README and is deliberately
**not** carried across — the limited-company details were removed from this
site at the user's request and stay off.

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
