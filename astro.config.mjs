import { defineConfig } from 'astro/config';

// Set SITE and BASE when deploying (e.g. GitHub Pages sub-path).
// Defaults work for Netlify / Cloudflare Pages / Vercel.
export default defineConfig({
  site: process.env.SITE || 'http://localhost:4321',
  base: process.env.BASE || '/',
  trailingSlash: 'always',
});
