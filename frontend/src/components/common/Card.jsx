import React from 'react';
import { motion } from 'framer-motion';


const Card = ({
    children,
    className = '',
    hoverEffect = true,
    variant = 'base',               // 'base' | 'premium'
    onClick,
    ...props
}) => {
    const isClickable = typeof onClick === 'function';

    return (
        <motion.div
            onClick={onClick}
            className={`
        rounded-2xl p-6 overflow-hidden relative
        ${variant === 'premium' ? 'glass-card-premium' : 'glass-card'}
        ${isClickable ? 'cursor-pointer' : ''}
        ${className}
      `}
            whileHover={hoverEffect ? {
                y: -3,
                borderColor: 'rgba(209, 159, 74, 0.25)',
                boxShadow: '0 12px 40px rgba(209, 159, 74, 0.05)',
                transition: { duration: 0.2 }
            } : {}}
            whileTap={isClickable && hoverEffect ? { scale: 0.99 } : {}}
            {...props}
        >
            {variant === 'premium' && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-radial-gradient from-[#d19f4a]/5 to-transparent rounded-full pointer-events-none" />
            )}
            {children}
        </motion.div>
    );
};

export default Card