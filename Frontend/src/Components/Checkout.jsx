import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Checkout.css';

const Checkout = () => {
    const { cartItems, cartSubtotal, voucher, cartTotal, clearCart, applyVoucher, removeVoucher } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Default states
    const [address, setAddress] = useState("Rumah Kedua (+6281234567899)\nJalan Bunga No 7, RT 02 RW 01\nKOTA BARU\nJAWA BARAT\nINDONESIA, 12345");
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('razorpay');
    const [shippingOption, setShippingOption] = useState("Standard"); // Standard vs Express
    
    // Calculate values
    const shippingFee = shippingOption === "Express" ? 150 : 50;
    const finalPayment = Math.max(0, cartSubtotal + shippingFee - (voucher ? voucher.discount : 0));

    const handlePlaceOrder = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        // 🏗️ Generate Order Metadata
        const orderId = `BILL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit secure OTP
        const dateString = new Date().toLocaleString();
        
        // Finalize order summary for the receipt
        const finalOrder = {
            items: cartItems.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity || 1,
                image: item.image
            })),
            total: finalPayment,
            otp: otp,
            orderId: orderId,
            date: dateString
        };

        try {
            // 💾 Save Order to Database
            const response = await fetch('http://localhost:3000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalOrder),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to save order");
            }

            // Clear cart and redirect to the Receipt page
            clearCart();
            navigate('/order-success', { state: finalOrder });
        } catch (error) {
            console.error("Order Creation Error:", error.message);
            alert("Oops! There was a problem saving your order. Please try again.");
        }
    };



    const toggleShipping = () => {
        setShippingOption(prev => prev === "Standard" ? "Express" : "Standard");
    };

    const toggleVoucher = () => {
        if (voucher) {
            removeVoucher();
        } else {
            applyVoucher({ code: 'OFF50', discount: 50 });
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="checkout-page">
                <div className="checkout-container" style={{textAlign: 'center', justifyContent: 'center'}}>
                    <h2>Cart is now empty!</h2>
                    <p style={{marginBottom: '20px', color: '#666'}}>Your order has been processed or your cart was cleared.</p>
                    <button className="btn-place-order" onClick={() => navigate('/menu')}>Back to Menu</button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                {/* Header */}
                <div className="checkout-header">
                    <button className="checkout-back" onClick={() => navigate(-1)}>‹</button>
                    <h2>Checkout</h2>
                </div>

                {/* Address Card */}
                <div className="checkout-card">
                    <div className="address-header">
                        <div className="address-title">
                            <span>📍</span> Address
                        </div>
                        <button className="btn-edit" onClick={() => setIsEditingAddress(!isEditingAddress)}>
                            {isEditingAddress ? 'Save' : '✎ Edit'}
                        </button>
                    </div>
                    <div className="address-content">
                        {isEditingAddress ? (
                            <textarea 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                style={{
                                    width: '100%', minHeight: '80px', padding: '10px', 
                                    borderRadius: '8px', border: '1px solid #ddd',
                                    fontFamily: 'inherit', fontSize: '0.95rem'
                                }}
                            />
                        ) : (
                            // Split by newline and render paragraphs
                            address.split('\n').map((line, i) => <p key={i}>{line}</p>)
                        )}
                    </div>
                </div>

                {/* Shipping Row */}
                <div className="checkout-row" onClick={toggleShipping}>
                    <div className="row-left">
                        <span>🚚</span> Shipping Options
                    </div>
                    <div className="row-right">
                        <span style={{ fontWeight: '600' }}>{shippingOption} (+₹{shippingFee})</span>
                        <span className="row-arrow" style={{ transform: 'rotate(90deg)', display: 'inline-block', marginLeft: '5px' }}>›</span>
                    </div>
                </div>

                {/* Voucher Row */}
                <div className="checkout-row" onClick={toggleVoucher}>
                    <div className="row-left">
                        <span style={{color: '#eab54d'}}>🎟️</span> 
                        {voucher ? `Voucher Applied` : `Add Voucher`}
                    </div>
                    <div className="row-right">
                        {voucher ? (
                            <span style={{color: '#27ae60', fontWeight: 'bold'}}>-₹{voucher.discount}</span>
                        ) : (
                            <span style={{ color: '#999' }}>Apply Promo</span>
                        )}
                        <span className="row-arrow"> ›</span>
                    </div>
                </div>

                {/* Payments Section */}
                <div className="payment-section">
                    <div className="payment-header">
                        <h3>Payment Methods</h3>
                    </div>
                    <div className="payment-options">
                        <div 
                            className="payment-option active"
                            style={{ cursor: 'default' }}
                        >
                            <div className="payment-left">
                                <span style={{color: '#3395ff', fontSize: '1.2rem', fontWeight:'900'}}>R</span> 
                                <span style={{ marginLeft: '10px' }}>Razorpay Secure</span>
                            </div>
                            <div className="radio-circle">
                                <div className="radio-inner" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3498db' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="checkout-summary">
                    <div className="checkout-summary-row">
                        <span>Subtotal</span>
                        <span>₹{cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="checkout-summary-row">
                        <span>Shipping ({shippingOption})</span>
                        <span>₹{shippingFee.toFixed(2)}</span>
                    </div>
                    {voucher && (
                        <div className="checkout-summary-row discount">
                            <span>Voucher Applied</span>
                            <span>-₹{voucher.discount.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="checkout-summary-row total">
                        <span>TOTAL PAYMENT</span>
                        <span>₹{finalPayment.toFixed(2)}</span>
                    </div>
                    
                    <button className="btn-place-order" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Checkout;
