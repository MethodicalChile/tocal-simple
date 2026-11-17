import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // GitHub Pages sirve el sitio en /tocal-simple/ (ver .github/workflows/static.yml).
  base: process.env.VITE_BASE ?? '/overview/',
  server: {
    allowedHosts: true,
  },
})