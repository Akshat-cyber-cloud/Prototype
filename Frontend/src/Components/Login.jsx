import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import LoginBg from '../assets/LoginBg.png';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="login-container">
            {/* Cinematic Background Image */}
            <div className="login-bg">
                <img src={LoginBg} alt="Background" />
                <div className="bg-overlay"></div>
            </div>

            {/* Right-Aligned Form Card */}
            <div className="form-wrapper">
                <div className="login-card">
                    {/* Close Button */}
                    <Link to="/" className="close-btn">✕</Link>

                    <div className="card-header">
                        <h2>{isLogin ? "Welcome Back" : "Join the Foodz"}</h2>
                        <p>{isLogin ? "Sign in to continue your feast" : "Start your culinary journey with us"}</p>
                    </div>

                    <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                        {!isLogin && (
                            <div className="input-group">
                                <label>Full Name</label>
                                <input type="text" placeholder="John Doe" required />
                            </div>
                        )}
                        <div className="input-group">
                            <label>Email Address</label>
                            <input type="email" placeholder="john@example.com" required />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input type="password" placeholder="••••••••" required />
                        </div>

                        {isLogin && (
                            <div className="form-options">
                                <label className="remember-me">
                                    <input type="checkbox" /> Remember me
                                </label>
                                <a href="#forgot" className="forgot-link">Forgot Password?</a>
                            </div>
                        )}

                        <button type="submit" className="submit-btn">
                            {isLogin ? "Sign In" : "Create Account"}
                        </button>
                    </form>

                    <div className="card-footer">
                        <p>
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button 
                                className="toggle-btn" 
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                {isLogin ? "Sign Up" : "Sign In"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
