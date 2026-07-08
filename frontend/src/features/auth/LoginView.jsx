// LoginView.jsx
import { Sparkles, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthForm } from './useAuthForm';
import AuthForm from './AuthForm';
import loginBg from '../../assets/images/login-bg.jpg';


export default function LoginView({ isDarkMode, onBack }) {
  const auth = useAuthForm(onBack);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-[calc(100vh-6rem)] rounded-3xl overflow-hidden border flex flex-col lg:grid lg:grid-cols-12 shadow-2xl transition-all duration-300 ${
        isDarkMode
          ? 'bg-[#141416]/95 border-white/[0.04] text-white shadow-black/40'
          : 'bg-white border-amber-100 text-gray-800 shadow-amber-500/5'
      }`}
    >
      {/* LEFT SIDE */}
      <AuthForm {...auth} isDarkMode={isDarkMode} />

      {/* RIGHT SIDE */}
      <div className="hidden lg:block lg:col-span-7 relative overflow-hidden min-h-[550px] lg:min-h-0">
        <img
          src={loginBg}
          alt="Magical Warm Amber restaurant gastro gallery"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.70] contrast-[1.05]"
        />
        {/* Soft neon overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-amber-500/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141416]/90 via-[#141416]/30 to-transparent" />

        {/* Brand floating label */}
        <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/25 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
          <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-widest">Aesthetic Gastronomy</span>
        </div>

        {/* Chef gourmet quote */}
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