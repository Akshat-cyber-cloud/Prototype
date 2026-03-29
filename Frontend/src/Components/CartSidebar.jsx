import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import DeleteIcon from '../assets/DeleteIcon.svg';
import '../styles/CartSidebar.css';

const CartSidebar = () => {
    const { 
        cartItems, 
        isCartOpen, 
        toggleCart, 
        cartTotal,
        cartSubtotal,
        cartCount,
        removeFromCart, 
        updateQuantity,
        toggleExtra,
        voucher,
        applyVoucher,
        removeVoucher
    } = useCart();
    
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!user) {
            toggleCart();
            navigate('/login', { state: { from: '/checkout' } });
        } else {
            toggleCart();
            navigate('/checkout');
        }
    };

    const handleVoucherClick = () => {
        if (voucher) {
            removeVoucher();
        } else {
            // Apply a dummy voucher for prototype
            applyVoucher({ code: 'WELCOME50', discount: 50 });
        }
    };

    if (!isCartOpen) return null;

    return (
        <>
            <div className="cart-overlay" onClick={toggleCart}></div>
            <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <button className="back-cart" onClick={toggleCart}>‹</button>
                    <h2>My Cart</h2>
                    <div className="cart-header-spacer"></div>
                </div>

                <div className="cart-items-wrapper">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <p>Your cart is empty.</p>
                            <button className="btn-continue" onClick={toggleCart}>Continue Browsing</button>
                        </div>
                    ) : (
                        cartItems.map(item => {
                            const hasCheese = item.extras?.find(e => e.name === 'Extra Cheese');
                            const itemBasePrice = item.price;
                            const itemPriceShowing = hasCheese ? itemBasePrice + 50 : itemBasePrice;

                            return (
                                <div key={item.id} className="cart-card">
                                    <button className="cart-card-remove" onClick={() => removeFromCart(item.id)}>
                                        <img src={DeleteIcon} alt="Remove" />
                                    </button>
                                    
                                    <div className="cart-card-main">
                                        <div className="cart-card-img-box">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="cart-card-details">
                                            <h4>{item.name}</h4>
                                            <p className="cart-card-vol">{item.category}</p>
                                            <div className="cart-card-price-row">
                                                <span className="cart-item-price">₹{itemBasePrice}</span>
                                            </div>
                                            <div className="cart-card-controls">
                                                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Extras Toggle */}
                                    <div className="cart-card-extras">
                                        <label className="extra-checkbox">
                                            <input 
                                                type="checkbox" 
                                                checked={!!hasCheese} 
                                                onChange={() => toggleExtra(item.id, {name: 'Extra Cheese', price: 50})} 
                                            />
                                            <span className="checkmark"></span>
                                            Add Extra Cheese (+₹50)
                                        </label>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer-wrapper">
                        {/* Vouchers Section */}
                        <div className="voucher-section" onClick={handleVoucherClick}>
                            <div className="voucher-left">
                                <span className="voucher-icon">🎟️</span>
                                {voucher ? <span className="voucher-text applied">Voucher Applied (-₹{voucher.discount})</span> : <span className="voucher-text">See All Vouchers</span>}
                            </div>
                            <span className="voucher-arrow">›</span>
                        </div>

                        {/* Summary Section */}
                        <div className="cart-summary">
                            <div className="summary-row">
                                <span>Product</span>
                                <span>{cartCount} items</span>
                            </div>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{cartSubtotal.toFixed(2)}</span>
                            </div>
                            {voucher && (
                                <div className="summary-row discount-row">
                                    <span>Discount</span>
                                    <span>-₹{voucher.discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="summary-row total-row">
                                <span>TOTAL</span>
                                <span>₹{cartTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="btn-checkout-primary" onClick={handleCheckout}>
                            {user ? 'Checkout' : 'Checkout Login'}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartSidebar;
