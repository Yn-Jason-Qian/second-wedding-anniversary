import React, { useEffect, useState } from 'react';
import './FloatingHearts.css';

const FloatingHearts = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        // initial set of hearts
        const initialHearts = Array.from({ length: 15 }).map((_, i) => createHeart(i));
        setHearts(initialHearts);

        const interval = setInterval(() => {
            setHearts(prev => {
                // Keep array size manageable
                const newHearts = [...prev.filter(h => Date.now() - h.createdAt < 6000), createHeart(Date.now())];
                return newHearts;
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    const createHeart = (id) => ({
        id,
        left: Math.random() * 100,
        animationDuration: 3 + Math.random() * 4 + 's',
        opacity: 0.3 + Math.random() * 0.5,
        size: 10 + Math.random() * 20 + 'px',
        createdAt: Date.now()
    });

    return (
        <div className="floating-hearts-container">
            {hearts.map(heart => (
                <div
                    key={heart.id}
                    className="floating-heart"
                    style={{
                        left: `${heart.left}%`,
                        animationDuration: heart.animationDuration,
                        opacity: heart.opacity,
                        fontSize: heart.size
                    }}
                >
                    ❤
                </div>
            ))}
        </div>
    );
};

export default FloatingHearts;
