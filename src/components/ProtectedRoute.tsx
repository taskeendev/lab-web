import { Navigate } from 'react-router'
import { useAuth } from '@/auth'
import type { ReactNode } from 'react'

export default function ProtectedRoute({
  children,
  role,
}: {
  children: ReactNode
  role?: 'ADMIN'
}) {
  const { user, loading } = useAuth()
  if (loading) return null            // กำลังกู้ session — อย่าเพิ่งตัดสิน
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) return <Navigate to="/" replace />
  return children
}
