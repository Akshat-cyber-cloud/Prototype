import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../apiConfig';
import '../styles/OrderHistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/orders/myorders`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message || "Failed to fetch orders");
                }

                const data = await response.json();
                setOrders(data);
            } catch (err) {
                console.error("Fetch Orders Error:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const viewReceipt = (order) => {
        // Prepare data in the format OrderSuccess expects
        const receiptData = {
            items: order.items,
            total: order.total,
            otp: order.otp,
            orderId: order.orderId,
            status: order.status, // Pass the current status
            date: new Date(order.createdAt).toLocaleString()
        };
        navigate('/order-success', { state: receiptData });
    };

    if (loading) {
        return (
            <div className="order-history-page">
                <div className="loading-spinner">✨ Preparing your history...</div>
            </div>
        );
    }

    return (
        <div className="order-history-page">
            <div className="order-history-container">
                <div className="history-header">
                    <h1>My Flavor Journey</h1>
                    <p>Relive your legendary feasts from the Foodz.</p>
                </div>

                {error && <div className="error-box">{error}</div>}

                {orders.length === 0 ? (
                    <div className="empty-history">
                        <div className="empty-icon">🍱</div>
                        <h3>No orders yet!</h3>
                        <p>Your culinary story begins with your first wrap.</p>
                        <button className="btn-browse" onClick={() => navigate('/menu')}>Start Ordering</button>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map((order) => (
                            <div key={order._id} className="order-summary-card">
                                <div className="card-top">
                                    <div className="order-meta">
                                        <span className="order-id">#{order.orderId.split('-')[1]}</span>
                                        <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </div>

                                <div className="card-body">
                                    <div className="dish-thumbnails">
                                        {order.items.slice(0, 3).map((item, i) => (
                                            <div key={i} className="mini-thumb">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                        ))}
                                        {order.items.length > 3 && (
                                            <div className="mini-thumb more">+{order.items.length - 3}</div>
                                        )}
                                    </div>
                                    <div className="order-pricing">
                                        <span className="p-label">Total Amount</span>
                                        <span className="p-amount">₹{order.total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="card-actions">
                                    <button className="btn-view-receipt" onClick={() => viewReceipt(order)}>
                                        View Receipt
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
