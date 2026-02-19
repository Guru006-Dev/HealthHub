import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard = ({ children, className, style }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Glow effect coordinates (0% to 100%)
    const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
    const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000,
                ...style
            }}
            className={`tilt-card ${className || ''}`}
        >
            {/* Glow Overlay */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: 'inherit', // Match parent border radius
                    background: useMotionValue(`radial-gradient(circle at 50% 50%, rgba(255,255,255,0), transparent)`), // Initial value
                    backgroundImage: useTransform(
                        [glowX, glowY],
                        ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, ${style?.borderColor || 'rgba(255,255,255,0.3)'}, transparent 80%)`
                    ),
                    opacity: 0.4,
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />

            <div style={{ transform: "translateZ(30px)", position: 'relative', zIndex: 2 }}>
                {children}
            </div>
        </motion.div>
    );
};

export default TiltCard;
