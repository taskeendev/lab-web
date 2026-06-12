import { useT } from '@/i18n'

export default function Home() {
  const t = useT()
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">{t.home.title}</h1>
      <p className="text-muted-foreground">{t.home.tagline}</p>
    </div>
  )
}
