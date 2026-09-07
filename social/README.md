# social/

Source for social assets, rendered from HTML rather than drawn in a design tool
so they can be regenerated when the brand or the facts change.

| File | What it is |
|---|---|
| `architecture-map.html` | Anonymised architecture schematic for the masjid app — LinkedIn 4:5 |
| `render.py` | Renders the above to `architecture-map.png` at 2400×3000 |

## Rendering

```
python3 social/render.py
```

Output is 1200×1500 CSS pixels at `device_scale_factor=2`, i.e. a 2400×3000 PNG.
1200×1500 is 4:5 — the tallest ratio LinkedIn shows without cropping, so it takes
the most feed height available.

## Rules this file follows

- **Brand fonts are the repo's own**, loaded from `../public/fonts/`. Archivo is
  the wdth-axis build; the headings set `wdth 112` and the standard build would
  render that silently at normal width.
- **Palette is `src/styles/global.css`**, unchanged. The one deliberate departure
  is the ink `#16191C` band behind the statistics, which the aesthetic direction
  otherwise rules out as a ground. It is a band, not the ground.
- **The legend's swatch colours match the zone labels on the drawing.** Change one
  and change the other, or the key stops being a key.
- **No invented figures.** Every number is from `Taiyabah-Mosque-App/README.md`:
  30 release checks, 1,555 strings per language, the 60-second cron, 848 mushaf
  pages. An earlier draft carried a hosting cost and a "fee-free payments" claim;
  both were removed as unverified — the payment processor does charge per
  transaction, and what actually went away was the shop platform on top of it.
- **The client is not named**, nor is the domain, the location, or what the
  timetable is for.

Nothing here is part of the Astro build. Astro only builds `src/pages`, so these
files are not served and do not appear on the site.
