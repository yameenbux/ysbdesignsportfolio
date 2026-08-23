# CLAUDE.md

## Purpose

Build a portfolio site that uses the **structural pattern** of
moritzpetersen.com with the **brand identity** of YSB Designs.

Sources analysed:
- moritzpetersen.com — live fetch + two dark-mode screenshots (index state,
  case-study state). Structure and layout only.
- yameenbux.github.io/ysbdesignsportfolio — `assets/styles.css` read directly
  from the repo. All tokens below are verbatim from that file, not inferred.

These two sources pull in opposite directions. Read "Reconciling the two"
before building anything.

---

## Part 1 — The structural pattern

This is NOT a scrolling grid of project cards. It is two states.

### State A — Index

- Split layout. Left ~40%: identity block + vertical project list.
  Right ~60%: a fixed 3D render of a desk scene (monitor on a stand,
  keyboard, mouse, on a plinth).
- The monitor's screen is a **slot**. Hovering or selecting a project in the
  left list swaps the screenshot composited into that screen.
- Exactly one list item is active at a time: filled pill background, full
  `--text` colour, trailing expand icon. All others sit at `--muted`.
- The scene never moves. Only the screen content changes.

### State B — Case study

- Left rail becomes: circular back button, project title, "See it live"
  beneath in muted. Rail is sticky.
- Right side: a vertical stack of large rounded cards, each a full-width
  screenshot of the project. Generous vertical gap between them.
- Petersen ships no body copy here. **YSB must.** See "Reconciling".

If you build a normal card grid, you have missed the point of the design.

### Layout numbers

Index:
- Left column starts at ~10% viewport width
- Identity block: h1 name → two-line positioning statement → `More` disclosure
- Project list vertical rhythm is loose — roughly 1.9× the line height
  between items. It reads as a menu, not a table.
- Active pill: fully rounded (radius = half height), horizontal padding
  ~1.5× the vertical, extends ~30% wider than the longest label
- Footer pinned bottom-right: contact links, then theme control

### Mobile (observed, iPhone-class viewport)

The split does not collapse into a list — it **reorders vertically** and the
render is kept at full width. Nothing is dropped.

Stacking order:
1. Identity block — name, two-line positioning statement, `More` disclosure
2. The desk render, full-bleed width
3. The project list

Behaviour:
- Once the identity block scrolls away, **the render pins to the top of the
  viewport** and stays there for the entire list scroll. It occupies roughly
  the top 40% of the screen permanently.
- The render block has its own slightly-raised background that terminates in
  a large rounded bottom edge with a gradient falloff into the canvas.
- The list scrolls underneath the pinned render.
- The active pill spans the **full content width** on mobile — it does not
  hug the label as it does on desktop. Same fill, same trailing expand icon.
- Footer is fixed and splits across the bottom: theme control group
  (monitor / sun / moon) bottom-left in its own rounded container, contact
  links bottom-right. On desktop both sit together bottom-right.

### Interaction model (resolved)

Selection is **position-driven, not click-driven**. On mobile, the active
item is determined by scroll position — as the list moves under the pinned
render, the active pill advances and the composited screen swaps to match.
Desktop hover is the pointer-equivalent of the same coupling.

Implementation: an IntersectionObserver on the list items driving a single
piece of state that both the pill and the screen slot read from. Do not
implement mobile and desktop as separate selection systems.

Case study:
- Cards occupy roughly the right half of the viewport, left-aligned to a
  consistent gutter, not centred
- Card corner radius visually ~28–32px at 2x — note this is **larger** than
  the existing YSB `--radius:16px`. Introduce `--radius-lg: 28px` rather
  than overriding the base token.
- Vertical gap between cards ~6% of card height

---

## Part 2 — Design tokens (verbatim from YSB styles.css)

