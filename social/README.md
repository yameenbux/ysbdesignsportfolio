# social/

Source for social assets, rendered from HTML rather than drawn in a design tool
so they can be regenerated when the brand or the facts change.

| File | What it is |
|---|---|
| `architecture-map.html` | Anonymised infrastructure map — the prayer times app |
| `access-control-spec.html` | Anonymised system spec — the website, its four public forms and the staff side |
| `render.py` | Renders every page here to a PNG at 2400×3000 |

## Rendering

```
python3 social/render.py                       # all
python3 social/render.py access-control-spec.html
```

1200×1500 CSS pixels at `device_scale_factor=2`. 1200×1500 is 4:5 — the tallest
ratio LinkedIn shows without cropping, so it takes the most feed height going.
The script fails loudly if Archivo did not load, because a silent fallback to a
system face is easy to miss and ruins the headline.

## Rules these files follow

- **Brand fonts are the repo's own**, from `../public/fonts/`. Archivo is the
  wdth-axis build; the headings set `wdth 112` and the standard build renders
  that silently at normal width.
- **Palette is `src/styles/global.css`**, unchanged. The one deliberate
  departure is the ink `#16191C` band behind the statistics, which the aesthetic
  direction otherwise rules out as a ground. It is a band, not the ground.
- **The legend's swatch colours match the zone labels on the drawing.** Change
  one and change the other, or the key stops being a key.
- **No client vocabulary.** Forms, tables and roles are named generically —
  bookings, requests, registrations, applications; operations role,
  administrator. The client is not named, nor is the domain, the location, or
  what any of it is for. Keep it that way: a term that identifies the sector
  identifies the client.
- **No invented figures.** Every number traces to the source repository — its
  README, its migrations, or its portal code. Anything unverifiable comes off
  rather than being softened. Claims already removed for this reason: a monthly
  hosting cost, "fee-free payments" (the processor does charge per transaction —
  what went away was the shop platform above it), and "zero trackers" (one page
  loads video stills from a host that sits on several blocklists).
- **Nothing that is only half-true.** Where a feature is built but not switched
  on, it is drawn dashed and labelled as such rather than shown working.

Nothing here is part of the Astro build. Astro only builds `src/pages`, so these
files are not served and do not appear on the site.
