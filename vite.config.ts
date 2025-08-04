import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // listen di semua IP (biar ngrok bisa akses)
    allowedHosts: [
      'http://localhost/perpustakaan/',
    ],
  },
  
})
