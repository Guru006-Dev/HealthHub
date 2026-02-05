import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
// Import the house BG to use as a central image or just rely on the body bg
import puzzleBg from '../assets/puzzle_bg.svg'; // Or we can use the house SVG

const IntroPage = () => {
    return (
        <div style={{
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        }}>
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                style={{ marginBottom: '2rem' }}
            >
                <div style={{
                    background: 'white',
                    padding: '2rem',
                    borderRadius: '50%',
                    boxShadow: 'var(--shadow)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Heart size={80} color="var(--primary-color)" fill="var(--primary-color)" />
                </div>
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--text-color)' }}
            >
                Welcome to HealthHub
            </motion.h1>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ fontSize: '1.5rem', marginBottom: '3rem', maxWidth: '600px', opacity: 0.8 }}
            >
                Your friendly guide to safety and first-aid. Let's learn together!
            </motion.p>

            <Link to="/home">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="btn-large"
                    style={{
                        width: 'auto',
                        padding: '1.5rem 4rem',
                        fontSize: '1.5rem',
                        background: 'var(--primary-color)',
                        color: 'white',
                        border: 'none',
                        boxShadow: '0 10px 20px -5px rgba(255, 139, 167, 0.4)'
                    }}
                >
                    Start Learning 🚀
                </motion.button>
            </Link>
        </div>
    );
};

export default IntroPage;
