import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { ApiError } from '@/api/client'
import { useAuth } from '@/auth'
import { useT } from '@/i18n'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Field {
  id: 'email' | 'username' | 'password'
  type: string
}

const fields: Field[] = [
  { id: 'email', type: 'email' },
  { id: 'username', type: 'text' },
  { id: 'password', type: 'password' },
]

export default function Register() {
  const t = useT()
  const { register } = useAuth()
  const navigate = useNavigate()
  const [values, setValues] = useState({ email: '', username: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    setFieldErrors({})
    try {
      await register(values.email, values.username, values.password)
      navigate('/account')
    } catch (err) {
      if (err instanceof ApiError) {
        // RFC 7807: field errors รายช่องจาก backend โชว์ใต้ input ตรง ๆ
        setFieldErrors(err.problem.errors ?? {})
        if (!err.problem.errors) setError(err.message)
      } else {
        setError(String(err))
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>{t.auth.registerTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          {fields.map((f) => (
            <div key={f.id} className="space-y-2">
              <Label htmlFor={f.id}>{t.auth[f.id]}</Label>
              <Input id={f.id} type={f.type} value={values[f.id]} required
                onChange={(e) => setValues({ ...values, [f.id]: e.target.value })} />
              {fieldErrors[f.id] && (
                <p className="text-sm text-destructive">{fieldErrors[f.id]}</p>
              )}
            </div>
          ))}
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? t.auth.submitting : t.auth.registerButton}
          </Button>
          <p className="text-sm text-muted-foreground">
            {t.auth.haveAccount}{' '}
            <Link to="/login" className="underline">{t.nav.login}</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
