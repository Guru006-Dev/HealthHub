import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ParallaxBackground from '../components/ParallaxBackground';
import TextToSpeech from '../components/TextToSpeech';
// Logo imported from public folder

const IntroPage = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background */}
            <ParallaxBackground isCalmMode={false} />

            <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    style={{ marginBottom: '2rem' }}
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            padding: '2rem',
                            borderRadius: '50%',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(10px)',
                            width: '200px',
                            height: '200px'
                        }}
                    >
                        {/* Use Logo Image */}
                        <img
                            src="/logo.avif"
                            alt="HealthHub Logo"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '50%'
                            }}
                        />
                    </motion.div>
                </motion.div>

                {/* TTS Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    style={{ marginBottom: '1rem' }}
                >
                    <TextToSpeech text="Welcome to Health Hub! Your friendly guide to safety and first-aid. Let's learn together!" />
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        fontSize: '4rem',
                        marginBottom: '1rem',
                        color: '#1e293b',
                        fontWeight: '800',
                        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    Welcome to HealthHub
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        fontSize: '1.5rem',
                        marginBottom: '3rem',
                        maxWidth: '600px',
                        color: '#475569',
                        lineHeight: 1.6
                    }}
                >
                    Your friendly guide to safety and first-aid. <br /> Let's learn together! 🌟
                </motion.p>

                <Link to="/home">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{ boxShadow: ['0 0 0 0 rgba(76, 175, 80, 0.4)', '0 0 0 20px rgba(76, 175, 80, 0)'] }}
                        transition={{ boxShadow: { repeat: Infinity, duration: 1.5 } }}
                        className="btn-large"
                        style={{
                            width: 'auto',
                            padding: '1.2rem 3.5rem',
                            fontSize: '1.4rem',
                            background: 'linear-gradient(135deg, #4caf50 0%, #43a047 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                    >
                        Start Learning 🚀
                    </motion.button>
                </Link>
            </div>
        </div>
    );
};

export default IntroPage;
