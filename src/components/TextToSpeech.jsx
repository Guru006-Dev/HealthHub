import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const TextToSpeech = ({ text, color = 'var(--primary-color)' }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [supported, setSupported] = useState(true);

    useEffect(() => {
        if (!('speechSynthesis' in window)) {
            setSupported(false);
        }
    }, []);

    // Stop speaking when component unmounts
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    const toggleSpeech = () => {
        if (!supported) return;

        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            // Cancel any current speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9; // Slightly slower for kids
            utterance.pitch = 1.1; // Slightly higher/friendly

            // Try to find a good voice (English)
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v => v.lang.includes('en') && v.name.includes('Female')) || voices[0];
            if (preferredVoice) utterance.voice = preferredVoice;

            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };

    if (!supported) return null;

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSpeech}
            style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: `2px solid ${color}`,
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: color,
                backdropFilter: 'blur(5px)',
                boxShadow: isSpeaking ? `0 0 15px ${color}` : 'none',
                transition: 'box-shadow 0.3s'
            }}
            title={isSpeaking ? "Stop Reading" : "Read Aloud"}
        >
            {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </motion.button>
    );
};

export default TextToSpeech;
