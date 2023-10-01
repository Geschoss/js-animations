import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/js-animations',
  plugins: [tsconfigPaths()],
  assetsInclude: ['**/*.mov'],
});
