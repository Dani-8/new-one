import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { CATEGORIES } from '../../../data/data';


export default function FoodFormModal({ isOpen, onClose, mode, food, onAdd, onUpdate, isDarkMode }) {
    const [name, setName] = useState(food?.name || '');
    const [description, setDescription] = useState(food?.description || '');
    const [price, setPrice] = useState(food?.price || 10.99);
    const [category, setCategory] = useState(food?.category || 'Burgers');
    const [imageUrl, setImageUrl] = useState(food?.image || '');
    const [prepTime, setPrepTime] = useState(food?.preparationTime || 15);
    const [calories, setCalories] = useState(food?.calories || 400);
    const [isSpicy, setIsSpicy] = useState(food?.tags.includes('Spicy') || false);
    const [isVegan, setIsVegan] = useState(food?.tags.includes('Vegan') || false);
    const [isBestSeller, setIsBestSeller] = useState(food?.tags.includes('Best Seller') || false);


    const handleSubmit = (e) => {
        e.preventDefault();
        const tags = [];
        if (isSpicy) tags.push('Spicy');
        if (isVegan) tags.push('Vegan');
        if (isBestSeller) tags.push('Best Seller');
        const data = { name, description, price, category, image: imageUrl, tags, rating: 4.5, calories, preparationTime: prepTime };
        if (mode === 'create') onAdd(data); else onUpdate({ ...data, id: food.id });
        onClose();
    }


    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`relative w-full max-w-lg rounded-2xl border p-6 ${isDarkMode ? 'bg-[#141416] border-white/[0.04] text-white' : 'bg-white border-amber-100'}`}>

                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400"><X className="h-5 w-5" /></button>

                    <h3 className="font-bold mb-4">{mode === 'create' ? 'Create Recipe' : 'Modify Entry'}</h3>

                    {/* FORM FOR NEW FOOD ITEM */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl p-2.5 text-xs bg-zinc-900/50 border border-white/[0.06] outline-none" />

                        <textarea required placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full rounded-xl p-2.5 text-xs bg-zinc-900/50 border border-white/[0.06] outline-none" />

                        <div className="grid grid-cols-2 gap-3">
                            <input type="number" step="0.01" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} className="w-full rounded-xl p-2.5 text-xs bg-zinc-900/50 border border-white/[0.06] outline-none" />
                            
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-xl p-2.5 text-xs bg-zinc-900/50 border border-white/[0.06] outline-none">
                                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <button type="submit" className="w-full py-3 rounded-xl text-white bg-amber-500 font-semibold">{mode === 'create' ? 'Create' : 'Save'}</button>
                    </form>
                </motion.div>
            </div>

        </AnimatePresence>
    );
}