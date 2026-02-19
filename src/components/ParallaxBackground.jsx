import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { Cloud } from 'lucide-react';

// Simple Cloud SVG Component - REMOVED (Replaced with Lucide)


const ParallaxBackground = ({ isCalmMode }) => {
    const { scrollY } = useScroll();

    // Create parallax offsets
    const y1 = useTransform(scrollY, [0, 500], [0, 150]); // Distant (Slow)
    const y2 = useTransform(scrollY, [0, 500], [0, 300]); // Mid (Medium)
    const y3 = useTransform(scrollY, [0, 500], [0, 450]); // Front (Fast)

    // Colors based on mode
    const skyGradient = isCalmMode
        ? 'linear-gradient(to bottom, #d6d3d1 0%, #e7e5e4 100%)' // Muted Grey/Warm for Calm
        : 'linear-gradient(to bottom, #dbeafe 0%, #eff6ff 100%)'; // Bright Blue for Default

    const colorLayer1 = isCalmMode ? "#a8a29e" : "#93C5FD"; // Muted vs Blue
    const colorLayer2 = isCalmMode ? "#bcaaa4" : "#6EE7B7"; // Muted Brown vs Green
    const colorLayer3 = isCalmMode ? "#d7ccc8" : "#34D399"; // Muted Beige vs Bright Green

    const sunColor = isCalmMode ? "#F4F6F0" : "#FDB813"; // Moon vs Sun
    const sunShadow = isCalmMode ? "0 0 20px #FFFFFF" : "0 0 40px #FFD700";

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
            background: skyGradient,
            transition: 'background 0.5s ease'
        }}>
            {/* Sun / Moon */}
            <motion.div
                initial={false}
                animate={{
                    backgroundColor: sunColor,
                    boxShadow: sunShadow,
                    x: isCalmMode ? 100 : 0, // Slight movement
                    y: isCalmMode ? 50 : 0
                }}
                transition={{ duration: 1 }}
                style={{
                    position: 'absolute',
                    top: '10%',
                    right: '15%',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    zIndex: 0
                }}
            />

            {/* Drifting Clouds */}
            <motion.div
                animate={{ x: [0, 50, 0] }}
                transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
                style={{ position: 'absolute', top: '15%', left: '10%', opacity: 0.8, zIndex: 0 }}
            >
                <Cloud fill={isCalmMode ? "#e7e5e4" : "#FFFFFF"} stroke="none" size={100} />
            </motion.div>
            <motion.div
                animate={{ x: [0, -30, 0] }}
                transition={{ repeat: Infinity, duration: 25, ease: "easeInOut", delay: 2 }}
                style={{ position: 'absolute', top: '25%', right: '20%', opacity: 0.6, scale: 0.8, zIndex: 0 }}
            >
                <Cloud fill={isCalmMode ? "#e7e5e4" : "#FFFFFF"} stroke="none" size={100} />
            </motion.div>

            {/* Layer 1: Distant Mountains */}
            <motion.div style={{ y: y1, position: 'absolute', bottom: '-10%', left: 0, width: '100%', opacity: 0.6 }}>
                <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" style={{ transition: 'fill 0.5s ease' }}>
                    <path fill={colorLayer1} fillOpacity="1" d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,133.3C672,107,768,85,864,101.3C960,117,1056,171,1152,192C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </motion.div>

            {/* Layer 2: Rolling Hills */}
            <motion.div style={{ y: y2, position: 'absolute', bottom: '-20%', left: 0, width: '100%', opacity: 0.8 }}>
                <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" style={{ transition: 'fill 0.5s ease' }}>
                    <path fill={colorLayer2} fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,218.7C672,213,768,171,864,165.3C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </motion.div>

            {/* Layer 3: Foreground Grass */}
            <motion.div style={{ y: y3, position: 'absolute', bottom: '-30%', left: 0, width: '100%' }}>
                <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" style={{ transition: 'fill 0.5s ease' }}>
                    <path fill={colorLayer3} fillOpacity="1" d="M0,256L60,245.3C120,235,240,213,360,218.7C480,224,600,256,720,250.7C840,245,960,203,1080,186.7C1200,171,1320,181,1380,186.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                </svg>
            </motion.div>
        </div>
    );
};

export default ParallaxBackground;
