import React from 'react';
import { Button } from './Button';
import { Sliders } from 'lucide-react';

export const EmptyState = ({
    title,
    description,
    icon: Icon = Sliders,
    actionText,
    onActionClick,
    className = '',
    ...props
}) => {
    return (
        <div
            className={`
        w-full py-16 px-6 text-center flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl bg-white/1
        ${className}
      `}
            {...props}
        >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-[#d19f4a] mb-6 border border-white/5 shadow-inner">
                <Icon className="w-7 h-7 stroke-[1.5]" />
            </div>
            <h3 className="text-lg font-bold text-[#f3f4f6] mb-2">{title}</h3>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-6">{description}</p>
            {actionText && onActionClick && (
                <Button onClick={onActionClick} size="sm">
                    {actionText}
                </Button>
            )}
        </div>
    );
}