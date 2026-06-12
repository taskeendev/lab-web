import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// รวม class แบบฉลาด: เงื่อนไขด้วย clsx แล้วให้ tailwind-merge ตัดตัวที่ขัดกัน
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
