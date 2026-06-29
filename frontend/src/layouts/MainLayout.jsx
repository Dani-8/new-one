import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Compass, Sparkles, HelpCircle } from 'lucide-react';
import Button from '../components/common/Button';
import Avatar from '../components/common/Avatar';
import Badge from '../components/common/Badge';

export const MainLayout = ({ children, currentRole = 'guest', onNavigate }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: 'Explore Destinations', icon: Compass, id: 'explore' },
        { label: 'AI Travel Planner', icon: Sparkles, id: 'planner', premium: true },
        { label: 'Dynamic Help Desk', icon: HelpCircle, id: 'help' }
    ];

    return (
        <div className="min-h-screen bg-[#030712] text-[#f3f4f6] flex flex-col relative overflow-hidden font-sans">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-amber-500/5 to-transparent blur-3xl pointer-events-none" />

            <header className="sticky top-0 z-40 bg-[#030712]/75 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => onNavigate('home')}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d19f4a] to-[#bd863d] flex items-center justify-center font-black text-[#030712] text-xl tracking-wider">
                            S
                        </div>
                        <div className="text-left">
                            <span className="text-xl font-bold tracking-tight">Stay<span className="text-[#d19f4a]">AI</span></span>
                            <p className="text-[9px] font-semibold tracking-widest text-slate-500 uppercase mt-0.5">Luxury Concierge</p>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <button
                                    key={link.id}
                                    onClick={() => onNavigate(link.id)}
                                    className="flex items-center gap-2 text-slate-400 hover:text-[#d19f4a] transition-colors duration-200 cursor-pointer"
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{link.label}</span>
                                    {link.premium && <span className="text-[9px] bg-[#d19f4a]/15 text-[#d19f4a] px-1.5 py-0.5 rounded border border-[#d19f4a]/20">AI</span>}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        {currentRole === 'guest' ? (
                            <>
                                <button onClick={() => onNavigate('login')} className="text-sm font-bold text-slate-300 hover:text-white cursor-pointer">Sign In</button>
                                <Button variant="primary" size="sm" onClick={() => onNavigate('register')}>Get Started</Button>
                            </>
                        ) : (
                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 cursor-pointer" onClick={() => onNavigate('dashboard')}>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-[#f3f4f6]">Sarah Jenkins</p>
                                    <p className="text-[9px] text-slate-400 capitalize">{currentRole}</p>
                                </div>
                                <Avatar name="Sarah Jenkins" status="premium" size="sm" />
                            </div>
                        )}
                    </div>

                    <button
                        className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden fixed inset-x-0 top-[73px] z-30 bg-[#030712] border-b border-white/10 p-6 flex flex-col gap-6"
                    >
                        {/* Mobile menu content - same as before */}
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="flex-grow flex flex-col justify-start">
                {children}
            </main>

            <footer className="border-t border-white/5 bg-[#030712] py-12 px-4 md:px-8 mt-auto">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-xs">
                    <p>© {new Date().getFullYear()} StayAI Inc. High-fidelity travel platforms.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-slate-300">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-300">Terms of Service</a>
                        <a href="#" className="hover:text-slate-300">Developer APIs</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};