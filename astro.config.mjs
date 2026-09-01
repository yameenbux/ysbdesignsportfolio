// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

// Static output for GitHub Pages. The custom domain lives in CNAME, which is
// copied into dist/ from public/ at build time — see CLAUDE.md, "Deploy".
export default defineConfig({
  site: 'https://www.ysbdesigns.uk',
  output: 'static',

  // Existing URLs are /ellash.html, /taiyabah.html and so on. 'file' keeps
  // that shape; the default 'directory' would emit /ellash/ and break every
  // link and every indexed URL.
  build: { format: 'file' },

  // services.html is live and indexed. Its content folded into about.html in
  // Phase 3, so the URL redirects rather than 404s. Static output emits a
  // meta-refresh page for this. The key is extensionless: with
  // build.format 'file' Astro appends .html itself, and '/services.html'
  // emits services.html.html — which 404s the real URL.
  redirects: {
    '/services': '/about.html',
  },
  vite: { plugins: [tailwind()] },
});
