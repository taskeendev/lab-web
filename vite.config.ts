import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    // dev: เรียก /api แบบ same-origin แล้ว vite ส่งต่อให้ auth-service
    // (ตัด CORS/cookie cross-origin ออกจากสมการตอนพัฒนา)
    proxy: {
      // เส้นทางเจาะจงต้องมาก่อน /api รวม — feed-service อยู่คนละพอร์ตกับ auth
      '/api/posts': process.env.VITE_FEED_PROXY_TARGET ?? 'http://localhost:8083',
      '/api/comments': process.env.VITE_FEED_PROXY_TARGET ?? 'http://localhost:8083',
      '/api': process.env.VITE_DEV_PROXY_TARGET ?? 'http://localhost:8081',
      '/health': process.env.VITE_DEV_PROXY_TARGET ?? 'http://localhost:8081',
      // WebSocket ก็ proxy ได้ — browser เห็น same-origin เหมือนเดิม
      '/ws': {
        target: process.env.VITE_PRESENCE_PROXY_TARGET ?? 'http://localhost:8082',
        ws: true,
      },
    },
  },
})
