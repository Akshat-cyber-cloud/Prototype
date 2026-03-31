/**
 * 🛠️ Dynamic API Configuration
 * automatically switches between Localhost and Production (Render)
 */

const getBaseUrl = () => {
    const { hostname } = window.location;

    // 1️⃣ For Local Development
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:3000';
    }

    // 2️⃣ For Production (Render / Vercel)
    // Both deployments will talk to this central backend
    return 'https://prototype-ebca.onrender.com'; // Backend Base URL
};

export const API_BASE_URL = getBaseUrl();
