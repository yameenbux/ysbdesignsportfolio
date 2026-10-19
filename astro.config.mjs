// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import react from '@astrojs/react';

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

  // React, for the shadcn hero-10 component. Every other page is still
  // zero-JS Astro — the integration only ships React where a component is
  // actually hydrated with a client: directive.
  integrations: [react()],

  vite: {
    plugins: [tailwind()],

    // react-wrap-balancer@1.1.1 ships no "exports" field, so Vite resolves its
    // CJS `main` for the SSR pass and `import Balancer from ...` arrives as the
    // module object { Balancer, Provider, default } rather than the component.
    // React then throws "Element type is invalid ... got: object" at build.
    // Its ESM build does export a real default, so point at that directly.
    // ssr.noExternal alone was not enough — Vite still picked the CJS entry.
    // Aliasing here keeps hero-10.tsx exactly as supplied rather than
    // rewriting its import to `{ Balancer }`.
    resolve: {
      alias: [{ find: /^react-wrap-balancer$/, replacement: 'react-wrap-balancer/dist/index.mjs' }],
    },
    ssr: { noExternal: ['react-wrap-balancer'] },
  },
});
