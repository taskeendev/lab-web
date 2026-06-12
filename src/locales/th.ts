import type { Dict } from './en'

// ประกาศ type เป็น Dict — ขาด key ไหนหรือสะกดผิด compiler แดงทันที
export const th: Dict = {
  nav: {
    home: 'หน้าแรก',
    system: 'ระบบ',
    login: 'เข้าสู่ระบบ',
    register: 'สมัครสมาชิก',
    account: 'บัญชี',
  },
  home: {
    title: 'Feature Lab',
    tagline: 'ระบบจริงที่ค่อย ๆ สร้างทีละฟีเจอร์ — พร้อมคำอธิบายทุกชิ้น',
  },
  system: {
    title: 'ระบบ',
  },
  auth: {
    loginTitle: 'เข้าสู่ระบบ',
    registerTitle: 'สร้างบัญชี',
    accountTitle: 'บัญชี',
  },
}
