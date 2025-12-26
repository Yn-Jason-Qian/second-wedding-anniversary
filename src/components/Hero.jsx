import React from 'react';
import { Heart } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <div className="heart-icon-wrapper">
                    <Heart className="heart-icon" size={48} fill="var(--color-accent)" />
                </div>
                <h1 className="hero-title">Happy 2nd Anniversary</h1>
                <p className="hero-subtitle">Mission Duration: Two Years // Status: Forever</p>
                <div className="scroll-indicator">
                    <span>INITIALIZE CELEBRATION</span>
                    <div className="arrow">↓</div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
