import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Vite 8 uses Rolldown as the default bundler
    rolldownOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules into smaller chunks to stay below 500kB warning
          if (id.includes('node_modules')) {
            if (id.includes('firebase')) {
              return 'firebase';
            }
            if (id.includes('framer-motion') || id.includes('lucide-react')) {
              return 'ui-library';
            }
            return 'vendor';
          }
        },
      },
    },
  },
})
