import React from 'react';

function App() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-slate-950 px-4">
            <div className="glass-card-premium p-8 rounded-2xl max-w-md w-full text-center space-y-6">
                <div className="h-12 w-12 bg-amber-500/20 border border-amber-500/40 rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <span className="text-amber-500 text-xl font-bold">S</span>
                </div>


                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        StayAI
                    </h1>
                    
                    <p className="text-slate-400 text-sm">
                        AI-Powered Luxury Hotel Booking Platform
                    </p>
                </div>


                <div className="py-2 px-4 bg-slate-900/60 rounded-xl border border-white/5 text-xs text-slate-500 font-mono">
                    Vite + React + Tailwind + Motion
                </div>


                <p className="text-xs text-amber-500/80 font-medium animate-pulse">
                    ✔ Phase 1.3 ESM Architecture Scaffold Standing By
                </p>
            </div>
        </div>
    );
}

export default App;