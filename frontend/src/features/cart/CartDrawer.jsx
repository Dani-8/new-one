// src/features/auth/CartDrawer.jsx
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, CreditCard, Truck, Receipt, MapPin, Phone } from 'lucide-react';
import { useCartDrawer } from './useCartDrawer';

export default function CartDrawer({
    isOpen,
    onClose,
    cartItems,
    onUpdateQuantity,
    onRemoveItem,
    onCheckout,
    isDarkMode,
    currentUser,
    onOpenAuth
}) {
    const cart = useCartDrawer(cartItems, onCheckout, onOpenAuth, currentUser, onClose);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 overflow-hidden">
                {/* Backdrop overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-xs"
                />

                {/* Drawer slide panel */}
                <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                        className={`w-screen max-w-md border-l flex flex-col justify-between ${isDarkMode
                            ? 'bg-[#141416] border-white/[0.04] text-white'
                            : 'bg-white border-amber-100 text-gray-800'
                            }`}
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-500/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5 text-amber-500" />
                                <h2 className="font-sans text-lg font-bold">Your Basket</h2>
                                <span className="bg-amber-500/10 text-amber-400 text-xs px-2.5 py-0.5 rounded-full font-bold">
                                    {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1.5 rounded-full hover:bg-gray-500/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Scrollable list of items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="inline-flex p-4 rounded-full bg-amber-500/10 text-amber-500 mb-3 animate-bounce">
                                        <ShoppingBag className="h-8 w-8" />
                                    </div>
                                    <p className="text-sm opacity-60">Your shopping basket is empty.</p>
                                    <button
                                        onClick={onClose}
                                        className="mt-4 text-xs font-bold text-amber-500 hover:underline cursor-pointer"
                                    >
                                        Start adding delicious bites!
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item) => {
                                        const priceAdjustment =
                                            (item.customizations?.extraCheese ? 1.50 : 0) +
                                            (item.customizations?.extraSauce ? 0.75 : 0) +
                                            (item.customizations?.glutenFree ? 2.00 : 0);
                                        const singleItemTotal = item.foodItem.price + priceAdjustment;

                                        const mods = [];
                                        if (item.customizations?.spiceLevel) mods.push(`🌶️ ${item.customizations.spiceLevel}`);
                                        if (item.customizations?.extraCheese) mods.push('🧀 Extra Cheese');
                                        if (item.customizations?.extraSauce) mods.push('🥫 Extra Sauce');
                                        if (item.customizations?.glutenFree) mods.push('🌾 Gluten Free');

                                        return (
                                            <div
                                                key={item.id}
                                                className={`p-3 rounded-xl border flex gap-3 transition-colors ${isDarkMode
                                                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 shadow-amber-500/5'
                                                    : 'bg-amber-50/30 border-amber-100/50 text-gray-800'
                                                    }`}
                                            >
                                                <img
                                                    src={item.foodItem.image}
                                                    alt={item.foodItem.name}
                                                    className="w-14 h-14 rounded-lg object-cover border border-amber-500/10"
                                                />

                                                <div className="flex-1">
                                                    <h4 className="text-xs font-bold line-clamp-1">{item.foodItem.name}</h4>
                                                    <p className="text-[10px] text-amber-500 font-bold mt-0.5">
                                                        ${singleItemTotal.toFixed(2)} each
                                                    </p>
                                                    {mods.length > 0 && (
                                                        <p className="text-[9px] opacity-70 mt-1 flex flex-wrap gap-1 leading-normal">
                                                            {mods.join(' • ')}
                                                        </p>
                                                    )}
                                                    {item.specialInstructions && (
                                                        <p className="text-[10px] text-amber-600/90 dark:text-amber-400 mt-1 bg-amber-500/5 dark:bg-amber-500/10 px-2 py-1 rounded-lg">
                                                            <span className="font-semibold text-amber-700 dark:text-amber-300">Note:</span> {item.specialInstructions}
                                                        </p>
                                                    )}

                                                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-500/5">
                                                        <div className="flex items-center space-x-1.5">
                                                            <button
                                                                onClick={() => onUpdateQuantity(item.id, -1)}
                                                                className="p-1 rounded-md bg-gray-500/10 hover:bg-gray-500/20 text-xs cursor-pointer"
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </button>
                                                            <span className="text-xs font-bold font-mono px-1.5">{item.quantity}</span>
                                                            <button
                                                                onClick={() => onUpdateQuantity(item.id, 1)}
                                                                className="p-1 rounded-md bg-gray-500/10 hover:bg-gray-500/20 text-xs cursor-pointer"
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => onRemoveItem(item.id)}
                                                            className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                                                            title="Delete Item"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Delivery & Checkout Section */}
                        {cartItems.length > 0 && (
                            <div className={`p-6 border-t border-dashed border-gray-500/10 space-y-4 ${isDarkMode ? 'bg-zinc-900/30' : 'bg-gray-50/50'}`}>
                                {cart.error && (
                                    <div className="rounded-lg bg-red-500/15 p-2.5 text-xs text-red-500 border border-red-500/20">
                                        {cart.error}
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold uppercase tracking-wider opacity-80 flex items-center gap-1">
                                        <Truck className="h-3.5 w-3.5 text-amber-500" />
                                        <span>Delivery Credentials</span>
                                    </h3>

                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 opacity-50" />
                                        <input
                                            type="text"
                                            placeholder="Enter Delivery Street Address..."
                                            value={cart.address}
                                            onChange={(e) => cart.setAddress(e.target.value)}
                                            className={`w-full rounded-xl pl-9 pr-3 py-2 text-xs outline-none transition-all border ${isDarkMode
                                                ? 'bg-zinc-900/50 border-white/[0.06] focus:border-amber-500/50'
                                                : 'bg-white border-gray-200 focus:border-amber-400'
                                                }`}
                                        />
                                    </div>

                                    <div className="relative">
                                        <Phone className="absolute left-3 top-2.5 h-4 w-4 opacity-50" />
                                        <input
                                            type="tel"
                                            placeholder="Contact Phone Number..."
                                            value={cart.phone}
                                            onChange={(e) => cart.setPhone(e.target.value)}
                                            className={`w-full rounded-xl pl-9 pr-3 py-2 text-xs outline-none transition-all border ${isDarkMode
                                                ? 'bg-zinc-900/50 border-white/[0.06] focus:border-amber-500/50'
                                                : 'bg-white border-gray-200 focus:border-amber-400'
                                                }`}
                                        />
                                    </div>

                                    {/* Payment selection */}
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 opacity-60">
                                            Payment Mode
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                onClick={() => cart.setPaymentMethod('Cash on Delivery')}
                                                className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${cart.paymentMethod === 'Cash on Delivery'
                                                    ? 'bg-amber-500 text-white border-amber-500'
                                                    : isDarkMode ? 'bg-zinc-900/30 border-white/[0.04] hover:text-white' : 'bg-white border-gray-200 hover:bg-gray-50'
                                                    }`}
                                            >
                                                💵 COD
                                            </button>
                                            <button
                                                onClick={() => cart.setPaymentMethod('Credit Card')}
                                                className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${cart.paymentMethod === 'Credit Card'
                                                    ? 'bg-amber-500 text-white border-amber-500'
                                                    : isDarkMode ? 'bg-zinc-900/30 border-white/[0.04] hover:text-white' : 'bg-white border-gray-200 hover:bg-gray-50'
                                                    }`}
                                            >
                                                💳 Card Payment
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Totals */}
                                <div className="space-y-1.5 pt-3 border-t border-gray-500/5 text-xs">
                                    <div className="flex items-center justify-between opacity-80">
                                        <span>Subtotal</span>
                                        <span>${cart.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center justify-between opacity-80">
                                        <span className="flex items-center gap-1">
                                            <Truck className="h-3 w-3" />
                                            Delivery Fare
                                        </span>
                                        <span>${cart.deliveryFee.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center justify-between opacity-80">
                                        <span className="flex items-center gap-1">
                                            <Receipt className="h-3 w-3" />
                                            Tax (8%)
                                        </span>
                                        <span>${cart.tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center justify-between font-bold text-sm pt-2 border-t border-gray-500/10">
                                        <span>Grand Total</span>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 font-extrabold">
                                            ${cart.total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Place Order Button */}
                                <button
                                    onClick={cart.handlePlaceOrder}
                                    className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:opacity-95 text-white py-3 text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 cursor-pointer text-center mt-2"
                                >
                                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-15 rotate-12 group-hover:-translate-x-40" />
                                    Place Secure Order
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </AnimatePresence>
    );
}