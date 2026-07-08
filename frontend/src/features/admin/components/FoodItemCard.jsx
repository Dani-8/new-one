import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function FoodItemCard({ food, onEdit, onDelete, isDarkMode }) {
    return (
        <div className={`p-4 rounded-2xl border flex flex-col justify-between ${isDarkMode ? 'bg-[#141416]/80 border-white/[0.04] text-white' : 'bg-white border-amber-100 shadow-sm'}`}>
            <div className="flex gap-3">
                <img src={food.image} alt={food.name} className="w-16 h-16 rounded-xl object-cover border border-amber-500/10" />
                <div>
                    <span className="text-[9px] font-bold text-amber-500 uppercase">{food.category}</span>
                    <h4 className="text-sm font-bold line-clamp-1">{food.name}</h4>
                    <p className="text-xs font-bold text-amber-500 mt-0.5">${food.price.toFixed(2)}</p>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-500/5">
                <span className="text-[10px] opacity-60">⚡ {food.preparationTime} mins • {food.calories} kcal</span>
                <div className="flex space-x-1.5">
                    <button onClick={() => onEdit(food)} className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500"><Edit2 className="h-3.5 w-3.5" /></button>
                    <button onClick={() => onDelete(food.id)} className="p-1.5 rounded-lg bg-red-500/10 text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
            </div>
        </div>
    );
}