import React from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const Alert = ({
    title,
    children,
    variant = 'info',
    className = '',
    onClose,
    ...props
}) => {
    const styles = {
        success: { wrapper: "bg-[#10b981]/5 border-[#10b981]/25 text-[#10b981]", icon: CheckCircle },
        warning: { wrapper: "bg-amber-500/5 border-amber-500/25 text-amber-500", icon: AlertTriangle },
        error: { wrapper: "bg-red-500/5 border-red-500/25 text-red-400", icon: AlertCircle },
        info: { wrapper: "bg-blue-500/5 border-blue-500/25 text-blue-400", icon: Info }
    };

    const Icon = styles[variant].icon;

    return (
        <div
            className={`
        w-full flex gap-3 border rounded-xl p-4 text-left relative
        ${styles[variant].wrapper}
        ${className}
      `}
            {...props}
        >
            <Icon className="w-5 h-5 shrink-0" />
            <div className="space-y-1 pr-6 flex-grow">
                {title && <h4 className="font-bold text-sm text-[#f3f4f6]">{title}</h4>}
                <div className="text-sm opacity-90 leading-relaxed">{children}</div>
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-inherit opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};