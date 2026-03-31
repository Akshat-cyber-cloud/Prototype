/**
 * 🛠️ Dynamic API Configuration
 * automatically switches between Localhost and Production (Render)
 */

const getBaseUrl = () => {
    const { hostname } = window.location;

    // 🌐 Production URL (Render)
    const productionBackend = 'https://prototype-ebca.onrender.com';

    // 1️⃣ For Local Development (Fallback to Localhost)
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        // Change to productionBackend if you want to test against the live DB locally
        return 'http://localhost:3000';
    }

    // 2️⃣ For Deployed Environments (Vercel)
    return productionBackend;
};

export const API_BASE_URL = getBaseUrl();
