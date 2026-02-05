import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { playHoverSound, playClickSound } from '../utils/soundEffects';

const LessonCard = ({ lesson }) => {
    return (
        <Link
            to={`/lesson/${lesson.id}`}
            onClick={playClickSound}
            style={{ textDecoration: 'none' }}
            aria-label={`Learn about ${lesson.title}`}
        >
            <motion.div
                className="btn-large"
                onMouseEnter={playHoverSound}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                    borderLeft: 'none',
                    border: `4px solid ${lesson.color}`,
                    padding: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%',
                    background: 'var(--card-bg)'
                }}
            >
                <div style={{
                    width: '100%',
                    height: '160px',
                    backgroundColor: `${lesson.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}>
                    {lesson.cover ? (
                        <img
                            src={lesson.cover}
                            alt={`${lesson.title} illustration`}
                            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }}
                        />
                    ) : (
                        <lesson.icon size={64} color={lesson.color} />
                    )}
                </div>

                <div style={{ padding: '1rem', width: '100%', textAlign: 'center' }}>
                    <span style={{
                        color: 'var(--text-color)',
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                    }}>
                        {lesson.title}
                    </span>
                </div>
            </motion.div>
        </Link>
    );
};

export default LessonCard;
