import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = async () => {
        setUser(null);
        localStorage.removeItem('user');
        // Clear HttpOnly cookie via Backend API if route exists
        try {
            await fetch('http://localhost:3000/api/auth/logout', { 
                method: 'POST', 
                credentials: 'include' 
            });
        } catch (e) {
            console.error("Logout failed:", e);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
