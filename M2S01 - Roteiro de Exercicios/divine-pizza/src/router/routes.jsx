import { Routes, Route } from 'react-router-dom'

import { Home, DivineMenu, Orders, Kitchen } from '@pages'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/menu" element={<DivineMenu />} />
      <Route path="/kitchen" element={<Kitchen />} />
    </Routes>
  )
}
