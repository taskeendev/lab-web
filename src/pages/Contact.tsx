import { useState } from 'react'
import { useT } from '@/i18n'
import { ApiError } from '@/api/client'
import { submitContact } from '@/api/contact'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Contact() {
  const t = useT()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setErrors({})
    try {
      await submitContact(name, email, message)
      setSent(true)
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      if (err instanceof ApiError && err.problem.errors) setErrors(err.problem.errors)
      else setErrors({ message: err instanceof Error ? err.message : 'failed' })
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <Card className="mx-auto max-w-md">
        <CardContent className="space-y-4 pt-6 text-center">
          <p>{t.contact.sent}</p>
          <Button variant="outline" onClick={() => setSent(false)}>
            {t.contact.sendAnother}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>{t.contact.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">{t.contact.intro}</p>
        <form onSubmit={(e) => void submit(e)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">{t.contact.name}</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">{t.contact.email}</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">{t.contact.message}</Label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 2000))}
              rows={5}
              className="w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={sending}>
            {sending ? t.contact.sending : t.contact.send}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
