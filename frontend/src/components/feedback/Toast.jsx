import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const springConfig = {
    type: 'spring',
    stiffness: 300,
    damping: 25,
    mass: 0.8
};

export const Toast = ({
    message,
    title,
    variant = 'success',
    onClose,
    id
}) => {
    const icons = {
        success: <CheckCircle className="w-5 h-5 text-[#10b981]" />,
        warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
        error: <AlertCircle className="w-5 h-5 text-red-400" />,
        info: <Info className="w-5 h-5 text-blue-400" />
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={springConfig}
            className="glass-card-premium border-white/10 rounded-xl p-4 flex gap-3 shadow-2xl items-start max-w-sm pointer-events-auto w-80 relative"
        >
            <div className="shrink-0">{icons[variant]}</div>
            <div className="text-left flex-grow pr-4">
                {title && <h5 className="font-bold text-sm text-[#f3f4f6]">{title}</h5>}
                <p className="text-xs text-slate-300 mt-0.5">{message}</p>
            </div>
            <button
                onClick={() => onClose && onClose(id)}
                className="text-slate-500 hover:text-slate-300 p-0.5 cursor-pointer rounded-lg hover:bg-white/5"
            >
                <X className="w-3.5 h-3.5" />
            </button>
        </motion.div>
    );
};