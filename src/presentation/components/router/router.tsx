import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MakeLogin } from '@/main/factories/pages/login/login-factory'

const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<MakeLogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
