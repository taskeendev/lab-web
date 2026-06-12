# lab-web — Progress

หน้าบ้านของ **Feature Lab** (spec กลาง: lab-auth-service/docs/specs/2026-06-12-feature-lab-design.md)
เฟสนี้: web shell — TS + Tailwind + shadcn + i18n + dark mode + login/register ต่อ auth จริง → Vercel

สถานะ: ⬜ ยังไม่เริ่ม · 🔨 กำลังทำ · ✅ เสร็จ

## บันได 7 ขั้น

- [x] 1. โครง: Vite+React+TS + Tailwind v4 + shadcn/ui + react-router + 5 หน้าโครง + วินัย env — 2026-06-12
- [ ] 2. Dark mode: toggle + จำค่า + ตาม OS เป็น default
- [ ] 3. i18n EN/TH เขียนเอง (typed keys)
- [ ] 4. Auth client: login/register/refresh อัตโนมัติ/logout + AuthContext + protected routes
- [ ] 5. หน้า Login/Register/Account จริง + field errors (RFC 7807) + ตัวบอกสถานะ API
- [ ] 6. หน้า Home + System ตามปรัชญา "ให้งานพูดเอง" (2 ภาษา)
- [ ] 7. Deploy Vercel + GitHub Actions CI → URL จริง (เกณฑ์ผ่านเฟส)

## Log การทำงาน

- 2026-06-12 — ขั้น 1 เสร็จ: โครงทำมือทุกไฟล์ (package/tsconfig/vite config อธิบายได้หมด); Tailwind v4 ผ่าน @tailwindcss/vite; shadcn เจอ CLI ไม่มี --base-color + จะถาม interactive → เขียน components.json เอง แล้ว add button/card/input/label (CLI ไม่สร้าง lib/utils กับ theme vars ให้ → เติมเอง: cn() + CSS variables เต็มชุดใน index.css พร้อม @custom-variant dark รอขั้น 2); vite proxy /api → :8081 (dev ไม่มีปัญหา CORS/cookie); config.ts จุดเดียวแตะ env; verify: tsc / build / dev server / 5 หน้า navigate ครบ
