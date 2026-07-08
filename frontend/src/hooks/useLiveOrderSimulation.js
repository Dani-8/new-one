import { useEffect } from 'react';
import { saveStoredOrders } from '../data/data';

export function useLiveOrderSimulation(orders, setOrders, triggerToast) {
    useEffect(() => {
        const interval = setInterval(() => {
            let changed = false;
            const updatedOrders = orders.map((order) => {
                if (order.status === 'Received') {
                    changed = true;
                    triggerToast(`🍳 Order #${order.id.slice(-4)} is now being prepared!`, 'info');
                    return { ...order, status: 'Preparing' };
                } else if (order.status === 'Preparing') {
                    changed = true;
                    triggerToast(`🚴 Order #${order.id.slice(-4)} is out for delivery!`, 'info');
                    return { ...order, status: 'Out for Delivery' };
                } else if (order.status === 'Out for Delivery') {
                    changed = true;
                    triggerToast(`🎉 Order #${order.id.slice(-4)} has been delivered!`, 'success');
                    return { ...order, status: 'Delivered' };
                }
                return order;
            });

            if (changed) {
                setOrders(updatedOrders);
                saveStoredOrders(updatedOrders);
            }
        }, 30000);

        return () => clearInterval(interval);
    }, [orders]);
}