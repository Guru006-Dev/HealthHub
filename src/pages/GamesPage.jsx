import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const GamesPage = () => {
    return (
        <div className="games-page" style={{ paddingTop: '8rem', paddingBottom: '4rem', minHeight: '100vh', maxWidth: '1200px', margin: '0 auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    textAlign: 'center',
                    marginBottom: '4rem',
                    color: '#1e293b', // Dark slate for contrast against light background
                    fontSize: '3.5rem',
                    fontWeight: '800',
                    textShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
            >
                Learning Games 🎮
            </motion.h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                {/* Math Game Card */}
                <Link to="/math-game" style={{ textDecoration: 'none' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.5 }
                        }}
                        whileHover={{
                            scale: 1.03,
                            translateY: -10,
                            boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                        }}
                        // Floating Animation
                        whileInView={{
                            y: [0, -10, 0],
                            transition: {
                                repeat: Infinity,
                                duration: 4,
                                ease: "easeInOut"
                            }
                        }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.65)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            borderRadius: '30px',
                            padding: '3rem 2rem',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.5)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1.5rem',
                            cursor: 'pointer',
                            height: '100%',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Decorative Gradient Blob */}
                        <div style={{
                            position: 'absolute',
                            top: '-50px',
                            left: '-50px',
                            width: '150px',
                            height: '150px',
                            background: 'radial-gradient(circle, rgba(255,100,100,0.2) 0%, rgba(255,255,255,0) 70%)',
                            borderRadius: '50%',
                            zIndex: 0
                        }} />

                        <motion.div
                            style={{ fontSize: '6rem', zIndex: 1 }}
                            whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                        >
                            🍎
                        </motion.div>
                        <h2 style={{ color: '#1e293b', margin: 0, fontSize: '2rem', zIndex: 1 }}>Math Game</h2>
                        <p style={{ color: '#475569', textAlign: 'center', lineHeight: '1.6', fontSize: '1.1rem', zIndex: 1 }}>
                            Learn addition by counting apples! A fun and visual way to practice numbers.
                        </p>
                        <div style={{
                            marginTop: 'auto',
                            background: 'linear-gradient(135deg, #4caf50 0%, #43a047 100%)',
                            color: 'white',
                            padding: '1rem 2.5rem',
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                            fontSize: '1.1rem',
                            zIndex: 1,
                            letterSpacing: '0.5px'
                        }}>
                            Play Now
                        </div>
                    </motion.div>
                </Link>

                {/* Placeholder for Future Games */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: 0.2 }
                    }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        borderRadius: '30px',
                        padding: '3rem 2rem',
                        border: '2px dashed rgba(255,255,255,0.4)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1.5rem',
                        color: '#64748b',
                        minHeight: '400px'
                    }}
                >
                    <div style={{ fontSize: '5rem', opacity: 0.8 }}>🚀</div>
                    <h2 style={{ margin: 0, fontSize: '2rem' }}>Coming Soon</h2>
                    <p style={{ textAlign: 'center', opacity: 0.9, fontSize: '1.1rem' }}>
                        More exciting games are on the way!
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default GamesPage;
