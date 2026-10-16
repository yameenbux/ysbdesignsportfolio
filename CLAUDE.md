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
| Hair by Chrissy | Paying client | 4 |
| MasjidOne | **Own product**, running at one masjid — not client work | 4 |
| Tidemark | **Own product**, an iPhone app — built, **not on either store**; own site at tidemark.ysbdesigns.uk | 3 |
| Bolton Vouched | **Own product**, a Bolton directory — built and deploying, **not launched** | 4 |
| Booked In | **Own product**, a booking platform for solo beauty pros — **live** | 3 |

**Retired at the user's request: The Venetian Company, Diamond Heating &
Plumbing and LuxeScent UK on 10 October, and **Bux Travel on 13 October**
— that one because it is the family business rather than client work, which
is a reason to take it off a portfolio and not a reason to hide it.** They are off every listing, out of the
sitemap and `noindex`ed — but their pages still build and their URLs still
resolve, because this file has promised since Phase 4 that every live URL
keeps working, and three indexed addresses do not stop being indexed because
the owner stopped liking them. `retired: true` in `src/data/cases.js` is what
sets the `noindex`. Deleting them outright is a separate decision and has not
been taken.

Do not imply these were all commissions, and do not imply they are all live.
Taiyabah is community work; say so. Tidemark is finished enough to use and is
deliberately not released: its web build is live, the iPhone app has never had
a signed build, and it is on neither the App Store nor Google Play.

### Two groups: work for others, and my own products

**The work index** splits its written-up projects in two — **"Built for
other people"** (Hair by Chrissy, plus Taiyabah as community work) and
**"Built for myself"** (MasjidOne, Tidemark, Bolton Vouched and Booked In).
**èllash moved across on 12 October** and then **became Peony the same day** —
it had been listed as a client, and calling your own business a client is the
invented-client-count failure this file bars. **That first group is now
thinner than the second**, which is worth watching: retiring Venetian,
Diamond and LuxeScent left one written-up paying client on the site, and a
portfolio weighted towards a person's own products argues less well that
other people hire them. A product I own is a different claim from work someone
paid me for, and mixing them lets the products read as clients, which would
be the site inventing a client count.

The homepage does not split: it is the wheel, one ring over everything. See
"Homepage section order".

The split is driven by **`product: true`** in `src/data/projects.js`, not by
matching on the `kind` string — `kind` is display copy and would be a fragile
thing to branch on.

**`status` in `projects.js`** says a project is not simply live. Omit it and
the read-out shows the pulsing live dot; set it and that exact string prints in
a bordered chip where the dot would be. **From 12 October the vocabulary is
binary: either no `status` (Live) or exactly `'Pre-launch'`.** Asked for
directly, and it replaced "In one masjid" and "Not released", which were
accurate but made the column read as seven different states. Do not invent a
third value. The read-out printed the dot
unconditionally until Phase 11; a live indicator on something nobody can
visit, or on a product with no paying customers, is exactly the claim the
copy rules bar, so **anything that is not simply live needs a `status` here.**

**Keep a status to about two words.** It sits in an 11px chip; a long one
wraps. Since `kind` left the home list the chip has that column to itself,
which makes a long value more forgiving — but the vocabulary is fixed at two
values anyway.

Client business facts — a trading number, a Gas Safe registration, an office
line — belong in the client's own screenshots, never in YSB's copy. The only
number that appears as text on this site is YSB's own.

### Kept but unlisted

**This section is now empty of listed pages, and that is the point.**
`ellash.html` and `peony.html` are both redirects to `/bookedin.html` and
`buxtravel.html` was retired on 13 October — but **both still resolve**, and
must keep doing so. Every URL this site has ever published stays reachable;
retiring a project removes it from the listings and the sitemap and sets
`noindex`, it does not 404 an address someone may have bookmarked or Google
may still hold.

`venetian.html`, `diamond.html` and `luxescent.html` are the **retired** three:
same promise, but unlisted and `noindex`. LuxeScent was in this paragraph as a
kept-but-unlisted page before 10 October; it is now retired for the same
reason as the other two.

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
  wired never to render one.
