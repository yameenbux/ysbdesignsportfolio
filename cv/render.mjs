/**
 * Renders the CV to a one-page A4 PDF.
 *
 *   node cv/render.mjs               # cv/cv.template.html → Yameen_Bux_CV.pdf
 *   node cv/render.mjs integration   # cv/cv.integration.template.html → Yameen_Bux_CV_Integration.pdf
 *
 * A variant is a separate template for a different kind of role — the same
 * facts, re-weighted. Each is one page and each is checked the same way.
 *
 * Reads the template, substitutes the placeholders from
 * cv/contact.json, and writes cv/Yameen_Bux_CV.pdf. Both the filled HTML and
 * the PDF are gitignored — THIS REPO IS PUBLIC and the CV carries a personal
 * mobile rather than the site's business number. The template in git has
 * {{PHONE}}, {{EMAIL}} and {{LOCATION}} and nothing else.
 *
 * The page-fit check is the important part. The CV is deliberately ONE PAGE,
 * and the measurement has to happen under print emulation at the real column
 * width (184mm, not the viewport) — measuring at screen width reports it
 * fitting when it does not, because narrower text reflows taller. Getting
 * that wrong is what made three separate "it fits" readings wrong while
 * Chromium kept emitting two pages.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { chromium } from 'playwright-core';

const ROOT = new URL('..', import.meta.url).pathname;
const MM = 96 / 25.4;
const PRINT_W = Math.round((210 - 26) * MM);
const PRINT_H = Math.round((297 - 21) * MM);   // A4 less the 10.5mm @page margins

if (!existsSync(`${ROOT}cv/contact.json`)) {
  console.error('cv/contact.json is missing — copy cv/contact.example.json and fill it in.');
  process.exit(1);
}
const contact = JSON.parse(readFileSync(`${ROOT}cv/contact.json`, 'utf8'));

const variant = process.argv[2] ?? '';
const TEMPLATE = variant ? `cv/cv.${variant}.template.html` : 'cv/cv.template.html';
const OUT = variant ? `Yameen_Bux_CV_${variant[0].toUpperCase()}${variant.slice(1)}` : 'Yameen_Bux_CV';
if (!existsSync(`${ROOT}${TEMPLATE}`)) { console.error(`${TEMPLATE} does not exist`); process.exit(1); }

let html = readFileSync(`${ROOT}${TEMPLATE}`, 'utf8');
for (const key of ['PHONE', 'EMAIL', 'LOCATION']) {
  if (!contact[key]) { console.error(`contact.json is missing ${key}`); process.exit(1); }
  html = html.replaceAll(`{{${key}}}`, contact[key]);
}
if (html.includes('{{')) { console.error('unsubstituted placeholder left in the CV'); process.exit(1); }
writeFileSync(`${ROOT}cv/${OUT}.html`, html);

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--font-render-hinting=none'],
});
const page = await browser.newPage({ viewport: { width: PRINT_W, height: PRINT_H } });
await page.emulateMedia({ media: 'print' });
await page.goto(`file://${ROOT}cv/${OUT}.html`, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 300));

const h = await page.evaluate(() => document.body.scrollHeight);
const over = h - PRINT_H;
console.log(`content ${h}px / ${PRINT_H}px  →  ${over <= 0
  ? `FITS, ${-over}px spare`
  : `OVER by ${over}px (${(over / MM).toFixed(1)}mm)`}`);

await page.pdf({
  path: `${ROOT}cv/${OUT}.pdf`, format: 'A4', printBackground: true,
  margin: { top: '0', bottom: '0', left: '0', right: '0' },   // @page owns the margins
});
await page.screenshot({ path: `${ROOT}cv/${OUT}.preview.png`, fullPage: true });
await browser.close();

if (over > 0) {
  console.error('\nThe CV is over one page. Cut content — do not shrink the type further.');
  process.exit(1);
}
