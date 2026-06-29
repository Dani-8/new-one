import React from 'react';

export const Avatar = ({
    src,
    name,
    size = 'md',
    status = 'none',
    className = '',
    ...props
}) => {
    const sizes = {
        sm: "w-8 h-8 text-xs",
        md: "w-11 h-11 text-sm",
        lg: "w-16 h-16 text-lg",
        xl: "w-24 h-24 text-2xl"
    };

    const statusColors = {
        online: "bg-[#10b981] ring-2 ring-[#030712]",
        offline: "bg-slate-500 ring-2 ring-[#030712]",
        premium: "bg-[#d19f4a] ring-2 ring-[#030712] flex items-center justify-center"
    };

    const initial = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?';

    return (
        <div className="relative inline-block shrink-0">
            <div
                className={`
          rounded-full overflow-hidden flex items-center justify-center font-bold text-[#f3f4f6] bg-gradient-to-br from-white/10 to-white/5 border border-white/10
          ${sizes[size]} 
          ${status === 'premium' ? 'border-[#d19f4a]/50 ring-2 ring-[#d19f4a]/10' : ''}
          ${className}
        `}
                {...props}
            >
                {src ? (
                    <img src={src} alt={name || "User Avatar"} className="w-full h-full object-cover" />
                ) : (
                    <span>{initial}</span>
                )}
            </div>
            {status !== 'none' && (
                <span
                    className={`
            absolute bottom-0 right-0 block rounded-full 
            ${size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'}
            ${statusColors[status]}
          `}
                />
            )}
        </div>
    );
};