- **Client wordmarks and stack marks are allowed on the work list, from
  12 October.** This reverses "everything else stays type-only — no client
  logos, no stack badges", which held until then. Asked for directly; the
  conflict was put to the user before it was built. Three conditions make it
  survivable rather than a sponsor wall:
  - **Every mark is the genuine artefact, never a redrawn one.** The client
    wordmarks come from each project's own repository — Taiyabah's and
    Tidemark's SVGs, Bux Travel's and MasjidOne's lockups keyed off their
    plates — and the ones that exist only as CSS are set in the face their
    own site uses (Hair by Chrissy in Cormorant Garamond). Nothing is traced
    by eye.
    **Where a brand ships a running app, capture its own rendering rather than
    rebuilding the lockup from its CSS.** Bolton Vouched was rebuilt by hand
    twice and was wrong twice — the second time because the brand had changed
    under me from a "BV" monogram to a house-and-tick mark and a reconstruction
    cannot notice that. It is now a screenshot of the real `.s-brand` element
    from a local build, keyed to transparency by **flood-filling from the
    border** so the near-white mark inside the brick tile is never reached. Only
    the wordmark colour is substituted, to that product's own dark ink, because
    its header is cream-on-dark and this ground is paper.
    **Booked In is captured the same way**, and it is the reason the rule is
    worth keeping: that brand was èllash, then Peony, then Booked In inside a
    week, and each time the mark changed with it. Its `.brand` element — the
    didone B beside the name in Bodoni Moda — is shot from a local build of its
    own site and flood-filled from the border. A rebuild from `brand.md` would
    have been a faithful drawing of whichever name was current when the file
    was last read.
  - **Stack marks are `simple-icons` paths, unmodified**, in `src/data/stack.js`.
    A mark that package does not carry stays unillustrated — OneSignal and
    Playwright do, and they are simply absent rather than approximated.
  - **Each mark carries its own brand colour** — reversed on 12 October, a few
    hours after shipping monochrome, once it was seen live. Where a mark was
    drawn for a dark ground, the substitute comes from **that brand's own
    light-mode tokens** rather than being darkened by eye: Taiyabah's logo gold
    `#D0B060` becomes its own `--gold-ink` `#8A6A18` and its cream becomes its
    own plum `#5E1844`. Nothing is colour-picked off a screenshot.
  - **Every mark renders at the same 30px height**, set in `projects.js` as
    `logo.h` with `w` derived from the file's real pixels so nothing is
    distorted and no image is unsized. Equal height is the standard for a logo
    row, and the residual unevenness is inherent to it: a pure lowercase
    wordmark fills its box while a monogram over two small lines does not, so
    Tidemark reads larger than Bux Travel at identical heights.
  - **Taiyabah is the horizontal lockup its own website header uses** — the
    mark beside the name in Fraunces — not the stacked logo file. Stacked, it
    was the one mark a shared height made illegible, because two lines of type
    inside a 30px box is 7px of type. Its repositories ship no horizontal SVG;
    its site composes one in markup, and this follows that composition.
  **Azure is still barred as a stack mark** and `src/data/stack.js` says so in
  its header. The certificate is Azure; the systems are not.
  No imagery outside the screenshots and these marks.
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

- WhatsApp — `07466487591`
- Phone — `tel:+447466487591`
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

**The number is `07466487591`, set on 11 October.** It is the third in two
days: `07404901859` until 11 October, then `07729247248` for a few hours,
now this. The earlier history is in `804ae30` and in the commit log; it is
not worth restating, because **the only number that matters is the one
in the working tree.** Do not treat any older number in this file or in git
as a fallback — if the links ever disagree, read them out of
`BaseLayout.astro`, which is where `WHATSAPP` and `TEL` are defined.

**One number, used everywhere** — if a second ever appears, one of them is a
bug. That rule is what caught the September mismatch and it still holds:
WhatsApp, `tel:` and the display text are all `07466487591`, in 54 links
across all 18 pages.

**Because the number has now moved three times, changing it is routine and
does not need a question** — the standing answer is that WhatsApp, `tel:`
and the display text all move together. What does still need doing, by the
user and not from here, is sending a WhatsApp through the site's own link
after each change: a number that is not registered on WhatsApp opens a dead
chat with no error.

**If calls or WhatsApp messages stop arriving, suspect this first.** A wrong
number on a hiring site fails silently — nobody writes to say they could not
reach you.

A contact form would need a third-party endpoint (Formspree, Web3Forms) or
`mailto:`, because static hosting has no server. **Decided on 5 October: there
is no form.** WhatsApp and the phone number are the two routes, and that is
the position rather than a placeholder for one. Do not add a form, an endpoint
or an address without being asked.

## Structure

Agreed in Phase 2. Section order and sitemap are settled; Phase 3 builds
against this rather than reopening it.

### Sitemap

Five navigable pages and ten case studies — five written up, two listed
only, and three retired (resolving but unlisted and `noindex`). `/engineering.html` is new on 7 October, `/services.html` stopped being
a redirect, and `/tidemark.html` was added on 8 October.

| URL | Page | In nav |
|---|---|---|
| `/` | Home | — |
| `/work.html` | Work index — the written-up six, in two groups | yes |
| `/engineering.html` | **The technical read** — pipelines, data, failure modes | yes |
| `/taiyabah.html` | Case study — community project | via work |
| `/hairbychrissy.html` | Case study — client | via work |
| `/masjidone.html` | Case study — own product, running at one masjid | via work |
| `/tidemark.html` | Case study — own product, an iPhone app, not released | via work |
| `/boltonvouched.html` | Case study — own product, a Bolton directory, pre-launch | via work |
| `/about.html` | About — the candidate page: what I build, how I work, what I want | yes |
| `/contact.html` | Contact | yes |
| `/bookedin.html` | Case study — own product, a booking platform, live | via work |
| `/peony.html` `/ellash.html` | **Redirects to `/bookedin.html`** — two superseded brands' indexed URLs, kept alive | no |
| `/buxtravel.html` | **Retired** 13 October — resolves, `noindex`, linked from nowhere | no |
| `/venetian.html` `/diamond.html` `/luxescent.html` | **Retired** — resolve, `noindex`, linked from nowhere | no |
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
list is one run over everything, and cutting it in two would halve it for no
gain.

**The `kind` label left the homepage on 12 October**, asked for directly: the
right-hand column now shows **only** Live or Pre-launch. `kind` is still in
`projects.js` and still drives the work index's two groups and each case
study's eyebrow — it is just not on the home list. The cost is real and worth
knowing: a visitor scanning the homepage alone can no longer tell a commission
from something I own, and this file's own rule says do not imply these were all
commissions. The work index is where that distinction now lives, one click
away.

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

**Blue appears in exactly four places** — the one word the headline turns on,
the active card on the wheel, the hover state of the primary button, and, from
Phase 26, **the succeeded/selected state inside the engineering page's
diagrams**. It is the accent, not a second body colour, and the fourth use is
status rather than decoration: blue is the path that worked, `signal` is the
path that was refused. Those two are the only colours those diagrams carry.

**A diagram must not let blue mean two things at once.** The notification
burst gets this wrong by default — its selected option can be *the bug*, so a
blue "pressed" button would sit above a `signal` failure bar. Selected is
neutral ink there, and the bar colour carries the verdict.

