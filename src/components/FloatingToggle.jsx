import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/soundEffects';

const FloatingToggle = ({ currentMode, toggleMode }) => {
    const handleClick = () => {
        playClickSound();
        toggleMode();
    };

    const getIcon = () => {
        if (currentMode === 'calm') return <Moon size={28} />;
        if (currentMode === 'dark') return <Sparkles size={28} />;
        return <Sun size={28} />;
    };

    const getBgColor = () => {
        if (currentMode === 'calm') return '#a8a29e';
        if (currentMode === 'dark') return '#6366f1'; // Indigo for Dark Mode
        return '#FDB813'; // Sun Yellow
    };

    const getShadowAnimation = () => {
        if (currentMode === 'calm') return '0 4px 12px rgba(0,0,0,0.2)';
        if (currentMode === 'dark') return ["0 4px 12px rgba(99, 102, 241, 0.4)", "0 4px 20px rgba(99, 102, 241, 0.6)", "0 4px 12px rgba(99, 102, 241, 0.4)"];
        return ["0 4px 12px rgba(253, 184, 19, 0.4)", "0 4px 20px rgba(253, 184, 19, 0.6)", "0 4px 12px rgba(253, 184, 19, 0.4)"];
    };

    return (
        <motion.button
            onClick={handleClick}
            onMouseEnter={playHoverSound}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                scale: 1,
                opacity: 1,
                backgroundColor: getBgColor(),
                boxShadow: getShadowAnimation()
            }}
            transition={{
                boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                },
                default: { duration: 0.3 }
            }}
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            aria-label={`Switch from ${currentMode} mode`}
        >
            <motion.div
                key={currentMode}
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {getIcon()}
            </motion.div>
        </motion.button>
    );
};

export default FloatingToggle;
