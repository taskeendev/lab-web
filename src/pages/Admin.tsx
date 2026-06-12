import { useEffect, useState } from 'react'
import { useT } from '@/i18n'
import { usePresence } from '@/presence'
import { cn } from '@/lib/utils'
import { deleteMessage, fetchInbox, markRead } from '@/api/contact'
import type { ContactMessage } from '@/api/contact'

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

      <ContactInbox />
    </div>
  )
}

function ContactInbox() {
  const t = useT()
  const [items, setItems] = useState<ContactMessage[]>([])
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    fetchInbox()
      .then((inbox) => {
        setItems(inbox.items)
        setUnread(inbox.unread)
      })
      .catch(() => {}) // contact-service ไม่ขึ้น = กล่องว่างเฉย ๆ ไม่พังหน้า
  }, [])

  const read = async (id: number) => {
    const updated = await markRead(id)
    setItems((prev) => prev.map((m) => (m.id === id ? updated : m)))
    setUnread((n) => n - 1)
  }

  const remove = async (m: ContactMessage) => {
    if (!window.confirm(t.inbox.deleteConfirm)) return
    await deleteMessage(m.id)
    setItems((prev) => prev.filter((x) => x.id !== m.id))
    if (!m.readAt) setUnread((n) => n - 1)
  }

  return (
    <div className="space-y-3 pt-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">{t.inbox.title}</h2>
        {unread > 0 && (
          <span className="rounded-full bg-rose-500/15 px-2 py-0.5 font-mono text-xs text-rose-600 dark:text-rose-400">
            {unread} {t.inbox.unread}
          </span>
        )}
      </div>
      {items.length === 0 ? (
        <p className="text-muted-foreground">{t.inbox.empty}</p>
      ) : (
        <ul className="space-y-3">
          {items.map((m) => (
            <li
              key={m.id}
              className={cn('space-y-2 rounded-lg border p-4', !m.readAt && 'border-rose-500/40')}
            >
              <div className="flex items-baseline gap-2 text-sm">
                {!m.readAt && <span className="size-2 shrink-0 self-center rounded-full bg-rose-500" />}
                <span className="font-semibold">{m.name}</span>
                <a href={`mailto:${m.email}`} className="font-mono text-xs text-muted-foreground hover:underline">
                  {m.email}
                </a>
                <span className="ml-auto text-xs text-muted-foreground">
                  {new Date(m.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="whitespace-pre-wrap text-sm">{m.message}</p>
              <div className="flex gap-3 text-xs">
                {m.readAt ? (
                  <span className="text-muted-foreground">
                    {t.inbox.readAt} {new Date(m.readAt).toLocaleString()}
                  </span>
                ) : (
                  <button onClick={() => void read(m.id)} className="text-muted-foreground hover:text-foreground">
                    {t.inbox.markRead}
                  </button>
                )}
                <button onClick={() => void remove(m)} className="text-muted-foreground hover:text-destructive">
                  {t.inbox.delete}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