### Two more accents, on the engineering and about pages — Phase 27

```
accent-green  #196B42   5.21:1 on paper — it got through
accent-mag    #A3157A   5.71:1 on paper — structural, section 04
```

**This is a scoped reversal of "a second accent colour", asked for directly.**
It applied to `engineering.html` alone until Phase 28 put `about.html` on the
same treatment, also asked for directly. **It is the two candidate pages and
nowhere else** — home, work and every case study are the seven-value palette
above, unchanged, and a third page joining them is a decision rather than a
default.

**They were chosen by measurement, not by eye.** The data-viz validator was
run over the four-hue set against the paper surface, and the things tried
first all failed it, which is the part worth keeping: **violet collapses into
blue under protanopia at every lightness that clears contrast**, teal collapses
into green, and a gold or a pink sits on top of the rust. Five hues do not fit
on this ground at all. The first green picked was `#1E7A4C` and it was
darkened to `#196B42` because 4.26:1 missed AA for body text.

**One warning stands and it is binding**: green against rust is ΔE 6.6 under
protanopia, inside the 6–8 floor band, which is legal **only where a second
encoding carries the same meaning**. Every state on that page is labelled in
words. Do not introduce a green/rust pair distinguished by colour alone — and
note the crowd diagram deliberately uses blue-against-rust (ΔE 28.7) precisely
because its cells are dense and individually unlabelled.

**One meaning per colour across all six diagrams**: green got through, rust
refused, blue is what is selected or active. Before this, blue meant both
"selected" and "succeeded", which read as a clash the moment a green-accented
section printed a blue success line.

**Rust is 4.46:1 on `paper-2`** — under AA. The accents therefore carry the
6px rule, the numeral and the borders, which are graphics at 3:1; small text
on a principle section takes ink or ink-2. **Do not put a tone on small text
over a `paper-2` band.**

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
- A second accent colour, **except the two measured accents scoped to
  `engineering.html` and `about.html`** — see "Colour" above. Blue as a body
  colour is still out.
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

**Phase 21 — Bolton Vouched, and every other project re-checked, 12 October.**
Asked to update the whole portfolio with **one** new addition. Five repositories
had moved since they were last verified; four of them had moved the copy with
them, and **two of the four were wrong in the expensive direction** — the site
withholding something that had actually shipped.

**The new one: Bolton Vouched** (`yameenbux/Boltontradesmen`, public — the
repository name is not the product name). A local recommendations directory for
Bolton: Next.js 16 App Router, React 19, Tailwind 4, Supabase Postgres, deployed
on **Railway**, which is a new platform for this site and the first thing here
with a server at request time.

**It is two days old and it has not launched**, so `status: 'Pre-launch'`. Its
own README carries an unticked "Before launch" list — draft policy banners
pending legal review, ICO registration, and a twelve-month purge job the privacy
notice already promises but which is **not built**. All of that is on the page,
because a product's own list of what is unfinished is the most checkable thing
it has.

The write-up leads on the parts that are hard to retrofit, all of them in the
database rather than the interface:

- **Consent is a `CHECK` constraint.** A provider row cannot reach `live` without
  recorded consent, and stored beside the timestamp is a **SHA-256 of the exact
  wording** they accepted — so *what* was agreed to is provable, not just *when*.
- **A lapsed certificate takes the listing down by itself.** Gas Safe and DVSA
  are gated twice: a trigger refuses the category on write, and the public view
  drops it on read the day the check expires.
- **The ranking cannot be bought** — a shrunk mean with a 24-month half-life and
  no score at all below three reviews. The demonstration data was built so the
  screenshot proves it: 100% from two jobs ranks *below* 75% from four.
- **No trader's number is ever in the page.** The view exposes a boolean; a
  server route logs the tap and 302s to `tel:`/`wa.me`.
- **Closed by default including future tables**, via revoked default privileges,
  with one view as the only door — and the view's helpers in a schema the public
  cannot reach, because Postgres checks function EXECUTE against the *calling*
  role even inside a view.

**The numbers on that page were measured here, not read off a badge.** The repo
ships a no-Docker local stack; it was started, migrated and seeded, and **147
pgTAP assertions across five SQL suites and 81 unit tests all pass**. Screenshots
come from a local build on **invented demonstration data** — every business and
person is made up and every number is in Ofcom's reserved `07700 900xxx` drama
range, because the real register will hold real traders' mobiles. The live hosts
are refused by the agent proxy here, as `ysbdesigns.uk` and Tidemark's domain are.

**What had gone stale elsewhere:**

- **Taiyabah — the native rebuild shipped and the site said it had not.** The
  Google Play app is now the React Native build (`2.0.1`, version code 8); the
  Trusted Web Activity it replaced **ended at version code 1**. This site still
  described the TWA as the store app *and* said the rebuild was "deliberately not
  on the Play listing". Both wrong, and in the direction that costs most. Also:
  the app is in **four** languages (English, Urdu, Gujarati, Arabic), not three.
  Hall hire now runs on real availability with the deposit paid online, so the
  "online booking is switched off" line went; what is still deliberately off is
  the nikāḥ fee links and the madrasah application form. The Apple line was
  walked back — Phase 15 said the D-U-N-S record had been corrected and was in
  Apple's queue; that repository now says it still needs correcting, and the
  newer, more specific source wins. The specific defect in the charity's D&B
  record stays unpublished, as Phase 15 decided.
- **MasjidOne — "four surfaces" was still in `projects.js`.** Phase 14 corrected
  this to the canonical **five products** but only in `cases.js`; the showcase
  copy kept the old count for a week. *Two files carry the same claim and only
  one got fixed* — worth remembering next time a count changes. Everything else
  re-read and unchanged: Direct Debit is still wired and still unexercised, so
  still not claimed.
