import { Monitor, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/theme'

// วนสามสถานะ: system → light → dark → system
const next = { system: 'light', light: 'dark', dark: 'system' } as const

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor
  return (
    <Button
      variant="ghost"
      size="icon"
      title={`theme: ${theme}`}
      aria-label={`theme: ${theme}`}
      onClick={() => setTheme(next[theme])}
    >
      <Icon className="size-4" />
    </Button>
  )
}
