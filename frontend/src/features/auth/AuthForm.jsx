import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Mail, Lock, User as UserIcon, Shield, CheckCircle } from 'lucide-react'


export default function AuthForm({
    isLogin,
    email,
    password,
    name,
    isAdminRole,
    error,
    success,
    setEmail,
    setPassword,
    setName,
    setIsAdminRole,
    handleSubmit,
    toggleMode,
    isDarkMode,
}) {
    return (
        <div className="relative z-10 my-auto max-w-sm mx-auto w-full">
            {/* Welcome Text */}
            <div className="mb-6 space-y-2 text-center lg:text-left">
                <h2 className={`font-sans text-2xl sm:text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                    {isLogin ? 'Step into Golden Bite' : 'Create Account'}
                </h2>

                <p className={`text-xs sm:text-sm font-light leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {isLogin
                        ? 'Sign in to access your glowing dashboard, customized chef orders, and live delivery trackers.'
                        : 'Unlock the ultimate gourmet customization experience, save recipes, and track food live.'}
                </p>
            </div>


            <AnimatePresence mode="wait">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-4 rounded-xl bg-red-500/15 p-3.5 text-xs text-red-500 border border-red-500/20"
                    >
                        {error}
                    </motion.div>
                )}

                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-4 rounded-xl bg-emerald-500/15 p-3.5 text-xs text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5"
                    >
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                        <span>{success}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-1.5"
                    >
                        <label className="block text-[10px] font-bold uppercase tracking-wider opacity-85">Full Name</label>
                        <div className="relative">
                            <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                            <input
                                type="text"
                                required
                                placeholder="E.g., John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-full rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none transition-all border ${isDarkMode
                                        ? 'bg-zinc-900/50 border-white/[0.06] focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20'
                                        : 'bg-gray-50 border-gray-200 focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
                                    }`}
                            />
                        </div>
                    </motion.div>
                )}

                <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider opacity-85">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                        <input
                            type="email"
                            required
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none transition-all border ${isDarkMode
                                    ? 'bg-zinc-900/50 border-white/[0.06] focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20'
                                    : 'bg-gray-50 border-gray-200 focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
                                }`}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider opacity-85">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none transition-all border ${isDarkMode
                                    ? 'bg-zinc-900/50 border-white/[0.06] focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20'
                                    : 'bg-gray-50 border-gray-200 focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
                                }`}
                        />
                    </div>
                </div>

                {!isLogin && (
                    <div className="flex items-center space-x-2 py-1 select-none">
                        <input
                            type="checkbox"
                            id="adminRoleCheckView"
                            checked={isAdminRole}
                            onChange={(e) => setIsAdminRole(e.target.checked)}
                            className="rounded text-amber-500 focus:ring-amber-500 h-3.5 w-3.5 border-gray-300 cursor-pointer"
                        />
                        <label htmlFor="adminRoleCheckView" className="text-[10px] sm:text-xs flex items-center gap-1 cursor-pointer">
                            <Shield className="h-3 w-3 text-amber-500" />
                            <span>Register as Store Admin (for development)</span>
                        </label>
                    </div>
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 text-white py-2.5 text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 cursor-pointer mt-2"
                >
                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-15 rotate-12 group-hover:-translate-x-40" />
                    {isLogin ? 'Sign In to Gourmet' : 'Create Club Account'}
                </button>
            </form>

            {/* Toggle link */}
            <div className="mt-4 text-center text-xs opacity-90">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button
                    onClick={toggleMode}
                    className="font-bold text-amber-500 hover:underline cursor-pointer"
                >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
            </div>
        </div>
    );
}