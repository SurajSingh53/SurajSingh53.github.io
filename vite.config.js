import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split the heavy, independently-cacheable libraries out of the main
        // bundle. three/@react-three only load with the lazy 3D background.
        manualChunks: {
          three: ['three', '@react-three/fiber'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
