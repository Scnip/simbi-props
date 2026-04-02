import { defineConfig } from 'vite';
import { glob } from 'glob';
import path from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'about.html'),
        faqs: path.resolve(__dirname, 'faqs.html'),
      },
    },
  },
});
