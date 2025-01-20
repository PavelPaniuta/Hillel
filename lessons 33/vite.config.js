import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sass from 'sass';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/todos': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'sass:math';`,
        quietDeps: true, 
      },
    },
  },
});
