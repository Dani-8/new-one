import React from 'react';

const Badge = ({
    children,
    variant = 'neutral',
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyle = "inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider select-none rounded-full";

    const sizes = {
        sm: "px-2.5 py-0.5 text-[10px]",
        md: "px-3.5 py-1 text-xs"
    };

    const variants = {
        neutral: "bg-white/5 text-slate-300 border border-white/5",
        brand: "bg-[#d19f4a]/10 text-[#d19f4a] border border-[#d19f4a]/20",
        success: "bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20",
        warning: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
        error: "bg-red-500/10 text-red-400 border border-red-500/20",
        info: "bg-blue-500/10 text-blue-400 border border-blue-500/20"
    };

    return (
        <span className={`${baseStyle} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
            {children}
        </span>
    );
};

export default Badge;