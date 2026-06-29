import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const cubicTransition = {
    ease: [0.16, 1, 0.3, 1],
    duration: 0.35
};

export const Modal = ({
    isOpen = false,
    onClose,
    title,
    children,
    size = 'md',
    className = '',
    ...props
}) => {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen && onClose) onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const widths = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl"
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#030712]/80 backdrop-blur-md"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 16 }}
                        transition={cubicTransition}
                        className={`
              relative w-full bg-[#0a0e1a] border border-white/10 rounded-2xl shadow-premium overflow-hidden z-10 p-6 md:p-8
              ${widths[size]} 
              ${className}
            `}
                        {...props}
                    >
                        <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                            {title && <h3 className="text-lg font-bold text-[#f3f4f6]">{title}</h3>}
                            {onClose && (
                                <button
                                    onClick={onClose}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-[#f3f4f6] hover:bg-white/5 transition-colors cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        <div className="text-left">{children}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;