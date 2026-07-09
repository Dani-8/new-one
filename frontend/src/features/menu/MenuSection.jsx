// src/features/menu/MenuSection.jsx
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Flame, Leaf, Clock, Award, Star, Plus, X, Sparkles, Heart } from 'lucide-react';
import { useMenuSection } from './useMenuSection';
import { CATEGORIES } from '../../data/data';

export default function MenuSection({
    foods,
    onAddToCart,
    isDarkMode,
    onOpenAuth,
    isAuthenticated,
    favorites = [],
    onToggleFavorite,
    onSelectFood
}) {
    const menu = useMenuSection(foods, onAddToCart, onToggleFavorite, onSelectFood, favorites);

    return (
        <section className="py-8">
            {/* Search and Category Tabs */}
            <div className="mb-10 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className={`font-sans text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 font-extrabold">Golden-Glow</span> Menu
                        </h2>
                        <p className={`text-sm mt-1.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Handcrafted delicacies prepared with top-tier fresh ingredients.
                        </p>
                    </div>

                    {/* Search bar */}
                    <div className="relative w-full md:max-w-xs">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                        <input
                            type="text"
                            placeholder="Search recipes..."
                            value={menu.searchQuery}
                            onChange={(e) => menu.setSearchQuery(e.target.value)}
                            className={`w-full rounded-2xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all border ${isDarkMode
                                    ? 'bg-zinc-950/40 border-white/[0.06] text-white focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/20'
                                    : 'bg-white border-slate-200 text-gray-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20'
                                }`}
                        />
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="flex overflow-x-auto pb-2 scrollbar-none gap-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => menu.setSelectedCategory(category)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${menu.selectedCategory === category
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/15 scale-105'
                                    : isDarkMode
                                        ? 'bg-zinc-900/40 border border-white/[0.04] text-gray-400 hover:text-white hover:border-white/[0.15]'
                                        : 'bg-white border border-slate-100 text-gray-600 hover:text-amber-600 hover:border-amber-100'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Foods Grid */}
            {menu.filteredFoods.length === 0 ? (
                <div className="text-center py-16 rounded-3xl border border-dashed border-amber-500/10">
                    <p className="text-gray-500 text-sm">No gourmet foods match your selection. Try adjusting your search!</p>
                </div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {menu.filteredFoods.map((food) => {
                        const hasSpicy = food.tags.includes('Spicy');
                        const hasVegan = food.tags.includes('Vegan');
                        const hasChefSpec = food.tags.includes('Chef Spec') || food.tags.includes('Gourmet');

                        return (
                            <motion.div
                                layout
                                key={food.id}
                                whileHover={{ y: -6 }}
                                onClick={() => onSelectFood?.(food.id)}
                                className={`relative overflow-hidden rounded-2xl border transition-all duration-300 flex flex-col h-full group cursor-pointer ${isDarkMode
                                        ? 'bg-zinc-900/40 border-white/[0.04] text-white shadow-md hover:shadow-amber-500/5 hover:border-amber-500/20'
                                        : 'bg-white border-slate-100 text-gray-800 shadow-sm hover:shadow-md hover:border-amber-200/50'
                                    }`}
                            >
                                <div className="relative h-48 w-full overflow-hidden">
                                    <img
                                        src={food.image}
                                        alt={food.name}
                                        referrerPolicy="no-referrer"
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                                        {hasChefSpec && (
                                            <span className="bg-amber-500 text-black text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-0.5">
                                                <Sparkles className="h-2.5 w-2.5" />
                                                Gourmet
                                            </span>
                                        )}
                                        {hasSpicy && (
                                            <span className="bg-red-600 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-0.5">
                                                <Flame className="h-2.5 w-2.5" />
                                                Spicy
                                            </span>
                                        )}
                                        {hasVegan && (
                                            <span className="bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-0.5">
                                                <Leaf className="h-2.5 w-2.5" />
                                                Vegan
                                            </span>
                                        )}
                                    </div>

                                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                                        <div className="bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1">
                                            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                                            <span>{food.rating}</span>
                                        </div>
                                        {isAuthenticated && (
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    onToggleFavorite(food.id);
                                                }}
                                                className="p-1.5 rounded-lg backdrop-blur-md transition-all bg-black/50 text-white cursor-pointer hover:scale-110 active:scale-90 duration-150 group"
                                                title={favorites.includes(food.id) ? 'Remove from favorites' : 'Add to favorites'}
                                            >
                                                <Heart className={`h-3 w-3 transition-colors duration-150 ${favorites.includes(food.id) ? 'fill-amber-500 text-amber-500' : 'text-white group-hover:text-amber-400'
                                                    }`} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium opacity-90">
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5 text-amber-400" />
                                            {food.preparationTime} mins
                                        </span>

                                        {food.calories && <span>{food.calories} kcal</span>}
                                    </div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-1 block">
                                            {food.category}
                                        </span>

                                        <h3 className={`font-sans text-base font-bold leading-tight mb-2 ${isDarkMode ? 'text-white group-hover:text-amber-300' : 'text-gray-900 group-hover:text-amber-600'
                                            }`}>
                                            {food.name}
                                        </h3>

                                        <p className={`text-xs line-clamp-2 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                            }`}>
                                            {food.description}
                                        </p>
                                    </div>

                                    <div className="mt-5 pt-4 border-t border-dashed border-gray-500/10 flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] opacity-65 block">Price</span>
                                            <span className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                                                ${food.price.toFixed(2)}
                                            </span>
                                        </div>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSelectFood?.(food.id);
                                            }}
                                            className="px-3.5 py-2 text-xs font-semibold rounded-xl text-white bg-amber-500 hover:bg-amber-600 transition-all flex items-center gap-1 cursor-pointer hover:shadow-md hover:shadow-amber-500/10 active:scale-95 duration-150"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                            <span>Order</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}

            {/* Customize Modal */}
            <AnimatePresence>
                {menu.activeCustomizeFood && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => menu.setActiveCustomizeFood(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className={`relative w-full max-w-lg overflow-hidden rounded-2xl border p-6 shadow-2xl transition-all duration-300 ${isDarkMode
                                    ? 'bg-zinc-900 border-white/10 text-white shadow-2xl shadow-black/80'
                                    : 'bg-white border-slate-100 text-gray-800 shadow-xl shadow-slate-100'
                                }`}
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />

                            <button
                                onClick={() => menu.setActiveCustomizeFood(null)}
                                className="absolute top-4 right-4 rounded-full p-1 hover:bg-gray-500/10 text-gray-400"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="flex gap-4 mb-5">
                                <img
                                    src={menu.activeCustomizeFood.image}
                                    alt={menu.activeCustomizeFood.name}
                                    className="w-20 h-20 rounded-xl object-cover border border-amber-500/20"
                                />
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                                        {menu.activeCustomizeFood.category}
                                    </span>
                                    <h3 className="font-sans text-lg font-bold leading-tight">
                                        {menu.activeCustomizeFood.name}
                                    </h3>
                                    <p className="text-xs opacity-75 mt-1 line-clamp-2">
                                        {menu.activeCustomizeFood.description}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                                {/* Spice Level */}
                                {(menu.activeCustomizeFood.tags.includes('Spicy') ||
                                    menu.activeCustomizeFood.category === 'Burgers' ||
                                    menu.activeCustomizeFood.category === 'Pizza & Pasta') && (
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wide mb-2 opacity-80">
                                                Select Spice Intensity
                                            </label>
                                            <div className="grid grid-cols-4 gap-2">
                                                {['Mild', 'Medium', 'Hot', 'Extra Hot'].map((level) => (
                                                    <button
                                                        key={level}
                                                        onClick={() => menu.setSpiceLevel(level)}
                                                        className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${menu.spiceLevel === level
                                                                ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                                                                : isDarkMode
                                                                    ? 'bg-[#241c15] border-white/10 text-gray-400 hover:text-white'
                                                                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        {level}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                {/* Toppings */}
                                {menu.activeCustomizeFood.category !== 'Drinks' && menu.activeCustomizeFood.category !== 'Desserts' && (
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wide mb-2 opacity-80">
                                            Add Extra Toppings & Breads
                                        </label>
                                        <div className="space-y-2">
                                            <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${menu.extraCheese ? 'border-amber-500/40 bg-amber-500/5' : isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-gray-150 hover:bg-gray-50'
                                                }`}>
                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" checked={menu.extraCheese} onChange={(e) => menu.setExtraCheese(e.target.checked)} className="rounded text-amber-500" />
                                                    <span className="text-xs">Extra Melted Cheese</span>
                                                </div>
                                                <span className="text-xs font-bold text-amber-500">+$1.50</span>
                                            </label>

                                            <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${menu.extraSauce ? 'border-amber-500/40 bg-amber-500/5' : isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-gray-150 hover:bg-gray-50'
                                                }`}>
                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" checked={menu.extraSauce} onChange={(e) => menu.setExtraSauce(e.target.checked)} className="rounded text-amber-500" />
                                                    <span className="text-xs">Extra Signature Sauce</span>
                                                </div>
                                                <span className="text-xs font-bold text-amber-500">+$0.75</span>
                                            </label>

                                            <label className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${menu.glutenFree ? 'border-amber-500/40 bg-amber-500/5' : isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-gray-150 hover:bg-gray-50'
                                                }`}>
                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" checked={menu.glutenFree} onChange={(e) => menu.setGlutenFree(e.target.checked)} className="rounded text-amber-500" />
                                                    <span className="text-xs">Gluten-Free Bun/Pasta Alternative</span>
                                                </div>
                                                <span className="text-xs font-bold text-amber-500">+$2.00</span>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* Special Instructions */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wide mb-1 opacity-80">
                                        Special Kitchen Notes
                                    </label>
                                    
                                    <textarea
                                        placeholder="No onions, sauce on the side, well done patties, etc..."
                                        value={menu.specialInstructions}
                                        onChange={(e) => menu.setSpecialInstructions(e.target.value)}
                                        rows={2}
                                        className={`w-full rounded-xl p-3 text-xs outline-none transition-all border resize-none ${isDarkMode
                                                ? 'bg-[#241c15] border-white/10 focus:border-amber-500'
                                                : 'bg-gray-50 border-gray-200 focus:border-amber-400'
                                            }`}
                                    />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-6 pt-4 border-t border-dashed border-gray-500/20 flex items-center justify-between gap-4">
                                <div>
                                    <span className="text-xs opacity-60">Total Item Price</span>
                                    <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                                        ${menu.calculateCustomizedPrice().toFixed(2)}
                                    </p>
                                </div>

                                <button
                                    onClick={menu.handleConfirmAdd}
                                    className="flex-1 max-w-[240px] px-5 py-3 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 shadow-md shadow-amber-500/20 cursor-pointer text-center hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Add To Basket
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}