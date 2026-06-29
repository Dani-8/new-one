import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export const Input = React.forwardRef(({
  label,
  error,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  id,
  type = 'text',
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full text-left space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {LeftIcon && (
          <div className="absolute left-4 text-slate-400 pointer-events-none">
            <LeftIcon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          type={type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full bg-[#0a0e1a]/80 border rounded-xl text-sm text-[#f3f4f6] px-4 py-3.5 outline-none transition-all duration-300
            ${LeftIcon ? 'pl-11' : ''}
            ${RightIcon ? 'pr-11' : ''}
            ${error ? 'border-red-500/50 focus:border-red-500/80 focus:ring-1 focus:ring-red-500/30' : 'border-white/10 focus:border-[#d19f4a] focus:ring-1 focus:ring-[#d19f4a]/30'}
            ${className}
          `}
          {...props}
        />
        {RightIcon && (
          <div className="absolute right-4 text-slate-400 pointer-events-none">
            <RightIcon className="w-4 h-4" />
          </div>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs text-red-400 flex items-center gap-1 mt-1"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

Input.displayName = 'Input'