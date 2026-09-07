"""Render social/architecture-map.html to a 1200x1500 PNG (LinkedIn 4:5).

    python3 social/render.py

Needs Playwright. The page pulls the real brand fonts from public/fonts/,
so it must be rendered from a file:// URL inside the repo, not copied out.
"""
import pathlib
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "architecture-map.html"
OUT = ROOT / "architecture-map.png"

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1320, "height": 1620},
                            device_scale_factor=2)   # 2x = 2400x3000
    page.goto(SRC.as_uri())
    page.wait_for_timeout(1200)                       # let the webfonts settle
    page.query_selector("#map").screenshot(path=str(OUT))
    browser.close()

print(f"wrote {OUT}")
