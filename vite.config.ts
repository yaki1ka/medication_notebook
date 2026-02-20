import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/medication_notebook/',
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ['@react-pdf/renderer'],
  },
})
