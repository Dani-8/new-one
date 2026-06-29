import React from 'react';

export const PageContainer = ({ children, title, subtitle, action, className = '' }) => {
    return (
        <div className={`w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-6 md:space-y-8 ${className}`}>
            {(title || subtitle || action) && (
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
                    <div className="space-y-1.5 text-left">
                        {title && (
                            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[#f3f4f6]">
                                {title}
                            </h1>
                        )}
                        {subtitle && (
                            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    {action && <div className="flex items-center gap-3 shrink-0">{action}</div>}
                </div>
            )}
            <div className="w-full text-left">{children}</div>
        </div>
    );
};