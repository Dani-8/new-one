import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    X, CheckCircle, Clock, Truck, ShieldCheck, Play,
    ChevronDown, ChevronUp, MapPin, Compass, Navigation,
    Send, Phone, MessageSquare, Sparkles, Smile, Flame
} from 'lucide-react';

export default function LiveOrderTracker({
    activeOrder,
    onClose,
    isDarkMode,
    onUpdateOrderStatus // Allows the user to fast-forward state directly in the simulation
}) {
    const [isMinimized, setIsMinimized] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        { sender: 'rider', text: "Hey! I'm Leo 'Spicy Wheels' Martinez. I'll be your culinary pilot today! 🚴🔥", time: 'Just now' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const chatEndRef = useRef(null);

    // Auto-scroll chat to bottom
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    if (!activeOrder) return null;

    const currentStatus = activeOrder.status;

    // Status mapping
    const getStepIndex = (status) => {
        switch (status) {
            case 'Received': return 0;
            case 'Preparing': return 1;
            case 'Out for Delivery': return 2;
            case 'Delivered': return 3;
            default: return 0;
        }
    };

    const currentStep = getStepIndex(currentStatus);

    // Status specific messages
    const getStatusDetail = (status) => {
        switch (status) {
            case 'Received':
                return {
                    title: "Order Placed & Acknowledged",
                    desc: "Our master chefs are lining up the premium fresh ingredients.",
                    emoji: "📋",
                    eta: "25-35 mins",
                    color: "text-sky-400 border-sky-400/20 bg-sky-500/5"
                };
            case 'Preparing':
                return {
                    title: "Sizzling in the Kitchen",
                    desc: "Flame-grilling, seasoning, and premium plating are underway.",
                    emoji: "🍳",
                    eta: "15-20 mins",
                    color: "text-amber-400 border-amber-400/20 bg-amber-500/5"
                };
            case 'Out for Delivery':
                return {
                    title: "Rider is Out on the Street!",
                    desc: "Leo is tearing through the glowing neon streets with your hot meal.",
                    emoji: "🚴💨",
                    eta: "5-10 mins",
                    color: "text-amber-400 border-amber-400/20 bg-amber-500/5"
                };
            case 'Delivered':
                return {
                    title: "Delivered & Landing Celebrated!",
                    desc: "The magic box of Golden Bite flavors has officially landed. Bon appétit!",
                    emoji: "🎉",
                    eta: "Arrived",
                    color: "text-emerald-400 border-emerald-400/20 bg-emerald-500/5"
                };
            default:
                return {
                    title: "Order Processed",
                    desc: "Status is being verified.",
                    emoji: "🍔",
                    eta: "calculating...",
                    color: "text-amber-400 border-amber-500/20"
                };
        }
    };

    const statusInfo = getStatusDetail(currentStatus);

    // Simulated Rider Responses based on order status and user message
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const userText = inputMessage.trim();
        setChatMessages(prev => [...prev, { sender: 'user', text: userText, time: 'Just now' }]);
        setInputMessage('');

        // Generate rider response
        setTimeout(() => {
            let riderResponse = "Awesome! Received your message. Getting it ready! 👍";
            const lower = userText.toLowerCase();

            if (currentStatus === 'Received' || currentStatus === 'Preparing') {
                if (lower.includes('gate') || lower.includes('code') || lower.includes('bell')) {
                    riderResponse = "Perfect, thanks for the heads-up! I've noted down the access instructions. 📝";
                } else if (lower.includes('fast') || lower.includes('hurry') || lower.includes('hungry')) {
                    riderResponse = "I feel you! The kitchen is cooking at warp-speed right now. As soon as it's bagged, I'll ride like the wind! 🌪️💨";
                } else {
                    riderResponse = "Thanks! I'm waiting at the counter. The chefs are puttin' the finishing touches of amber magic on it! ✨🍳";
                }
            } else if (currentStatus === 'Out for Delivery') {
                if (lower.includes('where') || lower.includes('time') || lower.includes('far')) {
                    riderResponse = "Just crossed 5th Avenue! Weaving through some light traffic but I'm absolutely flying. See you in a few minutes! 🚴🚀";
                } else if (lower.includes('extra') || lower.includes('sauce') || lower.includes('napkin')) {
                    riderResponse = "Oh, I already swept the counter for extra napkins! It's safely locked in my heat-insulated backpack. 🎒🔥";
                } else {
                    riderResponse = "Roger that! I'm leaning into the curves. Almost there! 🚴🗺️";
                }
            } else {
                riderResponse = "Thank you so much! It was a pleasure serving you. Hope it tastes stellar! Leave a 5-star review if you loved the vibes! ⭐🍔";
            }

            setChatMessages(prev => [...prev, { sender: 'rider', text: riderResponse, time: 'Just now' }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 left-6 z-40 max-w-md w-[calc(100vw-3rem)] pointer-events-auto">
            <AnimatePresence mode="wait">
                {isMinimized ? (
                    /* MINIMIZED FLOAT BAR */
                    <motion.button
                        key="minimized"
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        onClick={() => setIsMinimized(false)}
                        className={`w-full p-4 rounded-2xl border flex items-center justify-between shadow-2xl transition-all duration-300 cursor-pointer ${isDarkMode
                                ? 'bg-[#120f1e]/95 border-amber-500/30 text-white shadow-amber-500/10'
                                : 'bg-white border-amber-100 text-gray-800 shadow-amber-500/5'
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-xl animate-bounce">{statusInfo.emoji}</span>
                            <div className="text-left">
                                <p className="text-xs font-bold font-sans tracking-tight flex items-center gap-1">
                                    <span>Track Live Order</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                                </p>
                                <p className="text-[10px] opacity-70">
                                    {statusInfo.title} ({statusInfo.eta})
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
                                {currentStatus}
                            </span>
                            <ChevronUp className="h-4 w-4 opacity-60" />
                        </div>
                    </motion.button>
                ) : (
                    /* FULL TRACKING WINDOW */
                    <motion.div
                        key="expanded"
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        className={`rounded-2xl border overflow-hidden shadow-2xl flex flex-col max-h-[75vh] sm:max-h-[85vh] transition-all duration-300 ${isDarkMode
                                ? 'bg-[#0f0c1b]/95 border-amber-500/30 text-white shadow-amber-500/15'
                                : 'bg-white border-amber-100 text-gray-800 shadow-amber-500/5'
                            }`}
                    >
                        {/* Gradient Top Accent */}
                        <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />

                        {/* Header */}
                        <div className="p-4 flex items-center justify-between border-b border-gray-500/10">
                            <div className="flex items-center space-x-2.5">
                                <div className="p-1.5 rounded-full bg-amber-500/10 text-amber-400 animate-pulse">
                                    <Navigation className="h-4 w-4" />
                                </div>
                                <div>
                                    <h3 className="font-sans text-xs font-extrabold tracking-wider uppercase text-amber-500">Live Culinary Radar</h3>
                                    <p className="text-[10px] opacity-60 font-mono">ID: {activeOrder.id} • {new Date(activeOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-1.5">
                                <button
                                    onClick={() => setIsMinimized(true)}
                                    className="p-1 rounded-md hover:bg-gray-500/10 text-gray-400 cursor-pointer"
                                    title="Minimize"
                                >
                                    <ChevronDown className="h-4.5 w-4.5" />
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-1 rounded-md hover:bg-gray-500/10 text-gray-400 cursor-pointer"
                                    title="Close Tracker"
                                >
                                    <X className="h-4.5 w-4.5" />
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Container */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[50vh]">
                            {/* Step Status Indicator */}
                            <div className="grid grid-cols-4 gap-1 relative py-1">
                                <div className="absolute top-4 left-4 right-4 h-[2px] bg-gray-500/10 -z-10" />
                                <div
                                    className="absolute top-4 left-4 h-[2px] bg-gradient-to-r from-amber-500 to-orange-500 -z-10 transition-all duration-500"
                                    style={{ width: `${(currentStep / 3) * 85}%` }}
                                />

                                {[
                                    { name: 'Received', icon: CheckCircle },
                                    { name: 'Preparing', icon: Clock },
                                    { name: 'Out for Delivery', icon: Truck },
                                    { name: 'Delivered', icon: Smile }
                                ].map((step, idx) => {
                                    const StepIcon = step.icon;
                                    const isActive = currentStep >= idx;
                                    const isCurrent = currentStep === idx;
                                    return (
                                        <div key={step.name} className="flex flex-col items-center text-center">
                                            <div className={`h-8 w-8 rounded-full flex items-center justify-center border transition-all duration-300 ${isCurrent
                                                    ? 'bg-amber-500 text-white border-amber-400 ring-4 ring-amber-500/20 scale-110 shadow-lg shadow-amber-500/30'
                                                    : isActive
                                                        ? 'bg-amber-600 text-white border-amber-500'
                                                        : isDarkMode ? 'bg-[#1b162c] text-gray-500 border-white/5' : 'bg-gray-50 text-gray-400 border-gray-100'
                                                }`}>
                                                <StepIcon className="h-4 w-4" />
                                            </div>
                                            <span className={`text-[9px] font-semibold mt-1.5 transition-all ${isCurrent ? 'text-amber-400 font-black' : 'text-gray-400'
                                                }`}>{step.name}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Status Highlight */}
                            <div className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${statusInfo.color}`}>
                                <span className="text-xl leading-none mt-0.5">{statusInfo.emoji}</span>
                                <div className="space-y-1">
                                    <h4 className="font-extrabold font-sans text-[13px]">{statusInfo.title}</h4>
                                    <p className="opacity-80 text-[11px] font-light leading-relaxed">{statusInfo.desc}</p>
                                    <div className="flex items-center gap-1.5 pt-1 text-[10px] font-mono">
                                        <span className="opacity-60">Estimated Arrival:</span>
                                        <span className="font-bold text-amber-400">{statusInfo.eta}</span>
                                    </div>
                                </div>
                            </div>

                            {/* MOCK MAP */}
                            <div className={`relative h-32 rounded-xl border overflow-hidden ${isDarkMode ? 'bg-[#0b0816] border-amber-500/10' : 'bg-slate-50 border-amber-100'
                                }`}>
                                {/* SVG Mock Map Grid & Road Lines */}
                                <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                                            <rect width="20" height="20" fill="none" />
                                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke={isDarkMode ? "#ffffff" : "#000000"} strokeWidth="0.5" opacity="0.08" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#mapGrid)" />

                                    <path d="M 30,60 L 100,60 L 180,20 L 250,90 L 350,90" fill="none" stroke={isDarkMode ? "#fbbf24" : "#f59e0b"} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                                    <path d="M 100,20 L 100,110 L 250,110" fill="none" stroke={isDarkMode ? "#fbbf24" : "#f59e0b"} strokeWidth="2" strokeDasharray="4 4" opacity="0.4" />
                                    <path d="M 180,20 L 180,120 M 30,110 L 380,110" fill="none" stroke={isDarkMode ? "#f59e0b" : "#d97706"} strokeWidth="2" opacity="0.2" />
                                </svg>

                                {/* Pulse Glows */}
                                <div className="absolute left-[35px] top-[55px] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                                    <span className="absolute inline-flex h-6 w-6 rounded-full bg-amber-500/20 animate-ping" />
                                    <div className="h-5 w-5 rounded-full bg-amber-600 border-2 border-white flex items-center justify-center shadow-lg">
                                        <Flame className="h-3 w-3 text-white" />
                                    </div>
                                    <span className="text-[8px] font-bold font-mono text-amber-400 mt-1 uppercase">Golden Bite</span>
                                </div>

                                <div className="absolute right-[50px] top-[85px] -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                                    <span className="absolute inline-flex h-6 w-6 rounded-full bg-amber-500/20 animate-ping" />
                                    <div className="h-5 w-5 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center shadow-lg">
                                        <MapPin className="h-3 w-3 text-white" />
                                    </div>
                                    <span className="text-[8px] font-bold font-mono text-amber-400 mt-1 uppercase">Home</span>
                                </div>

                                {/* Animated Rider Avatar */}
                                {currentStatus !== 'Delivered' && (
                                    <motion.div
                                        className="absolute z-10 p-1 bg-amber-500 rounded-lg text-white shadow-lg border border-white/20 flex items-center gap-1"
                                        style={{
                                            left: currentStatus === 'Received'
                                                ? '45px'
                                                : currentStatus === 'Preparing'
                                                    ? '100px'
                                                    : '200px', // Out for Delivery
                                            top: currentStatus === 'Received'
                                                ? '55px'
                                                : currentStatus === 'Preparing'
                                                    ? '55px'
                                                    : '50px',
                                        }}
                                        animate={currentStatus === 'Out for Delivery' ? {
                                            x: [0, 40, -10, 0],
                                            y: [0, 20, -10, 0]
                                        } : {}}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 4,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <span className="text-[10px]">🚴 Leo</span>
                                    </motion.div>
                                )}

                                <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[8px] font-mono text-amber-400 flex items-center gap-1 border border-amber-500/10">
                                    <Compass className="h-2.5 w-2.5 animate-spin" />
                                    <span>SPEED: {currentStatus === 'Out for Delivery' ? '38 km/h' : '0 km/h'}</span>
                                </div>
                            </div>

                            {/* RIDER DETAIL */}
                            <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${isDarkMode ? 'bg-[#151125]/80 border-amber-500/10' : 'bg-slate-50 border-amber-100/50'
                                }`}>
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <img
                                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
                                            alt="Leo Martinez Rider Profile"
                                            className="h-10 w-10 rounded-xl object-cover ring-2 ring-amber-500/30"
                                        />
                                        <span className="absolute -bottom-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-amber-500 text-[8px] font-bold text-white border border-[#0f0c1b]">
                                            🚴
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold font-sans flex items-center gap-1 text-[13px]">
                                            <span>Leo Martinez</span>
                                            <span className="text-[10px] text-amber-400 bg-amber-500/15 px-1 py-0.2 rounded font-mono">
                                                RIDER
                                            </span>
                                        </h4>
                                        <p className="text-[10px] opacity-65 font-mono">🚴 Suzuki Swift Wheels • 4.9 ★ (1200+ runs)</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-1">
                                    <a
                                        href="tel:555"
                                        onClick={(e) => { e.preventDefault(); alert("Simulating rider call: 'Hello! I am on my way with your hot meal!' 📞"); }}
                                        className="p-2 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 hover:text-white transition-colors cursor-pointer"
                                        title="Call Leo"
                                    >
                                        <Phone className="h-3.5 w-3.5" />
                                    </a>
                                </div>
                            </div>

                            {/* CHAT INTERACTIVE MESSENGER */}
                            <div className={`rounded-xl border flex flex-col h-36 ${isDarkMode ? 'bg-[#0c0a15] border-amber-500/10' : 'bg-gray-50 border-amber-100/50'
                                }`}>
                                <div className="px-3 py-1.5 border-b border-gray-500/10 flex items-center gap-1.5 bg-gray-500/5">
                                    <MessageSquare className="h-3 w-3 text-amber-400" />
                                    <span className="text-[9px] uppercase tracking-wider font-extrabold opacity-70">Ping the Pilot</span>
                                </div>

                                <div className="flex-1 overflow-y-auto p-2.5 space-y-2 text-[11px]">
                                    {chatMessages.map((msg, i) => (
                                        <div
                                            key={i}
                                            className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                                        >
                                            <div className={`p-2 rounded-xl leading-relaxed ${msg.sender === 'user'
                                                    ? 'bg-amber-500 text-white rounded-tr-none'
                                                    : isDarkMode
                                                        ? 'bg-[#1b162c] text-white rounded-tl-none border border-amber-500/5'
                                                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-sm'
                                                }`}>
                                                {msg.text}
                                            </div>
                                            <span className="text-[8px] opacity-50 mt-0.5 px-1">{msg.time}</span>
                                        </div>
                                    ))}
                                    <div ref={chatEndRef} />
                                </div>

                                <form onSubmit={handleSendMessage} className="p-1 border-t border-gray-500/10 flex gap-1 bg-gray-500/5">
                                    <input
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        placeholder="Ask Leo to leave at door, ring bell..."
                                        className="flex-1 bg-transparent border-0 outline-none focus:ring-0 text-[11px] px-2 text-white h-7 placeholder:text-gray-500"
                                    />
                                    <button
                                        type="submit"
                                        className="p-1 px-2.5 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors cursor-pointer flex items-center"
                                    >
                                        <Send className="h-3 w-3" />
                                    </button>
                                </form>
                            </div>

                            {/* SIMULATION ACCELERATION */}
                            <div className="pt-2 border-t border-gray-500/10 space-y-1.5">
                                <div className="flex items-center gap-1 text-[9px] uppercase font-bold text-amber-400">
                                    <Sparkles className="h-3 w-3" />
                                    <span>Sandbox Simulator Accelerator</span>
                                </div>
                                <div className="flex gap-1">
                                    {['Received', 'Preparing', 'Out for Delivery', 'Delivered'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => onUpdateOrderStatus(activeOrder.id, status)}
                                            className={`flex-1 text-[9px] py-1 rounded font-mono transition-all border cursor-pointer font-bold ${currentStatus === status
                                                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                                                    : 'bg-transparent text-gray-400 border-gray-500/10 hover:text-white hover:bg-gray-500/5'
                                                }`}
                                        >
                                            {status.replace('Out for ', '')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
