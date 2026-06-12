import { config } from '@/config'

// รูปร่าง error ตามสัญญา RFC 7807 ของ auth-service
export interface Problem {
  status: number
  detail?: string
  errors?: Record<string, string>
}

export class ApiError extends Error {
  constructor(public readonly problem: Problem) {
    super(problem.detail ?? `HTTP ${problem.status}`)
  }
}

export interface TokenResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
}

export interface User {
  id: number
  email: string
  username: string
  role: 'USER' | 'ADMIN'
}

// access token อยู่ในตัวแปรธรรมดา — รีโหลดหน้าแล้วหาย (ตั้งใจ) ให้ refresh cookie กู้คืน
let accessToken: string | null = null

export function setAccessToken(token: string | null) {
  accessToken = token
}

async function parseError(res: Response): Promise<never> {
  let problem: Problem = { status: res.status }
  try {
    problem = { status: res.status, ...(await res.json()) }
  } catch {
    // body ไม่ใช่ JSON ก็ใช้แค่ status
  }
  throw new ApiError(problem)
}

async function rawFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers)
  headers.set('Content-Type', 'application/json')
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`)
  const res = await fetch(`${config.apiBaseUrl}${path}`, {
    ...init,
    headers,
    credentials: 'include', // ให้ refresh cookie เดินทางไป-กลับ
  })
  if (!res.ok) await parseError(res)
  return res.status === 204 ? (undefined as T) : res.json()
}

// พยายาม refresh หนึ่งครั้งเมื่อเจอ 401 แล้ว retry — หมดสิทธิ์จริงค่อยโยนต่อ
export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  try {
    return await rawFetch<T>(path, init)
  } catch (e) {
    if (e instanceof ApiError && e.problem.status === 401 && accessToken) {
      const refreshed = await refresh()
      if (refreshed) return rawFetch<T>(path, init)
    }
    throw e
  }
}

export async function refresh(): Promise<boolean> {
  try {
    const token = await rawFetch<TokenResponse>('/auth/refresh', { method: 'POST' })
    accessToken = token.accessToken
    return true
  } catch {
    accessToken = null
    return false
  }
}
