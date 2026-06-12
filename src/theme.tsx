import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme'

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
} | null>(null)

function systemPrefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function apply(theme: Theme) {
  const dark = theme === 'dark' || (theme === 'system' && systemPrefersDark())
  document.documentElement.classList.toggle('dark', dark)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? 'system',
  )

  // ทุกครั้งที่ค่าเปลี่ยน: บันทึก + ทาสีจริงที่ <html>
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme)
    apply(theme)
  }, [theme])

  // โหมด system ต้องไวต่อการที่ OS สลับธีมกลางคัน
  useEffect(() => {
    if (theme !== 'system') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => apply('system')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme ต้องอยู่ใต้ ThemeProvider')
  return ctx
}
