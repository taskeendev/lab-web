import { repos } from '@/data/features'
import { useT } from '@/i18n'

const diagram = `[ web  react + ts ] ──▶ [ gateway* ] ──┬──▶ [ auth-service  spring boot ] ─┐
                                        ├──▶ [ feed-service* ]             ─┼─▶ [ postgresql ]
                                        └──▶ [ contact-service* ]          ─┘
* = planned                     env-driven config · ci per repo · rfc 7807 everywhere`

export default function System() {
  const t = useT()
  const decisions = ['jwt', 'env', 'micro', 'memToken'] as const
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">{t.system.title}</h1>
        <p className="text-muted-foreground">{t.system.intro}</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">{t.system.archTitle}</h2>
        <pre className="overflow-x-auto rounded-lg border bg-muted/50 p-4 font-mono text-xs leading-relaxed">
          {diagram}
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">{t.system.decisionsTitle}</h2>
        <dl className="space-y-4">
          {decisions.map((d) => (
            <div key={d}>
              <dt className="font-medium">{t.system.decisions[d].title}</dt>
              <dd className="text-sm text-muted-foreground">{t.system.decisions[d].why}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">{t.system.reposTitle}</h2>
        <ul className="space-y-1">
          {repos.map((r) => (
            <li key={r.name}>
              <a href={r.url} className="font-mono text-sm underline">
                {r.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
