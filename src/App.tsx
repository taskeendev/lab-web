import { NavLink, Route, Routes } from 'react-router'
import ThemeToggle from './components/ThemeToggle'
import Home from './pages/Home'
import System from './pages/System'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/system', label: 'System' },
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' },
  { to: '/account', label: 'Account' },
]

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/system" element={<System />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
    </div>
  )
}
