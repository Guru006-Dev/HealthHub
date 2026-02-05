import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ children, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.6,
                delay: delay,
                type: "spring",
                bounce: 0.3
            }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
