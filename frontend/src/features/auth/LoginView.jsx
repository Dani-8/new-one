import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ChefHat, Sparkles } from 'lucide-react';
import loginBg from '../../assets/images/login-bg.jpg';
import AuthForm from './AuthForm';
import { useAuthForm } from './useAuthForm';

export default function LoginView({ onAuthSuccess, onBack, isDarkMode }) {
    const auth = useAuthForm(onAuthSuccess);

    const { handleQuickLogin } = auth;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`min-h-[calc(100vh-6rem)] rounded-3xl overflow-hidden border flex flex-col lg:grid lg:grid-cols-12 shadow-2xl transition-all duration-300 ${isDarkMode
                    ? 'bg-[#141416]/95 border-white/[0.04] text-white shadow-black/40'
                    : 'bg-white border-amber-100 text-gray-800 shadow-amber-500/5'
                }`}
        >
            {/* LEFT SIDE: FORM CONTAINER */}
            <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative min-h-[550px] lg:min-h-[650px]">
                {/* Glow Effects */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-400/10 rounded-full filter blur-3xl pointer-events-none" />

                {/* Header Navigation */}
                <div className="relative z-10 flex items-center justify-between mb-8">
                    <button
                        onClick={onBack}
                        className={`group px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border cursor-pointer ${isDarkMode
                                ? 'border-white/10 text-gray-300 hover:text-white hover:bg-white/5 hover:border-white/20'
                                : 'border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                    >
                        <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        <span>Back to Brand</span>
                    </button>

                    <div className="flex items-center gap-1">
                        <ChefHat className="h-4 w-4 text-amber-500 animate-pulse" />
                        <span className="font-sans font-black tracking-tight text-xs uppercase text-amber-500">Golden Bite</span>
                    </div>
                </div>

                <AuthForm {...auth} isDarkMode={isDarkMode} />

                {/* Development Bypasses Section */}
                <div className="relative z-10 mt-8 pt-5 border-t border-dashed border-gray-500/15 max-w-sm mx-auto w-full text-center">
                    <span className="text-[9px] uppercase tracking-widest opacity-60 font-mono block mb-2.5">
                        💡 Immediate Dev Bypasses
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                        <button
                            onClick={() => handleQuickLogin('customer')}
                            className={`py-2 px-3 rounded-xl text-[10px] font-bold tracking-wider uppercase border cursor-pointer transition-colors ${isDarkMode
                                    ? 'bg-amber-500/10 border-amber-500/25 hover:bg-amber-500/20 text-amber-300'
                                    : 'bg-amber-50 border-amber-100 hover:bg-amber-100 text-amber-700'
                                }`}
                        >
                            Guest Client
                        </button>
                        <button
                            onClick={() => handleQuickLogin('admin')}
                            className={`py-2 px-3 rounded-xl text-[10px] font-bold tracking-wider uppercase border cursor-pointer transition-colors ${isDarkMode
                                    ? 'bg-orange-500/10 border-orange-500/25 hover:bg-orange-500/20 text-orange-300'
                                    : 'bg-orange-50 border-orange-100 hover:bg-orange-100 text-orange-700'
                                }`}
                        >
                            Kitchen Admin
                        </button>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: IMAGE */}
            <div className="hidden lg:block lg:col-span-7 relative overflow-hidden min-h-[550px] lg:min-h-0">
                <img
                    src={loginBg}
                    alt="Magical Warm Amber restaurant gastro gallery"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.70] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-amber-500/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#141416]/90 via-[#141416]/30 to-transparent" />

                <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/25 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
                    <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-widest">Aesthetic Gastronomy</span>
                </div>

                <div className="absolute bottom-10 left-10 right-10 max-w-md">
                    <div className="bg-black/55 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl text-white space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="p-1 rounded-lg bg-amber-500 text-white shadow-md shadow-amber-500/30">
                                <ChefHat className="h-4 w-4" />
                            </span>
                            <div>
                                <h4 className="text-xs font-black tracking-wide uppercase">AI Chef's Recommendation</h4>
                                <p className="text-[10px] text-amber-400">Master Chef of Golden Bite</p>
                            </div>
                        </div>

                        <p className="text-xs font-light italic leading-relaxed text-gray-200">
                            "We believe that a fine dining meal should do more than just feed your body—it should illuminate your soul. Our customized Wagyu cuts and glowing amber sourdoughs are created live, and delivered to your table hot and roaring with flavor."
                        </p>

                        <div className="flex items-center justify-between pt-1 border-t border-dashed border-white/10">
                            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Golden Bite Sourdough Series</span>
                            <span className="text-xs text-amber-400 font-extrabold font-serif">★ ★ ★ ★ ★</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}