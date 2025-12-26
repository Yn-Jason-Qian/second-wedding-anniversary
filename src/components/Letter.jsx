import React from 'react';
import { Mail } from 'lucide-react';
import './Letter.css';

const Letter = () => {
    return (
        <section className="letter-section">
            <div className="container">
                <div className="letter-container">
                    <div className="letter-header">
                        <Mail size={32} className="letter-icon" />
                        <h2>A Message For You</h2>
                    </div>
                    <div className="paper">
                        <div className="lines">
                            <p className="greeting">My Dearest Love,</p>
                            <p className="body-text">
                                These past two years have been the most incredible journey of my life.
                                Every day with you is a gift I cherish. You are my rock, my joy, and my best friend.
                            </p>
                            <p className="body-text">
                                Thank you for being you, for your patience, your kindness, and your endless love.
                                I look forward to all the tomorrows we will share together.
                            </p>
                            <p className="closing">With all my love,</p>
                            <p className="signature">Your Husband</p>
                        </div>
                        <div className="seal">
                            <span className="heart-seal">❤</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Letter;
