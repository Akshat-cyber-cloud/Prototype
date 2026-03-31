import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'
import useGeolocation from '../hooks/useGeolocation'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import CartIcon from '../assets/Menu Banners/shopping-bag.png'

const Navbar = () => {
    const { address, detectLocation, loading: locationLoading, error } = useGeolocation();
    const { cartCount, toggleCart } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to={user ? "/menu" : "/"} className="navbar-logo">
                    <span className="logo-text">FOODZ</span>
                    <span className="logo-dot">.</span>
                </Link>

                {/* Dynamic Location Display */}
                <div className="location-picker" onClick={detectLocation}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--primary)">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span className="location-text">
                        {locationLoading ? "Detecting..." : error ? <b>{error}</b> : address || "Select Location"}
                    </span>
                    {error && (
                        <span className="location-error" title={error} style={{ cursor: 'help' }}>
                            !
                        </span>
                    )}
                </div>
            </div>

            <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>

            <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
                <div className="mobile-menu-header">
                    <span className="logo-text" style={{ color: '#333' }}>FOODZ.</span>
                    <button className="close-menu-btn" onClick={() => setIsMobileMenuOpen(false)}>✕</button>
                </div>
                {!user && (
                    <li className="navbar-item" onClick={() => setIsMobileMenuOpen(false)}>
                        <Link to="/" className="navbar-link" data-text="Home">Home</Link>
                    </li>
                )}
                <li className="navbar-item" onClick={() => setIsMobileMenuOpen(false)}>
                    <Link to="/menu" className="navbar-link" data-text="Menu">Menu</Link>
                </li>
                {/* {user && (
                    <li className="navbar-item" onClick={() => setIsMobileMenuOpen(false)}>
                        <Link to="/profile" className="navbar-link" data-text="Profile">Profile</Link>
                    </li>
                )} */}
                {user && (
                    <li className="navbar-item" onClick={() => setIsMobileMenuOpen(false)}>
                        <Link to="/order-history" className="navbar-link" data-text="Orders">Orders</Link>
                    </li>
                )}
                <li className="navbar-item" onClick={() => setIsMobileMenuOpen(false)}>
                    <Link to="/contact" className="navbar-link" data-text="Contact">Contact</Link>
                </li>
                {/* Location picker moved to mobile drawer for small screens */}
                <li className="navbar-item mobile-only-item" onClick={() => { detectLocation(); setIsMobileMenuOpen(false); }}>
                    <div className="location-picker mobile-location">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--primary)"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                        <span className="location-text">{locationLoading ? "Detecting..." : error ? <b>{error}</b> : address || "Select Location"}</span>
                    </div>
                </li>
            </ul>

            <div className="navbar-actions">
                {/* Cart Icon PNG */}
                <button className="cart-icon-btn" onClick={toggleCart} style={{
                    background: 'none', border: 'none', cursor: 'pointer', position: 'relative',
                    marginRight: '20px', display: 'flex', alignItems: 'center'
                }}>
                    <img src={CartIcon} alt="Cart" style={{ width: '28px', height: '28px' }} />
                    {cartCount > 0 && (
                        <span className="cart-badge" style={{
                            position: 'absolute', top: '-5px', right: '-8px', background: '#ff5a1f',
                            color: 'white', borderRadius: '50%', minWidth: '18px', height: '18px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.65rem', fontWeight: 'bold', border: '2px solid #fff'
                        }}>
                            {cartCount}
                        </span>
                    )}
                </button>

                {user ? (
                    <Link to="/profile" className="login-link profile-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {user.avatar ? (
                            <img src={user.avatar} alt="P" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                        ) : (
                            <span className="profile-icon">👤</span>
                        )}
                        <span>{user.name.split(' ')[0]}</span>
                    </Link>
                ) : (
                    <Link to="/login" className="login-link">Login</Link>
                )}
                {!user && (
                    <button className="order-btn" onClick={() => navigate('/menu')}>Order Now</button>
                )}

                {/* Hamburger Icon */}
                <button className="hamburger-btn" onClick={() => setIsMobileMenuOpen(true)}>
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>
        </nav>
    )
}

export default Navbar