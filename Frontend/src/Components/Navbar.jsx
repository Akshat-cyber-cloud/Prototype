import React from 'react'
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-text">FOODZ</span>
        <span className="logo-dot">.</span>
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
        <button className="order-btn">Order Now</button>
      </div>
    </nav>
  )
}

export default Navbar