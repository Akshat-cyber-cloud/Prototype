import React, { useEffect, useState, useRef } from 'react';
import './MenuShowcase.css';

/**
 * MenuShowcase Component - Redefined for Shawarma
 * Replicates a restaurant UI with shawarma categories, a dark promotional section, and features.
 */
const MenuShowcase = () => {
    // Scroll animation logic
    const containerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

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
            img: 'swarma1.png'
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
            img: 'panckae.png'
        }
    ];

    const features = [
        {
            title: 'Catering & Events',
            desc: 'Bring the authentic taste of street-style shawarma to your special gatherings and private parties.',
            icon: (
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="#E67E22" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M11 17a1 1 0 0 1 2 0c0 .5-.34 1.53-.5 2h-1c-.17-.47-.5-1.5-.5-2Z" /><path d="M15 17a1 1 0 0 1 2 0c0 .5-.34 1.53-.5 2h-1c-.17-.47-.5-1.5-.5-2Z" /><path d="M7 17a1 1 0 0 1 2 0c0 .5-.34 1.53-.5 2h-1c-.17-.47-.5-1.5-.5-2Z" /><path d="M9 11V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v5" /><rect x="2" y="11" width="20" height="10" rx="2" /></svg>
            )
        },
        {
            title: 'Join the Master Wrappers',
            desc: 'Work with the best in the business. We value skill, precision, and building the perfect wrap.',
            icon: (
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="#E67E22" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            )
        },
        {
            title: 'Franchise Partnership',
            desc: 'Spread the shawarma love! Own a franchise and bring our legendary flavors to your neighborhood.',
            icon: (
                <svg viewBox="0 0 24 24" width="32" height="32" stroke="#E67E22" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            )
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
                <h2 className="menu-title">Our Shawarma</h2>
                <div className="menu-grid">
                    {menuItems.map((item, idx) => (
                        <div key={idx} className={`category-card card-${item.category}`}>
                            <div className="card-image-box">
                                <img src={item.img} alt={item.title} loading="lazy" />
                            </div>
                            <div className="card-content">
                                <h3 className="card-title">{item.title}</h3>
                                <p className="card-subtitle">{item.subtitle}</p>
                                <button className="card-btn" style={{ backgroundColor: 'var(--shawarma)' }}>Try it Now</button>
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
                    <button className="promo-cta" style={{ backgroundColor: 'var(--shawarma)', boxShadow: '0 10px 20px rgba(230, 126, 34, 0.3)' }}>Order Online Now</button>
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
