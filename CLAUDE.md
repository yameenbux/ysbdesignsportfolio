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

This is NOT a scrolling grid of project cards. It is **three** states.

### State A — Index

- Split layout. Left ~40%: identity block + vertical project list.
  Right ~60%: a fixed 3D render of a desk scene (monitor on a stand,
  keyboard, mouse, on a plinth).
- The monitor's screen is a **slot**. Hovering or selecting a project in the
  left list swaps the screenshot composited into that screen.
- Exactly one list item is active at a time: filled pill background, full
  `--text` colour, trailing expand icon. All others sit at `--muted`.
- The scene never moves. Only the screen content changes.

### State A2 — About (opened by `More`)

Observed in the recording; missed by every earlier pass.

`More` does not expand a paragraph inline. It replaces the entire canvas:
- The desk render and the project list both disappear.
- A large, dark, tightly-cropped **portrait photograph** takes the right
  side and bleeds off the right edge of the viewport.
- The left rail keeps its position and its width, but the two-line
  positioning statement expands into a full bio paragraph (~45 words,
  set to roughly 28 characters per line — a narrow measure).
- The disclosure label flips from `More ⌄` to `Close ⌃` and sits below
  the paragraph.

The rail's left edge, type size, and vertical position do not move between
State A and A2. The identity block is the fixed anchor of the whole design;
everything to the right of it is what changes.

### State B — Case study

- Left rail becomes: circular back button (~44px, `--panel` fill, muted
  chevron), project title in `--text`, "See it live ↗" beneath in `--muted`
  with a small arrow glyph. Rail is genuinely sticky — confirmed fixed
  while cards scroll past it.
- Right side: a vertical stack of large rounded cards, uniform width,
  left-aligned to a gutter at roughly 40% of viewport width and running to
  ~88%. Generous vertical gap.
- **Cards are not white.** Each card carries the project's own background
  colour — a dark project produces a dark card. Every card has a hairline
  ~1px border at low opacity and a large corner radius (~20–24px), which is
  what separates a dark card from the dark canvas.
- Cards are full-page captures, so scrolling the stack reads like browsing
  the project itself.
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

### Interaction model (measured)

Selection is **position-driven, not click-driven**.

- Desktop: pure hover. Moving the cursor down the list changes the active
  item continuously — no click required for the preview. Click opens State B.
- Mobile: scroll position drives the same state as the list moves under the
  pinned render.
- The hovered item's label goes from `--muted` to full `--text` and reveals
  its trailing expand icon. The pill fill appears on the active item only.

Implementation: one piece of state that both the pill and the screen slot
read from, driven by pointer position on desktop and an IntersectionObserver
on mobile. Do not build two separate selection systems.

### Motion (measured from 20fps frame extraction)

**Screen swap is a crossfade through blank — not a cut, not a slide.**

Sampled at 50ms intervals, the outgoing screenshot fades to an empty
screen over ~100ms, and the incoming one fades up over ~100ms.
Total ≈ 200ms, with a brief blank frame at the midpoint.

```css
--swap-out: 100ms;
--swap-in:  100ms;
--ease: cubic-bezier(.2,.8,.2,1);  /* already in YSB styles.css */
```

The label state (colour, pill, icon) changes **immediately** on hover while
the screen lags behind through the crossfade. That desync is deliberate and
is a large part of why the interaction feels physical rather than instant.
Do not synchronise them.

### The signature detail: content-keyed ambient light

The desk render is not a static image with a screenshot pasted in. **The
light spilling onto the surrounding scene changes with the screen content.**

A bright white screenshot throws a blue-white bloom across the plinth, the
keyboard and the wall behind. A dark screenshot lets the whole scene fall
back to near-black. Across the recording the entire render's brightness
visibly tracks the project being previewed.

This is the one thing that makes the render read as a real object rather
than a mockup. If you build the slot without it, you have built a picture
frame and the whole approach loses its point.

Cheapest credible implementation: a blurred, heavily-scaled copy of the
current screenshot rendered behind and below the monitor at low opacity
with `filter: blur(60px) saturate(1.4)`, crossfading on the same timing as
the slot. Do not attempt real lighting.

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

**1. Cards must be framed, not pasted.**
Correction to the previous version: case-study cards are **not** white. Each
inherits its project's own background colour, separated from the canvas only
by a hairline border. On neutral near-black that works for light and dark
projects alike. On saturated `#093526` a light project's card will read cold
and cut out, while a dark one will disappear.
→ Card = `--panel` frame, `1px solid var(--line)`, `--radius-lg`, screenshot
   inset inside it. The frame does the separating, not the contrast. Never
   place a raw screenshot directly on `--bg` in either direction.

**1b. The ambient glow will muddy the green.**
A blue-white bloom keyed to screenshot content, thrown across a forest-green
canvas, produces a desaturated grey-green wash. The effect that carries the
whole design on a neutral canvas actively degrades a coloured one.
→ Constrain the bloom: sample the screenshot but clamp it toward the brand's
   warm axis — `saturate(.6)` plus a `--gold` overlay at very low opacity —
   and cap total spill opacity below the reference. Test with LuxeScent
   (light, warm) and Taiyabah (likely dark) side by side; those two are the
   extremes that will break it.

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

**7. The About portrait is worth more to you than to him.**
Petersen's `More` state is a flex — his audience already trusts the work, so
the photo is personality. Your audience is deciding whether to hand cash to
a stranger found on Google. A face, a name and a Bolton address is
trust-building, not decoration.
→ Build State A2 exactly as observed, but treat it as a conversion surface
   rather than a vanity page: the bio names the location and the company,
   and a `--wa` contact button sits in the rail beneath `Close`.
   Shoot the portrait dark and tightly cropped to match the canvas — a
   bright studio headshot dropped on `--bg` will look pasted on.

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

- **Scroll-snap on mobile.** Whether the list snaps to each item or scrolls
  freely with the active state changing at a threshold. The recording is
  desktop only, so this is unresolved.
- **State A ↔ A2 transition.** The `More` open/close is captured only at
  1s intervals, so the timing and whether the portrait scales or fades is
  not measured. Re-record just that interaction.
- Light-mode palette. Does not currently exist.

**Resolved since the previous version:** the About state (a third state, not
an inline expansion), swap timing (~200ms crossfade through blank), the
label/screen desync, content-keyed ambient light, hover-not-click on
desktop, and that case-study cards inherit project colour rather than
being white.

**State B on mobile — resolved by recording.** The sticky rail does not
survive. The title centres at the top of the scroll with "See it live ↗"
centred beneath it, the cards run full width below, and the back control
becomes a floating circle at the bottom centre, in thumb reach, which stays
put while the stack scrolls past. YSB keeps its outcome copy (§3.6) between
the centred header and the links, left-aligned — three centred paragraphs
do not read — and puts the back circle in the centre of the fixed contact
bar rather than floating it over the cards, where it would land on top of a
"See it live" link.

**Mobile index, measured.** The render block is ~51% of the viewport and the
monitor ~80% of screen width. The list does not cut off against the render's
edge: the block's own bottom fades out, so an item passing beneath dissolves
into it. The footer is at the end of the document, not fixed — YSB keeps its
fixed contact bar per §3.5.
