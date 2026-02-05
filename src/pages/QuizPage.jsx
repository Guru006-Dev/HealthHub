import React, { useState, useEffect } from 'react';
import { Check, X, RefreshCw } from 'lucide-react';
import AudioButton from '../components/AudioButton';
import { motion, AnimatePresence } from 'framer-motion';
const Confetti = React.lazy(() => import('../components/Confetti'));
import { toast } from 'react-toastify';
import { quizQuestions as allQuestions } from '../data/quizData';

// Fisher-Yates Shuffle Utility
const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [feedback, setFeedback] = useState(null); // 'correct' or 'incorrect'

    // Initialize quiz with shuffled questions
    useEffect(() => {
        startQuiz();
    }, []);

    const startQuiz = () => {
        // Shuffle and pick first 5 (in this case all 5)
        const shuffled = shuffleArray(allQuestions).slice(0, 5);
        setQuestions(shuffled);
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setFeedback(null);
    };

    const handleAnswer = (index) => {
        // NOTE: The 'correct' index in data assumes the options order is fixed.
        // If we shuffled options too, we'd need to track the correct string answer.
        // For now, options are fixed, so index comparison works.
        const currentQ = questions[currentQuestion];

        if (index === currentQ.correct) {
            setScore(score + 1);
            setFeedback('correct');
        } else {
            setFeedback('incorrect');
        }

        setTimeout(() => {
            setFeedback(null);
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
            } else {
                setShowScore(true);
                toast.success("Quiz Completed! 🎉", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }, 1500); // Wait 1.5s to show feedback
    };

    if (questions.length === 0) return <div>Loading Quiz...</div>;

    const currentQData = questions[currentQuestion];

    return (
        <div className="container" style={{ maxWidth: '600px', textAlign: 'center', marginTop: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Safety Quiz</h1>

            <AnimatePresence mode="wait">
                {showScore ? (
                    <motion.div
                        key="score"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="btn-large"
                        style={{ cursor: 'default', padding: '3rem' }}
                    >
                        <h2 style={{ fontSize: '2rem' }}>Good Job!</h2>
                        <p style={{ fontSize: '1.5rem', margin: '1rem 0' }}>
                            You scored {score} out of {questions.length}
                        </p>
                        <React.Suspense fallback={null}>
                            <Confetti trigger={showScore} />
                        </React.Suspense>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={startQuiz}
                            style={{
                                padding: '1rem 2rem',
                                fontSize: '1.25rem',
                                borderRadius: '2rem',
                                border: 'none',
                                backgroundColor: 'var(--primary-color)',
                                color: 'white',
                                display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto'
                            }}
                        >
                            <RefreshCw /> Try Again
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div
                        key={currentQData.id} // Use ID for key to force re-render on new question
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ backgroundColor: 'var(--card-bg)', padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}
                    >

                        <div style={{ marginBottom: '2rem' }}>
                            <span style={{ fontSize: '1.25rem', color: 'var(--secondary-color)' }}>
                                Question {currentQuestion + 1} / {questions.length}
                            </span>
                            <h2 style={{ fontSize: '1.8rem', marginTop: '1rem' }}>
                                {currentQData.question}
                            </h2>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                <AudioButton text={currentQData.audio} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {currentQData.options.map((option, index) => (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleAnswer(index)}
                                    disabled={feedback !== null}
                                    style={{
                                        padding: '1.5rem',
                                        fontSize: '1.25rem',
                                        borderRadius: '1rem',
                                        border: '2px solid var(--secondary-color)',
                                        backgroundColor:
                                            feedback === 'correct' && index === currentQData.correct ? '#86efac' :
                                                feedback === 'incorrect' && index !== currentQData.correct && feedback !== null ? '#fca5a5' :
                                                    'white',
                                        color: 'var(--text-color)',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {option}
                                </motion.button>
                            ))}
                        </div>

                        {feedback && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{ marginTop: '2rem', fontSize: '1.5rem', fontWeight: 'bold', color: feedback === 'correct' ? '#16a34a' : '#dc2626' }}
                            >
                                {feedback === 'correct' ? '🎉 Correct!' : '❌ Oops, try again!'}
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuizPage;
