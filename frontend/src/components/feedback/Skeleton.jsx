import React from 'react';

export const Skeleton = ({
    variant = 'text',
    className = '',
    ...props
}) => {
    const styles = {
        text: 'h-4 w-full rounded-md',
        rect: 'h-32 w-full rounded-xl',
        circle: 'w-12 h-12 rounded-full',
    };

    return (
        <div
            className={`relative overflow-hidden bg-white/5 animate-pulse ${styles[variant]} ${className}`}
            {...props}
        >
            <div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.5s_ease-in-out_infinite]"
                style={{ animationDuration: '1.5s' }}
            />
        </div>
    );
};
