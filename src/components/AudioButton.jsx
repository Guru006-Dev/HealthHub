import React from 'react';
import { Volume2 } from 'lucide-react';

const AudioButton = ({ text }) => {
    const speak = () => {
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9; // Slightly slower for better understanding
            utterance.pitch = 1;
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Sorry, your browser doesn't support text-to-speech.");
        }
    };

    return (
        <button
            onClick={speak}
            className="audio-btn"
            aria-label="Read text out loud"
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '2rem',
                border: 'none',
                backgroundColor: '#fbbf24', // Amber
                color: '#000',
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
        >
            <Volume2 size={24} />
            <span>Listen</span>
        </button>
    );
};

export default AudioButton;
