import { defineConfig } from 'vite';

export default defineConfig({
  base: '/js-animations',
  resolve: {
    alias: {
      src: '/src',
    },
  },
  assetsInclude: ['**/*.mov', '**/*.wav'],
});
