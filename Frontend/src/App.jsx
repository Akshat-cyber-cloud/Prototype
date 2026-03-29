import React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Login from './Components/Login' // We will create this next
import Welcome from './Components/Welcome'
import Menu from './Component1/Menu'
import CartSidebar from './Components/CartSidebar'
import Checkout from './Components/Checkout'
import OrderSuccess from './Components/OrderSuccess'
import OrderHistory from './Components/OrderHistory'
import { useAuth } from './context/AuthContext'
import './index.css'

const App = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app-container">
      {!isLoginPage && <Navbar />}
      <CartSidebar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/menu" replace /> : <Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/welcome" element={<Navigate to="/menu" replace />} />
      </Routes>
    </div>
  )
}



export default App