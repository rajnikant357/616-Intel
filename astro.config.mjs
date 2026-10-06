import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  site: 'https://616intel.com',
  output: 'static',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
