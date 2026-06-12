import type { Dict } from './en'

// ประกาศ type เป็น Dict — ขาด key ไหนหรือสะกดผิด compiler แดงทันที
export const th: Dict = {
  nav: {
    home: 'หน้าแรก',
    system: 'ระบบ',
    login: 'เข้าสู่ระบบ',
    register: 'สมัครสมาชิก',
    account: 'บัญชี',
    admin: 'แอดมิน',
    feed: 'ฟีด',
    contact: 'ติดต่อ',
  },
  contact: {
    title: 'ติดต่อ',
    intro: 'ฝากข้อความไว้ได้เลย — มันจะลง database โผล่ในกล่องแอดมิน และเด้งอีเมลแจ้งเตือนหาเจ้าของเว็บ',
    name: 'ชื่อ',
    email: 'อีเมล',
    message: 'ข้อความ',
    send: 'ส่ง',
    sending: 'กำลังส่ง…',
    sent: 'ส่งข้อความแล้ว — ขอบคุณครับ!',
    sendAnother: 'ส่งอีกฉบับ',
  },
  inbox: {
    title: 'กล่องข้อความติดต่อ',
    unread: 'ยังไม่อ่าน',
    empty: 'ยังไม่มีข้อความ',
    markRead: 'อ่านแล้ว',
    delete: 'ลบ',
    deleteConfirm: 'ลบข้อความนี้?',
    readAt: 'อ่านเมื่อ',
  },
  feed: {
    title: 'ฟีด',
    placeholder: 'กำลังคิดอะไรอยู่?',
    post: 'โพสต์',
    posting: 'กำลังโพสต์…',
    loginPrompt: 'เข้าสู่ระบบเพื่อโพสต์ คอมเมนต์ และกดไลก์',
    empty: 'ยังไม่มีอะไรเลย — เป็นคนแรกที่โพสต์สิ',
    loadMore: 'โหลดเพิ่ม',
    offline: 'ตอนนี้ติดต่อ backend ของฟีดไม่ได้',
    comments: 'คอมเมนต์',
    commentPlaceholder: 'เขียนคอมเมนต์…',
    send: 'ส่ง',
    delete: 'ลบ',
    deleteConfirm: 'ลบโพสต์นี้?',
  },
  admin: {
    title: 'ใคร online อยู่',
    live: 'สด',
    reconnecting: 'กำลังเชื่อมต่อใหม่…',
    empty: 'ยังไม่มีใคร online ตอนนี้',
    user: 'ผู้ใช้',
    since: 'Online ตั้งแต่',
    lastSeen: 'เห็นล่าสุด',
    sessions: 'แท็บ',
  },
  home: {
    title: 'Feature Lab',
    tagline: 'ระบบจริงที่ค่อย ๆ สร้างทีละฟีเจอร์ — พร้อมคำอธิบายทุกชิ้น',
    featuresTitle: 'ฟีเจอร์',
    builtBy: 'สร้างแบบเปิดเผยโดย',
  },
  system: {
    title: 'ระบบ',
    intro: 'เว็บนี้ไม่ใช่โบรชัวร์ — มันคือตัวระบบเอง ทุกอย่างในหน้าแรกทำงานจริงอยู่ที่นี่ และหน้านี้อธิบายว่าทำอย่างไรและทำไม',
    archTitle: 'สถาปัตยกรรม',
    decisionsTitle: 'การตัดสินใจออกแบบ',
    reposTitle: 'ซอร์สโค้ด',
    decisions: {
      jwt: {
        title: 'JWT อายุสั้น + refresh แบบหมุนเวียน',
        why: 'service ตรวจ access token ได้เองโดยไม่ต้องวิ่งถามใคร ขณะที่ยังเพิกถอน session ได้ผ่าน refresh token ที่เก็บฝั่ง server — token ที่ถูกหมุนทิ้งแล้วโผล่ซ้ำถือเป็นสัญญาณขโมย และระบบจะเผาทุก session ของผู้ใช้คนนั้นทันที',
      },
      env: {
        title: 'ทุกค่าผ่าน environment variables',
        why: 'ไม่มี URL, secret หรือลิมิตฝังในโค้ดเลย — build เดียวกันรันได้ทั้งบนเครื่อง dev และ production และการลืมตั้ง secret จะพังตั้งแต่ boot แทนที่จะแอบใช้ค่าอ่อนแอ',
      },
      micro: {
        title: 'Microservices แยก repo ต่อ service',
        why: 'แต่ละ service เป็นเจ้าของ schema, เทสต์ และ CI ของตัวเอง — เส้นแบ่งจริงใจเพราะการข้ามมันต้องผ่าน network จริง',
      },
      memToken: {
        title: 'Access token อยู่ในหน่วยความจำเท่านั้น',
        why: 'ไม่มีอะไรที่ JavaScript อ่านได้เก็บ session ไว้ — HttpOnly cookie เป็นผู้รอด ส่วนหน้าเว็บเป็นผู้ลืม',
      },
    },
  },
  featureStatus: {
    live: 'ใช้งานจริง',
    building: 'กำลังสร้าง',
    planned: 'ในแผน',
  },
  features: {
    auth: {
      name: 'ระบบยืนยันตัวตน',
      desc: 'สมัคร/เข้าสู่ระบบด้วย JWT อายุสั้น รหัสผ่าน hash ด้วย BCrypt, error ตามมาตรฐาน RFC 7807 พร้อมรายละเอียดรายช่อง',
    },
    sessions: {
      name: 'Session แบบหมุนเวียน',
      desc: 'Refresh token อยู่ใน HttpOnly cookie หมุนใหม่ทุกครั้งที่ใช้ — ใช้ token ที่ถูกหมุนทิ้งซ้ำ = เผาทุก session ของผู้ใช้นั้น',
    },
    darkMode: {
      name: 'โหมดมืด',
      desc: 'สามสถานะ (ตามระบบ / สว่าง / มืด) จำค่าไว้ และทาสีก่อนเฟรมแรก — เครื่องธีมมืดไม่เห็นจอขาววาบ',
    },
    i18n: {
      name: 'สองภาษา',
      desc: 'พจนานุกรม EN/TH เขียนเอง — compiler บังคับให้สองภาษาตรงกันเสมอ แปลตกหล่น = build ไม่ผ่าน',
    },
    apiStatus: {
      name: 'สถานะ API',
      desc: 'Footer เช็คชีพจร backend และบอกตรง ๆ เมื่อออฟไลน์ — เว็บ static ยืนได้ด้วยตัวเอง',
    },
    presence: {
      name: 'Presence แบบ realtime',
      desc: 'ติดตาม online/offline ผ่าน WebSocket พร้อม dashboard ฝั่งแอดมิน',
    },
    feed: {
      name: 'Community feed',
      desc: 'โพสต์ คอมเมนต์ ไลก์ — โดยผู้ใช้ที่เข้าสู่ระบบทุกคน',
    },
    contact: {
      name: 'ติดต่อ',
      desc: 'ข้อความถูกเก็บ โผล่ในหน้าแอดมิน และส่งต่อทางอีเมล',
    },
    gateway: {
      name: 'Gateway',
      desc: 'gateway เขียนเองคั่นหน้า services: routing, rate limit, TLS',
    },
    twoFactor: {
      name: '2FA และ social login',
      desc: 'ยืนยันสองชั้นแบบ TOTP, เข้าสู่ระบบผ่าน OAuth และ reset รหัสผ่านทางอีเมล',
    },
  },
  auth: {
    loginTitle: 'เข้าสู่ระบบ',
    registerTitle: 'สร้างบัญชี',
    accountTitle: 'บัญชี',
    email: 'อีเมล',
    username: 'ชื่อผู้ใช้',
    password: 'รหัสผ่าน',
    loginButton: 'เข้าสู่ระบบ',
    registerButton: 'สร้างบัญชี',
    logoutButton: 'ออกจากระบบ',
    submitting: 'กำลังทำงาน…',
    noAccount: 'ยังไม่มีบัญชี?',
    haveAccount: 'มีบัญชีอยู่แล้ว?',
    role: 'สิทธิ์',
  },
  status: {
    online: 'API ออนไลน์',
    offline: 'API ออฟไลน์ — ฟีเจอร์ auth ต้องรอ backend ทำงาน',
  },
}
