import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    // We can pull the user name from localStorage if we saved it in Login.jsx
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'Guest' };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#ffffff',
            color: '#2d3436',
            fontFamily: "'Outfit', sans-serif"
        }}>
            <h1 style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.6 }}>
                hello {user.name.toLowerCase()}
            </h1>
            <Link to="/" style={{ 
                marginTop: '20px', 
                fontSize: '0.8rem', 
                color: '#ff5a1f', 
                textDecoration: 'none',
                fontWeight: 600
            }}>
                back to home
            </Link>
        </div>
    );
};

export default Welcome;
