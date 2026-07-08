// AuthForm.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChefHat, UserIcon, Mail, Lock, Shield, CheckCircle } from 'lucide-react';
import loginBg from '../../assets/images/login-bg.jpg';

export default function AuthForm({
  isLogin,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  isAdminRole,
  setIsAdminRole,
  error,
  success,
  handleSubmit,
  handleQuickLogin,
  toggleMode,
  onBack,
  isDarkMode,
}) {
  return (
    <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative min-h-[550px] lg:min-h-[650px]">
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-orange-400/10 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header Navigation */}
      <div className="relative z-10 flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className={`group px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border cursor-pointer ${
            isDarkMode
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

      {/* Main Content Area */}
      <div className="relative z-10 my-auto max-w-sm mx-auto w-full">
        {/* Welcome Text */}
        <div className="mb-6 space-y-2 text-center lg:text-left">
          <h2 className={`font-sans text-2xl sm:text-3xl font-black tracking-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
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
                  className={`w-full rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none transition-all border ${
                    isDarkMode
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
                className={`w-full rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none transition-all border ${
                  isDarkMode
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
                className={`w-full rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none transition-all border ${
                  isDarkMode
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

      {/* Development Bypasses Section */}
      <div className="relative z-10 mt-8 pt-5 border-t border-dashed border-gray-500/15 max-w-sm mx-auto w-full text-center">
        <span className="text-[9px] uppercase tracking-widest opacity-60 font-mono block mb-2.5">
          💡 Immediate Dev Bypasses
        </span>
        
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => handleQuickLogin('customer')}
            className={`py-2 px-3 rounded-xl text-[10px] font-bold tracking-wider uppercase border cursor-pointer transition-colors ${
              isDarkMode
                ? 'bg-amber-500/10 border-amber-500/25 hover:bg-amber-500/20 text-amber-300'
                : 'bg-amber-50 border-amber-100 hover:bg-amber-100 text-amber-700'
            }`}
          >
            Guest Client
          </button>
          <button
            onClick={() => handleQuickLogin('admin')}
            className={`py-2 px-3 rounded-xl text-[10px] font-bold tracking-wider uppercase border cursor-pointer transition-colors ${
              isDarkMode
                ? 'bg-orange-500/10 border-orange-500/25 hover:bg-orange-500/20 text-orange-300'
                : 'bg-orange-50 border-orange-100 hover:bg-orange-100 text-orange-700'
            }`}
          >
            Kitchen Admin
          </button>
        </div>
      </div>
    </div>
  );
}