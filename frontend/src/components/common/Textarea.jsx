import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export const Textarea = React.forwardRef(({
    label,
    error,
    className = '',
    id,
    rows = 4,
    ...props
}, ref) => {
    const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div className="w-full text-left space-y-1.5">
            {label && (
                <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {label}
                </label>
            )}
            <textarea
                id={inputId}
                ref={ref}
                rows={rows}
                className={`
          w-full bg-[#0a0e1a]/80 border rounded-xl text-sm text-[#f3f4f6] px-4 py-3.5 outline-none transition-all duration-300 resize-none
          ${error ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/30' : 'border-white/10 focus:border-[#d19f4a] focus:ring-1 focus:ring-[#d19f4a]/30'}
          ${className}
        `}
                {...props}
            />
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

Textarea.displayName = 'Textarea'