import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import './Timer.css';

const Timer = () => {
    const [timeElapsed, setTimeElapsed] = useState({
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Target Date: 2 years ago from now (Placeholder: 2023-02-26)
    // Ideally, this should be configurable.
    const startDate = new Date('2023-02-26T00:00:00');

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = now.getTime() - startDate.getTime();

            const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
            const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeElapsed({ years, days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="timer-section">
            <div className="container">
                <div className="timer-header">
                    <Clock className="timer-icon" size={32} />
                    <h2>Mission Time Elapsed</h2>
                </div>

                <div className="timer-grid">
                    <TimeUnit value={timeElapsed.years} label="Years" />
                    <TimeUnit value={timeElapsed.days} label="Days" />
                    <TimeUnit value={timeElapsed.hours} label="Hours" />
                    <TimeUnit value={timeElapsed.minutes} label="Minutes" />
                    <TimeUnit value={timeElapsed.seconds} label="Seconds" />
                </div>
            </div>
        </section>
    );
};

const TimeUnit = ({ value, label }) => (
    <div className="time-unit">
        <div className="time-value">{value}</div>
        <div className="time-label">{label}</div>
    </div>
);

export default Timer;
