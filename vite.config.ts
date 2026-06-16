import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// dev: ทุก request วิ่งผ่าน Kong จุดเดียว (เหมือน production) — เจอ rate-limit/CORS/JWT-at-edge จริง
const gateway = process.env.VITE_GATEWAY_TARGET ?? 'http://localhost:8000'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': gateway,
      '/health': gateway,
      '/ws': { target: gateway, ws: true },
    },
  },
})
