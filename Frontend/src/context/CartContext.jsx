import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [voucher, setVoucher] = useState(null);

    // Initial load from local storage
    useEffect(() => {
        const storedCart = localStorage.getItem('cartItems');
        const storedVoucher = localStorage.getItem('cartVoucher');
        if (storedCart) {
            try { setCartItems(JSON.parse(storedCart)); } catch (e) { console.error("Failed to parse cart", e); }
        }
        if (storedVoucher) {
            try { setVoucher(JSON.parse(storedVoucher)); } catch (e) { console.error("Failed to parse voucher", e); }
        }
    }, []);

    // Sync to local storage on cart change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('cartVoucher', JSON.stringify(voucher));
    }, [cartItems, voucher]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1, extras: [] }];
        });
        setIsCartOpen(true);
    };

    const toggleExtra = (productId, extra) => {
        setCartItems((prev) => prev.map((item) => {
            if (item.id === productId) {
                const hasExtra = item.extras?.find(e => e.name === extra.name);
                const newExtras = hasExtra 
                    ? item.extras.filter(e => e.name !== extra.name)
                    : [...(item.extras || []), extra];
                return { ...item, extras: newExtras };
            }
            return item;
        }));
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, amount) => {
        setCartItems((prev) =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item
            )
        );
    };

    const clearCart = () => setCartItems([]);
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const applyVoucher = (newVoucher) => setVoucher(newVoucher);
    const removeVoucher = () => setVoucher(null);

    const cartSubtotal = cartItems.reduce((total, item) => {
        const extrasTotal = (item.extras || []).reduce((sum, extra) => sum + extra.price, 0);
        return total + ((item.price + extrasTotal) * item.quantity);
    }, 0);
    
    const cartTotal = Math.max(0, cartSubtotal - (voucher ? voucher.discount : 0));
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            toggleExtra,
            clearCart,
            isCartOpen,
            setIsCartOpen,
            toggleCart,
            cartSubtotal,
            cartTotal,
            cartCount,
            voucher,
            applyVoucher,
            removeVoucher
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
