import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import './Reasons.css';

const reasonsList = [
    "The way you smile at me in the morning.",
    "Your kindness to everyone you meet.",
    "How you always know how to make me laugh.",
    "Your incredible cooking (especially that one dish!).",
    "The way you support my dreams.",
    "Your warm hugs after a long day.",
    "How safe I feel when I'm with you.",
    "Your sense of adventure.",
    "The way you listen when I need to talk.",
    "Just being you."
];

const Reasons = () => {
    const [reason, setReason] = useState("Click the heart to see why...");
    const [animating, setAnimating] = useState(false);

    const showNewReason = () => {
        setAnimating(true);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * reasonsList.length);
            setReason(reasonsList[randomIndex]);
            setAnimating(false);
        }, 300); // Wait for fade out
    };

    return (
        <section className="reasons-section">
            <div className="container">
                <h2>Reasons I Love You</h2>
                <div className="reasons-card">
                    <div className={`reason-text ${animating ? 'fade-out' : 'fade-in'}`}>
                        "{reason}"
                    </div>
                    <button className="reveal-btn" onClick={showNewReason}>
                        <Heart size={24} fill="#fff" />
                        <span>Tell Me More</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Reasons;
