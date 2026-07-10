import { useState, useRef } from 'react'

export function useToasts() {
    const [toasts, setToasts] = useState([]);
    const lastToastRef = useRef(null);

    const triggerToast = (message, type = 'success') => {
        const now = Date.now();
        
        const isDuplicate = lastToastRef.current &&
            lastToastRef.current.message === message &&
            lastToastRef.current.type === type &&
            now - lastToastRef.current.timestamp < 300;

        if (isDuplicate) {
            return;
        }

        lastToastRef.current = { message, type, timestamp: now };


        const id = `toast_${Date.now()}`;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    };

    return { toasts, triggerToast };
}