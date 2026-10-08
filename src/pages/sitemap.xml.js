/**
 * Sitemap, hand-rolled rather than pulled in as @astrojs/sitemap.
 *
 * The integration would generate this and nothing else, and CLAUDE.md's
 * working rules say not to add a library when an existing tool covers it.
 * Seventeen URLs do not need a dependency.
 *
 * The navigable pages are listed by hand, because each carries a priority.
 * The case studies are NOT: they come from `projects.js`, so adding a project
 * adds its URL here too. That is a fix, not a flourish — Tidemark was added on
 * 8 October and this file silently did not list it, which is exactly the drift
 * a hand-kept copy of another list produces. The three unlisted case studies
 * are still included: they are live and indexed and staying that way.
 *
 * Not listed: /404.html.
 */

import { all } from '../data/projects.js';

const SITE = 'https://www.ysbdesigns.uk';

// priority is a hint, not a ranking factor — it only orders these pages
// against each other for a crawler with a limited budget.

// Navigable pages, by hand: each has a priority of its own.
const fixed = [
  ['/',                 '1.0'],
  ['/work.html',        '0.9'],
  ['/engineering.html', '0.9'],
  ['/about.html',       '0.9'],
  ['/services.html',    '0.8'],
  ['/contact.html',     '0.8'],
  ['/privacy.html',     '0.2'],
  ['/terms.html',       '0.2'],
];

// Case studies, from the one source the rest of the site reads. Written-up
// projects rank above the ones that are only listed.
const studies = all.map((p) => [p.href, p.problem ? '0.7' : '0.5']);

const pages = [...fixed, ...studies];

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
