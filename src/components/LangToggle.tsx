import { Button } from '@/components/ui/button'
import { useLang } from '@/i18n'

export default function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <Button
      variant="ghost"
      size="sm"
      className="font-mono text-xs"
      onClick={() => setLang(lang === 'en' ? 'th' : 'en')}
    >
      {lang === 'en' ? 'ไทย' : 'EN'}
    </Button>
  )
}
