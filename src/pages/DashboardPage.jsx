import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    CartesianGrid, Area, AreaChart, Cell
} from 'recharts';
import { lessonsData } from '../data/lessonsData';
import { quizQuestions } from '../data/quizData';
import { BookOpen, Brain, Trophy, TrendingUp, ArrowRight, BarChart3, Activity, Target, Heart, Shield, Zap } from 'lucide-react';
import '../styles/dashboard.css';
import Antigravity from '../components/Antigravity';

// --- Data Preparation ---
const stepsPerTopic = lessonsData.map(lesson => ({
    name: lesson.title.length > 10 ? lesson.title.substring(0, 9) + '…' : lesson.title,
    fullName: lesson.title,
    steps: lesson.steps.length,
    color: lesson.color,
}));

// Simulated quiz score trend
const quizTrend = [
    { attempt: 'Try 1', score: 3 },
    { attempt: 'Try 2', score: 4 },
    { attempt: 'Try 3', score: 5 },
    { attempt: 'Try 4', score: 6 },
    { attempt: 'Try 5', score: 7 },
    { attempt: 'Try 6', score: 8 },
    { attempt: 'Try 7', score: 9 },
];

// --- Custom Tooltip ---
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{payload[0]?.payload?.fullName || label}</p>
                <p style={{ color: payload[0]?.color || 'var(--primary-color)' }}>
                    {payload[0]?.name === 'steps' ? `${payload[0].value} Steps` : `Score: ${payload[0].value}/${quizQuestions.length}`}
                </p>
            </div>
        );
    }
    return null;
};

// --- Animated Counter ---
const AnimatedCounter = ({ value, duration = 1.5 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = value;
        if (end === 0) return;
        const stepTime = Math.max((duration * 1000) / end, 30);
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(timer);
        }, stepTime);
        return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{count}</span>;
};

// --- 3D Rotating First Aid Cross ---
const RotatingHero3D = () => {
    const containerRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 100, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 100, damping: 30 });

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Floating labels around the cross
    const floatingLabels = [
        { text: 'Bleeding', icon: '🩸', x: '10%', y: '10%', delay: 0 },
        { text: 'Burns', icon: '🔥', x: '80%', y: '20%', delay: 0.3 },
        { text: 'Choking', icon: '😤', x: '20%', y: '80%', delay: 0.6 },
        { text: 'Sprains', icon: '🦵', x: '75%', y: '70%', delay: 0.9 },
    ];

    return (
        <div
            ref={containerRef}
            className="hero-3d-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Glow backdrop */}
            <div className="hero-glow"></div>



            {/* Antigravity Animation - Replaces Orbiting rings */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.8 }}>
                <Antigravity
                    count={350}
                    magnetRadius={15}
                    ringRadius={13}
                    particleSize={1.6}
                    color={['#ef4444', '#3b82f6', '#ffffff', '#10b981']} // Red, Blue, White, Green
                    autoAnimate={true}
                    rotationSpeed={0.8}
                    pulseSpeed={2.5}
                    particleShape="sphere" // Sphere looks cleanest for medical "cells"
                />
            </div>

            {/* Main 3D First Aid Cross */}
            <motion.div
                className="hero-3d-cross-wrapper"
                style={{
                    rotateX,
                    rotateY,
                    transformPerspective: 800,
                }}
            >
                <motion.div
                    className="hero-3d-cross"
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    {/* Cross shape */}
                    <div className="cross-shape">
                        <div className="cross-vertical"></div>
                        <div className="cross-horizontal"></div>
                    </div>

                    {/* Shield overlay */}
                    <motion.div
                        className="cross-shield-icon"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Shield size={40} />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Floating Labels */}
            {floatingLabels.map((label, i) => (
                <motion.div
                    key={i}
                    className="floating-label"
                    style={{ top: label.y, left: label.x, position: 'absolute' }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
                    transition={{
                        scale: { duration: 0.5, delay: label.delay },
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    <span>{label.icon} {label.text}</span>
                </motion.div>
            ))}

            {/* Particle effects */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="hero-particle"
                    style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        position: 'absolute',
                        width: '4px',
                        height: '4px',
                        background: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '50%',
                        pointerEvents: 'none'
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.7, 0.3],
                        scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

// --- Progress Ring ---
const ProgressRing = ({ percentage, size = 140, strokeWidth = 12, color = 'var(--primary-color)' }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    return (
        <div className="progress-ring-container">
            <svg className="progress-ring-svg" width={size} height={size}>
                <circle
                    stroke="rgba(0,0,0,0.08)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <motion.circle
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    fill="none"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: circumference - (percentage / 100) * circumference }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ strokeDasharray: circumference }}
                />
            </svg>
            <motion.div
                className="progress-ring-label"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
            >
                {percentage}%
            </motion.div>
            <div className="progress-ring-sublabel">Lessons Available</div>
        </div>
    );
};

