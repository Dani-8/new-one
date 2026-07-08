import React from 'react';
import { DollarSign, ShoppingBag, Layers, Star } from 'lucide-react';

export default function MetricsBanner({ totalRevenue, totalOrders, totalFoods, avgRating, isDarkMode }) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
                { title: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-amber-500' },
                { title: 'Total Orders', value: totalOrders, icon: ShoppingBag, color: 'text-purple-500' },
                { title: 'Menu Choices', value: `${totalFoods} Items`, icon: Layers, color: 'text-amber-500' },
                { title: 'Avg Rating', value: avgRating.toFixed(1), icon: Star, color: 'text-amber-500', extra: <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> }
            ].map((m, i) => (
                <div key={i} className={`p-4 rounded-2xl border flex items-center space-x-4 ${isDarkMode ? 'bg-zinc-900/40 border-white/[0.04]' : 'bg-white border-amber-100 shadow-sm'}`}>
                    <div className={`p-3 rounded-xl bg-amber-500/10 ${m.color}`}><m.icon className="h-6 w-6" /></div>
                    <div>
                        <span className="text-[10px] opacity-65 block uppercase tracking-wider font-semibold">{m.title}</span>
                        <span className="text-xl font-extrabold flex items-center gap-1">{m.value}{m.extra}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}