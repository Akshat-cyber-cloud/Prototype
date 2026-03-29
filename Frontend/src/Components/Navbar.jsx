import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'
import useGeolocation from '../hooks/useGeolocation'

const Navbar = () => {
  const { address, detectLocation, loading, error } = useGeolocation();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">FOODZ</span>
          <span className="logo-dot">.</span>
        </Link>
        
        {/* Dynamic Location Display */}
        <div className="location-picker" onClick={detectLocation}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--primary)">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <span className="location-text">
            {loading ? "Detecting..." : error ? <b>{error}</b> : address || "Select Location"}
          </span>
          {error && (
            <span className="location-error" title={error} style={{ cursor: 'help' }}>
              !
            </span>
          )}
        </div>
      </div>
      
      <ul className="navbar-links">
        <li className="navbar-item">
          <a href="#home" className="navbar-link" data-text="Home">Home</a>
        </li>
        <li className="navbar-item">
          <a href="#menu" className="navbar-link" data-text="Menu">Menu</a>
        </li>
        <li className="navbar-item">
          <a href="#about" className="navbar-link" data-text="About">About</a>
        </li>
        <li className="navbar-item">
          <a href="#contact" className="navbar-link" data-text="Contact">Contact</a>
        </li>
      </ul>

      <div className="navbar-actions">
        <Link to="/login" className="login-link">Login</Link>
        <button className="order-btn" onClick={() => window.location.href = '#order'}>Order Now</button>
      </div>
    </nav>
  )
}

export default Navbar