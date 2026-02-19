import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { playHoverSound, playClickSound } from '../utils/soundEffects';
import FlowingMenu from './FlowingMenu';

const Navbar = ({ isCalmMode }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const location = useLocation();

    // Check if we are on the Landing Page (Dashboard)
    const isLandingPage = location.pathname === '/';

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
    const navBackground = 'transparent'; // Always transparent as requested/styled
    const navTextColor = 'var(--nav-text)';

    const menuItems = [
        { text: 'Dashboard', link: '/dashboard', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1932&auto=format&fit=crop' },
        { text: 'Lessons', link: '/lessons', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop' },
        { text: 'Find Help', link: '/find-help', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop' },
        { text: 'My Profile', link: '/profile', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1932&auto=format&fit=crop' },
        { text: 'My Kit', link: '/kit', image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=2070&auto=format&fit=crop' },
        { text: 'Games', link: '/games', image: 'https://images.unsplash.com/photo-1616428789502-36c968f8691f?q=80&w=2070&auto=format&fit=crop' },
        { text: 'Take Quiz', link: '/quiz', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop' },
    ];

    return (
        <>
            <motion.nav
                role="navigation"
                initial={{ padding: '1.2rem 1rem', background: 'transparent' }}
                animate={{
                    padding: isScrolled ? '0.5rem 1rem' : '1.2rem 1rem',
                    background: 'transparent',
                }}
                transition={{ duration: 0.3 }}
                style={{
                    position: 'absolute',
                    width: '100%',
                    top: 0,
                    zIndex: 100,
                    color: isLandingPage ? '#fff' : navTextColor,
                }}
            >
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link
                        to="/"
                        onClick={playClickSound}
                        onMouseEnter={playHoverSound}
                        style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Home size={28} />
                        <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>First Aid</span>
                    </Link>

                    {/* Hamburger Menu Button - Always Visible */}
                    <button
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', padding: '0.5rem', display: 'block' }}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.nav>

            {/* Flowing Menu Overlay */}
            {isMenuOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999 }}>
                    <FlowingMenu
                        items={menuItems}
                        borderColor="rgba(100,100,100, 0.2)"
                        textColor="var(--text-color)"
                        marqueeBgColor="var(--primary-color)"
                        marqueeTextColor="var(--bg-color)"
                        bgColor="var(--bg-color)"
                        onClose={() => setIsMenuOpen(false)}
                    />
                </div>
            )}
        </>
    );
};

export default Navbar;
