import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve('.'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Local dev: /api calls ko local backend (port 3000) pe forward karo
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
