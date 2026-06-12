import { useT } from '@/i18n'
import { usePresence } from '@/presence'
import { cn } from '@/lib/utils'

const time = (iso: string) => new Date(iso).toLocaleTimeString()

export default function Admin() {
  const t = useT()
  const { connected, users } = usePresence()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">{t.admin.title}</h1>
        <span
          className={cn(
            'flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-xs',
            connected
              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
              : 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
          )}
        >
          <span className={cn('size-1.5 rounded-full', connected ? 'bg-emerald-500' : 'bg-amber-500')} />
          {connected ? t.admin.live : t.admin.reconnecting}
        </span>
      </div>

      {users.length === 0 ? (
        <p className="text-muted-foreground">{t.admin.empty}</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="py-2 font-medium">{t.admin.user}</th>
              <th className="py-2 font-medium">{t.admin.since}</th>
              <th className="py-2 font-medium">{t.admin.lastSeen}</th>
              <th className="py-2 text-right font-medium">{t.admin.sessions}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.username} className="border-b">
                <td className="py-2 font-mono">
                  <span className="mr-2 inline-block size-2 rounded-full bg-emerald-500" />
                  {u.username}
                </td>
                <td className="py-2">{time(u.since)}</td>
                <td className="py-2">{time(u.lastSeen)}</td>
                <td className="py-2 text-right font-mono">{u.sessions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
