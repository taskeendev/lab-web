import { features } from '@/data/features'
import { useT } from '@/i18n'
import { cn } from '@/lib/utils'

const statusStyle = {
  live: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  building: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  planned: 'bg-muted text-muted-foreground',
} as const

export default function Home() {
  const t = useT()
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">{t.home.title}</h1>
        <p className="text-muted-foreground">{t.home.tagline}</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">{t.home.featuresTitle}</h2>
        <ul className="divide-y rounded-lg border">
          {features.map((f) => (
            <li key={f.id} className="flex items-start gap-4 p-4">
              <span
                className={cn(
                  'mt-0.5 shrink-0 rounded-full px-2 py-0.5 font-mono text-xs',
                  statusStyle[f.status],
                )}
              >
                {t.featureStatus[f.status]}
              </span>
              <div>
                <p className="font-medium">{t.features[f.id].name}</p>
                <p className="text-sm text-muted-foreground">{t.features[f.id].desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-xs text-muted-foreground">
        {t.home.builtBy}{' '}
        <a href="https://github.com/taskeendev" className="underline">
          taskeendev
        </a>
      </p>
    </div>
  )
}
