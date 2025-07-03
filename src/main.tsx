// main.tsx atau index.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'

import App from './App.tsx'
import Store from './Store/Store.tsx'
import About from './About/About.tsx'
import StoreSwitcher from './Store/StoreSwitcher.tsx' // 👈 komponen yang akan dibuat

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='store' element={<Store />}>
          <Route index element={<StoreSwitcher />} />
          <Route path=':id_Store' element={<StoreSwitcher />} />
        </Route>
        <Route path='about' element={<About />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
