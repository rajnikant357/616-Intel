import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  site: 'https://616intel.prometrion.com',
  output: 'static',
  redirects: {
    '/doomsday-final-trailer-out': '/',
    '/final-trailer-out': '/',
    '/avengers-doomsday-final-trailer-out': '/',
    '/new-trailer-of-avengers-doomsday': '/',
    '/final-hindi-trailer-of-doomsday': '/',
    '/doomsday-final-trailer-hindi': '/',
  },
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
