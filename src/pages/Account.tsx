import { useNavigate } from 'react-router'
import { useAuth } from '@/auth'
import { useT } from '@/i18n'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Account() {
  const t = useT()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  if (!user) return null   // ProtectedRoute กันให้แล้ว — บรรทัดนี้ทำให้ TS แคบ type ลง

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>{t.auth.accountTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <dl className="space-y-1 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">{t.auth.username}</dt>
            <dd className="font-mono">{user.username}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">{t.auth.email}</dt>
            <dd className="font-mono">{user.email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">{t.auth.role}</dt>
            <dd className="font-mono">{user.role}</dd>
          </div>
        </dl>
        <Button
          variant="outline"
          className="w-full"
          onClick={async () => {
            await logout()
            navigate('/')
          }}
        >
          {t.auth.logoutButton}
        </Button>
      </CardContent>
    </Card>
  )
}
