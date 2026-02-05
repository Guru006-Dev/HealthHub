import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { lessonsData } from '../data/lessonsData';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
    const [activeLessonId, setActiveLessonId] = useState(lessonsData[0].id);
    const observerRef = useRef(null);
    const sectionRefs = useRef({});

    // Set up Intersection Observer to track which lesson is visible
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '-40% 0px -40% 0px', // Active when element is in the middle 20% of screen
            threshold: 0
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lessonId = entry.target.getAttribute('data-id');
                    if (lessonId) {
                        setActiveLessonId(lessonId);
                    }
                }
            });
        }, options);

        // Observe all lesson sections
        Object.values(sectionRefs.current).forEach(section => {
            if (section) observerRef.current.observe(section);
        });

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, []);

    const activeLesson = lessonsData.find(l => l.id === activeLessonId) || lessonsData[0];

    return (
        <div style={{ minHeight: '100vh', background: 'transparent', color: 'var(--text-color)' }}>
            <div className="split-layout" style={{
                display: 'flex',
                flexDirection: 'row', // Default to row for desktop
                alignItems: 'flex-start',
                width: '100%',
                maxWidth: '100%',
                margin: '0 auto',
                position: 'relative'
            }}>
                {/* Style injection for responsive behavior */}
                <style>{`
                    @media (max-width: 768px) {
                        .split-layout {
                            flex-direction: column-reverse !important;
                        }
                        .sticky-visual {
                            position: relative !important;
                            height: 50vh !important;
                            width: 100% !important;
                            top: 0 !important;
                        }
                        .content-scroll {
                            width: 100% !important;
                            padding-top: 2rem !important;
                        }
                        .header-section {
                            text-align: center;
                        }
                    }
                `}</style>

                {/* Left Side: Scrollable Content */}
                <div className="content-scroll" style={{
                    width: '50%',
                    padding: '4rem 2rem',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10rem' // Space between sections
                }}>
                    {/* Header Section */}
                    <header className="header-section" style={{
                        marginBottom: '-5rem', // Pull closer to the first item
                        paddingBottom: '5rem'
                    }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.1, marginBottom: '1rem' }}
                        >
                            Emergency<br />
                            <span style={{ color: 'var(--primary-color)' }}>Response Guide</span>
                        </motion.h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '500px', lineHeight: 1.6 }}>
                            Simple, step-by-step instructions for common first aid emergencies.
                            Scroll to explore and find the help you need.
                        </p>
                    </header>

                    {/* Lesson Sections */}
                    {lessonsData.map((lesson) => (
                        <div
                            key={lesson.id}
                            data-id={lesson.id}
                            ref={el => sectionRefs.current[lesson.id] = el}
                            style={{
                                minHeight: '60vh', // Ensure enough space to scroll
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                paddingLeft: '1rem',
                                borderLeft: `4px solid ${activeLessonId === lesson.id ? lesson.color : 'transparent'}`,
                                transition: 'border-color 0.3s ease'
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <lesson.icon size={32} color={lesson.color} />
                                    <span style={{
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                        fontWeight: '600',
                                        color: lesson.color,
                                        fontSize: '0.9rem'
                                    }}>
                                        First Aid
                                    </span>
                                </div>

                                <h2 style={{ fontSize: '3rem', margin: '0 0 1.5rem', fontWeight: '700' }}>
                                    {lesson.title}
                                </h2>

                                <p style={{ fontSize: '1.1rem', opacity: 0.7, marginBottom: '2rem', maxWidth: '400px', lineHeight: 1.6 }}>
                                    Learn exactly what to do when someone is experiencing {lesson.title.toLowerCase()}.
                                    Quick thinking can save lives.
                                </p>

                                <Link to={`/lesson/${lesson.id}`} style={{ textDecoration: 'none' }}>
                                    <button
                                        style={{
                                            padding: '1rem 2rem',
                                            borderRadius: '50px',
                                            border: 'none',
                                            background: lesson.color,
                                            color: '#fff',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            boxShadow: `0 10px 20px -5px ${lesson.color}80`,
                                            transition: 'transform 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        Start Guide <ArrowRight size={18} />
                                    </button>
                                </Link>
                            </motion.div>
                        </div>
                    ))}

                    <div style={{ height: '20vh' }} /> {/* Footer space */}
                </div>

                {/* Right Side: Sticky Visuals */}
                <div className="sticky-visual" style={{
                    width: '50%',
                    height: '100vh',
                    position: 'sticky',
                    top: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    justifyContent: 'center',
                    background: 'rgba(15, 23, 42, 0.3)', // Dark Glass
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    overflow: 'hidden'
                }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeLesson.id}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {/* Background Gradient Mesh */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '120%',
                                height: '120%',
                                background: `radial-gradient(circle at center, ${activeLesson.color}20 0%, transparent 70%)`,
                                zIndex: 1
                            }} />

                            {/* Main Image */}
                            <img
                                src={activeLesson.cover}
                                alt={activeLesson.title}
                                style={{
                                    maxWidth: '80%',
                                    maxHeight: '80%',
                                    objectFit: 'contain',
                                    zIndex: 2,
                                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))'
                                }}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
