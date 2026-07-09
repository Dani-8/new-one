// src/features/menu/FoodDetailPage.jsx
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  Heart,
  Star,
  Clock,
  Flame,
  Leaf,
  Sparkles,
  ShoppingBag,
  Info,
  Plus,
  Minus,
  Sliders,
  MessageSquare,
  Gift,
  AlertCircle
} from 'lucide-react';
import { useFoodDetail } from './useFoodDetail';

export default function FoodDetailPage({
  food,
  onBack,
  onAddToCart,
  isDarkMode,
  favorites = [],
  onToggleFavorite,
  isAuthenticated,
  onOpenAuth
}) {
  const detail = useFoodDetail(food, onAddToCart, onOpenAuth, isAuthenticated, onBack);

  if (!food) return null;

  const isFavorite = favorites.includes(food.id);

  const hasSpicy = food.tags.includes('Spicy');
  const hasVegan = food.tags.includes('Vegan') || food.tags.includes('Veg');
  const hasChefSpec = food.tags.includes('Chef Spec') || food.tags.includes('Gourmet') || food.tags.includes('Bestseller');

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
      id={`food-detail-${food.id}`}
    >
      {/* Back button header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all border ${
            isDarkMode
              ? 'border-white/[0.04] hover:border-amber-500/25 bg-zinc-950/45 text-amber-400 hover:text-amber-300'
              : 'border-slate-100 hover:border-amber-200 bg-white text-amber-600 hover:text-amber-700 shadow-sm'
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Menu Catalog</span>
        </button>

        <span className={`text-[10px] font-mono uppercase tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Currently viewing {food.category}
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Image + Info */}
        <div className="lg:col-span-7 space-y-6">
          <div className={`overflow-hidden rounded-3xl border ${
            isDarkMode ? 'bg-zinc-900/40 border-white/[0.04]' : 'bg-white border-slate-100 shadow-xl'
          }`}>
            <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-black/5">
              <img
                src={food.image}
                alt={food.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

              {/* Badges */}
              <div className="absolute top-5 left-5 flex flex-wrap gap-1.5">
                {hasChefSpec && (
                  <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                    <Sparkles className="h-3 w-3" />
                    Signature
                  </span>
                )}
                {hasSpicy && (
                  <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg flex items-center gap-1 shadow-lg animate-pulse">
                    <Flame className="h-3 w-3" />
                    Spicy Intensity
                  </span>
                )}
                {hasVegan && (
                  <span className="bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                    <Leaf className="h-3 w-3" />
                    Green / Vegan
                  </span>
                )}
              </div>

              {/* Rating + Favorite */}
              <div className="absolute top-5 right-5 flex items-center gap-2">
                <div className="bg-black/60 backdrop-blur-md text-white text-xs font-black px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
                  <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  <span>{food.rating} Rating</span>
                </div>
                
                <button
                  onClick={() => onToggleFavorite(food.id)}
                  className="p-2 rounded-xl backdrop-blur-md bg-black/60 text-white transition-all cursor-pointer shadow-md hover:scale-110 active:scale-95 duration-200 group"
                  title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart className={`h-4 w-4 transition-colors duration-200 ${
                    isFavorite ? 'fill-amber-500 text-amber-500' : 'text-white group-hover:text-amber-400'
                  }`} />
                </button>
              </div>

              {/* Prep + Calories */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white text-xs font-bold font-mono">
                <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-md backdrop-blur-xs">
                  <Clock className="h-4 w-4 text-amber-400" />
                  Kitchen prep: {food.preparationTime} mins
                </span>
                {food.calories && (
                  <span className="bg-black/40 px-3 py-1 rounded-md backdrop-blur-xs">
                    {food.calories} calories (kcal)
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">Gourmet Selection</span>
                <h1 className={`font-sans text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 leading-tight ${
                  isDarkMode ? 'text-white' : 'text-gray-950'
                }`}>
                  {food.name}
                </h1>
              </div>

              <div className="h-[1px] bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent" />

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider opacity-60 block">Description & Ingredients</span>
                <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {food.description}
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-2">
                {food.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                      isDarkMode
                        ? 'bg-amber-500/10 text-amber-300 border border-white/[0.04]'
                        : 'bg-amber-50 text-amber-700 border border-slate-100'
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Freshness Promise */}
          <div className={`p-5 rounded-2xl border flex gap-4 items-start ${
            isDarkMode ? 'bg-zinc-900/30 border-white/[0.04]' : 'bg-slate-50/50 border-slate-100'
          }`}>
            <div className="p-2 bg-amber-500/15 rounded-xl text-amber-500">
              <Info className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-extrabold uppercase tracking-wide">Dynamic Freshness Promise</h4>
              <p className="text-xs opacity-70 leading-relaxed">
                This item is prepped raw immediately upon order confirmation. We pack all meals in specialized micro-thermal containers to guarantee an oven-fresh delivery bite.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Customization Engine */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`rounded-3xl border p-6 sm:p-8 space-y-6 relative overflow-hidden ${
            isDarkMode ? 'bg-zinc-900/40 border-white/[0.04] text-white shadow-lg' : 'bg-white border-slate-100 text-gray-800 shadow-xl'
          }`}>
            <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full bg-amber-500/5 filter blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-gray-500/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">Order Setup</span>
                <h3 className="font-sans text-lg font-bold">Configure Gourmet Dish</h3>
              </div>
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                <Sliders className="h-5 w-5" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold opacity-70">Item Base Price:</span>
              <span className="text-lg font-bold text-amber-500">${food.price.toFixed(2)}</span>
            </div>

            <div className="space-y-6">
              {/* Spice Level */}
              {(food.tags.includes('Spicy') || food.category === 'Burgers' || food.category === 'Pizza & Pasta') && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wide opacity-85 flex items-center gap-1">
                      <Flame className="h-3.5 w-3.5 text-amber-500" />
                      Spice Intensity
                    </label>
                    <span className="text-xs font-mono font-bold text-amber-400">{detail.spiceLevel}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {['Mild', 'Medium', 'Hot', 'Extra Hot'].map((level) => (
                      <button
                        key={level}
                        onClick={() => detail.setSpiceLevel(level)}
                        className={`py-2 rounded-xl text-[11px] font-extrabold border transition-all cursor-pointer ${
                          detail.spiceLevel === level
                            ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/15'
                            : isDarkMode
                              ? 'bg-white/[0.02] border-white/[0.06] text-gray-400 hover:text-white hover:border-white/[0.12]'
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
              {food.category !== 'Drinks' && food.category !== 'Desserts' && (
                <div className="space-y-2.5">
                  <label className="text-xs font-bold uppercase tracking-wide opacity-85 block">
                    Luxury Add-ons & Alternatives
                  </label>
                  <div className="space-y-2">
                    <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                      detail.extraCheese ? 'border-amber-500 bg-amber-500/5 shadow-sm' : isDarkMode ? 'border-white/5 hover:border-white/10 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <input type="checkbox" checked={detail.extraCheese} onChange={(e) => detail.setExtraCheese(e.target.checked)} className="rounded text-amber-500" />
                        <div className="text-left">
                          <span className="text-xs font-bold block">Extra Melted Cheese</span>
                          <span className="text-[10px] opacity-60 block">A double layer of gourmet cheddar</span>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-amber-500">+$1.50</span>
                    </label>

                    <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                      detail.extraSauce ? 'border-amber-500 bg-amber-500/5 shadow-sm' : isDarkMode ? 'border-white/5 hover:border-white/10 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <input type="checkbox" checked={detail.extraSauce} onChange={(e) => detail.setExtraSauce(e.target.checked)} className="rounded text-amber-500" />
                        <div className="text-left">
                          <span className="text-xs font-bold block">Signature House Sauce</span>
                          <span className="text-[10px] opacity-60 block">Tangy and sweet herbal glaze</span>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-amber-500">+$0.75</span>
                    </label>

                    <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                      detail.glutenFree ? 'border-amber-500 bg-amber-500/5 shadow-sm' : isDarkMode ? 'border-white/5 hover:border-white/10 hover:bg-white/5' : 'border-gray-100 hover:bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <input type="checkbox" checked={detail.glutenFree} onChange={(e) => detail.setGlutenFree(e.target.checked)} className="rounded text-amber-500" />
                        <div className="text-left">
                          <span className="text-xs font-bold block">Gluten-Free Alternative</span>
                          <span className="text-[10px] opacity-60 block">Baked with organic rice flour</span>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-amber-500">+$2.00</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Presets */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wide opacity-85 block flex items-center gap-1">
                  <Gift className="h-3.5 w-3.5 text-amber-500" />
                  What can we do for you with this item?
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {detail.presets.map((p) => {
                    const isSelected = detail.selectedPresets.includes(p.text);
                    return (
                      <button
                        key={p.id}
                        onClick={() => detail.handleTogglePreset(p.text)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/25 border-amber-500 text-amber-400'
                            : isDarkMode
                              ? 'border-white/[0.05] hover:border-amber-500/25 text-gray-400 hover:text-white bg-zinc-950/40'
                              : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        {isSelected ? '✓ ' : ''}{p.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Instructions */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wide opacity-85 flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5 text-amber-500" />
                  Custom Kitchen Short Message
                </label>
                <textarea
                  placeholder="e.g. Extra napkins, please no sesame seeds, light salt..."
                  value={detail.specialInstructions}
                  onChange={(e) => detail.setSpecialInstructions(e.target.value)}
                  maxLength={160}
                  rows={2}
                  className={`w-full rounded-xl p-3 text-xs outline-none transition-all border resize-none ${
                    isDarkMode
                      ? 'bg-black/30 border-white/[0.06] focus:border-amber-500/40 text-white'
                      : 'bg-gray-50 border-gray-200 focus:border-amber-400 text-gray-800'
                  }`}
                />
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between border-t border-gray-500/10 pt-4">
                <span className="text-xs font-bold uppercase tracking-wider opacity-80">Serving Quantity:</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => detail.setQuantity(Math.max(1, detail.quantity - 1))} className={`h-8 w-8 rounded-lg flex items-center justify-center border cursor-pointer transition-all ${isDarkMode ? 'border-amber-500/10 hover:border-amber-500/30 text-gray-400 hover:text-white bg-black/20' : 'border-gray-200 hover:bg-gray-100 text-gray-600 bg-white shadow-xs'}`}>
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-black w-6 text-center">{detail.quantity}</span>
                  <button onClick={() => detail.setQuantity(detail.quantity + 1)} className={`h-8 w-8 rounded-lg flex items-center justify-center border cursor-pointer transition-all ${isDarkMode ? 'border-amber-500/10 hover:border-amber-500/30 text-gray-400 hover:text-white bg-black/20' : 'border-gray-200 hover:bg-gray-100 text-gray-600 bg-white shadow-xs'}`}>
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Total + Add Button */}
              <div className="pt-4 border-t border-dashed border-gray-500/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-gray-400">Total Price Estimate</span>
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse">
                    ${detail.calculateCustomizedPrice().toFixed(2)}
                  </span>
                </div>

                {isAuthenticated ? (
                  <button
                    onClick={detail.handleConfirmAdd}
                    className="w-full py-4 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 shadow-lg shadow-amber-500/25 rounded-2xl flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.98] transition-all"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add Customizable Build to Basket</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={onOpenAuth}
                      className="w-full py-4 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      Unlock & Place Customizable Order
                    </button>
                    <p className="text-[10px] text-center opacity-70 flex items-center justify-center gap-1">
                      <AlertCircle className="h-3 w-3 text-amber-500" />
                      Sign in or Register to configure premium builds.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}