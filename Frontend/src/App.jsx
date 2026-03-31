import React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Login from './Components/Login' 
import Profile from './Components/Profile'
import Welcome from './Components/Welcome'
import Menu from './Component1/Menu'
import CartSidebar from './Components/CartSidebar'
import Checkout from './Components/Checkout'
import OrderSuccess from './Components/OrderSuccess'
import OrderHistory from './Components/OrderHistory'
import Contact from './Components/Contact'
import Footer from './Components/Footer'
import { useAuth } from './context/AuthContext'
import LoadingScreen from './Components/LoadingScreen'
import './index.css'

const App = () => {
  const location = useLocation();
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingScreen message="Welcome to Foodz..." />;
  
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
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/welcome" element={<Navigate to="/menu" replace />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </div>
  )
}



export default App