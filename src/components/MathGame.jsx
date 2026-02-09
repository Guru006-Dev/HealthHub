import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const MathGame = () => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect'
    const [showResult, setShowResult] = useState(false);

    const generateProblem = () => {
        const n1 = Math.floor(Math.random() * 5) + 1; // 1-5
        const n2 = Math.floor(Math.random() * 5) + 1; // 1-5
        setNum1(n1);
        setNum2(n2);

        const correctAnswer = n1 + n2;
        const newOptions = [correctAnswer];

        while (newOptions.length < 3) {
            const wrong = Math.floor(Math.random() * 10) + 1;
            if (!newOptions.includes(wrong)) {
                newOptions.push(wrong);
            }
        }

        setOptions(newOptions.sort(() => Math.random() - 0.5));
        setFeedback(null);
        setShowResult(false);
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleOptionClick = (option) => {
        if (feedback || showResult) return;

        if (option === num1 + num2) {
            setFeedback('correct');
            setScore(s => s + 1);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            // Trigger animation
            setTimeout(() => {
                setShowResult(true);
            }, 500);

            setTimeout(generateProblem, 3000);
        } else {
            setFeedback('incorrect');
            setTimeout(() => setFeedback(null), 1000);
        }
    };

    return (
        <div className="math-game-container" style={{
            maxWidth: '100%', // Allow full width up to max
            width: '800px',   // Wider container
            margin: '0 auto',
            padding: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}>Let's Count Apples! 🍎</h2>

            <div style={{ minHeight: '300px', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <AnimatePresence mode='wait'>
                    {!showResult ? (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap', // Allow wrapping
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                gap: '1rem', // Reduced gap
                                width: '100%',
                                paddingBottom: '2rem'
                            }}
                        >
                            <div className="number-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                <div style={{ display: 'flex', gap: '2px', height: '60px', alignItems: 'flex-end', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {[...Array(num1)].map((_, i) => (
                                        <motion.span
                                            key={`apple-group1-${i}`}
                                            layoutId={`apple-${i}`}
                                            initial={{ scale: 0, y: 10 }}
                                            animate={{ scale: 1, y: 0 }}
                                            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                                            style={{ fontSize: '2.5rem', lineHeight: 1, display: 'inline-block', filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.1))' }}
                                        >
                                            🍎
                                        </motion.span>
                                    ))}
                                </div>
                                <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '4rem', margin: 0, lineHeight: 1, color: '#333' }}>{num1}</p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                style={{ fontSize: '3rem', fontWeight: 'bold', color: '#94a3b8', lineHeight: 1, marginBottom: '1rem' }}
                            >+</motion.div>

                            <div className="number-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                <div style={{ display: 'flex', gap: '2px', height: '60px', alignItems: 'flex-end', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {[...Array(num2)].map((_, i) => (
                                        <motion.span
                                            key={`apple-group2-${i}`}
                                            layoutId={`apple-${num1 + i}`}
                                            initial={{ scale: 0, y: 10 }}
                                            animate={{ scale: 1, y: 0 }}
                                            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                                            style={{ fontSize: '2.5rem', lineHeight: 1, display: 'inline-block', filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.1))' }}
                                        >
                                            🍎
                                        </motion.span>
                                    ))}
                                </div>
                                <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '4rem', margin: 0, lineHeight: 1, color: '#333' }}>{num2}</p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                style={{ fontSize: '3rem', fontWeight: 'bold', color: '#94a3b8', lineHeight: 1, marginBottom: '1rem' }}
                            >=</motion.div>

                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                style={{ fontSize: '4rem', fontWeight: 'bold', color: '#333', lineHeight: 1, marginBottom: '0.5rem' }}
                            >?</motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', paddingBottom: '2rem' }}
                        >
                            <div style={{
                                display: 'flex',
                                gap: '2px',
                                marginBottom: '1.5rem',
                                minHeight: '60px',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                justifyContent: 'center'
                            }}>
                                {[...Array(num1 + num2)].map((_, i) => (
                                    <motion.span
                                        key={`apple-result-${i}`}
                                        layoutId={`apple-${i}`}
                                        style={{ fontSize: '2.5rem', lineHeight: 1, display: 'inline-block', filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.1))' }}
                                    >
                                        🍎
                                    </motion.span>
                                ))}
                            </div>
                            <motion.p
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1.5, opacity: 1 }}
                                style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '6rem', margin: 0, lineHeight: 1, color: '#4caf50' }}
                            >
                                {num1 + num2}
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '2rem' }}>
                {options.map((opt, i) => (
                    <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleOptionClick(opt)}
                        disabled={showResult}
                        style={{
                            padding: '1.5rem',
                            fontSize: '2rem',
                            border: 'none',
                            borderRadius: '15px',
                            backgroundColor: (feedback === 'correct' || showResult) && opt === num1 + num2 ? '#4caf50' :
                                feedback === 'incorrect' && opt !== num1 + num2 ? '#ef5350' : '#2196f3',
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            opacity: showResult && opt !== num1 + num2 ? 0.3 : 1
                        }}
                    >
                        {opt}
                    </motion.button>
                ))}
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <h3 style={{ color: '#666' }}>Score: {score}</h3>
            </div>
            {
                feedback === 'correct' && !showResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ textAlign: 'center', marginTop: '1rem', color: '#4caf50', fontSize: '1.5rem', fontWeight: 'bold' }}
                    >
                        Great Job! 🎉
                    </motion.div>
                )
            }
        </div >
    );
};

export default MathGame;