- **Tidemark — underclaiming again, the Phase 12 and Phase 20 error a third
  time.** The page said "Apple Health and iCloud sync are not built at all".
  Apple Health sync and automatic backups **are** built and the whole native app
  compiles in CI; what is true is that none of it has run on a phone. iCloud
  sync and the Apple Watch app really are unbuilt. Its own site's three tiers are
  unchanged, so the rest of that write-up stands.
- **Bux Travel — no change.** Twenty pages, no build step, Node tooling, the
  email route and the removed self-declared rating all still exactly as written.
- **Hair by Chrissy, èllash and the two Taiyabah screen repos** had not moved.

**The engineering page moved with it:** eight workflows rather than seven (a
timetable watchdog landed), the Clients line no longer calls the Play app a
Trusted Web Activity, Railway is named in hosting and in the "not AWS, Azure or
GCP" list, and three new entries carry Bolton Vouched's constraint-level consent,
its default-closed grants and its database-first CI.

**The spec had drifted from the site and that is fixed here too.** This file
still described the wheel as the homepage; the homepage has been `ShowcaseList`
since the redraft earlier in the month. `src/components/Wheel.astro` is still in
the repository and is **referenced by nothing** — left rather than deleted,
because removing it is a separate decision from this one.

**Flagged, not acted on: the two groups are now 2 against 3.** "Built for other
people" holds Hair by Chrissy and Taiyabah; "Built for myself" holds MasjidOne,
Tidemark and now Bolton Vouched. A portfolio weighted towards a person's own
products argues less well that other people hire them — the same concern this
file raised when the three were retired, now one project worse. The fix is
another written-up paying client, not a thinner own-product section.

**Phase 22 — wordmarks and stack marks on the work list, 12 October.** Asked
for each project's logo beside its name, backgrounds removed, and a row of the
software each was built with underneath. **Flagged first**, because it
reversed two halves of a copy rule at once — see "Copy rules" above for the
rule as it now stands and the three conditions attached to it.

**Nothing here is drawn by hand.** Four wordmarks came out of the projects'
own repositories; three exist only as CSS on their own sites and are set in
the face those sites use. The two raster lockups were keyed off their plates
rather than cropped: MasjidOne's needed keying against **two** backgrounds,
because its lockup is a cream card inside a warm-grey margin and a single-key
pass left the whole 1244x404 frame opaque and untrimmable.

**The logo replaces the name rather than sitting beside it.** Built the way it
was asked for first, and shown: every row then read "èllash èllash",
"tidemark Tidemark". The user picked the replacement. The name stays in the
markup, visually hidden — a row whose only name is an image has no name for a
screen reader and nothing for a search engine to index. The drawn underline
that said "this is a link" moved from the hidden text onto the mark.

**Stack marks are one `<symbol>` sprite, referenced 36 times from 18
definitions.** Inlining the paths per row would have repeated PostgreSQL's
5KB path four times over. `src/data/stack.js` holds the table.

Checked after: 19 pages x 375/768/1440 clean, Lighthouse **99/100/100/100**
with CLS 0 on the homepage — and the accessibility 100 is the one that
mattered, since this change hides seven headings from sight. A first cold run
read 72 on performance; three consecutive runs read 99, so that was a
cold-start artefact rather than a regression, and it is worth remembering that
one Lighthouse run is not a measurement.


**Phase 23 — èllash becomes Peony, and the status column goes binary,
12 October.** Two instructions in the same stretch.

**Peony** (`yameenbux/Peony-Beauty-Platform`, public) is not a rename of the
èllash booking page — it is that page turned into a **multi-tenant booking
platform for solo beauty professionals**, with èllash as the origin story. Its
own `peony/brand.md` and `peony/logo.svg` are the brand artefacts, so the
wordmark is the genuine petal mark beside the name in **Bodoni Moda**, in its
own plum `#43192A`.

**Its README is still the old èllash one**, describing a single mobile lash
technician. The real product is in `peony/`, `platform/`, `app/`, `book/` and
`demo/`. *A README is a claim, not evidence* — Phase 20's lesson, third
occurrence, and the reason the copy came from the SQL and the marketing page
rather than from the front of the repository.

**The strongest detail is the one the schema leads with.** Two people on two
phones can take the same 09:00, and checking in application code only narrows
the window between the check and the insert, so `booking_no_overlap` is an
`EXCLUDE USING gist` over the tenant and a `tstzrange` — the second transaction
to commit raises `23P01` and rolls back. Cancelled rows sit outside the
constraint, so cancelling frees the slot without code deciding it should.
Plans are written **only** by the Stripe webhook through a `SECURITY DEFINER`
function with no grant to anon or authenticated.

**It is pre-launch and the app says so itself**: opening it renders "Not
connected yet — put your Supabase project URL and anon key into
`platform/config.js`". So the schema is eight tracked migrations rather than a
running database, no studio has signed up and nothing has been charged. The
app screenshot was **discarded for that reason** — a configuration error is
not a product shot. The captures are the marketing page and the demonstration
studio, which labels itself *Sample page* in frame.

**`/ellash.html` is kept as a redirect, not deleted.** It has been live and
indexed since Phase 1. The first attempt used `redirects` in
`astro.config.mjs`; under `build.format: 'file'` that emitted **nothing** for a
literal `.html` route, and the build still reported success — exactly the
silent-drop failure this file guards against elsewhere. It is a real
`ellash.astro` page now: meta refresh, canonical to `/peony.html`,
`noindex,follow`. **Verify `dist/ellash.html` exists after any build that
touches this.** Both sweep scripts skip it, because a meta refresh navigates
away mid-check and the harness reads that as an error.

