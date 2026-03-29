import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    // Initial load from local storage
    useEffect(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            try {
                setWishlist(JSON.parse(storedWishlist));
            } catch (e) {
                console.error("Failed to parse wishlist", e);
            }
        }
    }, []);

    // Sync to local storage on wishlist change
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (productId) => {
        setWishlist((prev) => {
            const isItemInWishlist = prev.includes(productId);
            if (isItemInWishlist) {
                return prev.filter((id) => id !== productId);
            }
            return [...prev, productId];
        });
    };

    const isInWishlist = (productId) => wishlist.includes(productId);

    return (
        <WishlistContext.Provider value={{
            wishlist,
            toggleWishlist,
            isInWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
