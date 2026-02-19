import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => (
    <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: '1rem 0',
            background: 'rgba(15, 23, 42, 0.3)', // Dark Glass to match Home
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center',
            color: '#cbd5e1', // Light slate text

            zIndex: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem'
        }}
    >
        <span>© 2026 First Aid Learning App. All rights reserved.</span>
        <span style={{ opacity: 0.5 }}>|</span>
        <Link to="/about" style={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 'bold' }}>
            About & Credits
        </Link>
    </motion.footer>
);

export default Footer;
