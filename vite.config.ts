import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // listen di semua IP (biar ngrok bisa akses)
    allowedHosts: [
      '9420-103-136-58-120.ngrok-free.app',
    ],
  },
})