```css
:root{
  --bg:#093526;        /* deep forest green — page canvas */
  --bg-deep:#062219;   /* darker band */
  --panel:#0E4433;     /* raised surface */
  --panel-2:#0B3A2A;   /* gradient partner for --panel */
  --text:#F5EAE3;      /* warm cream */
  --muted:rgba(245,234,227,.64);
  --gold:#E8B44A;      /* single accent */
  --gold-soft:#F3D28A;
  --wa:#25D366;        /* WhatsApp CTA */
  --wa-deep:#1DA851;
  --line:rgba(245,234,227,.14);
  --radius:16px;
  --maxw:1080px;
}
```

### Measured contrast on `--bg` (#093526)

| Pair | Ratio | Verdict |
|---|---|---|
| `--text` on `--bg` | 11.5:1 | AAA |
| `--muted` on `--bg` | 5.6:1 | AA all sizes |
| `--gold` on `--bg` | 7.1:1 | AAA large, AA small |
| `--gold` on `--panel` | 5.8:1 | AA |

No contrast remediation needed. Do not lighten `--muted` "to be safe" —
it is already compliant and the recession is doing design work.

### New tokens this layout needs

```css
--radius-lg: 28px;             /* case-study cards */
--pill: rgba(245,234,227,.07); /* active list item fill */
--scrim: #041A13;              /* below --bg-deep, for the desk scene */
```

### Typography (verbatim)

- Display: `"Bricolage Grotesque"`, weight 700–800, `line-height:1.05`,
  `letter-spacing:-.02em`
- Body: `"Instrument Sans"`, `17px`, `line-height:1.6`
- Utility: `"JetBrains Mono"`, `12.5px`, `letter-spacing:.16em`, uppercase
  — used for eyebrows, step numbers, tags, "See it live"

Existing eyebrow treatment worth keeping: a 22×1.5px gold rule set before
the label via `::before`.

---

## Part 3 — Reconciling the two (read this)

The Petersen layout works because its chrome is **achromatic**. Near-black
canvas, grey text, zero accent colour. All colour in the composition comes
from the project screenshots. That is load-bearing, not incidental.

YSB's palette is the opposite: saturated green, warm cream, a gold accent
and a second bright green for CTAs. Dropped into the Petersen architecture
unmodified, it fights the design. Specific conflicts and their resolutions:

**1. White cards on green will clash.**
Petersen's pure-white case-study cards read clean against neutral near-black.
Against saturated `#093526` they read cold and cut out.
→ Inset each screenshot in a `--panel` card with `1px solid var(--line)`,
   so the white of the screenshot is framed rather than bleeding to the edge.
   Never place a raw white rectangle directly on `--bg`.

**2. Gold competes with the work.**
`--gold` at 7:1 is loud. If it appears on the eyebrow, the active pill, the
step numbers and the "See it live" link simultaneously, the eye goes to the
chrome instead of the screenshots.
→ Gold gets **one** job in this layout: the active state of the project list.
   Active item = `--pill` background, `--text` label, gold expand icon only.
   Everything else that was gold on the marketing site becomes `--muted`.

**3. Three type families in a design built on restraint.**
Petersen's index has essentially two type sizes and one family; the hierarchy
is carried by colour, not scale. Bricolage + Instrument Sans + JetBrains Mono
is three voices.
→ Keep Bricolage for the name and the project list (both at roughly the same
   size — differentiate by colour, not scale). Keep JetBrains Mono for
   "See it live" and project tags only. **Drop Instrument Sans from the index
   entirely** — there is no body copy on it. Reintroduce it in State B.

**4. WhatsApp green is a fourth hue.**
Forest green + gold + cream is already a full palette. `--wa` adds a second,
much brighter green.
→ Use `--wa` on exactly one element site-wide: the primary contact button.
   Nowhere else. Do not use it for hover states or icons.

