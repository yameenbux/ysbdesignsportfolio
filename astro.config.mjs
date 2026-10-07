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

  // '/services' redirected to about.html from Phase 3 until 7 October. The
  // site then pivoted to a hiring audience: about.html became the candidate
  // page and services.astro took back the commercial content, so the URL is
  // a real page again and the redirect would shadow it.

  vite: { plugins: [tailwind()] },
});
