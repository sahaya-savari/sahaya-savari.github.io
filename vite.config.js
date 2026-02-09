import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Base URL for GitHub Pages deployment
  // Repo: https://sahaya-savari.github.io/
  // Required so assets load correctly after refresh
  base: '/',

  build: {
    outDir: 'dist',
  },

  // Static assets (404.html, favicon, etc.) copied to dist
  publicDir: 'public',
})
