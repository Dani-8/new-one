import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export const AuthLayout = ({ children, onNavigate }) => {
    return (
        <div className="min-h-screen bg-[#030712] text-[#f3f4f6] flex relative overflow-hidden font-sans">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-radial-gradient from-[#d19f4a]/10 to-transparent rounded-full pointer-events-none" />

            {/* Left Brand Pane */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#050914] border-r border-white/5 relative items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-10 filter grayscale contrast-120"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80')" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />

                <div className="relative z-10 max-w-lg text-left space-y-6">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
                        <div className="w-12 h-12 rounded-2xl bg-[#d19f4a] flex items-center justify-center font-black text-[#030712] text-2xl tracking-wider">
                            S
                        </div>
                        <span className="text-2xl font-black tracking-tight">Stay<span className="text-[#d19f4a]">AI</span></span>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-[#f3f4f6]">
                            Unlock the Ultimate Luxury Travel Itinerary.
                        </h2>
                        <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                            Establish biometrically verified guest accounts to coordinate premium flight paths, champagne resort bookings, and secure real-time AI Travel concierge operations.
                        </p>
                    </div>

                    <div className="flex gap-4 items-center p-4 rounded-xl border border-white/5 bg-white/1 backdrop-blur-md">
                        <div className="w-10 h-10 rounded-lg bg-[#d19f4a]/10 flex items-center justify-center text-[#d19f4a]">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-[#f3f4f6]">Empowered by Gemini 1.5 Pro</p>
                            <p className="text-[10px] text-slate-500">Continuous context travel modeling is active.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Form Pane */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 md:p-12 relative z-10">
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => onNavigate('home')}
                        className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-[#d19f4a] transition-all cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </button>

                    <Badge variant="brand">SSL Secured 256-bit</Badge>
                </div>

                <div className="max-w-md w-full mx-auto my-auto py-12 space-y-8">
                    {children}
                </div>

                <div className="text-center text-slate-500 text-xs">
                    © {new Date().getFullYear()} StayAI. Security parameters verified under encryption protocol.
                </div>
            </div>
        </div>
    );
};