// --- Main Dashboard Component ---
const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'topics', label: 'Topics', icon: BookOpen },
        { id: 'quiz', label: 'Quiz Stats', icon: Brain },
    ];

    const totalSteps = lessonsData.reduce((acc, l) => acc + l.steps.length, 0);
    const totalLessons = lessonsData.length;
    const totalQuestions = quizQuestions.length;
    const videosAvailable = lessonsData.filter(l => l.videoId).length;

    // Stagger animation variants
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <div className="dashboard-container">
            {/* Hero Section with 3D Rotating Cross */}
            <div className="dashboard-hero-section">
                <div className="dashboard-hero-text">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="hero-badge">
                            <Heart size={14} /> Learning Progress
                        </span>
                        <h1 className="dashboard-hero-title">First Aid<br />Dashboard</h1>
                        <p className="dashboard-hero-subtitle">
                            Track your first aid learning journey — every topic, quiz, and skill at a glance!
                        </p>
                        <div className="hero-quick-stats">
                            <div className="hero-stat">
                                <span className="hero-stat-value">{totalLessons}</span>
                                <span className="hero-stat-label">Lessons</span>
                            </div>
                            <div className="hero-stat-divider"></div>
                            <div className="hero-stat">
                                <span className="hero-stat-value">{totalSteps}</span>
                                <span className="hero-stat-label">Steps</span>
                            </div>
                            <div className="hero-stat-divider"></div>
                            <div className="hero-stat">
                                <span className="hero-stat-value">{totalQuestions}</span>
                                <span className="hero-stat-label">Questions</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    className="dashboard-hero-visual"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <RotatingHero3D />
                </motion.div>
            </div>

            {/* Tab Navigation */}
            <motion.div
                className="dashboard-tabs"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
            >
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`dashboard-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <tab.icon size={16} style={{ marginRight: '0.4rem', verticalAlign: '-2px' }} />
                        {tab.label}
                    </button>
                ))}
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Stats Cards */}
                        <motion.div
                            className="stats-grid"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {[
                                { icon: BookOpen, label: 'Total Lessons', value: totalLessons, color: '#ef4444', bg: '#FEE2E2' },
                                { icon: Target, label: 'Total Steps', value: totalSteps, color: '#3b82f6', bg: '#DBEAFE' },
                                { icon: Brain, label: 'Quiz Questions', value: totalQuestions, color: '#8b5cf6', bg: '#EDE9FE' },
                                { icon: Trophy, label: 'Video Tutorials', value: videosAvailable, color: '#10b981', bg: '#D1FAE5' },
                            ].map((stat, i) => (
                                <motion.div key={i} className="dash-card stat-card" variants={itemVariants}>
                                    <div className="stat-icon-wrap" style={{ background: stat.bg }}>
                                        <stat.icon size={26} color={stat.color} />
                                    </div>
                                    <div className="stat-value" style={{ color: stat.color }}>
                                        <AnimatedCounter value={stat.value} />
                                    </div>
                                    <div className="stat-label">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Charts Row */}
                        <div className="charts-grid">
                            {/* Bar Chart — Steps Per Topic */}
                            <motion.div
                                className="dash-card"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="dash-card-title">
                                    <BarChart3 size={20} color="var(--primary-color)" />
                                    Steps Per Topic
                                </div>
                                <div className="chart-container">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={stepsPerTopic}
                                            margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
                                            barCategoryGap="25%"
                                            barGap={4}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
                                            <XAxis
                                                dataKey="name"
                                                tick={{ fontSize: 10, fill: 'var(--text-color)' }}
                                                axisLine={false}
                                                tickLine={false}
                                                interval={0}
                                                angle={-35}
                                                textAnchor="end"
                                                height={60}
                                            />
                                            <YAxis
                                                tick={{ fontSize: 11, fill: 'var(--text-color)' }}
                                                axisLine={false}
                                                tickLine={false}
                                                allowDecimals={false}
                                            />
                                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
                                            <Bar
                                                dataKey="steps"
                                                radius={[8, 8, 0, 0]}
                                                maxBarSize={36}
                                                animationDuration={1200}
                                                animationEasing="ease-out"
                                            >
                                                {stepsPerTopic.map((entry, index) => (
                                                    <Cell key={index} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>

                            {/* Progress Ring */}
                            <motion.div
                                className="dash-card"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="dash-card-title">
                                    <Target size={20} color="var(--primary-color)" />
                                    Content Coverage
                                </div>
                                <ProgressRing percentage={100} color="var(--primary-color)" />
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'topics' && (
                    <motion.div
                        key="topics"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <motion.div
                            className="topics-grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {lessonsData.map((lesson, i) => (
                                <motion.div key={lesson.id} variants={itemVariants}>
                                    <Link to={`/lesson/${lesson.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div className="dash-card topic-card">
                                            <div
                                                className="topic-icon-wrap"
                                                style={{ background: `${lesson.color}20` }}
                                            >
                                                <lesson.icon size={24} color={lesson.color} />
                                            </div>
                                            <div className="topic-info">
                                                <h3>{lesson.title}</h3>
                                                <p>{lesson.steps.length} steps · {lesson.videoId ? '📺 Video' : 'No video'}</p>
                                            </div>
                                            <ArrowRight size={18} style={{ marginLeft: 'auto', opacity: 0.4 }} />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}

                {activeTab === 'quiz' && (
                    <motion.div
                        key="quiz"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="charts-grid">
                            {/* Area Chart — Quiz Score Trend */}
                            <motion.div
                                className="dash-card"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="dash-card-title">
                                    <TrendingUp size={20} color="#10b981" />
                                    Quiz Score Trend
                                </div>
                                <div className="chart-container">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={quizTrend} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                                            <defs>
                                                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                                            <XAxis
                                                dataKey="attempt"
                                                tick={{ fontSize: 11, fill: 'var(--text-color)' }}
                                                axisLine={false}
                                                tickLine={false}
                                            />
                                            <YAxis
                                                tick={{ fontSize: 11, fill: 'var(--text-color)' }}
                                                axisLine={false}
                                                tickLine={false}
                                                domain={[0, 10]}
                                                allowDecimals={false}
                                            />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Area
                                                type="monotone"
                                                dataKey="score"
                                                stroke="#10b981"
                                                strokeWidth={3}
                                                fill="url(#scoreGradient)"
                                                dot={{ r: 5, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
                                                activeDot={{ r: 7, fill: '#10b981' }}
                                                animationDuration={1500}
                                                animationEasing="ease-out"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>

                            {/* Quiz Info Card */}
                            <motion.div
                                className="dash-card"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="dash-card-title">
                                    <Activity size={20} color="#8b5cf6" />
                                    Quiz Overview
                                </div>
                                <div style={{ padding: '1rem 0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <span style={{ fontWeight: 600, opacity: 0.7 }}>Total Questions</span>
                                        <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>{totalQuestions}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <span style={{ fontWeight: 600, opacity: 0.7 }}>Topics Covered</span>
                                        <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>{totalLessons}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <span style={{ fontWeight: 600, opacity: 0.7 }}>Best Score</span>
                                        <span style={{ fontWeight: 800, fontSize: '1.25rem', color: '#10b981' }}>9/{totalQuestions}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                        <span style={{ fontWeight: 600, opacity: 0.7 }}>Attempts</span>
                                        <span style={{ fontWeight: 800, fontSize: '1.25rem' }}>7</span>
                                    </div>
                                    <Link to="/quiz" style={{ textDecoration: 'none' }}>
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                borderRadius: '14px',
                                                border: 'none',
                                                background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                                                color: 'white',
                                                fontSize: '1rem',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem',
                                                boxShadow: '0 8px 20px rgba(139, 92, 246, 0.3)',
                                            }}
                                        >
                                            Take Quiz <ArrowRight size={18} />
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DashboardPage;
