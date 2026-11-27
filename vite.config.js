import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // '/' en Cloudflare Pages o dominio propio; GitHub Pages usa VITE_BASE=/<repo>/
  base: process.env.VITE_BASE ?? '/',
  server: { allowedHosts: true },
  build: {
    chunkSizeWarningLimit: 1200, // MapLibre (~1 MB) se carga aparte y solo al acercarse al mapa
  },
})
