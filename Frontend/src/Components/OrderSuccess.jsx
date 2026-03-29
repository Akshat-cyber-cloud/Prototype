import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/OrderSuccess.css';

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderData = location.state || null;

    useEffect(() => {
        // If no order data in state (e.g., refresh), redirect to menu
        if (!orderData) {
            const timer = setTimeout(() => {
                navigate('/menu');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [orderData, navigate]);

    if (!orderData) {
        return (
            <div className="order-success-page">
                <div className="receipt-card" style={{ padding: '40px', textAlign: 'center' }}>
                    <h2>No Order Found</h2>
                    <p>Redirecting to menu...</p>
                </div>
            </div>
        );
    }

    const { items, total, otp, orderId, date } = orderData;

    return (
        <div className="order-success-page">
            <div className="receipt-card">
                {/* 🎯 Header: Success Icon */}
                <div className="receipt-header">
                    <div className="success-icon-wrapper">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2>Order Placed Successfully</h2>
                    <p>Thank you! Your delicious meal is being prepared.</p>
                </div>

                {/* 📄 Info Section: Bill Details */}
                <div className="receipt-info">
                    <div className="info-row">
                        <span className="info-label">Order Number:</span>
                        <span className="info-value">{orderId}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Date and Time:</span>
                        <span className="info-value">{date}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Status:</span>
                        <span className="info-value" style={{ color: '#2ecc71' }}>PAID</span>
                    </div>
                </div>

                {/* 🍱 Items Section: Dishes List */}
                <div className="receipt-items">
                    {items.map((item, idx) => (
                        <div key={idx} className="item-row">
                            <div className="item-details">
                                <span className="item-name">{item.name}</span>
                                <span className="item-qty">Qty: {item.quantity || 1}</span>
                            </div>
                            <span className="item-price">₹{item.price.toFixed(2)}</span>
                        </div>
                    ))}
                    
                    <div className="info-row" style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                        <span className="info-label" style={{ fontWeight: '700', color: '#1a1a1a' }}>Total Paid:</span>
                        <span className="info-value" style={{ fontSize: '1.2rem', color: '#1a1a1a' }}>₹{total.toFixed(2)}</span>
                    </div>
                </div>

                {/* 💳 Payment Method Box */}
                <div className="payment-method-box">
                    <div className="payment-logo">
                        RAZORPAY
                    </div>
                    <div className="payment-details">
                        Secure Digital Payment<br/>
                        Transaction: #TXN_{Math.floor(Math.random() * 1000000)}
                    </div>
                </div>

                {/* 🔑 OTP Section: Verification Code */}
                <div className="otp-section">
                    <span className="otp-label">Verification OTP</span>
                    <div className="otp-code">{otp}</div>
                    <p style={{fontSize: '0.8rem', color: '#888'}}>Share this code with the delivery person </p>
                </div>

                {/* 🔘 Footer Actions */}
                <div className="receipt-actions">
                    <button className="btn-receipt-primary" onClick={() => navigate('/menu')}>Back to Menu</button>
                    <button className="btn-receipt-secondary" onClick={() => window.print()}>Print</button>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
