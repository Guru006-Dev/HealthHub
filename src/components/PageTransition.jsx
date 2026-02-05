import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }} // Zoom out & Slide down initially
            animate={{ opacity: 1, scale: 1, y: 0 }} // Zoom in & Slide up to natural position
            exit={{ opacity: 0, scale: 1.05, y: -40 }} // Zoom slightly in & Slide up on exit
            transition={{
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96] // Smooth ease-out curve
            }}
            style={{ width: '100%', height: '100%' }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
