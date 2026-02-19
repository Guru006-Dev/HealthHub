import React from 'react';
import { motion } from 'framer-motion';
import DisplayCards from '../components/ui/display-cards';
import { Brain, Gamepad2, ClipboardCheck } from "lucide-react";

const GamesPage = () => {
    const gameCards = [
        {
            icon: <Brain className="size-6 text-emerald-300" />,
            title: "Sensory Logic",
            description: "Train your brain",
            date: "Puzzle Game",
            link: "/sensory-math",
            iconClassName: "bg-emerald-500/20 text-emerald-400",
            titleClassName: "text-emerald-400",
            className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0 cursor-pointer",
        },
        {
            icon: <Gamepad2 className="size-6 text-purple-300" />,
            title: "Germ Buster",
            description: "Fight the germs!",
            date: "Action Game",
            link: "/germ-buster",
            iconClassName: "bg-purple-500/20 text-purple-400",
            titleClassName: "text-purple-400",
            className: "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0 cursor-pointer",
        },
        {
            icon: <ClipboardCheck className="size-6 text-pink-300" />,
            title: "Safety Quiz",
            description: "Test your knowledge",
            date: "Knowledge Check",
            link: "/quiz",
            iconClassName: "bg-pink-500/20 text-pink-400",
            titleClassName: "text-pink-400",
            className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10 cursor-pointer",
        },
    ];

    return (
        <div className="games-page" style={{ paddingTop: '8rem', paddingBottom: '4rem', minHeight: '100vh', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    textAlign: 'center',
                    marginBottom: '2rem',
                    color: '#1e293b',
                    fontSize: '4rem',
                    fontWeight: '800',
                    textShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
            >
                Game Zone 🎮
            </motion.h1>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <DisplayCards cards={gameCards} />
            </div>
        </div>
    );
};

export default GamesPage;
