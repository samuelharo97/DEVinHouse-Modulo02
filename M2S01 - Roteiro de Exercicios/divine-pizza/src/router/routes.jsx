import { Routes, Route } from 'react-router-dom'

import { Home, DivineMenu, Orders } from '@pages'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/menu" element={<DivineMenu />} />
    </Routes>
  )
}
