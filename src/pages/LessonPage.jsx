import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { lessonsData } from '../data/lessonsData';
import TextToSpeech from '../components/TextToSpeech';
import { ArrowLeft, ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClickSound, playHoverSound } from '../utils/soundEffects';

const LessonPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const lesson = lessonsData.find(l => l.id === id);
    const [currentStep, setCurrentStep] = useState(0);

    if (!lesson) return <div className="container">Lesson not found!</div>;

    const totalSteps = lesson.steps.length;
    const isLastStep = currentStep === totalSteps - 1;

    const handleNext = () => {
        playClickSound();
        if (currentStep < totalSteps - 1) {
            setCurrentStep(curr => curr + 1);
        }
    };

    const handleBack = () => {
        playClickSound();
        if (currentStep > 0) {
            setCurrentStep(curr => curr - 1);
        }
    };

    return (
        <div className="container" style={{ maxWidth: '800px', paddingBottom: '3rem', paddingTop: '100px' }}>
            <button
                onClick={() => {
                    playClickSound();
                    navigate(-1);
                }}
                onMouseEnter={playHoverSound}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    margin: '2rem 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--secondary-color)',
                    fontWeight: 'bold',
                    fontSize: '1rem'
                }}
            >
                <ArrowLeft size={20} /> Go Back
            </button>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass-card"
                style={{
                    padding: '2rem',
                    borderTop: `10px solid ${lesson.color}`,
                    overflow: 'hidden' // Keep animations inside
                }}
            >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <lesson.icon size={48} color={lesson.color} />
                    <h1 style={{ margin: 0, fontSize: '2.5rem' }}>{lesson.title}</h1>
                </div>

                {/* Warning Banner */}
                {lesson.warnings && lesson.warnings.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{ backgroundColor: '#fef2f2', border: '2px solid #ef4444', borderRadius: '1rem', padding: '1rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}
                    >
                        <AlertTriangle color="#ef4444" size={32} />
                        <p style={{ margin: 0, color: '#b91c1c', fontWeight: 'bold', fontSize: '1.2rem' }}>
                            {lesson.warnings[0]}
                        </p>
                    </motion.div>
                )}

                {/* Step Content with Animation */}
                <div style={{ margin: '2rem 0', minHeight: '400px', position: 'relative' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ textAlign: 'center' }}
                        >
                            <h2 style={{ fontSize: '1.5rem', color: 'var(--secondary-color)', marginBottom: '1rem' }}>
                                Step {currentStep + 1} of {totalSteps}
                            </h2>

                            <img
                                src={lesson.steps[currentStep].image}
                                alt="Step illustration"
                                style={{
                                    display: 'block',
                                    maxWidth: '100%',
                                    height: '300px',
                                    objectFit: 'contain',
                                    margin: '1rem auto',
                                    borderRadius: '1rem'
                                }}
                            />

                            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1.5rem 0', lineHeight: 1.4 }}>
                                {lesson.steps[currentStep].text}
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <TextToSpeech text={lesson.steps[currentStep].audio} />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Video Tutorial Section */}
                {lesson.videoId && (
                    <div style={{ marginTop: '3rem', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span role="img" aria-label="video">📺</span> Watch Tutorial
                        </h3>
                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '1rem', boxShadow: 'var(--shadow)' }}>
                            <iframe
                                src={`https://www.youtube.com/embed/${lesson.videoId}`}
                                title="YouTube video player"
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}

                {/* Progress Bar */}
                <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', margin: '2rem 0', overflow: 'hidden' }}>
                    <motion.div
                        style={{
                            height: '100%',
                            backgroundColor: lesson.color,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>

                {/* Navigation */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        style={{
                            padding: '1rem 2rem',
                            fontSize: '1.25rem',
                            borderRadius: 'var(--radius)',
                            border: '3px solid var(--secondary-color)',
                            background: 'transparent',
                            color: 'var(--secondary-color)',
                            opacity: currentStep === 0 ? 0.5 : 1,
                            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            fontWeight: 'bold'
                        }}
                    >
                        <ArrowLeft /> Previous
                    </motion.button>

                    {isLastStep ? (
                        <Link to="/">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '1rem 2rem',
                                    fontSize: '1.25rem',
                                    borderRadius: 'var(--radius)',
                                    border: 'none',
                                    background: '#22c55e',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    display: 'flex', alignItems: 'center', gap: '0.5rem'
                                }}
                            >
                                Finish <CheckCircle />
                            </motion.button>
                        </Link>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleNext}
                            style={{
                                padding: '1rem 2rem',
                                fontSize: '1.25rem',
                                borderRadius: 'var(--radius)',
                                border: 'none',
                                background: 'var(--primary-color)',
                                color: 'white',
                                fontWeight: 'bold',
                                display: 'flex', alignItems: 'center', gap: '0.5rem'
                            }}
                        >
                            Next Step <ArrowRight />
                        </motion.button>
                    )}
                </div>

            </motion.div>
        </div>
    );
};

export default LessonPage;
