import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { lessonsData } from '../data/lessonsData';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, BookOpen } from 'lucide-react';
import TiltCard from '../components/TiltCard';

const HomePage = () => {
    const [activeLesson, setActiveLesson] = useState(lessonsData[0]);

    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'flex-start',
                position: 'relative'
            }}>

                {/* Left Column: Scrollable Content */}
                <div style={{
                    width: '50%',
                    padding: '6rem 4rem 10rem',
                    zIndex: 10
                }}>
                    <header style={{ marginBottom: '6rem' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 style={{
                                fontSize: '4.5rem',
                                fontWeight: '800',
                                lineHeight: 1.1,
                                marginBottom: '1.5rem',
                                background: 'linear-gradient(to right, #334155, #64748b)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Emergency<br />
                                <span style={{ color: '#F472B6', WebkitTextFillColor: '#F472B6' }}>Response Guide</span>
                            </h1>
                            <p style={{ fontSize: '1.25rem', color: '#64748b', lineHeight: 1.6, maxWidth: '500px' }}>
                                Simple, step-by-step instructions for common first aid emergencies. Scroll to explore and find the help you need.
                            </p>
                        </motion.div>
                    </header>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
                        {lessonsData.map((lesson, index) => (
                            <motion.div
                                key={lesson.id}
                                onViewportEnter={() => setActiveLesson(lesson)}
                                viewport={{ margin: "-40% 0px -40% 0px" }} // Trigger when element is near center
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Link to={`/lesson/${lesson.id}`} style={{ textDecoration: 'none' }}>
                                    <div style={{
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: '32px',
                                        padding: '3rem',
                                        boxShadow: activeLesson.id === lesson.id
                                            ? `0 20px 40px -10px ${lesson.color}30`
                                            : '0 10px 30px -10px rgba(0,0,0,0.05)',
                                        border: '1px solid rgba(255,255,255,0.5)',
                                        backdropFilter: 'blur(20px)',
                                        transition: 'all 0.3s ease',
                                        transform: activeLesson.id === lesson.id ? 'scale(1.02)' : 'scale(1)'
                                    }}>
                                        <div style={{
                                            display: 'inline-flex',
                                            padding: '1rem 1.5rem',
                                            background: `${lesson.color}15`,
                                            color: lesson.color,
                                            borderRadius: '100px',
                                            fontWeight: '700',
                                            fontSize: '0.9rem',
                                            marginBottom: '1.5rem',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            letterSpacing: '1px'
                                        }}>
                                            <lesson.icon size={18} />
                                            {lesson.title.toUpperCase()}
                                        </div>

                                        <h2 style={{
                                            fontSize: '3.5rem',
                                            fontWeight: '800',
                                            color: '#1e293b',
                                            marginBottom: '1.5rem',
                                            lineHeight: 1.1
                                        }}>
                                            {lesson.title}
                                        </h2>

                                        <p style={{
                                            fontSize: '1.2rem',
                                            color: '#64748b',
                                            lineHeight: 1.7,
                                            marginBottom: '2.5rem'
                                        }}>
                                            Learn exactly what to do when someone is experiencing {lesson.title.toLowerCase()}.
                                            Quick thinking can save lives.
                                        </p>

                                        <button style={{
                                            padding: '1rem 2.5rem',
                                            background: lesson.color,
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '100px',
                                            fontSize: '1.1rem',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.8rem',
                                            boxShadow: `0 10px 20px -5px ${lesson.color}60`
                                        }}>
                                            Start Guide <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Sticky Visuals */}
                <div style={{
                    width: '50%',
                    height: '100vh',
                    position: 'sticky',
                    top: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4rem',
                    background: 'radial-gradient(circle at center, #f1f5f9 0%, #e2e8f0 100%)',
                    overflow: 'hidden'
                }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeLesson ? activeLesson.id : 'empty'}
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            style={{
                                width: '100%',
                                maxWidth: '600px',
                                aspectRatio: '1',
                                background: 'white',
                                borderRadius: '40px',
                                padding: '2rem',
                                boxShadow: '0 40px 80px -20px rgba(0,0,0,0.15)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Decorative Background Blob */}
                            <div style={{
                                position: 'absolute',
                                width: '150%',
                                height: '150%',
                                background: activeLesson ? `radial-gradient(circle, ${activeLesson.color}20 0%, transparent 70%)` : 'none',
                                zIndex: 0
                            }} />

                            {activeLesson && (
                                <img
                                    src={activeLesson.cover}
                                    alt={activeLesson.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        zIndex: 1
                                    }}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

export default HomePage;
