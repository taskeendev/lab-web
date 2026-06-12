import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import { AuthProvider } from './auth'
import { LangProvider } from './i18n'
import { PresenceProvider } from './presence'
import { ThemeProvider } from './theme'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LangProvider>
        <AuthProvider>
          <PresenceProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PresenceProvider>
        </AuthProvider>
      </LangProvider>
    </ThemeProvider>
  </StrictMode>,
)
