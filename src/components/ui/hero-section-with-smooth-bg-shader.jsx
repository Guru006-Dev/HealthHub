import { MeshGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

export function HeroSection({
    title = "Intelligent AI Agents for",
    highlightText = "Smart Brands",
    description = "Transform your brand and evolve it through AI-driven brand guidelines and always up-to-date core components.",
    buttonText = "Join Waitlist",
    onButtonClick,
    colors = ["#72b9bb", "#b5d9d9", "#ffd1bd", "#ffebe0", "#8cc5b8", "#dbf4a4"],
    distortion = 0.8,
    swirl = 0.6,
    speed = 0.42,
    offsetX = 0.08,
    className = "",
    titleClassName = "",
    descriptionClassName = "",
    buttonClassName = "",
    maxWidth = "max-w-6xl",
    veilOpacity = "bg-white/20 dark:bg-black/25",
    fontFamily = "Satoshi, sans-serif",
    fontWeight = 500,
}) {
    const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const update = () =>
            setDimensions({
                width: window.innerWidth, // Use window width for full screen effect if needed
                height: window.innerHeight,
            });
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const handleButtonClick = () => {
        if (onButtonClick) {
            onButtonClick();
        }
    };

    return (
        <section className={`relative w-full h-full overflow-hidden bg-background flex items-center justify-center ${className}`}>
            <div className="absolute inset-0 w-full h-full">
                {mounted && (
                    <>
                        <MeshGradient
                            width={dimensions.width}
                            height={dimensions.height}
                            colors={colors}
                            distortion={distortion}
                            swirl={swirl}
                            grainMixer={0}
                            grainOverlay={0}
                            speed={speed}
                            offsetX={offsetX}
                        />
                        {/* Veil overlay */}
                        <div className={`absolute inset-0 pointer-events-none ${veilOpacity}`} />
                    </>
                )}
            </div>

            {/* Content Overlay - Optional, can be empty if used as background only */}
            {(title || description || buttonText) && (
                <div className={`relative z-10 ${maxWidth} mx-auto px-6 w-full pointer-events-none`}>
                    {/* Added pointer-events-none to container so it doesn't block clicks unless on specific elements. 
                However, for a Hero Section, usually text is selectalbe. 
                But if used as a background for something else, we might need care.
                For now, keeping it standard.
            */}
                    <div className="text-center pointer-events-auto">
                        {title && (
                            <h1
                                className={`font-bold text-foreground text-balance text-4xl sm:text-5xl md:text-6xl xl:text-[80px] leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-[1.1] mb-6 lg:text-7xl ${titleClassName}`}
                                style={{ fontFamily, fontWeight }}
                            >
                                {title} <span className="text-primary">{highlightText}</span>
                            </h1>
                        )}
                        {description && (
                            <p className={`text-lg sm:text-xl text-white text-pretty max-w-2xl mx-auto leading-relaxed mb-10 px-4 ${descriptionClassName}`}>
                                {description}
                            </p>
                        )}
                        {buttonText && (
                            <button
                                onClick={handleButtonClick}
                                className={`px-6 py-4 sm:px-8 sm:py-6 rounded-full border-4 bg-[rgba(63,63,63,1)] border-card text-sm sm:text-base text-white hover:bg-[rgba(63,63,63,0.9)] transition-colors ${buttonClassName}`}
                            >
                                {buttonText}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
