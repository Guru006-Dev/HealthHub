import React, { useEffect } from 'react';
import './confetti.css';

const Confetti = ({ trigger }) => {
    useEffect(() => {
        if (!trigger) return;
        const timeout = setTimeout(() => { }, 3000);
        return () => clearTimeout(timeout);
    }, [trigger]);

    if (!trigger) return null;
    return (
        <div className="confetti-container">
            {[...Array(30)].map((_, i) => (
                <span key={i} className="confetti-piece">🎉</span>
            ))}
        </div>
    );
};

export default Confetti;
