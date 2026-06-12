# lab-web — Progress

หน้าบ้านของ **Feature Lab** (spec กลาง: lab-auth-service/docs/specs/2026-06-12-feature-lab-design.md)
เฟสนี้: web shell — TS + Tailwind + shadcn + i18n + dark mode + login/register ต่อ auth จริง → Vercel

สถานะ: ⬜ ยังไม่เริ่ม · 🔨 กำลังทำ · ✅ เสร็จ

## บันได 7 ขั้น

- [x] 1. โครง: Vite+React+TS + Tailwind v4 + shadcn/ui + react-router + 5 หน้าโครง + วินัย env — 2026-06-12
- [x] 2. Dark mode: toggle + จำค่า + ตาม OS เป็น default — 2026-06-12
- [x] 3. i18n EN/TH เขียนเอง (typed keys) — 2026-06-12
- [x] 4. Auth client: login/register/refresh อัตโนมัติ/logout + AuthContext + protected routes — 2026-06-12
- [x] 5. หน้า Login/Register/Account จริง + field errors (RFC 7807) + ตัวบอกสถานะ API — 2026-06-12
- [ ] 6. หน้า Home + System ตามปรัชญา "ให้งานพูดเอง" (2 ภาษา)
- [ ] 7. Deploy Vercel + GitHub Actions CI → URL จริง (เกณฑ์ผ่านเฟส)

## Log การทำงาน

- 2026-06-12 — ขั้น 5 เสร็จ: Login (error เดี่ยว), Register (field errors รายช่องจาก problem.errors ใต้ input ตรง ๆ + auto-login หลังสมัคร), Account (ข้อมูล + logout); ApiStatus จุดเขียว/แดงใน footer ping /health ทุก 30s (เพิ่ม /health เข้า vite proxy + healthUrl ใน config) — เว็บ static อยู่ได้เอง บอกตรง ๆ เมื่อ backend ไม่พร้อม; verify: tsc/build, ทุกหน้า transform, health ผ่าน proxy, validation errors รูปร่างตรงที่ฟอร์มใช้

- 2026-06-12 — ขั้น 4 เสร็จ: api/client.ts (access ใน memory เท่านั้น — กัน XSS, ApiError ห่อ RFC 7807 รวม field errors, เจอ 401 → refresh หนึ่งครั้งแล้ว retry); AuthProvider กู้ session เงียบตอนเปิดแอป (refresh cookie → access → /me) + login/register(สมัครแล้วเข้าเลย)/logout; ProtectedRoute รอ loading ก่อนตัดสิน; ทดสอบสายจริงผ่าน vite proxy: login+cookie / refresh rotation / me / logout→refresh 401 ครบ

- 2026-06-12 — ขั้น 3 เสร็จ: i18n ~60 บรรทัดไม่มี lib — en เป็นแม่แบบ, DeepString mapped type ขยาย literal → string, th: Dict ถูก compiler บังคับ key ครบ (พิสูจน์: ลบ key ทิ้ง → TS2741 ทันที); useT() คืน dict ทั้งก้อน = เข้าถึง t.nav.home ตรง ๆ autocomplete เต็ม ไม่มี string key; LangToggle + จำ localStorage + ตั้ง html lang

- 2026-06-12 — ขั้น 2 เสร็จ: ThemeProvider 3 สถานะ (system/light/dark) — จำใน localStorage, โหมด system ฟัง matchMedia change (OS สลับกลางคันตามทัน), toggle วนสามสถานะด้วยไอคอน Sun/Moon/Monitor; กัน FOUC ด้วย inline script ใน head (ทาสี .dark ก่อน React โหลด) + พิสูจน์ logic headless 5 เคส

- 2026-06-12 — ขั้น 1 เสร็จ: โครงทำมือทุกไฟล์ (package/tsconfig/vite config อธิบายได้หมด); Tailwind v4 ผ่าน @tailwindcss/vite; shadcn เจอ CLI ไม่มี --base-color + จะถาม interactive → เขียน components.json เอง แล้ว add button/card/input/label (CLI ไม่สร้าง lib/utils กับ theme vars ให้ → เติมเอง: cn() + CSS variables เต็มชุดใน index.css พร้อม @custom-variant dark รอขั้น 2); vite proxy /api → :8081 (dev ไม่มีปัญหา CORS/cookie); config.ts จุดเดียวแตะ env; verify: tsc / build / dev server / 5 หน้า navigate ครบ
