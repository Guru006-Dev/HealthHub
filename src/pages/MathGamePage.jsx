import React from 'react';
import MathGame from '../components/MathGame';
import { motion } from 'framer-motion';

const MathGamePage = () => {
    return (
        <div className="math-game-page" style={{ paddingTop: '8rem', paddingBottom: '4rem', minHeight: '100vh' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <MathGame />
            </motion.div>
        </div>
    );
};

export default MathGamePage;
