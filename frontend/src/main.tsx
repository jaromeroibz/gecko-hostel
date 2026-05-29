import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import { SelectedExtrasProvider } from './context/SelectedExtrasContext'
import './i18n'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <SelectedExtrasProvider>
          <App />
        </SelectedExtrasProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
