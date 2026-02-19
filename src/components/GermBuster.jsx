import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Play, RotateCcw } from 'lucide-react';
import TextToSpeech from './TextToSpeech';

const GermBuster = () => {
    const [gameState, setGameState] = useState('start'); // start, playing, gameover
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [germs, setGerms] = useState([]);
    const [mathProblem, setMathProblem] = useState(null); // { text: "2 + 3", answer: 5 }
    const gameAreaRef = useRef(null);
    const [highScore, setHighScore] = useState(localStorage.getItem('germBusterHighScore') || 0);

    // Germ Visuals
    const germVisuals = [
        { color: '#84cc16', emoji: '🦠' },
        { color: '#d946ef', emoji: '👾' },
        { color: '#ef4444', emoji: '👺' }
    ];

    // Generate Math Problem
    const generateProblem = () => {
        const n1 = Math.floor(Math.random() * 9) + 1; // 1-9
        const n2 = Math.floor(Math.random() * 9) + 1; // 1-9
        const isAddition = Math.random() > 0.5;

        let answer, text;
        if (isAddition) {
            answer = n1 + n2;
            text = `${n1} + ${n2}`;
        } else {
            // Subtraction (ensure positive result)
            const max = Math.max(n1, n2);
            const min = Math.min(n1, n2);
            answer = max - min;
            text = `${max} - ${min}`;
        }
        return { text, answer };
    };

    // Start Game
    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setTimeLeft(45); // More time for math
        setGerms([]);
        setMathProblem(generateProblem());
    };

    // Timer Logic
    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && gameState === 'playing') {
            endGame();
        }
    }, [gameState, timeLeft]);

    // Germ Spawning Logic
    useEffect(() => {
        if (gameState !== 'playing' || !mathProblem) return;

        const spawnInterval = setInterval(() => {
            if (germs.length < 4) { // Max 4 germs to avoid clutter
                const visual = germVisuals[Math.floor(Math.random() * germVisuals.length)];
                const id = Date.now() + Math.random();
                const x = Math.random() * 80 + 10;
                const y = Math.random() * 60 + 20; // Keep lower to avoid covering title

                // Decide if this germ holds the CORRECT answer or a WRONG one
                // Ensure at least one correct answer exists if none are present
                const hasCorrect = germs.some(g => g.value === mathProblem.answer);
                const isCorrect = !hasCorrect || Math.random() > 0.6; // 40% chance of correct if one already exists

                let value;
                if (isCorrect) {
                    value = mathProblem.answer;
                } else {
                    // Generate wrong answer close to real one
                    do {
                        value = mathProblem.answer + Math.floor(Math.random() * 5) - 2;
                    } while (value === mathProblem.answer || value < 0);
                }

                setGerms(prev => [...prev, { ...visual, id, x, y, value }]);
            }
        }, 1200); // Slower spawn for math

        return () => clearInterval(spawnInterval);
    }, [gameState, germs, mathProblem]);

    const endGame = () => {
        setGameState('gameover');
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('germBusterHighScore', score);
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 }
            });
        }
    };

    const handleSplat = (id, value) => {
        if (value === mathProblem.answer) {
            // Correct!
            setScore(prev => prev + 10);
            setGerms([]); // Clear screen for new problem
            setMathProblem(generateProblem());

            // Confetti burst
            confetti({
                particleCount: 30,
                spread: 50,
                origin: { x: 0.5, y: 0.5 },
                colors: ['#4caf50', '#8bc34a']
            });
        } else {
            // Incorrect
            setScore(prev => Math.max(0, prev - 5));
            setGerms(prev => prev.filter(g => g.id !== id)); // Remove just the wrong one
        }
    };

    return (
        <div className="germ-buster-container" style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem',
            background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)',
            borderRadius: '30px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <h2 style={{ fontSize: '2.5rem', color: '#0369a1', marginBottom: '0.5rem', fontWeight: '900' }}>
                Germ Buster Math! 🧼
            </h2>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 'bold', color: '#334155' }}>
                <span>Score: {score}</span>
                <span>Time: {timeLeft}s</span>
                <span>Best: {highScore}</span>
            </div>

            {/* Math Problem Display */}
            {gameState === 'playing' && mathProblem && (
                <motion.div
                    key={mathProblem.text}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                        background: '#fff',
                        padding: '0.5rem 2rem',
                        borderRadius: '50px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        display: 'inline-block',
                        marginBottom: '1rem',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        color: '#0369a1'
                    }}
                >
                    Solve: {mathProblem.text} = ?
                </motion.div>
            )}

            {/* Game Area */}
            <div
                ref={gameAreaRef}
                style={{
                    height: '400px',
                    background: '#fff',
                    borderRadius: '20px',
                    position: 'relative',
                    cursor: gameState === 'playing' ? 'default' : 'default', // No crosshair, need to see numbers
                    border: '4px solid #bae6fd',
                    overflow: 'hidden',
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)'
                }}
            >
                {/* Background Pattern */}
                <div style={{
                    position: 'absolute', inset: 0, opacity: 0.1,
                    backgroundImage: 'radial-gradient(#0ea5e9 2px, transparent 2px)',
                    backgroundSize: '30px 30px'
                }} />

                <AnimatePresence>
                    {gameState === 'playing' && germs.map(germ => (
                        <motion.button
                            key={germ.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.5, opacity: 0 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleSplat(germ.id, germ.value)}
                            style={{
                                position: 'absolute',
                                left: `${germ.x}%`,
                                top: `${germ.y}%`,
                                width: '80px',
                                height: '80px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: 'white',
                                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                userSelect: 'none'
                            }}
                        >
                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                <span style={{ fontSize: '4rem', position: 'absolute', inset: 0, filter: `drop-shadow(0 4px 0 ${germ.color})` }}>
                                    {germ.emoji}
                                </span>
                                <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                                    {germ.value}
                                </span>
                            </div>
                        </motion.button>
                    ))}
                </AnimatePresence>

                {gameState === 'start' && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)' }}>
                        <h3 style={{ fontSize: '1.5rem', color: '#0369a1', margin: '0 0 1rem' }}>Ready to clean up?</h3>
                        <p style={{ fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '300px', color: '#475569' }}>
                            Solve the math problem and tap the germ with the correct answer! 🧮
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={startGame}
                            className="btn-large"
                            style={{ width: 'auto', padding: '1rem 3rem', background: '#0ea5e9', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <Play size={24} /> Start Math Mode
                        </motion.button>
                    </div>
                )}

                {gameState === 'gameover' && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)' }}>
                        <h3 style={{ fontSize: '2rem', color: '#0369a1', margin: 0 }}>Math Master! 🎓</h3>
                        <p style={{ fontSize: '1.5rem', margin: '0.5rem 0 2rem' }}>Final Score: {score}</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={startGame}
                            className="btn-large"
                            style={{ width: 'auto', padding: '1rem 3rem', background: '#0ea5e9', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <RotateCcw size={24} /> Play Again
                        </motion.button>
                    </div>
                )}
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.7 }}>
                *Tap the germ holding the correct answer!*
            </p>
        </div>
    );
};

export default GermBuster;
