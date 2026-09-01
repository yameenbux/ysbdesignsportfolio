// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

// Static output for GitHub Pages. The custom domain lives in CNAME, which is
// copied into dist/ from public/ at build time — see CLAUDE.md, "Deploy".
export default defineConfig({
  site: 'https://www.ysbdesigns.uk',
  output: 'static',
  vite: { plugins: [tailwind()] },
});
