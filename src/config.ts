// จุดเดียวที่อ่าน env — component ห้ามแตะ import.meta.env ตรง
// dev: ไม่ตั้ง VITE_API_URL → ใช้ /api ผ่าน vite proxy
// prod: ตั้ง VITE_API_URL ชี้ gateway/auth-service จริง
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_URL ?? '/api',
  feedApiBaseUrl: import.meta.env.VITE_FEED_API_URL ?? '/api',
  healthUrl: import.meta.env.VITE_HEALTH_URL ?? '/health',
  presenceWsUrl:
    import.meta.env.VITE_PRESENCE_WS_URL ??
    `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws/presence`,
} as const
