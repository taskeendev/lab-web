import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { en, type Dict } from './locales/en'
import { th } from './locales/th'

export type Lang = 'en' | 'th'

const STORAGE_KEY = 'lang'
const dicts: Record<Lang, Dict> = { en, th }

const LangContext = createContext<{
  lang: Lang
  setLang: (lang: Lang) => void
} | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem(STORAGE_KEY) as Lang | null) ?? 'en',
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang   // ช่วย screen reader + เบราว์เซอร์เลือกฟอนต์
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang ต้องอยู่ใต้ LangProvider')
  return ctx
}

// คืน dict ทั้งก้อนแบบ typed: t.nav.home — autocomplete เต็ม, สะกดผิด = compile error
export function useT(): Dict {
  return dicts[useLang().lang]
}
