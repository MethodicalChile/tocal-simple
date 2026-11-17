import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // En Cloudflare Pages sirve en '/' por defecto; GitHub Pages define VITE_BASE='/tocal-simple/'
  base: process.env.VITE_BASE ?? '/',
  server: {
    allowedHosts: true,
  },
})