**A real monospace violation fell out of this.** `<code>` had **no rule in
`global.css`**, so all 22 inline identifiers — 16 on `engineering.html`, the
rest in case copy — were rendering in the browser's default monospace stack,
on a site whose direction bars monospace outright. Fixed at the root rather
than by stripping the tags: `code` now inherits the body face and signals
itself with weight and a `line-2` tint, which is the same reasoning `.eyebrow`
uses. **Check a new `<code>` renders in Inter, not Menlo.**

**The status column is now binary — Live, or `'Pre-launch'`.** See the
`status` note above. **Three** projects carry Pre-launch: MasjidOne, Tidemark
and Bolton Vouched. Peony was briefly a fourth, on the evidence of its own app
rendering "Not connected yet"; **the user confirmed it is live and it was
changed back the same day**, along with the three places the case copy said the
opposite — a Live chip over a page saying "nothing has been charged" is the
contradiction this file exists to prevent. Nothing was substituted in about
customers: the copy says it is live and claims no sign-ups, because a studio
signing up is their business and not a number this site publishes.


**Phase 24 — Bux Travel retired, 13 October.** Taken off at the user's
request: it is the **family business**, not client work. It had been carrying
`kind: 'In-house'`, which was accurate and is exactly why it does not belong
on a portfolio arguing that other people hire him.

Same treatment as the other four retirements: out of `projects.js`, so it
leaves every listing and the sitemap; `retired: true` in `cases.js`, so the
page is `noindex`; `buxtravel.astro` left in place, so **`/buxtravel.html`
still resolves** — live and indexed since Phase 1, and this file's promise
about URLs does not bend for a change of mind.

**One real bug fell out of it.** Bux Travel was the only entry under **"Also
built"**, and that section rendered unconditionally — removing it left a
heading and the line *"Smaller pieces, written up the same way"* above an
empty list. The section is now guarded on `rest.length`. Worth remembering as
a shape: a group driven by a filter needs a guard the day the filter can
return nothing, and the build will not tell you.

**All six remaining projects are written up**, so `lead` and `all` are now the
same length and `rest` is empty. "Also built" will stay invisible until
something is listed without a `problem` field.

**The two groups are 2 against 4** — Hair by Chrissy and Taiyabah for other
people; MasjidOne, Tidemark, Bolton Vouched and Booked In for himself. Worse than
the 2-against-3 flagged in Phase 21, and the same answer: the fix is another
written-up paying client, not a thinner own-product section. Three of the four
retirements so far have been client or in-house work, which is the whole of
the drift.


**Phase 25 — every project re-checked, 16 October.** Push dates against the
12–13 October checks. **Unchanged and still correct: Hair by Chrissy,
MasjidOne, and Taiyabah's two screen repositories.** Five had moved, and the
three biggest corrections were all in the **underclaiming** direction — the
site withholding something that had since shipped. That is now the fourth
consecutive sweep where the expensive error ran that way, and it is worth
naming as a pattern rather than as four separate mistakes: copy written at the
moment something was blocked does not notice when it unblocks.

**Peony is now Booked In**, at `booked-in.co.uk`, deployed on **Render**. The
third name for this project in a week — èllash, then Peony on 12 October, then
Booked In hours later — so `/bookedin.html` is the case study and **both
`/peony.html` and `/ellash.html` resolve as redirects to it**. `ellash.html`
points straight at the current page rather than hopping through `peony.html`,
because a chain costs a round trip and leaks a little equity at each hop. The
two stubs now share `src/layouts/RedirectPage.astro` rather than being copied,
which is a direct response to this having happened twice: a brand that renames
this often will rename again. **Verify `dist/peony.html` and `dist/ellash.html`
both exist after any build that touches this**, and keep both out of the
sweep — a meta refresh navigates away mid-check and the harness reads that as
an error.

What the rename actually carried, which is why it is not just a find-and-replace:
the platform grew a **patch-test gate in the database**. Tinting and lash
extensions need a test 24 to 48 hours beforehand, the window is the insurer's,
and if a client reacts and the studio cannot produce a dated record the cover
may not hold. Every other platform in that trade sells the appointment and
leaves the compliance beside it in a notebook. Here a lapsed test refuses the
booking, and **booking the patch test is itself the record**. It is the best
thing on that case study and it is on the engineering page too. Also new:
twenty tracked migrations rather than eight, a third tier, deposits, rebooking
built as a soft opt-in rather than marketing, and a `build.sh` that refuses to
emit a `dist/` holding a service-role key — **decoding every JWT it finds
rather than grepping for the phrase**, because the two keys look alike and a
comment mentioning one is not a leak.

**Taiyabah — iOS moved from blocked to in testing.** The site said the
charity's D-U-N-S record still needed correcting and that there was no iPhone
build to talk about. The record cleared on 2 October, enrolment followed, and
there is now a signed build on TestFlight carrying the push entitlement. The
build before it shipped without that entitlement, so push is dead in it — the
page says which one to test, because testing notifications on the wrong build
reports the whole push setup broken when it is not. **The charity's D-U-N-S
number, registered address, charity number, D&B case reference, office line
and the two named staff who would take a verification call are all in that
repository and none of them are on this site** — same rule as Phases 15 and 21,
and the reason it keeps needing restating is that each sweep surfaces more of
it. Also added: a home-screen widget, and eleven workflows rather than eight.

