// main.tsx atau index.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Provider } from 'react-redux'

import App from './App.tsx'
import Store from './Store/Store.tsx'
import About from './About/About.tsx'
import StoreSwitcher from './Store/StoreSwitcher.tsx' // 👈 komponen yang akan dibuat
import AdminApp from './Admin/main.tsx'
import DashboardAdmin from './Admin/Dashboard.tsx'
import AdminSwitcher from './Admin/AdminSwitcher.tsx'
import {configureStore} from '@reduxjs/toolkit'
import { HalamanTempatAdmin } from './Admin/AdminState/Halaman.tsx'

const store = configureStore({
  reducer:{
    namahalamanadmin: HalamanTempatAdmin.reducer
  }
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='store' element={<Store />}>
          <Route index element={<StoreSwitcher />} />
          <Route path=':id_Store' element={<StoreSwitcher />} />
        </Route>
        <Route path='about' element={<About />} />
        <Route path='admin' element={<AdminApp/>}>
          <Route index element={<DashboardAdmin/>}/>
          <Route path=':adminpage' element={<AdminSwitcher />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>
)
