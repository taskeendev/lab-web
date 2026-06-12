import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { getAccessToken } from './api/client'
import { useAuth } from './auth'
import { config } from './config'

export interface PresenceUser {
  username: string
  since: string
  lastSeen: string
  sessions: number
}

interface PresenceState {
  connected: boolean
  users: PresenceUser[]   // มีข้อมูลเฉพาะ ADMIN (server ส่ง snapshot/events ให้แต่ผู้เฝ้า)
}

const PresenceContext = createContext<PresenceState>({ connected: false, users: [] })

export function PresenceProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [connected, setConnected] = useState(false)
  const [users, setUsers] = useState<PresenceUser[]>([])

  useEffect(() => {
    if (!user) {
      setUsers([])
      setConnected(false)
      return
    }

    let ws: WebSocket | null = null
    let heartbeat: number | undefined
    let retry: number | undefined
    let stopped = false

    function connect() {
      ws = new WebSocket(config.presenceWsUrl)
      ws.onopen = () =>
        ws?.send(JSON.stringify({ type: 'auth', token: getAccessToken() }))
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data)
        switch (msg.type) {
          case 'ready':
            setConnected(true)
            heartbeat = window.setInterval(
              () => ws?.send(JSON.stringify({ type: 'ping' })),
              30_000,
            )
            break
          case 'snapshot':
            setUsers(msg.users)
            break
          case 'online':
            setUsers((prev) =>
              prev.some((u) => u.username === msg.username)
                ? prev
                : [...prev, { username: msg.username, since: msg.at, lastSeen: msg.at, sessions: 1 }],
            )
            break
          case 'offline':
            setUsers((prev) => prev.filter((u) => u.username !== msg.username))
            break
        }
      }
      ws.onclose = () => {
        setConnected(false)
        window.clearInterval(heartbeat)
        if (!stopped) retry = window.setTimeout(connect, 3000)   // หลุดแล้วต่อใหม่
      }
    }

    connect()
    return () => {
      stopped = true
      window.clearTimeout(retry)
      window.clearInterval(heartbeat)
      ws?.close()
    }
  }, [user])

  return (
    <PresenceContext.Provider value={{ connected, users }}>
      {children}
    </PresenceContext.Provider>
  )
}

export function usePresence() {
  return useContext(PresenceContext)
}
