import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const springConfig = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
  mass: 0.8
};

export const Button = React.forwardRef(({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  ...props
}, ref) => {
  const baseStyle = "relative inline-flex items-center justify-center font-semibold rounded-xl select-none transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-40 disabled:pointer-events-none cursor-pointer";
  
  const sizes = {
    sm: "px-4 py-2 text-xs gap-1.5 rounded-lg",
    md: "px-6 py-3 text-sm gap-2 rounded-xl",
    lg: "px-8 py-4 text-base gap-3 rounded-2xl"
  };

  const variants = {
    primary: "bg-gradient-to-r from-[#d19f4a] to-[#bd863d] text-[#030712] hover:opacity-95 active:scale-[0.98] shadow-lg shadow-[#d19f4a]/10",
    secondary: "bg-white/5 border border-white/10 text-[#f3f4f6] hover:bg-white/10 hover:border-white/20 active:scale-[0.98]",
    glass: "glass-card text-[#d19f4a] hover:bg-white/5 hover:border-[#d19f4a]/30 active:scale-[0.98] hover:shadow-[0_0_20px_rgba(209,159,74,0.08)]",
    danger: "bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 active:scale-[0.98]"
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={disabled || isLoading ? undefined : onClick}
      disabled={disabled || isLoading}
      className={`${baseStyle} ${sizes[size]} ${variants[variant]} ${className}`}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      transition={springConfig}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />}
      {!isLoading && LeftIcon && <LeftIcon className="w-4 h-4 shrink-0 text-current" />}
      <span className={isLoading ? "opacity-75" : ""}>{children}</span>
      {!isLoading && RightIcon && <RightIcon className="w-4 h-4 shrink-0 text-current" />}
    </motion.button>
  );
});

Button.displayName = 'Button';