import React from 'react';
import { ShoppingBag } from 'lucide-react';
import OrderCard from './OrderCard';

export default function OrderList({ orders, onUpdateOrderStatus, isDarkMode }) {
    if (orders.length === 0) return (
        <div className="text-center py-16 border border-dashed border-amber-500/15 rounded-3xl">
            <ShoppingBag className="h-10 w-10 opacity-30 text-amber-500 mx-auto mb-3" />
            <p className="text-sm opacity-60">No orders have been submitted yet.</p>
        </div>
    )
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...orders].reverse().map(order => (
                <OrderCard key={order.id} order={order} onUpdateStatus={onUpdateOrderStatus} isDarkMode={isDarkMode} />
            ))}
        </div>
    );
}