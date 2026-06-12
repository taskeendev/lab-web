import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  apiFetch,
  refresh,
  setAccessToken,
  type TokenResponse,
  type User,
} from './api/client'

interface AuthState {
  user: User | null
  loading: boolean   // true ระหว่างกู้ session ตอนเปิดแอป — กัน redirect ก่อนรู้ความจริง
  login: (username: string, password: string) => Promise<void>
  register: (email: string, username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // เปิดแอป: ถ้ามี refresh cookie ค้างอยู่ → ได้ access ใหม่ + ดึงตัวตน โดย user ไม่ต้องกรอกอะไร
  useEffect(() => {
    ;(async () => {
      if (await refresh()) {
        try {
          setUser(await apiFetch<User>('/users/me'))
        } catch {
          setUser(null)
        }
      }
      setLoading(false)
    })()
  }, [])

  async function login(username: string, password: string) {
    const token = await apiFetch<TokenResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    setAccessToken(token.accessToken)
    setUser(await apiFetch<User>('/users/me'))
  }

  async function register(email: string, username: string, password: string) {
    await apiFetch<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, username, password }),
    })
    await login(username, password)   // สมัครเสร็จเข้าระบบให้เลย
  }

  async function logout() {
    try {
      await apiFetch<void>('/auth/logout', { method: 'POST' })
    } finally {
      setAccessToken(null)
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth ต้องอยู่ใต้ AuthProvider')
  return ctx
}
