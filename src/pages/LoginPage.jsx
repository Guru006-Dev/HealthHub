import React, { useState } from 'react';
import AuroraHero from "@/components/ui/digital-aurora";
import { Card } from "@/components/ui/Card";
import { Spotlight } from "@/components/ui/Spotlight";
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login
        navigate('/dashboard');
    };

    return (
        <div className="w-full min-h-screen relative overflow-hidden">
            <AuroraHero>
                {/* Login Card Overlay */}
                <div className="relative z-10 w-full max-w-md">
                    <Card className="w-full bg-[var(--card-bg)]/60 backdrop-blur-xl border border-[var(--secondary-color)]/20 shadow-2xl rounded-[var(--radius)] overflow-hidden">
                        <Spotlight
                            className="-top-40 left-0 md:left-60 md:-top-20"
                            fill="var(--primary-color)"
                        />

                        <div className="p-8 flex flex-col justify-center bg-transparent">
                            <div className="w-full">
                                <h1 className="text-4xl md:text-5xl font-heading font-bold text-[var(--text-color)] mb-2 text-center">
                                    Welcome Back
                                </h1>
                                <p className="text-[var(--text-color)]/80 mb-8 font-body text-center">
                                    Continue your learning journey.
                                </p>

                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[var(--text-color)]">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-3 rounded-[var(--radius)] bg-[var(--bg-color)]/50 border border-[var(--secondary-color)]/30 text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-all font-body"
                                            placeholder="learner@example.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[var(--text-color)]">Password</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full px-4 py-3 rounded-[var(--radius)] bg-[var(--bg-color)]/50 border border-[var(--secondary-color)]/30 text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-all font-body"
                                            placeholder="••••••••"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[var(--primary-color)] hover:opacity-90 text-[var(--text-color)] font-bold py-3 rounded-[var(--radius)] transition-all duration-300 shadow-md transform hover:scale-[1.02]"
                                    >
                                        Enter Dashboard
                                    </button>
                                </form>

                                <p className="mt-6 text-xs text-center text-[var(--text-color)]/60">
                                    Ready to save lives today?
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </AuroraHero>
        </div>
    );
}
