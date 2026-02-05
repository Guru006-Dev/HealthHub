import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { playHoverSound, playClickSound } from '../utils/soundEffects';

const Navbar = ({ isCalmMode }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const location = useLocation();

    // Check if we are on the Home Page (Space Theme)
    const isHomePage = location.pathname === '/home' || location.pathname === '/';

    const toggleMenu = () => {
        playClickSound();
        setIsMenuOpen(!isMenuOpen);
    };

    // Scroll Detection for Shrinking Header
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = React.useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    // Dynamic Styles based on route
    const navBackground = isHomePage
        ? 'rgba(15, 23, 42, 0.3)' // Unified Dark Glass
        : isCalmMode
            ? 'rgba(231, 229, 228, 0.8)' // Warm grey for Calm Mode
            : 'rgba(255, 255, 255, 0.65)'; // Bright white for Default

    const navTextColor = isHomePage ? '#F8FAFC' : 'var(--nav-text)';
    const navBorder = isHomePage ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)';

    return (
        <motion.nav
            role="navigation"
            initial={{ padding: '1.2rem 1rem', background: navBackground }}
            animate={{
                padding: isScrolled ? '0.5rem 1rem' : '1.2rem 1rem',
                // Always transparent background as requested
                background: 'transparent',
                borderBottom: 'none'
            }}
            transition={{ duration: 0.3 }}
            style={{
                backdropFilter: 'none',
                WebkitBackdropFilter: 'none',
                color: navTextColor,
                position: 'absolute', // Overlay content
                width: '100%',
                top: 0,
                zIndex: 100,
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link
                    to="/home"
                    onClick={playClickSound}
                    onMouseEnter={playHoverSound}
                    style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <Home size={28} />
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>First Aid</span>
                </Link>

                <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/find-help" style={{ textDecoration: 'none', color: 'inherit', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        Find Help
                    </Link>
                    <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        My Safety Profile
                    </Link>
                    <Link to="/kit" style={{ textDecoration: 'none', color: 'inherit', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        My Kit
                    </Link>
                    <Link to="/quiz">
                        <motion.button
                            onClick={playClickSound}
                            onMouseEnter={playHoverSound}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                background: isHomePage ? 'rgba(255,255,255,0.1)' : 'var(--card-bg)',
                                color: isHomePage ? '#fff' : 'var(--text-color)',
                                border: isHomePage ? '1px solid rgba(255,255,255,0.2)' : 'none',
                                padding: '0.5rem 1.25rem',
                                borderRadius: '2rem',
                                fontWeight: 'bold',
                                boxShadow: isHomePage ? '0 4px 12px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
                                cursor: 'pointer'
                            }}
                        >
                            Take Quiz
                        </motion.button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: '0.5rem' }}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
                style={{
                    background: isHomePage ? '#0f172a' : 'var(--card-bg)',
                    color: isHomePage ? '#fff' : 'inherit'
                }}
            >
                <Link to="/quiz" onClick={() => { playClickSound(); setIsMenuOpen(false); }} style={{ width: '100%', textDecoration: 'none' }}>
                    <div className="btn-large" style={{
                        padding: '1rem',
                        flexDirection: 'row',
                        background: isHomePage ? 'rgba(255,255,255,0.05)' : 'var(--card-bg)',
                        color: isHomePage ? '#fff' : 'inherit',
                        borderColor: isHomePage ? 'rgba(255,255,255,0.1)' : 'transparent'
                    }}>
                        <span>Take Quiz</span>
                    </div>
                </Link>
                <Link to="/find-help" onClick={() => { playClickSound(); setIsMenuOpen(false); }} style={{ width: '100%', textDecoration: 'none', marginTop: '0.5rem' }}>
                    <div className="btn-large" style={{
                        padding: '1rem',
                        flexDirection: 'row',
                        background: isHomePage ? 'rgba(255,255,255,0.05)' : 'var(--card-bg)',
                        color: isHomePage ? '#fff' : 'inherit',
                        borderColor: isHomePage ? 'rgba(255,255,255,0.1)' : 'transparent'
                    }}>
                        <span>Find Help</span>
                    </div>
                </Link>
            </div>
        </motion.nav>
    );
};

export default Navbar;
