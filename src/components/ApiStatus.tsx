import { useEffect, useState } from 'react'
import { config } from '@/config'
import { useT } from '@/i18n'
import { cn } from '@/lib/utils'

// เช็คชีพจร backend ทุก 30 วิ — เว็บ static อยู่ได้ด้วยตัวเอง แต่บอกตามตรงว่า API พร้อมไหม
export default function ApiStatus() {
  const t = useT()
  const [online, setOnline] = useState<boolean | null>(null)

  useEffect(() => {
    let cancelled = false
    async function ping() {
      try {
        const res = await fetch(config.healthUrl)
        if (!cancelled) setOnline(res.ok)
      } catch {
        if (!cancelled) setOnline(false)
      }
    }
    ping()
    const id = setInterval(ping, 30_000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  if (online === null) return null
  return (
    <p className="flex items-center gap-2 text-xs text-muted-foreground">
      <span
        className={cn(
          'inline-block size-2 rounded-full',
          online ? 'bg-emerald-500' : 'bg-red-500',
        )}
      />
      {online ? t.status.online : t.status.offline}
    </p>
  )
}
