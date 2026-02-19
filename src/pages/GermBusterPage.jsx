import React from 'react';
import GermBuster from '../components/GermBuster';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const GermBusterPage = () => {
    return (
        <div className="germ-buster-page" style={{ paddingTop: '6rem', paddingBottom: '4rem', minHeight: '100vh' }}>
            <div className="container">
                <Link
                    to="/games"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '2rem',
                        textDecoration: 'none',
                        color: 'var(--secondary-color)',
                        fontWeight: 'bold'
                    }}
                >
                    <ArrowLeft size={20} /> Back to Games
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <GermBuster />
                </motion.div>
            </div>
        </div>
    );
};

export default GermBusterPage;