**Tidemark — the Apple enrolment is through.** The page said it was in review
and that there had been no signed iPhone build. Signing is managed by EAS for
the YSB Ventures team, builds upload to App Store Connect, and the app has its
own App Store ID there; the first upload was rejected for answering the
export-compliance question without a code. What has *not* happened is the
device pass — CI compiles for the simulator, which proves it builds rather
than that it works, and the twenty-four numbered checks its own README sets
out have not been run on a phone. Its repository was renamed from `Tracker` to
`Tidemark-Fitness`; the source link follows it rather than relying on GitHub's
redirect.

**Bolton Vouched — reviews are in.** 119 commits landed on 12 October after
that day's check. The site still said no resident could leave a review; phone
sign-in, reviews, provider replies and moderation are built and switched on,
and the ranking reads real reviews rather than fixtures. It is **still
pre-launch** and the status is unchanged: the policy pages carry a draft
banner, the domain has not been pointed at it, and ICO registration and the
twelve-month purge job are still on its own unticked list. Four hardening
details came with sign-in and are on the case study, because they are the kind
that cannot be retrofitted: sign-in codes limited per number *and* per
connection, a single-use nonce binding new phone accounts, review writes made
server-side under the session's user id, and the client IP read from the
**trusted** end of `X-Forwarded-For` rather than its first entry.

**Two failures added to the engineering page, both from Taiyabah.** The first:
`expo-notifications` matches a trigger on its `type` field and drops anything
unrecognised through to a `null` default — and **a null trigger means deliver
it now, not never**. The app passed the pre-SDK-50 shape, so up to thirty-six
reminders fired at once every time a switch was flicked, and because each was
spent on the spot *not one real reminder was ever scheduled* while the screen
reported "36 reminders are scheduled on this phone". The second is a platform
lesson rather than a library one: a **per-IP rate limit counted an entire
congregation as a single caller**, because everyone on the masjid wifi leaves
through one address. At 600 writes an hour the 601st person would have been
refused and left silently unreachable by every announcement afterwards — on
the one day it was announced at Jumuʿah, with nothing pointing at the cause.

**Flagged, not acted on.** Two of these repositories now write to
`support@ysbdesigns.uk` and `hello@ysbdesigns.uk`, which are described as real
aliases. This site still publishes a `hotmail.co.uk` address, which Phase 17
already recorded as a credibility cost for a hiring audience. Changing a
published contact address is not something to do unasked — see "## Contact" —
so it stays until the user says otherwise, but the domain mailbox evidently
now exists.

**Two real accessibility bugs fell out of measuring, and both were already
live.** `engineering.html` had been scoring **95** on accessibility while
every other page scored 100 — it had simply never been measured, because the
Lighthouse runs recorded in Phases 7 and 22 covered the homepage, work, about
and the case template and not this one.

- `.gates .aside` set `color: var(--color-ink-2)` and then `opacity: 0.85`,
  which renders `#6e7378` — **3.48:1 on the recessed band**, an AA failure.
  The opacity is gone; full ink-2 is 4.61:1 there. **Fading a palette token
  with `opacity` silently throws away the measurement the palette section
  promises**, and that is the general lesson: the colours in this file are
  measured pairs, so a token plus an opacity is a colour nobody checked.
- `code` inherited its colour, so an identifier inside ink-2 copy sat at
  **3.78:1** once the Phase 23 tint was behind it. `code` now sets
  `color: var(--color-ink)` — 12.83:1 on the tint.

Both are fixed and `engineering.html` is **100/100/100/100**. Worth keeping in
mind that a page can sit below AA for weeks because the measurement habit
covered a fixed list of routes rather than all of them.

**The groups are still 2 against 4** and the answer has not changed: the fix
is another written-up paying client.

**Phase 26 — engineering.html made demonstrable, 16 October.** Asked to
rebuild the page with animations, features, graphs and logos, and to make it
easy for a non-technical reader. **Three conflicts with this file were put up
before anything was built**, and all three were resolved rather than worked
around:

- **"Techy" is mostly on the forbidden list.** Terminal motifs, glow,
  glassmorphism, gradient text, a dark ground and monospace are all barred,
  and they are exactly the vocabulary that word usually buys. The page gets
  its register from **mechanism instead of styling**: four diagrams where you
  press a button and the thing the copy describes actually happens. That also
  satisfies "motion that does not describe structure", which would otherwise
  have barred the animation outright — here the motion *is* the explanation.
- **"Non-technical" against a hiring audience.** This page exists for someone
  who may open a workflow file to check a claim, so it is layered rather than
  simplified: a plain-English `.plain` line opens each section, the diagram
  demonstrates it, and the original technical detail sits underneath
  untouched. **No claim was softened and nothing was duplicated** — a second
  plain-language copy of every claim is the "two files carry the same claim
  and only one got fixed" failure waiting to happen.
- **Graphs.** The palette has ink, ink-2, blue and signal, so a categorical
  series palette cannot exist here without inventing a second accent. The
  answer was **stat tiles and mechanism diagrams, not series charts** — which
  is also what the data wanted, because the interesting thing about this work
  is how it behaves, not how much of it there is.

**The four diagrams are in `src/components/Mechanism.astro`**, one component
with a `kind` prop. The release gate refuses a version nothing has run; the
tenancy grid hides other masjids' rows as you switch who is signed in; two
phones race for the same 09:00 and the second write is refused with `23P01`;
and a week of reminders either lands across seven days or piles up on day one,
which is the bug from Phase 25 running in front of you. **The race one is the
best explainer on the site** — it teaches a race condition to somebody who has
never heard the term, in one button press.

**Logos are on this page now**, as the layered "what runs where" list — the
same unmodified `simple-icons` paths `stack.js` already holds, referenced from
one `<symbol>` sprite. **Azure is still absent**, for the reason that file
gives.

