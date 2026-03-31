import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../apiConfig';
import '../styles/Login.css';
import LoginBg from '../assets/LoginBg.png';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const endpoint = isLogin ? 'login' : 'register';
        const url = `${API_BASE_URL}/api/auth/${endpoint}`; // Dynamic URL

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include' // Allow cookies
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Success: Update global Auth State
            login({ name: data.name, email: data.email });

            // Redirect to previous intended page (like Cart) or Menu
            const from = location.state?.from || '/menu';
            navigate(from);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${API_BASE_URL}/api/auth/google`; // Dynamic OAuth URL
    };

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

                    {error && <div className="error-message" style={{ color: '#ff4d4d', marginBottom: '20px', fontWeight: 600 }}>{error}</div>}

                    <form className="auth-form" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="input-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="input-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {isLogin && (
                            <div className="form-options">
                                <label className="remember-me">
                                    <input type="checkbox" /> Remember me
                                </label>
                                <a href="#forgot" className="forgot-link">Forgot Password?</a>
                            </div>
                        )}

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
                        </button>
                    </form>

                    <div className="auth-divider">OR</div>

                    <button className="google-btn" onClick={handleGoogleLogin}>
                        <img 
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                            alt="Google" 
                            className="google-icon" 
                        />
                        {isLogin ? "Continue with Google" : "Sign up with Google"}
                    </button>

                    <div className="card-footer">
                        <p>
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                className="toggle-btn"
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError('');
                                }}
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
