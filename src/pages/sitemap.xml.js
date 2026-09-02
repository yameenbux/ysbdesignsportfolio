/**
 * Sitemap, hand-rolled rather than pulled in as @astrojs/sitemap.
 *
 * The integration would generate this and nothing else, and CLAUDE.md's
 * working rules say not to add a library when an existing tool covers it.
 * Eleven URLs do not need a dependency.
 *
 * Listed here: the ten real pages, including the three unlisted case studies
 * — they are live and indexed and staying that way. Not listed: /404.html,
 * and /services.html, which is a redirect stub whose canonical already points
 * at /about.html.
 */

const SITE = 'https://www.ysbdesigns.uk';

// priority is a hint, not a ranking factor — it only orders these pages
// against each other for a crawler with a limited budget.
const pages = [
  ['/',                   '1.0'],
  ['/work.html',          '0.9'],
  ['/about.html',         '0.9'],
  ['/contact.html',       '0.8'],
  ['/taiyabah.html',      '0.7'],
  ['/venetian.html',      '0.7'],
  ['/hairbychrissy.html', '0.7'],
  ['/ellash.html',        '0.5'],
  ['/buxtravel.html',     '0.5'],
  ['/luxescent.html',     '0.5'],
  ['/privacy.html',       '0.2'],
  ['/terms.html',         '0.2'],
];

export function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    ([path, priority]) =>
      `  <url>\n    <loc>${SITE}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
