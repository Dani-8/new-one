import { useState } from 'react';
import { getStoredOrders, saveStoredOrders } from '../data/data';
import { calculateSubtotal, calculateTotal } from '../utils/pricing';

export function useOrders(triggerToast) {
    const [orders, setOrders] = useState(getStoredOrders());

    const handleCheckout = (currentUser, cartItems, deliveryInfo) => {
        if (!currentUser) return;

        const subtotal = calculateSubtotal(cartItems);
        const total = calculateTotal(subtotal);

        const newOrder = {
            id: `ord_${Math.floor(1000 + Math.random() * 9000)}`,
            userId: currentUser.id,
            userEmail: currentUser.email,
            userName: currentUser.name,
            items: cartItems,
            totalAmount: total,
            status: 'Received',
            createdAt: new Date().toISOString(),
            deliveryAddress: deliveryInfo.address,
            contactNumber: deliveryInfo.phone,
            paymentMethod: deliveryInfo.paymentMethod,
        };

        const updatedOrders = [...orders, newOrder];
        setOrders(updatedOrders);
        saveStoredOrders(updatedOrders);

        triggerToast('🎉 Order placed successfully! Tracking is active.', 'success');

        return newOrder;
    };

    const handleUpdateOrderStatus = (orderId, newStatus) => {
        const updated = orders.map((o) =>
            o.id === orderId ? { ...o, status: newStatus } : o
        );
        setOrders(updated);
        saveStoredOrders(updated);
        triggerToast(`Order #${orderId.slice(-4)} status updated to ${newStatus}`, 'success');
    };

    return { orders, setOrders, handleCheckout, handleUpdateOrderStatus };
}