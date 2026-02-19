import React from 'react';
import SensoryLogicLab from '../components/SensoryLogicLab';
import { motion } from 'framer-motion';

const SensoryLogicPage = () => {
    return (
        <div style={{
            paddingTop: '8rem',
            paddingBottom: '4rem',
            minHeight: '100vh',
            background: 'var(--bg-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    color: 'var(--text-color)',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    fontSize: '2.5rem'
                }}
            >
                Sensory Logic Lab 🧠
            </motion.h1>

            <SensoryLogicLab />
        </div>
    );
};

export default SensoryLogicPage;
