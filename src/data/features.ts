// สถานะฟีเจอร์ของระบบ — หน้า Home อ่านไฟล์นี้ + คำบรรยายจาก locale
export type FeatureStatus = 'live' | 'building' | 'planned'

export interface Feature {
  id:
    | 'auth'
    | 'sessions'
    | 'darkMode'
    | 'i18n'
    | 'apiStatus'
    | 'presence'
    | 'feed'
    | 'contact'
    | 'gateway'
    | 'twoFactor'
  status: FeatureStatus
}

export const features: Feature[] = [
  { id: 'auth', status: 'live' },
  { id: 'sessions', status: 'live' },
  { id: 'darkMode', status: 'live' },
  { id: 'i18n', status: 'live' },
  { id: 'apiStatus', status: 'live' },
  { id: 'presence', status: 'live' },
  { id: 'feed', status: 'planned' },
  { id: 'contact', status: 'planned' },
  { id: 'gateway', status: 'planned' },
  { id: 'twoFactor', status: 'planned' },
]

export const repos = [
  { name: 'lab-web', url: 'https://github.com/taskeendev/lab-web' },
  { name: 'lab-auth-service', url: 'https://github.com/taskeendev/lab-auth-service' },
  { name: 'lab-presence-service', url: 'https://github.com/taskeendev/lab-presence-service' },
]
