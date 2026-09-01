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
  vite: { plugins: [tailwind()] },
});
