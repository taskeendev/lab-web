import { NavLink, Route, Routes } from 'react-router'
import ApiStatus from './components/ApiStatus'
import LangToggle from './components/LangToggle'
import ProtectedRoute from './components/ProtectedRoute'
import ThemeToggle from './components/ThemeToggle'
import { useAuth } from './auth'
import { useT } from './i18n'
import Home from './pages/Home'
import Feed from './pages/Feed'
import Contact from './pages/Contact'
import System from './pages/System'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import Admin from './pages/Admin'

export default function App() {
  const t = useT()
  const { user } = useAuth()
  const nav = [
    { to: '/', label: t.nav.home },
    { to: '/feed', label: t.nav.feed },
    { to: '/contact', label: t.nav.contact },
    { to: '/system', label: t.nav.system },
    { to: '/login', label: t.nav.login },
    { to: '/register', label: t.nav.register },
    { to: '/account', label: t.nav.account },
    // ลิงก์แอดมินโผล่เฉพาะคนที่มีสิทธิ์ (การคุมจริงอยู่ที่ route + backend)
    ...(user?.role === 'ADMIN' ? [{ to: '/admin', label: t.nav.admin }] : []),
  ]
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b">
        <nav className="mx-auto flex max-w-4xl items-center gap-6 px-4 py-3">
          <span className="font-mono text-sm font-semibold">feature-lab</span>
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? 'text-sm font-medium text-foreground'
                  : 'text-sm text-muted-foreground hover:text-foreground'
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="ml-auto flex items-center gap-1">
            <LangToggle />
            <ThemeToggle />
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-4xl flex-1 px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/system" element={<System />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="ADMIN">
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <footer className="border-t">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <ApiStatus />
        </div>
      </footer>
    </div>
  )
}
