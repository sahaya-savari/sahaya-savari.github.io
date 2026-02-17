import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Base URL for GitHub Pages deployment
  base: '/',

  build: {
    outDir: 'dist',

    // Code splitting — separate vendor from app code
    rollupOptions: {
      output: {
        manualChunks: {
          // React core (react + react-dom) in its own chunk
          'vendor-react': ['react', 'react-dom'],
          // Router in its own chunk
          'vendor-router': ['react-router-dom'],
          // Markdown rendering in its own chunk
          'vendor-markdown': ['marked', 'dompurify'],
        },
      },
    },

    // Target modern browsers for smaller output
    target: 'es2020',

    // Enable CSS code splitting
    cssCodeSplit: true,
  },

  // Static assets (404.html, favicon, etc.) copied to dist
  publicDir: 'public',
})
