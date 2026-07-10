// src/features/menu/MealBuilder.jsx
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Sparkles, Search, RefreshCw, ShoppingBag, Plus, ChefHat, AlertCircle
} from 'lucide-react'
import { useMealBuilder } from './useMealBuilder'

export default function MealBuilder({
    foods,
    onAddToCart,
    isDarkMode,
    onSelectFood
}) {
    const builder = useMealBuilder(foods, onAddToCart, onSelectFood);

    return (
        <div className="space-y-6">
            {/* Introduction */}
            <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/20 text-amber-400">
                    <ChefHat className="h-6 w-6 animate-bounce" />
                </div>

                <div>
                    <h2 className="font-sans text-xl font-bold tracking-tight">AI Master Chef Curations</h2>

                    <p className="text-xs opacity-75 mt-1">
                        Describe your cravings, diet constraints, or budget. The AI Chef immediately compiles your dream combo!
                    </p>
                </div>
            </div>
            

            {/* Input Form */}
            <form onSubmit={builder.handleSubmit} className="relative">
                <div className={`relative rounded-2xl overflow-hidden border transition-all duration-300 shadow-md ${isDarkMode
                        ? 'bg-zinc-950/40 border-white/[0.06] focus-within:border-amber-500/30'
                        : 'bg-white border-slate-200/80 focus-within:border-amber-300'
                    }`}>
                    <div className="flex items-center p-2.5">
                        <Search className="h-5 w-5 text-gray-400 ml-2 mr-3 shrink-0" />
                        <input
                            type="text"
                            value={builder.prompt}
                            onChange={(e) => builder.setPrompt(e.target.value)}
                            placeholder="e.g. 'I want a spicy burger and a healthy drink, under $25 total'"
                            className="w-full bg-transparent border-0 outline-none focus:ring-0 text-sm py-2 pr-4 placeholder:opacity-60"
                            disabled={builder.isLoading}
                        />
                        <button
                            type="submit"
                            disabled={builder.isLoading || !builder.prompt.trim()}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold font-sans flex items-center gap-1.5 cursor-pointer select-none transition-all duration-150 shrink-0 ${builder.isLoading || !builder.prompt.trim()
                                    ? 'bg-gray-500/10 text-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 text-white shadow-md shadow-amber-500/15 hover:scale-[1.02]'
                                }`}
                        >
                            {builder.isLoading ? (
                                <>
                                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                    <span>Whisking...</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-3.5 w-3.5" />
                                    <span>Ask AI Chef</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>

            {/* Prompt Suggestions */}
            <div className="flex flex-wrap gap-2 pt-1">
                {builder.promptSuggestions.map((suggestion) => (
                    <button
                        key={suggestion.label}
                        type="button"
                        onClick={() => builder.handleSuggestClick(suggestion.text)}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-sans font-medium border cursor-pointer transition-all duration-150 select-none ${builder.prompt === suggestion.text
                                ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                                : isDarkMode
                                    ? 'bg-[#241c15] border-amber-500/10 text-gray-300 hover:bg-amber-500/5 hover:text-white hover:border-amber-500/30'
                                    : 'bg-amber-50/50 border-amber-100 text-gray-600 hover:bg-amber-100/50 hover:text-amber-600'
                            }`}
                    >
                        {suggestion.label}
                    </button>
                ))}
            </div>

            {/* States Display */}
            <AnimatePresence mode="wait">
                {builder.isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-8 rounded-2xl border text-center space-y-4 ${isDarkMode ? 'bg-[#1e1712]/50 border-amber-500/10' : 'bg-amber-50/10 border-amber-100/50'
                            }`}
                    >
                        <div className="relative inline-flex items-center justify-center">
                            <span className="absolute inline-flex h-12 w-12 rounded-full bg-amber-500/20 animate-ping" />
                            <div className="relative p-4 bg-amber-500/10 rounded-full text-amber-400">
                                <ChefHat className="h-8 w-8 animate-spin" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h4 className="font-sans text-sm font-bold">Chef Gemini is Curating Your Feast...</h4>
                            <p className="text-xs opacity-60 max-w-xs mx-auto">
                                Analyzing ingredient pairings, calculating your dietary targets, and designing your ultimate package.
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono uppercase text-amber-400 font-bold">
                            <span className="animate-pulse">Slicing</span>
                            <span>•</span>
                            <span className="animate-pulse delay-100">Spicing</span>
                            <span>•</span>
                            <span className="animate-pulse delay-200">Plating</span>
                        </div>
                    </motion.div>
                )}

                {builder.error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-xs text-red-400 flex items-start gap-2.5"
                    >
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <p>{builder.error}</p>
                    </motion.div>
                )}

                {builder.curatedBundle && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 20 }}
                        className={`rounded-2xl border p-5 sm:p-6 space-y-5 shadow-2xl transition-all duration-300 relative overflow-hidden ${isDarkMode
                                ? 'bg-zinc-900/95 border-white/[0.06] shadow-black/40'
                                : 'bg-white border-slate-100 shadow-slate-100 shadow-xl'
                            }`}
                    >
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-500/10 pb-4">
                            <div className="space-y-1">
                                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold font-mono">
                                    <Zap className="h-3 w-3" />
                                    <span>AI SPECIFIC SELECTION</span>
                                </div>
                                <h3 className="font-sans text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                                    {builder.curatedBundle.name}
                                </h3>
                            </div>

                            <div className="text-left sm:text-right">
                                <p className="text-[10px] opacity-60 uppercase tracking-widest font-mono">Bundle Value</p>
                                <p className="text-xl font-black text-amber-500">${builder.calculateBundleTotal().toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1">
                                <ChefHat className="h-3.5 w-3.5" />
                                <span>Chef's Curation Notes:</span>
                            </h4>
                            <p className={`text-[13px] leading-relaxed font-light italic ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                                &ldquo;{builder.curatedBundle.explanation}&rdquo;
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-[10px] font-bold uppercase tracking-wider opacity-60">Curated Bundle Ingredients</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {builder.curatedBundle.items.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => onSelectFood(item.id)}
                                        className={`flex items-center gap-3 p-2.5 rounded-xl border hover:scale-[1.01] transition-all cursor-pointer select-none group ${isDarkMode
                                                ? 'bg-white/[0.02] border-white/[0.06] hover:border-amber-500/20 hover:bg-white/[0.04]'
                                                : 'bg-slate-50 border-slate-100 hover:border-amber-200 hover:bg-white'
                                            }`}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            referrerPolicy="no-referrer"
                                            className="w-12 h-12 rounded-lg object-cover shrink-0"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <h5 className="text-xs font-bold truncate group-hover:text-amber-400 transition-colors">
                                                {item.name}
                                            </h5>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] font-mono text-amber-500 font-bold">${item.price.toFixed(2)}</span>
                                                <span className="text-[8px] opacity-60 uppercase font-mono px-1 bg-gray-500/10 rounded">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onAddToCart({ foodItem: item, quantity: 1, customizations: {} });
                                                alert(`Added ${item.name} to basket!`);
                                            }}
                                            className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-white transition-all"
                                            title="Add just this item"
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={builder.handleAddBundleToCart}
                                className="flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer select-none transition-transform duration-150 active:scale-[0.98]"
                            >
                                <ShoppingBag className="h-4 w-4" />
                                <span>Add Entire AI Bundle to Basket • ${builder.calculateBundleTotal().toFixed(2)}</span>
                            </button>

                            <button
                                onClick={() => builder.setCuratedBundle(null)}
                                className={`py-3 px-5 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer select-none transition-all ${isDarkMode
                                        ? 'border-white/10 hover:border-white/20 text-gray-300 hover:text-white bg-white/5'
                                        : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800 bg-gray-50'
                                    }`}
                            >
                                Clear Bundle
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}