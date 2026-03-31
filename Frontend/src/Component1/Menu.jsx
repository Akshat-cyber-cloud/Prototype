import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ShwarmaImg from '../assets/shwarma_premium.png';
import RiceBowlImg from '../assets/rice_bowl_premium.png';
import PancakesImg from '../assets/pancakes_premium.png';
import WaffleImg from '../assets/waffle_premium.png';
import Banner1 from '../assets/Menu Banners/ss (1).png';
import Banner2 from '../assets/Menu Banners/ss2.png';
import Banner3 from '../assets/Menu Banners/ss3.png';
import '../styles/Menu.css';


const nicheItems = [
    { id: 1, name: 'MEAT', price: 100, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=150&q=80' },
    { id: 2, name: 'OVER BAKED SALAMON', price: 350, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=150&q=80' },
    { id: 3, name: 'TUNA FISH SALAD', price: 220, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=150&q=80' },
    { id: 4, name: 'CHICKEN SHWARMA', price: 180, image: ShwarmaImg },
    { id: 5, name: 'BERRY PANCAKES', price: 150, image: PancakesImg },
    { id: 6, name: 'Rice Bowl', price: 260, image: RiceBowlImg },
    { id: 7, name: 'Waffle', price: 140, image: WaffleImg }
];

const products = [
    {
        id: 1,
        name: 'Classic Chicken Shawarma',
        price: 10,
        originalPrice: 220,
        rating: '4.8K+',
        ratingNum: 4.8,
        category: 'CHICKEN SHWARMA',
        image: ShwarmaImg,
    },
    {
        id: 10,
        name: 'Traditional Beef Shawarma',
        price: 24,
        originalPrice: 290,
        rating: '3.9K+',
        ratingNum: 3.9,
        category: 'CHICKEN SHWARMA',
        image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 11,
        name: 'Crispy Falafel & Hummus Wrap',
        price: 160,
        originalPrice: 200,
        rating: '5.2K+',
        ratingNum: 5.2,
        category: 'CHICKEN SHWARMA',
        image: 'https://images.unsplash.com/photo-1547050605-2f2604e22e66?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 2,
        name: 'Royal Teriyaki Rice Bowl',
        price: 260,
        originalPrice: 320,
        rating: '3.2K+',
        ratingNum: 3.2,
        category: 'Rice Bowl',
        image: RiceBowlImg,
    },
    {
        id: 20,
        name: 'Sticky Tofu & Broccoli Bowl',
        price: 230,
        originalPrice: 280,
        rating: '4.1K+',
        ratingNum: 4.1,
        category: 'Rice Bowl',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 3,
        name: 'Biscoff Glaze Pancakes',
        price: 150,
        originalPrice: 190,
        rating: '5.1K+',
        ratingNum: 5.1,
        category: 'BERRY PANCAKES',
        image: PancakesImg,
    },
    {
        id: 30,
        name: 'Wild Blueberry Compote Pancakes',
        price: 170,
        originalPrice: 210,
        rating: '4.5K+',
        ratingNum: 4.5,
        category: 'BERRY PANCAKES',
        image: 'https://images.unsplash.com/photo-1506084868730-3a239f554e44?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 4,
        name: 'Belgian Nutella Waffle',
        price: 140,
        originalPrice: 180,
        rating: '2.9K+',
        ratingNum: 2.9,
        category: 'Waffle',
        image: WaffleImg,
    },
    {
        id: 40,
        name: 'Savory Fried Chicken & Waffle',
        price: 320,
        originalPrice: 380,
        rating: '4.7K+',
        ratingNum: 4.7,
        category: 'Waffle',
        image: 'https://images.unsplash.com/photo-1524350300060-d39f44712433?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 5,
        name: 'Premium Meat Medley',
        price: 250,
        originalPrice: 300,
        rating: '4.2K+',
        ratingNum: 4.2,
        category: 'MEAT',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 50,
        name: 'Hickory Smoked BBQ Ribs',
        price: 450,
        originalPrice: 520,
        rating: '4.9K+',
        ratingNum: 4.9,
        category: 'MEAT',
        image: 'https://images.unsplash.com/photo-1529193591184-b1d58b37ec1c?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 6,
        name: 'Over Baked Salmon Royale',
        price: 350,
        originalPrice: 420,
        rating: '4.9K+',
        ratingNum: 4.9,
        category: 'OVER BAKED SALAMON',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 60,
        name: 'Citrus Herb Grilled Salmon',
        price: 380,
        originalPrice: 450,
        rating: '4.3K+',
        ratingNum: 4.3,
        category: 'OVER BAKED SALAMON',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 7,
        name: 'Ocean Fresh Tuna Salad',
        price: 220,
        originalPrice: 280,
        rating: '3.7K+',
        ratingNum: 3.7,
        category: 'TUNA FISH SALAD',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 70,
        name: 'Mediterranean Ahi Tuna Bowl',
        price: 290,
        originalPrice: 340,
        rating: '4.1K+',
        ratingNum: 4.1,
        category: 'TUNA FISH SALAD',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    }
];

const Menu = () => {
    const [selectedNicheId, setSelectedNicheId] = useState(1); 
    const [activeTab, setActiveTab] = useState('Popular');
    const [addedId, setAddedId] = useState(null);
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const handleAddToCart = (product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });
        
        // UX Feedback
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 1500);
    };

    // Sorting Logic
    const sortedProducts = [...products].sort((a, b) => {
        if (activeTab === 'Popular') {
            return b.ratingNum - a.ratingNum; 
        } else {
            // Recent: Higher ID = newer
            return b.id - a.id;
        }
    });

    // Find the category name based on selected niche
    const selectedNicheName = nicheItems.find(n => n.id === selectedNicheId)?.name;

    return (
        <section className="menu-container">
            {/* Top Banner Section */}
            <div className="banner-section">
                <div className="banner-track">
                    {/* First Set */}
                    <div className="banner-card"><img src={Banner1} alt="Offer 1" /></div>
                    <div className="banner-card"><img src={Banner2} alt="Offer 2" /></div>
                    <div className="banner-card"><img src={Banner3} alt="Offer 3" /></div>
                    {/* Second Set (for seamless looping) */}
                    <div className="banner-card"><img src={Banner1} alt="Offer 1 clone" /></div>
                    <div className="banner-card"><img src={Banner2} alt="Offer 2 clone" /></div>
                    <div className="banner-card"><img src={Banner3} alt="Offer 3 clone" /></div>
                </div>
            </div>


            <div className="menu-main-wrapper">
                {/* Left Sidebar (Niche Items) */}
                <aside className="niche-sidebar">
                    {nicheItems.map((niche) => (
                        <div 
                            key={niche.id} 
                            className={`niche-capsule ${selectedNicheId === niche.id ? 'active' : ''}`}
                            onClick={() => setSelectedNicheId(niche.id)}
                        >
                            <div className="niche-img-box">
                                <img src={niche.image} alt={niche.name} />
                            </div>
                            <div className="niche-content">
                                <span className="niche-label">{niche.name}</span>
                                {/* <span className="niche-available">Category Available</span> */}
                            </div>
                        </div>
                    ))}
                </aside>

                {/* Right Side Grid */}
                <div className="menu-content-right">
                    <div className="menu-tabs">
                        <button 
                            className={`menu-tab ${activeTab === 'Popular' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Popular')}
                        >
                            Popular
                        </button>
                        <button 
                            className={`menu-tab ${activeTab === 'Recent' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Recent')}
                        >
                            Recent
                        </button>
                    </div>

                    <div className="products-grid">
                        {sortedProducts
                            .filter(p => p.category === selectedNicheName)
                            .map((product) => {
                            const favorited = isInWishlist(product.id);
                            return (
                                <div key={product.id} className="product-card">
                                    <div className="product-image-container">
                                        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
                                    </div>
                                    
                                    <div className="product-info">
                                        <h3>{product.name}</h3>
                                        <div className="product-meta">
                                            <div className="product-price">
                                                ₹{product.price}
                                                <span className="product-original-price">₹{product.originalPrice}</span>
                                            </div>
                                            <div className="product-rating">
                                                ★ <span>{product.rating}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="product-actions">
                                            <button 
                                                className={`btn-wishlist ${favorited ? 'active' : ''}`} 
                                                onClick={() => toggleWishlist(product.id)}
                                            >
                                                {favorited ? '❤️ Saved' : '🤍 Wishlist'}
                                            </button>
                                            <button 
                                                className={`btn-add-cart ${addedId === product.id ? 'added' : ''}`}
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                {addedId === product.id ? 'Added!' : 'Add to Cart'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Menu;
