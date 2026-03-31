import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/OrderSuccess.css';

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderData = location.state || null;

    useEffect(() => {
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
                <div className="status-left" style={{ textAlign: 'center' }}>
                    <h2>No Order Found</h2>
                    <p>Redirecting to your flavor journey...</p>
                </div>
            </div>
        );
    }

    const { items, total, otp, orderId, date, createdAt } = orderData;
    const displayDate = createdAt || date || new Date().toISOString();

    return (
        <div className="order-success-page">
            <div className="order-dashboard">
                
                {/* 🥗 LEFT COLUMN: LIVE STATUS */}
                <div className="status-left">
                    <div className="status-badge" style={{ 
                        backgroundColor: orderData.status === 'Delivered' ? '#e8f7f0' : '#fff4e5',
                        color: orderData.status === 'Delivered' ? '#2ecc71' : '#f39c12'
                    }}>
                        {orderData.status || 'Confirmed'}
                    </div>

                    <h2>{
                        orderData.status === 'Cooking' ? "Chef is hand-carving your meal!" :
                        orderData.status === 'On the way' ? "Your flavor is on the move!" :
                        orderData.status === 'Delivered' ? "Enjoy your legendary feast!" :
                        "Order Placed Successfully"
                    }</h2>

                    <p>{
                        orderData.status === 'Cooking' ? "Your order is in the kitchen being prepared with care." :
                        orderData.status === 'On the way' ? "Our delivery partner is heading your way." :
                        orderData.status === 'Delivered' ? "We hope you love every bite of your Foodz." :
                        "Thank you! Your meal journey has officially begun."
                    }</p>

                    {/* 📉 Status Tracker (Timeline) */}
                    <div className="order-tracker">
                        <div className={`tracker-step ${['Confirmed', 'Cooking', 'On the way', 'Delivered'].indexOf(orderData.status || 'Confirmed') >= 0 ? 'active' : ''}`}>
                            <div className="step-icon">✔</div>
                            <span className="step-label">Confirmed</span>
                        </div>
                        <div className="tracker-line"></div>
                        <div className={`tracker-step ${['Cooking', 'On the way', 'Delivered'].indexOf(orderData.status) >= 0 ? 'active' : ''}`}>
                            <div className="step-icon">🍳</div>
                            <span className="step-label">Cooking</span>
                        </div>
                        <div className="tracker-line"></div>
                        <div className={`tracker-step ${['On the way', 'Delivered'].indexOf(orderData.status) >= 0 ? 'active' : ''}`}>
                            <div className="step-icon">🚲</div>
                            <span className="step-label">On the way</span>
                        </div>
                        <div className="tracker-line"></div>
                        <div className={`tracker-step ${orderData.status === 'Delivered' ? 'active' : ''}`}>
                            <div className="step-icon">🏠</div>
                            <span className="step-label">Arrived</span>
                        </div>
                    </div>
                </div>

                {/* 🧾 RIGHT COLUMN: THE RECEIPT */}
                <div className="receipt-right">
                    <div className="receipt-header-mini">
                        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '800' }}>Order Receipt</h4>
                    </div>

                    <div className="receipt-info">
                        <div className="info-row">
                            <span className="info-label">Reference:</span>
                            <span className="info-value">#{orderId}</span>
                        </div>
                        <div className="info-row">
                            <span className="info-label">Date:</span>
                            <span className="info-value">{new Date(displayDate).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className="receipt-items">
                        <h5 style={{ marginBottom: '15px', color: '#888', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Flavor Journey</h5>
                        {items.map((item, idx) => (
                            <div key={idx} className="item-row">
                                <div className="item-details">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-qty">x{item.quantity || 1}</span>
                                </div>
                                <span className="item-price">₹{item.price.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="receipt-footer">
                        <div className="total-row">
                            <span className="total-label">Total Paid</span>
                            <span className="total-value">₹{total.toFixed(2)}</span>
                        </div>

                        {/* 🔑 Verification OTP */}
                        <div className="otp-box">
                            <span style={{ fontSize: '0.65rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '2px', display:'block', marginBottom: '5px' }}>Delivery OTP</span>
                            <div className="otp-code-mini">{otp}</div>
                        </div>

                        {/* 🔘 Actions */}
                        <div className="receipt-actions">
                            <button className="btn-dashboard-primary" onClick={() => navigate('/menu')}>Back to Menu</button>
                            <button className="btn-dashboard-secondary" onClick={() => window.print()}>Print</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderSuccess;
