import React from 'react';
import '../styles/LoadingScreen.css';

const LoadingScreen = ({ message = "Preparing your feast..." }) => {
    return (
        <div className="loading-screen-container premium-dark">
            <div className="loading-content">
                <div className="orbit-wrapper">
                    <div className="loading-logo">
                        <span className="logo-letter">F</span>
                        <span className="logo-letter logo-o">O</span>
                        <span className="logo-letter logo-o">O</span>
                        <span className="logo-letter">D</span>
                        <span className="logo-letter">Z</span>
                        <span className="logo-dot">.</span>
                    </div>
                </div>
                <p className="loading-message">{message}</p>
            </div>
            <div className="aurora-bg"></div>
        </div>
    );
};

export default LoadingScreen;