**"Counted, not claimed" is the strip under the hero**, and the rule attached
to it is the point: every figure was measured on the day, and **the command
that reproduces it is printed underneath**. The two test figures were measured
by *running* the suites — the local stack started, every migration applied,
then `db-test.sh` and `vitest` — not by summing `plan()` lines, which is the
Phase 21 standard and worth keeping because a number nobody can reproduce is
a boast.

**Two stale numbers fell out, and one of them is the same mistake twice.**
Bolton Vouched is **564 pgTAP assertions across eighteen suites and 329 unit
tests**, not the 147-across-five and 81 this page still claimed — the
119 commits of 12 October brought the tests with them. And the migration
count was corrected to 140 in *one* of the two places it appears last phase,
leaving `166` sitting in the data array for a day. **Phase 21 named this exact
shape and it happened again**: grep for the number, not for the sentence.

**One real bug, found by driving the page rather than looking at it.** The
race diagram used `data-v` as both the selector hook and the state value, so
`reset()` removing the state removed the hook, the final step threw, and the
verdicts never printed — while the page looked fine in a screenshot and the
build was green. Hook and state are separate attributes now. **Press every
button in a headless browser before calling an interactive page done.**

Checked: 19 pages x 375/768/1440 clean; `engineering.html`
**99/100/100/100**, CLS 0, TBT 0ms over three runs. Under
`prefers-reduced-motion` every diagram lands its end state immediately with
no transition, all nine controls are keyboard-operable and named, each stage
carries an `aria-live` status line saying in words what the animation shows,
and no state is signalled by colour alone.

**Phase 27 — engineering.html cut back and designed, 16 October.** The brief
was "way too much text, does all of it even need to be there" plus colour and
better animation. Two forks were put to the user rather than guessed, because
either answer produced materially different work, and both answers are
recorded here: **extend the palette, this page only**, and **principles up
front with the proof on demand**.

**It is six principles now, not four sections of prose.** Each is a position
with a real cost, one thing you can press, and the evidence folded into a
`<details>`. Visible text went from **3,142 words to 1,249** and the page from
10,398px to 7,442px — but **nothing was deleted**. Every workflow filename,
migration count and failure write-up is compressed into `proof` and still one
tap away, which is what keeps the audience note in "## Positioning" true: a
hiring manager can still check any claim against a public file.

The six, and what each one is anchored by, because a principle with no file
behind it is the capability word this document bars:

1. **Put the rule where it cannot be argued with** — the exclusion
   constraint, the patch-test gate, consent as a `CHECK`, `masjid_id` on every
   table.
2. **A check that cannot fail is worse than no check** — `native-release.yml`
   refusing a commit nothing has run, and the five green builds that executed
   no code.
3. **Trust the source, not your copy of it** — the Digital Asset Links API
   against the `assetlinks.json` beside it; deploy then re-request.
4. **Closed by default, including things that do not exist yet** — RLS with no
   policies, revoked default privileges, the least-privilege Pages job, the
   build that decodes JWTs.
5. **The screen will tell you it worked** — "36 reminders are scheduled" over
   an empty queue; zero rows read as not built; a reconciler green because
   nothing queued.
6. **Build for the real crowd, not the demo** — the per-IP cap that counted a
   congregation as one caller.

**Two new diagrams** join the four from Phase 26: `truth` (set the file and
the service to disagree, watch which one CI believes) and `crowd` (announce
the app to 400 people, then to 4,000, and watch where the cap lands). All six
live in `Mechanism.astro` behind a `kind` prop.

**The page is `wide` now**, so each section carries its own `.shell` and the
colour rules can go full-bleed. `index.astro` already did this; it is the
mechanism for a banded page.

**Three real bugs, all found by looking rather than by building.**

- **The crowd grid rendered completely empty.** Its cells are created in
  JavaScript, so they never receive Astro's scoping attribute and a scoped
  selector cannot match them. `:global()` on the generated children. **Any
  element a script creates needs `:global()` in a scoped `<style>`.**
- **The grid then left a dead hole under itself**, because cells that are off
  still occupy grid space. It is sized to the larger case — 400 cells at ten
  people each, so the congregation fills it exactly.
- **Accessibility fell to 96 on the opacity trap Phase 25 already named**,
  this time in code written the same day: `.steps` at `opacity: 0.32`
  composites ink-2 to `#c7c9c9`, **1.59:1**. Every opacity on text is gone —
  state is weight, colour and a word. **Fading a token is still the easiest
  way to invent a colour nobody measured, and knowing that did not stop me
  doing it.**

Checked: 19 pages x 375/768/1440 clean, no overflow at 375;
`engineering.html` **99/100/100/100**, CLS 0, over three runs. Reduced motion
lands every diagram's end state with no transition, all thirteen controls are
keyboard-operable and named, six `aria-live` status lines say in words what
each animation shows.

**Phase 28 — about.html on the same treatment, 16 October.** Asked for the
engineering page's manner applied here. Four numbered colour bands rather than
six, because About has four things to say and padding it to six would be
format for its own sake.

**01 What I build** carries the claim the whole site rests on — three layers,
all three mine — and draws a **spine down through the three numbered nodes**
as the section reveals. That is motion describing structure: the line *is* the
"one person, start to finish" argument. Stack marks sit on each layer, the
same unmodified `simple-icons` paths. **02 How I work** is four positions,
each arrived at by getting it wrong first. **03 On paper** is the two
certifications. **04 What I'm looking for** ends on the honesty callout.

