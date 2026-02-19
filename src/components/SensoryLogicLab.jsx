import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, RotateCcw, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import TextToSpeech from './TextToSpeech';

// Mock Data for Games
const LEVELS = {
    dispatcher: [
        { id: 1, start: [0, 0], end: [2, 2], obstacles: [[1, 1], [0, 2]], size: 3 },
        { id: 2, start: [0, 0], end: [3, 3], obstacles: [[1, 1], [2, 2], [0, 3]], size: 4 },
        { id: 3, start: [0, 0], end: [4, 4], obstacles: [[1, 2], [2, 2], [3, 2], [1, 4]], size: 5 },
    ],
    sorting: [
        {
            id: 1,
            categories: [{ name: 'First Aid Kit', color: '#ff8ba7' }, { name: 'Cleaning', color: '#95d5b2' }],
            items: [
                { id: 'b1', name: 'Bandage', category: 'First Aid Kit', icon: '🩹' },
                { id: 's1', name: 'Soap', category: 'Cleaning', icon: '🧼' },
                { id: 'a1', name: 'Antiseptic', category: 'First Aid Kit', icon: '🧴' },
                { id: 'm1', name: 'Mop', category: 'Cleaning', icon: '🧹' }
            ]
        }
    ]
};

const SensoryLogicLab = () => {
    const [activeTab, setActiveTab] = useState('dispatcher'); // 'dispatcher' | 'sorting'
    const [level, setLevel] = useState(0);

    // Dispatcher State
    const [robotPos, setRobotPos] = useState([0, 0]);
    const [commandSequence, setCommandSequence] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [gameStatus, setGameStatus] = useState('playing'); // playing, won, lost

    // Sorting State
    const [sortedItems, setSortedItems] = useState({}); // { itemId: categoryName }
    const [selectedItem, setSelectedItem] = useState(null);

    const currentGridLevel = LEVELS.dispatcher[level % 3];

    // Reset Grid Logic
    useEffect(() => {
        setRobotPos(currentGridLevel.start);
        setCommandSequence([]);
        setGameStatus('playing');
        setIsRunning(false);
    }, [level, activeTab]);

    // Dispatcher Logic
    const addCommand = (cmd) => {
        if (isRunning || gameStatus !== 'playing') return;
        setCommandSequence([...commandSequence, cmd]);
    };

    const runSequence = async () => {
        setIsRunning(true);
        let current = [...currentGridLevel.start];

        for (let i = 0; i < commandSequence.length; i++) {
            const cmd = commandSequence[i];
            await new Promise(r => setTimeout(r, 600)); // Step delay

            if (cmd === 'UP') current[1] = Math.max(0, current[1] - 1);
            if (cmd === 'DOWN') current[1] = Math.min(currentGridLevel.size - 1, current[1] + 1);
            if (cmd === 'LEFT') current[0] = Math.max(0, current[0] - 1);
            if (cmd === 'RIGHT') current[0] = Math.min(currentGridLevel.size - 1, current[0] + 1);

            setRobotPos([...current]);

            // Check Collision
            if (currentGridLevel.obstacles.some(obs => obs[0] === current[0] && obs[1] === current[1])) {
                setGameStatus('lost');
                setIsRunning(false);
                return;
            }
        }

        // Check Win
        if (current[0] === currentGridLevel.end[0] && current[1] === currentGridLevel.end[1]) {
            setGameStatus('won');
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#95D5B2', '#FF8BA7']
            });
            // Auto-Capture on Win
            setTimeout(() => handleCapture(), 1500);
        } else {
            setGameStatus('lost');
        }
        setIsRunning(false);
    };

    // Sorting Logic
    const handleSort = (categoryName) => {
        if (!selectedItem) return;

        if (selectedItem.category === categoryName) {
            setSortedItems({ ...sortedItems, [selectedItem.id]: selectedItem });
            setSelectedItem(null);
            confetti({
                particleCount: 50,
                spread: 50,
                origin: { y: 0.5 },
                colors: ['#4caf50']
            });
        } else {
            // Error feedback
            const utterance = new SpeechSynthesisUtterance("Oops! Try the other box.");
            window.speechSynthesis.speak(utterance);
            setSelectedItem(null);
        }
    };

    // Keyboard & Screen Event Logic
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (activeTab !== 'dispatcher') return;

            // Prevent default scrolling for game keys
            // eslint-disable-next-line
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
            }

            switch (e.key) {
                case 'ArrowUp': addCommand('UP'); break;
                case 'ArrowDown': addCommand('DOWN'); break;
                case 'ArrowLeft': addCommand('LEFT'); break;
                case 'ArrowRight': addCommand('RIGHT'); break;
                case 'Enter': runSequence(); break;
                case 'Backspace':
                    setCommandSequence(prev => prev.slice(0, -1));
                    break;
                case 'Delete':
                    setCommandSequence([]);
                    break;
                default: break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeTab, isRunning, gameStatus, commandSequence]);

    // Screen Event: Fullscreen
    const toggleFullscreen = () => {
        const elem = document.getElementById('game-container');
        if (!document.fullscreenElement) {
            elem.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    // Screen Event: Capture (Rect-Screencaption)
    // eslint-disable-next-line
    const handleCapture = React.useCallback(async () => {
        try {
            const html2canvas = (await import('html2canvas')).default;
            const element = document.getElementById('game-content');
            if (!element) return;

            const canvas = await html2canvas(element);

            const link = document.createElement('a');
            link.download = `sensory-logic-certificate-${Date.now()}.png`;
            link.href = canvas.toDataURL();
            link.click();

            const utterance = new SpeechSynthesisUtterance("Screenshot saved! Great work!");
            window.speechSynthesis.speak(utterance);

        } catch (error) {
            console.error("Capture failed:", error);
        }
    }, []);

    // Voice Command Listener
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
            console.log("Voice Command:", transcript);
            if (transcript.includes('photo') || transcript.includes('capture') || transcript.includes('cheese')) {
                handleCapture();
            }
        };

        try {
            recognition.start();
        } catch (e) {
            console.error("Speech recognition start failed", e);
        }

        return () => recognition.stop();
    }, [handleCapture]);

    return (
        <div id="game-container" className="sensory-lab" style={{
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '2rem',
            background: 'var(--card-bg)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow)',
            minHeight: '600px',
            position: 'relative'
        }}>
            {/* Unified Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                {/* Voice Status (Left) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', opacity: 0.8, minWidth: '150px' }}>
                    <span style={{ fontSize: '1.2rem' }}>🎙️</span>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>Say "Photo" to capture</span>
                </div>

                {/* Tabs (Center - The Main Navigation) */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => setActiveTab('dispatcher')}
                        style={{
                            padding: '0.8rem 1.5rem',
                            borderRadius: '15px',
                            background: activeTab === 'dispatcher' ? 'var(--primary-color)' : 'transparent',
                            color: activeTab === 'dispatcher' ? '#fff' : 'var(--text-color)',
                            border: '2px solid var(--primary-color)',
                            fontWeight: 'bold',
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            fontSize: '1rem'
                        }}
                    >
                        🗺️ Health Dispatcher
                    </button>
                    <button
                        onClick={() => setActiveTab('sorting')}
                        style={{
                            padding: '0.8rem 1.5rem',
                            borderRadius: '15px',
                            background: activeTab === 'sorting' ? 'var(--accent-color)' : 'transparent',
                            color: activeTab === 'sorting' ? '#fff' : 'var(--text-color)',
                            border: '2px solid var(--accent-color)',
                            fontWeight: 'bold',
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            fontSize: '1rem'
                        }}
                    >
                        🧩 Helpful Hero Sorting
                    </button>
                </div>

                {/* Screen Controls (Right) */}
                <div style={{ display: 'flex', gap: '10px', minWidth: '150px', justifyContent: 'flex-end' }}>
                    <button
                        onClick={toggleFullscreen}
                        title="Toggle Fullscreen"
                        style={{ background: '#f5f5f5', border: 'none', padding: '10px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem' }}
                    >
                        ⛶
                    </button>
                    <button
                        onClick={handleCapture}
                        title="Save Certificate (Screen Capture)"
                        style={{ background: '#e3f2fd', border: 'none', padding: '10px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem' }}
                    >
                        📸
                    </button>
                </div>
            </div>


            <AnimatePresence mode="wait">
                {activeTab === 'dispatcher' ? (
                    <motion.div
                        id="game-content"
                        key="dispatcher"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                    >
                        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h2>Medical Robot Logic</h2>
                            <p style={{ opacity: 0.7 }}>Program the robot to reach the patient. Avoid the red zones!</p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                <TextToSpeech text="Program the robot to reach the patient. Avoid the red zones!" />
                                <button
                                    onClick={() => {
                                        const utterance = new SpeechSynthesisUtterance("Mathematical Concept: Spatial Logic. We use coordinates and step-by-step algorithms to solve a pathfinding problem.");
                                        window.speechSynthesis.speak(utterance);
                                    }}
                                    style={{
                                        background: '#e0f2f1', border: '1px solid #80cbc4', borderRadius: '20px',
                                        padding: '0.2rem 0.8rem', fontSize: '0.8rem', cursor: 'pointer', color: '#00695c',
                                        display: 'flex', alignItems: 'center', gap: '5px'
                                    }}
                                >
                                    📐 Math Concept
                                </button>
                            </div>
                            <small style={{ display: 'block', marginTop: '10px', color: '#666', fontSize: '0.9rem' }}>
                                ⌨️ Use Arrow Keys to move, Enter to run, Backspace to undo
                            </small>
                        </header>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                            {/* Grid */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: `repeat(${currentGridLevel.size}, 1fr)`,
                                gap: '8px',
                                background: '#f0f0f0',
                                padding: '10px',
                                borderRadius: '10px'
                            }}>
                                {Array.from({ length: currentGridLevel.size * currentGridLevel.size }).map((_, i) => {
                                    const x = i % currentGridLevel.size;
                                    const y = Math.floor(i / currentGridLevel.size);
                                    const isObstacle = currentGridLevel.obstacles.some(o => o[0] === x && o[1] === y);
                                    const isStart = currentGridLevel.start[0] === x && currentGridLevel.start[1] === y;
                                    const isEnd = currentGridLevel.end[0] === x && currentGridLevel.end[1] === y;
                                    const isRobot = robotPos[0] === x && robotPos[1] === y;

                                    return (
                                        <div key={i} style={{
                                            width: '80px', height: '80px',
                                            background: isObstacle ? '#ffcccc' : '#fff',
                                            borderRadius: '12px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '2rem',
                                            boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}>
                                            {isObstacle && (
                                                <motion.div
                                                    initial={{ backgroundColor: "rgb(0, 255, 0)", opacity: 0 }}
                                                    whileInView={{ backgroundColor: "rgb(255, 0, 0)", opacity: 1 }}
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        zIndex: 0
                                                    }}
                                                />
                                            )}
                                            <div style={{ position: 'relative', zIndex: 1 }}>
                                                {isEnd && '🤕'}
                                                {isObstacle && '⛔'}
                                            </div>
                                            {isRobot && <motion.div layoutId="robot" style={{ position: 'absolute', zIndex: 2 }}>🤖</motion.div>}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Controls */}
                            <div style={{ display: 'flex', gap: '1rem', background: '#eee', padding: '1rem', borderRadius: '1rem' }}>
                                <ControlBtn icon={<ArrowLeft />} onClick={() => addCommand('LEFT')} disabled={isRunning} />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <ControlBtn icon={<ArrowUp />} onClick={() => addCommand('UP')} disabled={isRunning} />
                                    <ControlBtn icon={<ArrowDown />} onClick={() => addCommand('DOWN')} disabled={isRunning} />
                                </div>
                                <ControlBtn icon={<ArrowRight />} onClick={() => addCommand('RIGHT')} disabled={isRunning} />
                            </div>

                            {/* Sequence Box */}
                            <div style={{ width: '100%', maxWidth: '500px', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <strong>Code:</strong>
                                {commandSequence.map((cmd, i) => (
                                    <span key={i} style={{ padding: '0.5rem', background: '#333', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}>
                                        {cmd === 'UP' ? '⬆️' : cmd === 'DOWN' ? '⬇️' : cmd === 'LEFT' ? '⬅️' : '➡️'}
                                    </span>
                                ))}
                                {commandSequence.length === 0 && <span style={{ opacity: 0.5 }}>...waiting for commands</span>}
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={runSequence}
                                    disabled={isRunning || commandSequence.length === 0}
                                    style={{
                                        padding: '1rem 2rem', background: '#4caf50', color: 'white', borderRadius: '10px',
                                        fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', gap: '0.5rem'
                                    }}
                                >
                                    <Play size={20} /> RUN
                                </button>
                                <button
                                    onClick={() => {
                                        setRobotPos(currentGridLevel.start);
                                        setCommandSequence([]);
                                        setGameStatus('playing');
                                    }}
                                    style={{ padding: '1rem', background: '#ff9800', color: 'white', borderRadius: '10px' }}
                                >
                                    <RotateCcw size={20} />
                                </button>
                            </div>

                            {/* Status Message */}
                            {gameStatus === 'won' && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ color: '#4caf50', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                    Program Success! Patient Reached! 🎉
                                    <button onClick={() => setLevel(l => l + 1)} style={{ marginLeft: '1rem', padding: '0.5rem 1rem', background: '#333', color: '#fff', borderRadius: '5px' }}>Next Level</button>
                                </motion.div>
                            )}
                            {gameStatus === 'lost' && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ color: '#e53935', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                    Oops! Try Again.
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="sorting"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '2rem', color: 'var(--text-color)' }}>Helpful Hero Sorting</h2>
                            <p style={{ opacity: 0.7, fontSize: '1.2rem' }}>Tap an item, then tap the box it belongs to!</p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                <TextToSpeech text="Tap an item, then tap the box it belongs to!" />
                                <button
                                    onClick={() => {
                                        const utterance = new SpeechSynthesisUtterance("Mathematical Concept: Set Theory. We are classifying items into specific logical groups.");
                                        window.speechSynthesis.speak(utterance);
                                    }}
                                    style={{
                                        background: '#e0f2f1', border: '1px solid #80cbc4', borderRadius: '20px',
                                        padding: '0.2rem 0.8rem', fontSize: '0.8rem', cursor: 'pointer', color: '#00695c',
                                        display: 'flex', alignItems: 'center', gap: '5px'
                                    }}
                                >
                                    🧩 Math Concept
                                </button>
                            </div>
                        </header>

                        {/* Bins */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                            {LEVELS.sorting[0].categories.map((cat) => (
                                <motion.div
                                    key={cat.name}
                                    onClick={() => handleSort(cat.name)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        width: '200px', height: '220px',
                                        border: `4px dashed ${cat.color}`,
                                        borderRadius: '20px',
                                        background: `${cat.color}20`,
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem',
                                        cursor: 'pointer',
                                        position: 'relative'
                                    }}
                                >
                                    <h3 style={{ color: 'var(--text-color)', marginBottom: '0.5rem' }}>{cat.name}</h3>
                                    <div style={{
                                        display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center',
                                        width: '100%', height: '100%', alignContent: 'flex-start'
                                    }}>
                                        {Object.values(sortedItems).map((item) => {
                                            if (item.category === cat.name) {
                                                return <span key={item.id} style={{ fontSize: '2rem' }} title={item.name}>{item.icon}</span>;
                                            }
                                            return null;
                                        })}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Items Pool */}
                        <div style={{
                            display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap',
                            minHeight: '100px', padding: '1rem', background: '#f5f5f5', borderRadius: '20px'
                        }}>
                            <AnimatePresence>
                                {LEVELS.sorting[0].items.filter(item => !sortedItems[item.id]).map((item) => (
                                    <motion.button
                                        key={item.id}
                                        layoutId={item.id}
                                        onClick={() => setSelectedItem(item)}
                                        initial={{ scale: 0 }}
                                        animate={{
                                            scale: selectedItem?.id === item.id ? 1.2 : 1,
                                            boxShadow: selectedItem?.id === item.id ? '0 10px 20px rgba(0,0,0,0.2)' : 'none'
                                        }}
                                        exit={{ scale: 0 }}
                                        whileHover={{ y: -5 }}
                                        style={{
                                            fontSize: '3rem',
                                            padding: '1rem',
                                            background: 'white',
                                            border: selectedItem?.id === item.id ? '3px solid var(--primary-color)' : '1px solid #ddd',
                                            borderRadius: '15px',
                                            cursor: 'pointer',
                                            position: 'relative'
                                        }}
                                    >
                                        {item.icon}
                                        <span style={{
                                            display: 'block', fontSize: '0.8rem', position: 'absolute', bottom: '2px', left: 0, width: '100%',
                                            textAlign: 'center', opacity: 0.6
                                        }}>{item.name}</span>
                                    </motion.button>
                                ))}
                            </AnimatePresence>
                            {Object.keys(sortedItems).length === LEVELS.sorting[0].items.length && (
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    style={{ fontSize: '1.5rem', color: '#4caf50', fontWeight: 'bold', alignSelf: 'center' }}
                                >
                                    All Sorted! Great Job! 🌟
                                    <button
                                        onClick={() => setSortedItems({})}
                                        style={{ display: 'block', margin: '1rem auto', fontSize: '1rem', padding: '0.5rem 1rem', background: '#333', color: '#fff', borderRadius: '5px' }}
                                    >
                                        Play Again
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

const ControlBtn = ({ icon, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        style={{
            width: '60px', height: '60px', borderRadius: '15px',
            background: 'white', boxShadow: '0 5px 0 #ddd',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1
        }}
    >
        {icon}
    </button>
);

export default SensoryLogicLab;
