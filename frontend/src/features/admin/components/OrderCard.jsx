import React from 'react';
import { Check, Truck, X } from 'lucide-react';

export default function OrderCard({ order, onUpdateStatus, isDarkMode }) {
    const stepColor = order.status === 'Received' ? 'text-sky-400 border-sky-400/25 bg-sky-400/5' :
        order.status === 'Preparing' || order.status === 'Out for Delivery' ? 'text-amber-400 border-amber-400/25 bg-amber-400/5' :
            order.status === 'Delivered' ? 'text-emerald-400 border-emerald-400/25 bg-emerald-400/5' : 'text-red-400 border-red-400/25 bg-red-400/5';

    return (
        <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-[#141416]/90 border-white/[0.04] text-white' : 'bg-white border-amber-100/70 text-gray-800 shadow-sm'}`}>
            <div className="flex justify-between pb-3 border-b border-gray-500/5">
                <div>
                    <span className="text-[9px] font-mono opacity-65 block">ID: {order.id}</span>
                    <span className="text-xs font-bold">{order.userName}</span>
                </div>

                <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-md border ${stepColor}`}>{order.status}</span>
            </div>


            <div className="py-3 text-xs space-y-1">
                {order.items.map(it => (
                    <div key={it.id} className="flex justify-between">
                        <span><strong className="text-amber-500">{it.quantity}x</strong> {it.foodItem.name}</span>
                        <span>${(it.foodItem.price * it.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>


            <div className="pt-3 border-t border-dashed flex justify-between items-center">
                <span className="text-base font-extrabold text-amber-500">${order.totalAmount.toFixed(2)}</span>

                <div className="flex gap-1">
                    {order.status === 'Received' && <button onClick={() => onUpdateStatus(order.id, 'Preparing')} className="px-3 py-1.5 rounded-lg bg-amber-500 text-black text-xs font-semibold flex items-center gap-1"><Check className="h-3.5 w-3.5" /> Accept</button>}
                    {order.status === 'Preparing' && <button onClick={() => onUpdateStatus(order.id, 'Out for Delivery')} className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-semibold flex items-center gap-1"><Truck className="h-3.5 w-3.5" /> Ship</button>}
                    {order.status === 'Out for Delivery' && <button onClick={() => onUpdateStatus(order.id, 'Delivered')} className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1"><Check className="h-3.5 w-3.5" /> Deliver</button>}
                    {order.status !== 'Delivered' && order.status !== 'Cancelled' && <button onClick={() => onUpdateStatus(order.id, 'Cancelled')} className="p-1.5 rounded-lg border border-red-500/25 text-red-500"><X className="h-4 w-4" /></button>}
                </div>
            </div>
        </div>
    );
}