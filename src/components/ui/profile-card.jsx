"use client"

import { motion, useReducedMotion } from "framer-motion"
import { Check, Users, UserCheck } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function ProfileCard({
    name = "Sophie Bennett",
    description = "Product Designer who focuses on simplicity & usability.",
    image = "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=800&h=800&fit=crop&auto=format&q=80",
    isVerified = true,
    followers = 312,
    following = 48,
    enableAnimations = true,
    className,
    onFollow = () => { },
    isFollowing = false,
    triggers = "",
    calming = "",
    contact = "",
    isSafetyCard = false
}) {
    const [hovered, setHovered] = useState(false)
    const shouldReduceMotion = useReducedMotion()
    const shouldAnimate = enableAnimations && !shouldReduceMotion

    const containerVariants = {
        rest: {
            scale: 1,
            y: 0,
        },
        hover: shouldAnimate ? {
            scale: 1.02,
            y: -4,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 28,
                mass: 0.6,
            }
        } : {},
    }

    const imageVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.05 },
    }

    const contentVariants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 28,
                mass: 0.6,
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 15,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 0.5,
            },
        },
    }

    const letterVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                damping: 8,
                stiffness: 200,
                mass: 0.8,
            },
        },
    }

    return (
        <motion.div
            data-slot="profile-hover-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            initial="rest"
            whileHover="hover"
            variants={containerVariants}
            className={cn(
                "relative w-[340px] h-[480px] rounded-[30px] border border-white/20 overflow-hidden shadow-2xl cursor-pointer group backdrop-blur-md",
                "bg-white/10 dark:bg-black/20",
                className
            )}
        >
            {/* Full Cover Image */}
            <motion.img
                src={image}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover"
                variants={imageVariants}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {/* Smooth Blur Overlay - Multiple layers for seamless fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-[2px]" />

            {/* Content */}
            <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="absolute bottom-0 left-0 right-0 p-6 space-y-6 text-white"
            >
                {/* Name and Verification */}
                <motion.div variants={itemVariants} className="flex items-center gap-2">
                    <motion.h2
                        className="text-3xl font-bold text-white tracking-tight"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.02,
                                }
                            }
                        }}
                    >
                        {name.split("").map((letter, index) => (
                            <motion.span
                                key={index}
                                variants={letterVariants}
                                className="inline-block"
                            >
                                {letter === " " ? "\u00A0" : letter}
                            </motion.span>
                        ))}
                    </motion.h2>
                    {isVerified && (
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                            whileHover={{
                                scale: 1.1,
                                rotate: 5,
                                transition: { type: "spring", stiffness: 400, damping: 20 }
                            }}
                        >
                            <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        </motion.div>
                    )}
                </motion.div>

                {/* Safety Card Specific Content */}
                {isSafetyCard ? (
                    <div className="space-y-4">
                        <motion.div variants={itemVariants} className="bg-red-500/80 backdrop-blur-md rounded-xl p-3 border border-red-400/30">
                            <p className="text-white/90 text-xs font-bold uppercase tracking-wider mb-1">Emergency Contact</p>
                            <p className="text-white font-mono text-lg font-bold">{contact || "No Contact"}</p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-2">
                            <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                                <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Triggers</p>
                                <p className="text-white text-sm font-medium leading-snug line-clamp-2">{triggers || "None"}</p>
                            </motion.div>
                            <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                                <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Calming</p>
                                <p className="text-white text-sm font-medium leading-snug line-clamp-2">{calming || "None"}</p>
                            </motion.div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Description */}
                        <motion.p
                            variants={itemVariants}
                            className="text-white/80 text-sm leading-relaxed line-clamp-2"
                        >
                            {description}
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center gap-6 pt-2"
                        >
                            <div className="flex items-center gap-2 text-white/60">
                                <Users className="w-4 h-4" />
                                <span className="font-semibold text-white">{followers}</span>
                                <span className="text-sm">followers</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/60">
                                <UserCheck className="w-4 h-4" />
                                <span className="font-semibold text-white">{following}</span>
                                <span className="text-sm">contacts</span>
                            </div>
                        </motion.div>
                    </>
                )}

                {/* Action Button */}
                <motion.button
                    variants={itemVariants}
                    onClick={onFollow}
                    whileHover={{
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 400, damping: 25 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                        "w-full cursor-pointer py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 mt-2",
                        "shadow-lg backdrop-blur-sm",
                        isSafetyCard
                            ? "bg-white text-black hover:bg-white/90 shadow-white/10"
                            : isFollowing
                                ? "bg-white/20 text-white hover:bg-white/30"
                                : "bg-white text-black hover:bg-white/90",
                        "transform-gpu"
                    )}
                >
                    {isSafetyCard ? "Print ID Card" : (isFollowing ? "Following" : "Connect")}
                </motion.button>
            </motion.div>
        </motion.div>
    )
}
