import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './MenuShowcase.css';

/**
 * MenuShowcase Component - Redefined for Shawarma
 * Replicates a restaurant UI with shawarma categories, a dark promotional section, and features.
 */
const MenuShowcase = () => {
    // Scroll animation logic
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const menuItems = [
        {
            category: 'Shawarma',
            title: 'Shawarma',
            subtitle: 'A shawarma is a flavorful Middle Eastern wrap made with slow-roasted meat, fresh veggies, and creamy sauces.',
            img: 'swarma1.png',
            isBestseller: true
        },
        {
            category: 'Rice Bowl',
            title: 'Rice Bowl',
            subtitle: 'A signature blend of text and bold spices, uniquely crafted for the bold.',
            img: 'ricebowl.png'
        },
        {
            category: 'Waffle',
            title: 'Waffle',
            subtitle: 'A waffle is a crispy, golden dessert with a soft inside, often topped with syrup, fruits, or cream.',
            img: 'waffle.png'
        },
        {
            category: 'Pancakes',
            title: 'Pancakes',
            subtitle: 'A pancake is a soft, fluffy flat cake served warm and often topped with syrup, butter, or fruits.',
            img: 'panckae.png',
            isBestseller: true
        }
    ];

    const features = [
        {
            title: 'CHEF\'S HAND-CARVED',
            desc: 'Every slice of our signature meat is hand-carved with precision, ensuring the perfect balance of juices and crispy edges.',
            icon: (
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="#E67E22" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17a1 1 0 0 1 2 0c0 .5-.34 1.53-.5 2h-1c-.17-.47-.5-1.5-.5-2Z" /><path d="M15 17a1 1 0 0 1 2 0c0 .5-.34 1.53-.5 2h-1c-.17-.47-.5-1.5-.5-2Z" /><path d="M7 17a1 1 0 0 1 2 0c0 .5-.34 1.53-.5 2h-1c-.17-.47-.5-1.5-.5-2Z" /><path d="M9 11V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5" /><rect x="2" y="11" width="20" height="10" rx="2" /></svg>
            )
        },
        {
            title: 'SECRET SPICE DNA',
            desc: "Our legendary spice blend is a 20-year obsession. A flavor profile so unique, it's our signature fingerprint in every bite.",
            icon: (
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="#E67E22" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14"/><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 19.07 7.76 16.24"/><path d="m16.24 7.76 2.83-2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="m4.93 4.93 2.83 2.83"/><path d="m16.24 16.24 2.83 2.83"/></svg>
            )
        },
        {
            title: '30-MIN HOT CHALLENGE',
            desc: 'We promise piping hot delivery within 30 minutes of carving, or your next legendary wrap is on the house.',
            icon: (
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="#E67E22" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            )
        }
    ];

    const testimonials = [
        {
            name: "Karan S.",
            role: "Verified Foodie",
            content: "Authentic spices, perfectly charred meat, and that garlic sauce... absolute perfection. Best shawarma in the city!",
            rating: 5,
            time: "2 days ago"
        },
        {
            name: "Sneha M.",
            role: "Sweet Tooth",
            content: "The loaded waffles are heavenly. Still warm and crispy when they arrived. My new weekend ritual!",
            rating: 5,
            time: "1 week ago"
        },
        {
            name: "Rahul K.",
            role: "Daily Diner",
            content: "I took the 30-min challenge and they blew my mind. 22 mins from order to door. Legends!",
            rating: 5,
            time: "3 days ago"
        },
        {
            name: "Priya V.",
            role: "Gourmet Lover",
            content: "The Rice Bowls are a lifesaver for busy office lunches. Healthy, filling, and so flavorful.",
            rating: 5,
            time: "5 days ago"
        }
    ];


    return (
        <section
            ref={containerRef}
            className={`menu-showcase-container ${isVisible ? 'fade-in-active' : ''}`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease'
            }}
        >
            {/* 1️⃣ Shawarma Menu Section */}
            <div className="menu-section">
                <h2 className="menu-title">OUR CUISINE</h2>
                <div className="menu-grid">
                    {menuItems.map((item, idx) => (
                        <div key={idx} className={`category-card card-${item.category}`}>
                            {item.isBestseller && (
                                <div className="bestseller-badge">🔥 BESTSELLER</div>
                            )}
                            <div className="card-image-box">
                                <img src={item.img} alt={item.title} loading="lazy" />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{item.title}</h3>
                                <p className="card-subtitle">{item.subtitle}</p>
                                <button 
                                    className="card-btn" 
                                    style={{ backgroundColor: 'var(--shawarma)', cursor: 'pointer' }}
                                    onClick={() => navigate('/menu')}
                                >
                                    Satisfy Your Craving
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2️⃣ Dark Promotional Section */}
            <div className="promo-section" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(230, 126, 34, 0.1), transparent)' }}>
                <div className="promo-images">
                    <img src="/shawarma_promo.png" className="stacked-photo photo-1" alt="Shawarma Detail" />
                    <img src="/shawarma_promo.png" className="stacked-photo photo-2" alt="Shawarma Stack" />
                    <img src="/shawarma_promo.png" className="stacked-photo photo-3" alt="Shawarma Close-up" />
                </div>

                <div className="promo-content">
                    <h2 className="promo-heading" style={{ color: 'var(--shawarma)' }}>Authentic Shawarma Wraps...</h2>
                    <p className="promo-description">
                        It's got that perfect char, that juicy bite, that signature garlic tahini you just crave.
                        Hand-sliced from the grill, every wrap is a masterpiece of spice, crunch, and tradition.
                        Discover why our shawarma is the gold standard of flavor today.
                    </p>
                    {!user && (
                        <button 
                            className="promo-cta" 
                            style={{ backgroundColor: 'var(--shawarma)', boxShadow: '0 10px 20px rgba(230, 126, 34, 0.3)', cursor: 'pointer' }}
                            onClick={() => navigate('/menu')}
                        >
                            Order Online Now
                        </button>
                    )}
                </div>
            </div>

            {/* 3️⃣ Features Section */}
            <div className="features-section">
                <div className="features-list">
                    {features.map((feature, idx) => (
                        <div key={idx} className="feature-item">
                            <div className="feature-icon-box">
                                {feature.icon}
                            </div>
                            <div className="feature-text-box">
                                <h4 className="feature-title">{feature.title}</h4>
                                <p className="feature-desc">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* 🎯 NEW: High-Impact Delivery Challenge Banner */}
            <div className="delivery-challenge-section">
                <div className="challenge-content">
                    <span className="challenge-small-text">CRISPY, EVERY BITE TASTE</span>
                    <h2 className="challenge-title">
                        30 MINUTES FAST
                        <span className="highlight-text"> DELIVERY </span>
                        CHALLENGE
                    </h2>
                    <button className="challenge-cta" onClick={() => navigate('/menu')}>Order Online Now</button>
                </div>
                <div className="challenge-visual">
                    <img 
                        src="/delivery_scooter_character.png" 
                        alt="30 Minute Delivery Challenge" 
                        className="scooter-visual"
                    />
                </div>
            </div>

            {/* ⭐ Testimonials Section */}
            <div className="testimonials-section">
                <div className="testimonials-header">
                    <div className="header-left">
                        <span className="quote-icon">“</span>
                        <h2 className="testimonials-main-title">What our <br />customers are <br />saying</h2>
                        <div className="nav-hints">
                            <span className="nav-arrow">←</span>
                            <div className="nav-line"></div>
                            <span className="nav-arrow">→</span>
                        </div>
                    </div>
                    <div className="header-right">
                        <h3 className="trust-title">Read reviews, <br />order with confidence.</h3>
                        <div className="trust-badge">
                            <span className="trust-score">4.8/5</span>
                            <span className="trust-star">★</span>
                            <span className="trust-name">FOODZ. TRUSTED</span>
                            <span className="trust-count">Based on 8,420 reviews</span>
                        </div>
                    </div>
                </div>

                <div className="testimonials-slider">
                    <div className="testimonials-track">
                        {/* Double the array for infinite loop */}
                        {[...testimonials, ...testimonials].map((t, i) => (
                            <div key={i} className="testimonial-card">
                                <p className="t-content">"{t.content}"</p>
                                <div className="t-rating">
                                    {[...Array(t.rating)].map((_, j) => <span key={j}>★</span>)}
                                </div>
                                <div className="t-footer">
                                    <div className="t-avatar">{t.name[0]}</div>
                                    <div className="t-info">
                                        <span className="t-name">{t.name}</span>
                                        <span className="t-meta">{t.role} • {t.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Custom Global Animations (Scoped) */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}} />
        </section>
    );
};

export default MenuShowcase;
