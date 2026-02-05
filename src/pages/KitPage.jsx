import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Check, Star } from 'lucide-react';

const kitItems = [
    { id: 'bandages', name: 'Plasters / Band-Aids', icon: '🩹' },
    { id: 'wipes', name: 'Antiseptic Wipes', icon: '🧻' },
    { id: 'gauze', name: 'Gauze Pads', icon: '⬜' },
    { id: 'scissors', name: 'Scissors', icon: '✂️' },
    { id: 'gloves', name: 'Disposable Gloves', icon: '🧤' },
    { id: 'flashlight', name: 'Flashlight', icon: '🔦' },
    { id: 'thermometer', name: 'Thermometer', icon: '🌡️' },
    { id: 'icepack', name: 'Instant Ice Pack', icon: '🧊' }
];

const KitPage = () => {
    const [checkedItems, setCheckedItems] = useState({});

    // Load state
    useEffect(() => {
        const saved = localStorage.getItem('healthHubKit');
        if (saved) {
            setCheckedItems(JSON.parse(saved));
        }
    }, []);

    // Toggle item
    const toggleItem = (id) => {
        const newChecked = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(newChecked);
        localStorage.setItem('healthHubKit', JSON.stringify(newChecked));
    };

    // Calculate progress
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    const progress = (checkedCount / kitItems.length) * 100;
    const isComplete = progress === 100;

    return (
        <div className="container" style={{ maxWidth: '800px', paddingBottom: '3rem', paddingTop: '100px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{ padding: '2rem' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <Briefcase size={40} color="var(--primary-color)" />
                    <h1 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--text-color)' }}>My First Aid Kit</h1>
                </div>

                <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                    Do you have these items at home? Check them off to build your digital kit!
                </p>

                {/* Progress Bar */}
                <div style={{ height: '20px', background: 'rgba(0,0,0,0.1)', borderRadius: '10px', overflow: 'hidden', marginBottom: '2rem' }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                        style={{ height: '100%', background: isComplete ? '#22c55e' : 'var(--primary-color)', borderRadius: '10px' }}
                    />
                </div>
                <div style={{ textAlign: 'right', fontWeight: 'bold', marginBottom: '2rem' }}>
                    {Math.round(progress)}% Ready
                </div>

                {/* Badge Award */}
                {isComplete && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="glass-card"
                        style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FDB931 100%)', color: '#000', padding: '1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
                    >
                        <Star size={32} fill="white" stroke="none" />
                        <div>
                            <h3 style={{ margin: 0 }}>Safety Scout Award!</h3>
                            <p style={{ margin: 0 }}>Your kit is fully stocked!</p>
                        </div>
                        <Star size={32} fill="white" stroke="none" />
                    </motion.div>
                )}

                {/* Checklist Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                    {kitItems.map((item) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleItem(item.id)}
                            style={{
                                padding: '1rem',
                                background: checkedItems[item.id] ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.05)',
                                border: checkedItems[item.id] ? '2px solid #22c55e' : '1px solid rgba(0,0,0,0.1)',
                                borderRadius: '1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                opacity: checkedItems[item.id] ? 1 : 0.7
                            }}
                        >
                            <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                            <div style={{ flex: 1, fontWeight: 'bold' }}>{item.name}</div>
                            {checkedItems[item.id] && <Check color="#22c55e" />}
                        </motion.div>
                    ))}
                </div>

            </motion.div>
        </div>
    );
};

export default KitPage;
