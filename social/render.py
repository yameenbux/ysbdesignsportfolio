"""Render each social asset in this folder to a 1200x1500 PNG (LinkedIn 4:5).

    python3 social/render.py            # all of them
    python3 social/render.py architecture-map.html

Needs Playwright. Each page pulls the real brand fonts from ../public/fonts/,
so it must be rendered from a file:// URL inside the repo, not copied out.
"""
import sys, pathlib
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent
pages = [ROOT / a for a in sys.argv[1:]] or sorted(ROOT.glob("*.html"))

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1320, "height": 1620},
                            device_scale_factor=2)      # 2x -> 2400x3000
    for src in pages:
        page.goto(src.as_uri())
        page.wait_for_timeout(1400)                     # let the webfonts settle
        if not page.evaluate("() => document.fonts.check('700 48px Archivo')"):
            raise SystemExit(f"{src.name}: Archivo did not load — check ../public/fonts/")
        out = src.with_suffix(".png")
        page.query_selector("#map").screenshot(path=str(out))
        print(f"wrote {out.name}")
    browser.close()
