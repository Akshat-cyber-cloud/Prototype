import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Footer.css';

const Footer = () => {
    const { user } = useAuth();
    return (
        <footer className="main-footer">
            <div className="footer-top">
                <div className="footer-brand-section">
                    <Link to={user ? "/menu" : "/"} className="footer-logo">
                        <span className="logo-text">FOODZ</span>
                        <span className="logo-dot">.</span>
                    </Link>
                    <div className="footer-main-links">
                        <Link to="/about">About</Link>
                        <Link to="/menu">Menu</Link>
                        <Link to="/catering">Catering</Link>
                        <Link to="/nutrition">Nutrition</Link>
                        <Link to="/locations">Locations</Link>
                        <Link to="/contact">Customer care</Link>
                    </div>
                </div>

                <div className="footer-newsletter">
                    <h3 className="newsletter-title">Get the freshest FOODZ. news</h3>
                    <div className="newsletter-input-group">
                        <input type="email" placeholder="Your email here" className="newsletter-input" />
                        <button className="newsletter-btn">Subscribe</button>
                    </div>
                    <label className="newsletter-agreement">
                        <input type="checkbox" />
                        <span>By checking the box, you agree that you are at least 16 years of age.</span>
                    </label>
                </div>
            </div>

            <div className="footer-divider"></div>

            <div className="footer-bottom">
                <div className="footer-legal">
                    <Link to="/terms">Terms & Conditions</Link>
                    <span className="separator">|</span>
                    <Link to="/privacy">Privacy Policy</Link>
                    <span className="separator">|</span>
                    <Link to="/accessibility">Accessibility Statement</Link>
                    <span className="separator">|</span>
                    <Link to="/supply-chain">Sourcing Standards</Link>
                    <span className="separator">|</span>
                    <Link to="/conduct">Supplier Code of Conduct</Link>
                </div>
                
                <div className="footer-social-copyright">
                    <p className="copyright-text">©2026 FOODZ, LLC. All Rights Reserved.</p>
                    <div className="social-icons">
                        <a href="#" className="social-icon">Twitter</a>
                        <a href="#" className="social-icon">YouTube</a>
                        <a href="#" className="social-icon">Facebook</a>
                        <a href="#" className="social-icon">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
