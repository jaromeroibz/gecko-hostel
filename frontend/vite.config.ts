import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Split vendors into stable chunks that cache independently of app code.
        // react + react-dom ship rarely → long-lived cache hit.
        // i18n chunks can change with copy updates without busting the React chunk.
        manualChunks: {
          'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
          'vendor-i18n':   ['react-i18next', 'i18next'],
          'vendor-helmet': ['react-helmet-async'],
        },
      },
    },
  },
})