**5. The pinned render costs 40% of a phone screen, permanently.**
Petersen can afford that — his visitor is browsing out of curiosity and the
render *is* the pitch. A YSB visitor arrived from a Google search for a
tradesperson's website and wants a price and a phone number.
→ Keep the pinned render, but the fixed mobile footer must carry the primary
   contact action, not just social links. Replace the theme control slot
   (bottom-left) with a `--wa` WhatsApp button. It is always on screen, it
   costs no additional scroll, and it is the one place the brand's brightest
   colour earns its keep.

**6. The screenshots are not recognisable products.**
Petersen can ship wordless case studies because his audience already knows
WorkOS. Nobody browsing YSB Designs recognises LuxeScent UK.
→ **This is the one place to deliberately break the pattern.** The sticky
   left rail in State B must carry outcome copy — what the client needed,
   what was built, what changed. Two or three short paragraphs in Instrument
   Sans at `--muted`, above "See it live". Wordless case studies are a
   positioning choice that only works from a position of existing fame.

---

## Part 4 — Technical

- `next/image` with explicit `sizes`. Never hand-roll `<img>`.
- Serve at 1080 and 1920; quality 75 is sufficient — do not max it.
- Light and dark are **separate asset files**, not CSS filters. The current
  YSB site is dark-only; a light variant of the forest palette is a
  significant new design task, not a token flip. Ship dark-only first.
- Theme control: tri-state (system / light / dark), persisted. Omit entirely
  until a light palette actually exists — a toggle with one working state is
  worse than no toggle.
- Video slots: matching poster PNG, `muted`, `playsInline`, `loop`.
- Preload adjacent screenshots so list hover swaps are instant. A visible
  load flash destroys the illusion that the screen is real.
- Existing motion tokens to reuse: `transition:transform .15s ease` on
  interactive elements, `translateY(-2px)` on hover.
- Respect `prefers-reduced-motion`: disable the screen-swap transition and
  the state A→B transition, not just decorative animation.

---

## Part 5 — Asset pipeline (the real cost)

Per project:
1. A screenshot cropped to the monitor's exact aspect ratio, composited into
   the display render
2. 3–6 full-page captures for the case-study stack
3. Optionally a video loop + poster

Three projects is ~25 assets. Automate the composite step with a single
smart-object template or a `sharp` script before building the second project,
or this becomes the reason the site stops being updated.

**Legibility warning.** At phone width the screenshot composited into the
monitor is roughly 900px wide on screen, showing a 1440px-wide page. Body
copy and nav labels inside it are unreadable. On mobile the render works as
*texture and craft signal*, not as information.

Therefore: choose screenshots for **silhouette and colour**, not detail. A
page with one big headline and a strong image reads at that scale; a
dense pricing table or a form does not. If a project's best screenshot is
text-heavy, it belongs in the State B stack, not in the display slot.

---

## Part 6 — Content rules

- The positioning statement is the entire bio on the index. No About section.
- A project with no strong visual does not go on the site.
- Not every project has a live link. Handle a missing "See it live" as a
  first-class state, not an error.
- Index carries no pricing, no testimonials, no process steps, no logo wall.
  Those live on separate routes if they exist at all.
- Copy is sentence case, plain verbs, active voice. A button says what
  happens when it is pressed.

---

## UNVERIFIED — confirm before treating as spec

- **Motion.** Transition timing and easing on the screen swap and the A→B
  state change. Now the **only** high-value unknown; the polish of the
  reference site almost certainly lives in that transition. Screen-record it
  and step through frame by frame.
- **Scroll-snap.** Whether the mobile list snaps to each item or scrolls
  freely with the active state changing at a threshold. Free-scrolling would
  make the screen swap fire mid-gesture, which is either the best or the
  worst detail in the whole design. Check this.
- **State B on mobile.** Only the index has been observed at phone width.
  Whether the sticky rail survives, or the title collapses to a header, is
  unknown — and it matters more for YSB, since the rail must carry outcome
  copy that Petersen's does not have.
- Light-mode palette. Does not currently exist.

**Resolved since the previous version:** mobile layout (render is kept and
pinned, not hidden) and the interaction model (position-driven).
