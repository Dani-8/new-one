import { useState } from 'react';

export function useToasts() {
    const [toasts, setToasts] = useState([]);

    const triggerToast = (message, type = 'success') => {
        const id = `toast_${Date.now()}`;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    };

    return { toasts, triggerToast };
}