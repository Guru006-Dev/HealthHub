"use client";

import { cn } from "@/lib/utils";
import { Sparkles, Gamepad2, Brain, Activity } from "lucide-react";
import { Link } from "react-router-dom";

export function DisplayCard({
    className,
    icon = <Sparkles className="size-4 text-blue-300" />,
    title = "Featured",
    description = "Discover amazing content",
    date = "Just now",
    iconClassName = "text-blue-500",
    titleClassName = "text-blue-500",
    link = "#"
}) {
    return (
        <Link to={link}>
            <div
                className={cn(
                    "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2",
                    "hover:scale-105 hover:-skew-y-0 hover:z-50 shadow-xl", // Added some hover effects
                    className
                )}
            >
                <div>
                    <span className={cn("relative inline-block rounded-full p-2 bg-white/10", iconClassName)}>
                        {icon}
                    </span>
                    <p className={cn("text-lg font-bold ml-2", titleClassName)}>{title}</p>
                </div>
                <p className="whitespace-nowrap text-md font-medium text-foreground/80">{description}</p>
                <p className="text-muted-foreground text-xs font-mono">{date}</p>
            </div>
        </Link>
    );
}

export default function DisplayCards({ cards }) {
    const defaultCards = [
        {
            icon: <Brain className="size-6 text-emerald-300" />,
            title: "Sensory Logic",
            description: "Train your brain",
            date: "Puzzle Game",
            iconClassName: "bg-emerald-500/20 text-emerald-400",
            titleClassName: "text-emerald-400",
            link: "/sensory-math",
            className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            icon: <Gamepad2 className="size-6 text-purple-300" />,
            title: "Germ Buster",
            description: "Fight the germs!",
            date: "Action Game",
            iconClassName: "bg-purple-500/20 text-purple-400",
            titleClassName: "text-purple-400",
            link: "/germ-buster",
            className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            icon: <Activity className="size-6 text-pink-300" />,
            title: "More Coming Soon",
            description: "Stay tuned for updates",
            date: "In Development",
            iconClassName: "bg-pink-500/20 text-pink-400",
            titleClassName: "text-pink-400",
            link: "/games", // processed link
            className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
        },
    ];

    const displayCards = cards || defaultCards;

    return (
        <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 py-20">
            {displayCards.map((cardProps, index) => (
                <DisplayCard key={index} {...cardProps} />
            ))}
        </div>
    );
}
