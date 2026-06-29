import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ChevronRight } from 'lucide-react';

export const Breadcrumb = ({
    items = [],
    className = '',
    ...props
}) => {
    return (
        <nav className={`flex items-center gap-2 ${className}`} {...props}>
            {items.map((item, idx) => {
                const isLast = idx === items.length - 1;
                return (
                    <div key={idx} className="flex items-center gap-2">
                        {idx === 0 && <Home className="w-3.5 h-3.5 text-slate-400" />}
                        {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}

                        <span
                            className={`
                text-xs font-semibold uppercase tracking-wider select-none
                ${isLast || item.active ? 'text-[#d19f4a]' : 'text-slate-400 hover:text-[#f3f4f6] cursor-pointer transition-colors'}
              `}
                        >
                            {item.label}
                        </span>
                    </div>
                );
            })}
        </nav>
    );
};

export const Tooltip = ({
    content,
    children,
    position = 'top',
    className = '',
    ...props
}) => {
    const [visible, setVisible] = useState(false);

    const coords = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2"
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            {...props}
        >
            {children}
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className={`
              absolute z-50 whitespace-nowrap bg-[#0d1324] border border-white/10 text-[#f3f4f6] text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1.5 rounded-lg shadow-xl pointer-events-none backdrop-blur-md
              ${coords[position]}
              ${className}
            `}
                    >
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};