**Held and booked must never look like the same kind of thing**, and the
markup now enforces what Phase 17 only asked for in prose: AZ-900 takes a
solid green edge and the word *Held*; AZ-104 takes a **dashed** border, no
accent, and reads *Booked — not sat* above an italic note calling it a plan
rather than a qualification. A `held: false` entry still never renders a
badge. **The honesty callout in 04 is load bearing and is deliberately not
folded away** — it is the one paragraph on the page that exists to cost
something, and an Azure certificate beside a list of cloud work implies Azure
cloud work without it.

**The accents now cover two pages, not one.** See "Colour" above; the scope
moved because this was asked for, not because it drifted.

**"Seven workflows" was still here.** Phase 25 corrected that count to eleven
on the engineering page and this page kept the old one for a day. **That is
the third time this exact shape has bitten** — Phase 21 (MasjidOne's product
count), Phase 26 (the migration count), now this. The lesson has been written
down twice and did not work either time, so state it as a procedure instead:
**when a number changes, grep the whole `src/` tree for the digits, not for
the sentence.**

**It is honestly longer, not shorter: 540 visible words to 706**, and 3,155px
to 4,039px. The brief here was the treatment rather than the knife — the
length complaint was about engineering.html — but the number is worth
recording rather than implying every redesign cuts. The extra is framing: a
facts strip, a one-line hook on each item, and the numbered structure. A
second hero paragraph was written and then cut as redundant.

**A gutter bug that was already live, and a 320px overflow that always
was.** `.shell` supplies `padding-inline`, and a `padding: 64px 0 52px`
shorthand on the same element resets it to zero — so the banded pages had
**no side gutter at all** and their type ran to the edge of a phone. Phase 27
shipped that to `engineering.html` and the sweep never saw it, because zero
gutter causes no overflow at 375. **Use `padding-block` on anything carrying
`.shell`.** Seven declarations across the two pages are fixed.

Chasing it turned up something older: **every page on the site overflowed
39px at 320px**, from four nav items that do not fit, on pages nobody had
touched in weeks. The working rules say check 375 and 1440, so 320 had never
been looked at. `.mast nav ul` wraps now — the Phase 16 fix carried down a
size — and all 19 pages are clean at 320, 360 and 375. **The standard widths
should probably include 320.**

**One markup bug and one whitespace bug.** A bare `<span>` was sitting
directly inside an `<ol>`, which is invalid and which the build does not
complain about — the spine is a `::before` now. And **Astro trims the newline
between text and an inline element**, so a link that began on the next source
line rendered as "are onthe engineering page". Two of those shipped into the
first build; both are fixed by keeping the text and the inline tag on one
line. **Check rendered text, not source, for run-together words.**

Checked: 19 pages x 375/768/1440 clean, no overflow at 375; `about.html`
**100/100/100/100**, CLS 0, over three runs. Under `prefers-reduced-motion`
the spine renders drawn rather than stuck at zero, and no reveal is left
hidden.

**Phase 29 — work.html rebuilt as a catalogue, 16 October.** Asked to
redesign it with an eye on how large technology companies show work, and on
East Asian product design.

**What was actually taken from that reference is structural, not stylistic.**
The useful things in that tradition — MUJI and Kenya Hara, Japanese product
catalogues, the spec-sheet confidence of Sony and Xiaomi pages — are a real
numbered **index** you can scan before committing to anything, a strict
modular grid with asymmetric placement, **specification blocks** in
hairline-ruled rows, and restraint in colour so the product imagery carries
it. All four are here.

**No accent colours on this page, and that is the design rather than a
dodge.** This page already carries colour that is not mine to compete with:
six client wordmarks in their own brand colours and six full-colour
screenshots. Adding the two measured accents would fight the work and would
dilute what they signal on the two candidate pages. **The accents stay scoped
to `engineering.html` and `about.html`.**

**The index is the new idea.** Six hairline rows — number, name, type, place,
status, arrow — each the full hit target, linking straight to the case study.
Somebody who knows what they want never has to scroll. On a phone the three
metadata fields collapse into one flow via a wrapper that is
`display: contents` at desktop, so they drop back into their own grid columns
without duplicating markup.

**Each entry is an editorial spread**: screenshot on a `plane` mat with its
hairline border, on a 12-column grid, **alternating sides** down the page.
Wordmark rather than name, the `problem` as the hook, then a specification
block — Type, Status, Role, Built with — and the case-study link.

**`approach` and `outcome` left this page.** They were printed here in full
*and* at three to five times the length on each case study, so the index was
carrying prose nobody reaches an index to read. **1,536 visible words to 651,
and 9,390px to 5,177px.** `problem` stays, because what was wrong is what
makes someone click. Nothing is lost: `projects.js` holds the short versions
and `cases.js` the long ones, which is a deliberate two-tier split rather
than drift — checked, and every pair differs by design.

**Numbering follows the page, not the data.** `lead` order and render order
are not the same once the two groups reorder things, so numbering by `lead`
gave a first group reading "01, 03" beneath an index running 01 to 06. It is
numbered by the flattened group order now, and the index runs in that same
order — verified by comparing the two sequences in the built HTML.

**One collision worth remembering: `.live` in `global.css` IS the pulsing
dot**, a 7px inline-block circle, not a wrapper. Reusing the class name for a
label wrapper inherited `width: 7px` and jammed the dot into the word. A
scoped rule does not save you from a global component's own properties —
**check `global.css` before reusing a class name.**

Checked: 19 pages x 375/768/1440 clean, no overflow at 320 either;
`work.html` **99/100/100/100**, CLS 0, over three runs. Reduced motion leaves
no reveal hidden and disables the row and image transitions.

**Two sweep failures in this phase were mine, not the site's**, both a 404 on
a page I had not touched: `npm run build` wipes `dist/` and the sweep was
reading it mid-rebuild. **Do not rebuild while a sweep is running** — it
reports a real-looking console error on an arbitrary page.

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
