import React, { useState, useEffect } from "react";
import "../styles/Hero.css";
import Swarma1 from "../assets/ImagesHero/Swarma1.png";
import Swarma2 from "../assets/ImagesHero/Swarma2.png";
import Swarma3 from "../assets/ImagesHero/Swarma3.png";

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const items = [
        { name: "Chicken Swarma", image: Swarma1 },
        { name: "Chilli Swarma", image: Swarma2 },
        { name: "Loaded Swarma", image: Swarma3 },
        { name: "Spicy Swarma", image: Swarma1 },
        { name: "Cheesy Swarma", image: Swarma2 },
    ];

    const total = items.length;
    const arcSpan = 120;
    const startAngle = -90 - (arcSpan / 2);

    const viewBoxSize = 1400;
    const cx = viewBoxSize / 2;
    const cy = viewBoxSize * 0.75;

    const rings = [420, 520, 620];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % total);
        }, 2000);

        return () => clearInterval(interval);
    }, [total]);

    const getCoordinates = (index, radius) => {
        const angleInDegrees = startAngle + (index / (total - 1)) * arcSpan;
        const angleInRadians = (angleInDegrees * Math.PI) / 180;
        const x = cx + Math.cos(angleInRadians) * radius;
        const y = cy + Math.sin(angleInRadians) * radius;
        return { x, y, angle: angleInDegrees };
    };

    return (
        <div className="hero-container">
            <div className="radial-menu">
                <svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} className="radial-svg">
                    {rings.map((r, i) => (
                        <circle
                            key={i}
                            cx={cx}
                            cy={cy}
                            r={r}
                            className="radial-ring"
                            fill="none"
                            stroke="#E5E0DA"
                            strokeWidth="0.8"
                            opacity={0.1 + i * 0.12}
                        />
                    ))}

                    {items.map((item, i) => {
                        const { x, y, angle } = getCoordinates(i, rings[1]);
                        const labelPos = getCoordinates(i, rings[2] + 45);
                        const isActive = i === activeIndex;

                        // Simplified rotation logic: keep text upright
                        const rotateAngle = 0;

                        return (
                            <g key={i} className={`radial-item ${isActive ? "active" : ""}`}>
                                <circle
                                    cx={x}
                                    cy={y}
                                    r={35}
                                    fill="transparent"
                                    className="dot-hitbox"
                                    style={{ cursor: "pointer", pointerEvents: "all" }}
                                    onClick={() => setActiveIndex(i)}
                                />

                                <circle
                                    cx={x}
                                    cy={y}
                                    r={isActive ? 16 : 8}
                                    className="radial-dot"
                                    fill={isActive ? "var(--primary)" : "#444444"}
                                    onClick={() => setActiveIndex(i)}
                                />

                                {isActive && (
                                    <circle
                                        cx={x}
                                        cy={y}
                                        r={24}
                                        className="dot-pulse"
                                        fill="none"
                                        stroke="var(--primary)"
                                        strokeWidth="2"
                                    />
                                )}

                                <text
                                    x={labelPos.x}
                                    y={labelPos.y}
                                    className="radial-label"
                                    style={{
                                        transformOrigin: `${labelPos.x}px ${labelPos.y}px`,
                                        transform: `rotate(${rotateAngle}deg)`,
                                        cursor: "pointer",
                                        pointerEvents: "all",
                                    }}
                                    textAnchor="middle"
                                    alignmentBaseline="middle"
                                    fill={isActive ? "var(--primary)" : "#333333"}
                                    fontWeight="700"
                                    onClick={() => setActiveIndex(i)}
                                >
                                    {item.name}
                                </text>
                            </g>
                        );
                    })}
                </svg>

                <div className="pizza-display" style={{ top: `${(cy / viewBoxSize) * 100}%` }}>
                    <div className="pizza-image-container">
                        {items.map((item, index) => (
                            <img
                                key={index}
                                src={item.image}
                                alt={item.name}
                                className={`main-pizza-image ${index === activeIndex ? "active" : "inactive"}`}
                            />
                        ))}
                        <button className="order-btn-center">ORDER NOW</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;