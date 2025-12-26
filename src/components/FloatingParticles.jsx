import React, { useEffect, useState } from 'react';
import './FloatingParticles.css';

const FloatingParticles = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate static stars + floating dust
        const count = 50;
        const initialParticles = Array.from({ length: count }).map((_, i) => createParticle(i));
        setParticles(initialParticles);
    }, []);

    const createParticle = (id) => ({
        id,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDuration: 10 + Math.random() * 20 + 's',
        opacity: Math.random(),
        size: Math.random() * 3 + 'px',
        delay: Math.random() * 5 + 's',
    });

    return (
        <div className="particles-container">
            {particles.map(p => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        width: p.size,
                        height: p.size,
                        animationDuration: p.animationDuration,
                        animationDelay: p.delay,
                        opacity: p.opacity
                    }}
                />
            ))}
            <div className="grid-overlay"></div>
        </div>
    );
};

export default FloatingParticles;
