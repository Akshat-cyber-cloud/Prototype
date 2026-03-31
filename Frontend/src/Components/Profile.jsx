import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../apiConfig'; // Added: Centralized API config
import '../styles/Profile.css';

const Profile = () => {
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        avatar: ''
    });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });

                const data = await response.json();

                if (response.ok) {
                    setFormData({
                        name: data.name || '',
                        email: data.email || '',
                        phone: data.phone || '',
                        address: data.address || '',
                        gender: data.gender || '',
                        avatar: data.avatar || ''
                    });
                } else {
                    setError(data.message || 'Failed to fetch profile');
                }
            } catch (err) {
                setError('Server error, please try again later');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Profile updated successfully!');
                // Update global auth state
                login({ ...user, name: data.name, email: data.email, avatar: data.avatar });
            } else {
                setError(data.message || 'Update failed');
            }
        } catch (err) {
            setError('Server error, please try again later');
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    if (loading) return <div className="loading">Loading Profile...</div>;

    return (
        <div className="profile-container">
            <button className="close-profile-btn" onClick={() => navigate('/')}>✕</button>
            <div className="profile-header">
                <img 
                    src={formData.avatar || "https://www.w3schools.com/howto/img_avatar.png"} 
                    alt="Avatar" 
                    className="profile-avatar" 
                />
                <div className="profile-info">
                    <h1>{formData.name}</h1>
                    <p>{formData.email}</p>
                </div>
            </div>

            {message && <div className="success-message" style={{ color: '#4caf50', fontWeight: 600 }}>{message}</div>}
            {error && <div className="error-message" style={{ color: '#ff4d4d', fontWeight: 600 }}>{error}</div>}

            <form className="profile-form" onSubmit={handleSave}>
                <div className="input-group">
                    <label>Full Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label>Email Address</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        disabled 
                    />
                </div>
                <div className="input-group">
                    <label>Phone Number</label>
                    <input 
                        type="text" 
                        name="phone" 
                        placeholder="+1 234 567 890"
                        value={formData.phone} 
                        onChange={handleChange} 
                    />
                </div>
                <div className="input-group">
                    <label>Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                </div>
                <div className="input-group full-width">
                    <label>Delivery Address</label>
                    <textarea 
                        name="address" 
                        rows="3" 
                        placeholder="Enter your detailed delivery address..."
                        value={formData.address} 
                        onChange={handleChange}
                        style={{ padding: '12px', borderRadius: '12px', border: '1.5px solid #e0e0e0', width: '100%' }}
                    ></textarea>
                </div>

                <div className="profile-actions" style={{ width: '100%', gridColumn: 'span 2' }}>
                    <button type="submit" className="save-btn">Save Profile Updates</button>
                    <button type="button" onClick={handleLogout} className="logout-btn">Log Out</button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
