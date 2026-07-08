// src/features/auth/ProfileDrawer.jsx
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    X,
    User,
    History,
    Heart,
    MapPin,
    Moon,
    Sun,
    HelpCircle,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Plus,
    Trash2,
    Calendar,
    Shield,
    Edit2,
    Check
} from 'lucide-react';
import { useProfileDrawer } from './useProfileDrawer';

export default function ProfileDrawer({
    isOpen,
    onClose,
    currentUser,
    onLogout,
    isDarkMode,
    onToggleTheme,
    onOpenOrdersHistory,
    orders,
    favorites,
    onToggleFavorite,
    onAddToCart,
    foods,
    onSelectFood
}) {
    const profile = useProfileDrawer(
        currentUser,
        onLogout,
        onOpenOrdersHistory,
        orders,
        favorites,
        foods,
        onToggleFavorite,
        onAddToCart,
        onSelectFood,
        onClose
    );

    if (!isOpen || !currentUser) return null;

    const favoriteFoods = profile.favoriteFoods;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 overflow-hidden" id="profile-drawer-overlay">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-xs"
                />

                {/* Panel Wrapper */}
                <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 240 }}
                        className={`w-screen max-w-md border-l flex flex-col justify-between h-full shadow-2xl ${isDarkMode
                                ? 'bg-[#141416] border-white/[0.04] text-white'
                                : 'bg-white border-amber-100 text-gray-800'
                            }`}
                    >
                        {/* PANEL HEADER */}
                        <div className="p-6 border-b border-gray-500/10 flex items-center justify-between">
                            {profile.currentPanel ? (
                                <button
                                    onClick={() => profile.setCurrentPanel(null)}
                                    className={`flex items-center gap-1 text-xs font-bold uppercase tracking-wider cursor-pointer ${isDarkMode ? 'text-amber-400 hover:text-amber-300' : 'text-amber-600 hover:text-amber-700'
                                        }`}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span>Back</span>
                                </button>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-amber-500" />
                                    <h2 className="font-sans text-lg font-bold">Your Account</h2>
                                </div>
                            )}

                            <button
                                onClick={onClose}
                                className={`p-1.5 rounded-lg border cursor-pointer transition-all ${isDarkMode
                                        ? 'border-white/10 hover:bg-white/5 text-gray-400 hover:text-white'
                                        : 'border-gray-200 hover:bg-gray-50 text-gray-500 hover:text-gray-800'
                                    }`}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* SCROLLABLE PANEL CONTENT */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

                            {/* Profile Summary Card */}
                            {profile.currentPanel === null && (
                                <div className={`relative rounded-2xl p-5 border overflow-hidden ${isDarkMode
                                        ? 'bg-gradient-to-br from-zinc-900/60 to-[#141416] border-white/[0.04]'
                                        : 'bg-gradient-to-br from-amber-50/50 to-white border-amber-100 shadow-sm'
                                    }`}>
                                    <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-amber-500/10 filter blur-xl pointer-events-none" />

                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center text-white font-black text-lg shadow-lg ring-2 ring-amber-500/30">
                                            {profile.initials}
                                        </div>
                                        <div>
                                            <h3 className="font-sans text-base font-extrabold flex items-center gap-1.5">
                                                {currentUser.name}
                                                {currentUser.role === 'admin' && (
                                                    <span className="bg-purple-600/20 text-purple-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-purple-500/20 flex items-center gap-0.5">
                                                        <Shield className="h-2.5 w-2.5" />
                                                        Admin
                                                    </span>
                                                )}
                                            </h3>
                                            <p className="text-xs opacity-60 mt-0.5">{currentUser.email}</p>
                                            <div className="flex items-center gap-1 text-[10px] text-amber-500/70 mt-1 font-mono">
                                                <Calendar className="h-3 w-3" />
                                                <span>Member since July 2026</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* DYNAMIC PANEL VIEWS */}
                            <AnimatePresence mode="wait">
                                {profile.currentPanel === null && (
                                    <motion.div
                                        key="main-panel"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex flex-col justify-between h-[calc(100%-80px)] space-y-8"
                                    >
                                        {/* Top Options List */}
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-mono uppercase tracking-widest text-amber-500/70 font-bold mb-3">Club Services</p>

                                            <button
                                                onClick={() => profile.togglePanel('profile')}
                                                className={`w-full p-4 rounded-xl flex items-center justify-between border text-left transition-all duration-200 cursor-pointer ${isDarkMode ? 'bg-zinc-900/30 border-white/[0.04] hover:border-white/[0.12] hover:bg-white/[0.02]' : 'bg-white border-amber-100/50 hover:border-amber-200 hover:bg-amber-50/20 shadow-xs'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-500">
                                                        <User className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold">My Profile</h4>
                                                        <p className="text-[11px] text-gray-400 mt-0.5">Edit credentials and phone</p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-gray-400" />
                                            </button>

                                            <button
                                                onClick={() => profile.togglePanel('orders')}
                                                className={`w-full p-4 rounded-xl flex items-center justify-between border text-left transition-all duration-200 cursor-pointer ${isDarkMode ? 'bg-zinc-900/30 border-white/[0.04] hover:border-white/[0.12] hover:bg-white/[0.02]' : 'bg-white border-amber-100/50 hover:border-amber-200 hover:bg-amber-50/20 shadow-xs'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-500">
                                                        <History className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold">My Orders</h4>
                                                        <p className="text-[11px] text-gray-400 mt-0.5">
                                                            Track current and historical meals ({orders.filter(o => o.userId === currentUser.id).length} orders)
                                                        </p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-gray-400" />
                                            </button>

                                            <button
                                                onClick={() => profile.togglePanel('favorites')}
                                                className={`w-full p-4 rounded-xl flex items-center justify-between border text-left transition-all duration-200 cursor-pointer ${isDarkMode ? 'bg-zinc-900/30 border-white/[0.04] hover:border-white/[0.12] hover:bg-white/[0.02]' : 'bg-white border-amber-100/50 hover:border-amber-200 hover:bg-amber-50/20 shadow-xs'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-500">
                                                        <Heart className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold">Favorites</h4>
                                                        <p className="text-[11px] text-gray-400 mt-0.5">
                                                            Your beloved recipes ({favorites.length} items)
                                                        </p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-gray-400" />
                                            </button>

                                            <button
                                                onClick={() => profile.togglePanel('addresses')}
                                                className={`w-full p-4 rounded-xl flex items-center justify-between border text-left transition-all duration-200 cursor-pointer ${isDarkMode ? 'bg-zinc-900/30 border-white/[0.04] hover:border-white/[0.12] hover:bg-white/[0.02]' : 'bg-white border-amber-100/50 hover:border-amber-200 hover:bg-amber-50/20 shadow-xs'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-500">
                                                        <MapPin className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold">Saved Addresses</h4>
                                                        <p className="text-[11px] text-gray-400 mt-0.5">Manage delivery destinations</p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-gray-400" />
                                            </button>
                                        </div>

                                        {/* Bottom Options List */}
                                        <div className="space-y-2 pt-6 border-t border-gray-500/10">
                                            <p className="text-[10px] font-mono uppercase tracking-widest text-amber-500/70 font-bold mb-3">Preferences & Access</p>

                                            <button
                                                onClick={onToggleTheme}
                                                className={`w-full p-4 rounded-xl flex items-center justify-between border text-left transition-all duration-200 cursor-pointer ${isDarkMode ? 'bg-zinc-900/30 border-white/[0.04] hover:border-white/[0.12] hover:bg-white/[0.02]' : 'bg-white border-amber-100/50 hover:border-amber-200 hover:bg-amber-50/20 shadow-xs'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-500">
                                                        {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold">Appearance</h4>
                                                        <p className="text-[11px] text-gray-400 mt-0.5">Currently: {isDarkMode ? 'Dark Mode' : 'Light Mode'}</p>
                                                    </div>
                                                </div>
                                                <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 ${isDarkMode ? 'bg-amber-500' : 'bg-gray-300'}`}>
                                                    <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-200 ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`} />
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => profile.togglePanel('help')}
                                                className={`w-full p-4 rounded-xl flex items-center justify-between border text-left transition-all duration-200 cursor-pointer ${isDarkMode ? 'bg-zinc-900/30 border-white/[0.04] hover:border-white/[0.12] hover:bg-white/[0.02]' : 'bg-white border-amber-100/50 hover:border-amber-200 hover:bg-amber-50/20 shadow-xs'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-500">
                                                        <HelpCircle className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold">Help & Support</h4>
                                                        <p className="text-[11px] text-gray-400 mt-0.5">FAQS and Contact options</p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="h-4 w-4 text-gray-400" />
                                            </button>

                                            {/* Logout */}
                                            {profile.showLogoutConfirm ? (
                                                <div className={`w-full p-4 rounded-xl border space-y-3 transition-all duration-200 ${isDarkMode ? 'bg-red-950/20 border-red-500/20 text-red-200' : 'bg-red-50/50 border-red-200 text-red-800'
                                                    }`}>
                                                    <div className="flex items-center gap-2">
                                                        <LogOut className="h-4 w-4 text-red-500 animate-pulse" />
                                                        <h4 className="text-xs font-bold uppercase tracking-wide">Confirm Log Out?</h4>
                                                    </div>
                                                    <p className="text-[11px] opacity-80 leading-relaxed">
                                                        Are you sure you want to disconnect? Your customized recipes and favorites will still be safe on your device.
                                                    </p>
                                                    <div className="flex gap-2 pt-1">
                                                        <button
                                                            onClick={() => profile.setShowLogoutConfirm(false)}
                                                            className={`flex-1 py-2 rounded-lg text-[11px] font-bold border cursor-pointer text-center ${isDarkMode ? 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5' : 'border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                                                                }`}
                                                        >
                                                            Keep Account
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                profile.setShowLogoutConfirm(false);
                                                                onLogout();
                                                                onClose();
                                                            }}
                                                            className="flex-1 py-2 rounded-lg text-[11px] font-bold text-white bg-red-500 hover:bg-red-600 cursor-pointer text-center"
                                                        >
                                                            Yes, Log Out
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => profile.setShowLogoutConfirm(true)}
                                                    className={`w-full p-4 rounded-xl flex items-center justify-between border text-left transition-all duration-200 cursor-pointer ${isDarkMode ? 'bg-red-500/5 border-red-500/10 hover:border-red-500/30 hover:bg-red-500/10 text-red-400' : 'bg-red-50/30 border-red-100 hover:border-red-200 hover:bg-red-50 text-red-600 shadow-xs'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2.5 rounded-xl bg-red-500/15 text-red-500">
                                                            <LogOut className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-bold">Log Out</h4>
                                                            <p className="text-[11px] opacity-70 mt-0.5">Disconnect account</p>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="h-4 w-4 opacity-70" />
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* MY PROFILE SUBPANEL */}
                                {profile.currentPanel === 'profile' && (
                                    <motion.div
                                        key="profile-sub"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center gap-2">
                                            <User className="h-5 w-5 text-amber-500" />
                                            <h3 className="text-base font-extrabold">Profile Details</h3>
                                        </div>

                                        {!profile.isEditingProfile ? (
                                            <div className={`p-5 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-zinc-900/30 border-white/[0.04]' : 'bg-amber-50/30 border-amber-100/50'}`}>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <span className="text-[10px] opacity-55 block uppercase font-mono tracking-wider">Full Name</span>
                                                        <span className="text-sm font-bold block mt-0.5">{currentUser.name}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] opacity-55 block uppercase font-mono tracking-wider">Email Address</span>
                                                        <span className="text-sm font-bold block mt-0.5 truncate">{currentUser.email}</span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-dashed border-gray-500/10">
                                                    <div>
                                                        <span className="text-[10px] opacity-55 block uppercase font-mono tracking-wider">Contact Phone</span>
                                                        <span className="text-sm font-bold block mt-0.5">{currentUser.phone || 'Not added yet'}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] opacity-55 block uppercase font-mono tracking-wider">Membership Level</span>
                                                        <span className="text-xs font-bold text-amber-500 mt-0.5 block flex items-center gap-1 uppercase tracking-wider font-mono">
                                                            ★ Gourmet VIP
                                                        </span>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => profile.setIsEditingProfile(true)}
                                                    className="w-full py-2.5 rounded-xl border border-amber-500/20 hover:border-amber-500/40 text-amber-500 hover:bg-amber-500/5 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all mt-4"
                                                >
                                                    <Edit2 className="h-3.5 w-3.5" />
                                                    <span>Edit Details</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <form onSubmit={profile.handleSaveProfile} className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold opacity-80">Full Name</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={profile.name}
                                                        onChange={(e) => profile.setName(e.target.value)}
                                                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${isDarkMode ? 'bg-black/30 border-amber-500/10 focus:border-amber-500/40 text-white' : 'bg-white border-amber-100 focus:border-amber-500 text-gray-800'
                                                            }`}
                                                    />
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-semibold opacity-80">Contact Phone</label>
                                                    <input
                                                        type="tel"
                                                        placeholder="+1 (555) 019-2834"
                                                        value={profile.phone}
                                                        onChange={(e) => profile.setPhone(e.target.value)}
                                                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${isDarkMode ? 'bg-black/30 border-amber-500/10 focus:border-amber-500/40 text-white' : 'bg-white border-amber-100 focus:border-amber-500 text-gray-800'
                                                            }`}
                                                    />
                                                </div>

                                                <div className="flex gap-3 pt-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            profile.setName(currentUser.name);
                                                            profile.setPhone(currentUser.phone || '');
                                                            profile.setIsEditingProfile(false);
                                                        }}
                                                        className={`flex-1 py-3 rounded-xl text-xs font-semibold border text-center cursor-pointer transition-all ${isDarkMode ? 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5' : 'border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="flex-1 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 text-white shadow shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                        <span>Save Changes</span>
                                                    </button>
                                                </div>
                                            </form>
                                        )}

                                        <div className={`p-4 rounded-xl border text-xs leading-relaxed font-light ${isDarkMode ? 'bg-[#1a110a]/40 border-amber-500/10 text-amber-300' : 'bg-amber-50/10 border-amber-100 text-amber-700'
                                            }`}>
                                            💡 <strong>Exclusive Perks Info:</strong> Your profile gives you immediate access to our custom multi-toppings builder, live order statuses, and automatic entry into our gourmet delivery insurance pools.
                                        </div>
                                    </motion.div>
                                )}

                                {/* MY ORDERS SUBPANEL */}
                                {profile.currentPanel === 'orders' && (
                                    <motion.div
                                        key="orders-sub"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center gap-2">
                                            <History className="h-5 w-5 text-amber-500" />
                                            <h3 className="text-base font-extrabold">Your Orders</h3>
                                        </div>

                                        <p className="text-xs text-gray-400">
                                            View details, track kitchen progress, and inspect live statuses of your gourmet dishes.
                                        </p>

                                        {orders.filter(o => o.userId === currentUser.id).length === 0 ? (
                                            <div className="text-center py-10 space-y-3">
                                                <span className="text-3xl block">🍽️</span>
                                                <h4 className="text-sm font-bold">No orders placed yet</h4>
                                                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                                                    Choose your favorite seared burger or hand-stretched sourdough pizza and build it live!
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                                                {orders.filter(o => o.userId === currentUser.id).map((order) => {
                                                    const dateStr = new Date(order.createdAt).toLocaleDateString(undefined, {
                                                        month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                                                    });

                                                    const statusStyles = {
                                                        'Received': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                                                        'Preparing': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                                                        'Out for Delivery': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                                                        'Delivered': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                                                        'Cancelled': 'bg-red-500/10 text-red-400 border-red-500/20'
                                                    };

                                                    return (
                                                        <div key={order.id} className={`p-4 rounded-xl border space-y-3 ${isDarkMode ? 'bg-zinc-900/30 border-white/[0.04]' : 'bg-white border-amber-100 shadow-sm'}`}>
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <span className="text-xs font-black">#{order.id.slice(-4)}</span>
                                                                    <span className="text-[10px] text-gray-400 ml-2">{dateStr}</span>
                                                                </div>
                                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${statusStyles[order.status] || 'bg-gray-500/10 text-gray-400'}`}>
                                                                    {order.status}
                                                                </span>
                                                            </div>

                                                            <div className="space-y-1">
                                                                {order.items.map((item, idx) => (
                                                                    <p key={idx} className="text-xs text-gray-400 flex justify-between">
                                                                        <span>{item.quantity}x {item.foodItem.name}</span>
                                                                        <span>${(item.foodItem.price * item.quantity).toFixed(2)}</span>
                                                                    </p>
                                                                ))}
                                                            </div>

                                                            <div className="pt-2 border-t border-dashed border-gray-500/10 flex items-center justify-between text-xs">
                                                                <span className="font-semibold">Total Amount:</span>
                                                                <span className="font-black text-amber-500">${order.totalAmount.toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        <button
                                            onClick={() => {
                                                onClose();
                                                onOpenOrdersHistory();
                                            }}
                                            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer shadow-md transition-all"
                                        >
                                            <History className="h-4 w-4" />
                                            <span>Open Full Interactive Orders Modal</span>
                                        </button>
                                    </motion.div>
                                )}

                                {/* FAVORITES SUBPANEL */}
                                {profile.currentPanel === 'favorites' && (
                                    <motion.div
                                        key="favorites-sub"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Heart className="h-5 w-5 text-amber-500 fill-amber-500/20" />
                                            <h3 className="text-base font-extrabold">Your Favorites</h3>
                                        </div>

                                        <p className="text-xs text-gray-400">
                                            Click the heart on any food card to save it here for super-fast ordering.
                                        </p>

                                        {favoriteFoods.length === 0 ? (
                                            <div className="text-center py-10 space-y-3">
                                                <span className="text-3xl block">❤️</span>
                                                <h4 className="text-sm font-bold">No favorites bookmarked</h4>
                                                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                                                    Browse our gourmet list of burgers, pizzas, and drinks to save your ideal selections.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                                                {favoriteFoods.map((food) => (
                                                    <div key={food.id} className={`p-3 rounded-xl border flex gap-3 items-center justify-between transition-all duration-200 ${isDarkMode ? 'bg-zinc-900/30 border-white/[0.04]' : 'bg-white border-amber-100 shadow-sm'}`}>
                                                        <div onClick={() => { onSelectFood?.(food.id); onClose(); }} className="flex items-center gap-3 cursor-pointer group flex-1" title="View details & customize">
                                                            <img src={food.image} alt={food.name} className="h-12 w-12 rounded-lg object-cover group-hover:scale-105 transition-transform" />
                                                            <div>
                                                                <h4 className="text-xs font-bold line-clamp-1 group-hover:text-amber-500 transition-colors">{food.name}</h4>
                                                                <span className="text-xs font-extrabold text-amber-500">${food.price.toFixed(2)}</span>
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-2">
                                                            <button onClick={() => onToggleFavorite(food.id)} className="p-1.5 rounded-lg border border-red-500/10 hover:border-red-500/30 text-red-500 hover:bg-red-500/5 cursor-pointer" title="Remove favorite">
                                                                <Heart className="h-4 w-4 fill-red-500" />
                                                            </button>
                                                            <button onClick={() => onAddToCart({ foodItem: food, quantity: 1, customizations: {} })} className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] cursor-pointer">
                                                                + Add
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {/* SAVED ADDRESSES SUBPANEL */}
                                {profile.currentPanel === 'addresses' && (
                                    <motion.div
                                        key="addresses-sub"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-5 w-5 text-amber-500" />
                                            <h3 className="text-base font-extrabold">Saved Destinations</h3>
                                        </div>

                                        <p className="text-xs text-gray-400">
                                            Save, edit, and keep your delivery coordinates for a speedy 1-click checkout experience.
                                        </p>

                                        <div className="space-y-3">
                                            {profile.addresses.map((addr) => (
                                                <div key={addr.id} className={`p-4 rounded-xl border flex items-start justify-between ${isDarkMode ? 'bg-zinc-900/30 border-white/[0.04]' : 'bg-white border-amber-100 shadow-sm'}`}>
                                                    <div className="flex gap-3">
                                                        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 mt-0.5">
                                                            <MapPin className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <span className="text-xs font-extrabold uppercase tracking-wide text-amber-500">{addr.label}</span>
                                                            <p className="text-xs mt-1 leading-relaxed">{addr.text}</p>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => profile.handleDeleteAddress(addr.id)} className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-500/5 cursor-pointer" title="Delete address">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <form onSubmit={profile.handleAddAddress} className="space-y-3 pt-4 border-t border-dashed border-gray-500/10">
                                            <p className="text-xs font-bold uppercase text-gray-400">Add New Coordinates</p>

                                            <div className="grid grid-cols-3 gap-2">
                                                {['Home', 'Office', 'Other'].map((lbl) => (
                                                    <button
                                                        key={lbl}
                                                        type="button"
                                                        onClick={() => profile.setNewAddressLabel(lbl)}
                                                        className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${profile.newAddressLabel === lbl ? 'bg-amber-500 text-white border-amber-500' : isDarkMode ? 'border-white/10 hover:bg-white/5 text-gray-300' : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                                                            }`}
                                                    >
                                                        {lbl}
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="space-y-1.5">
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Enter complete street address, unit, zip code..."
                                                    value={profile.newAddressText}
                                                    onChange={(e) => profile.setNewAddressText(e.target.value)}
                                                    className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${isDarkMode ? 'bg-black/30 border-amber-500/10 focus:border-amber-500/40 text-white' : 'bg-white border-amber-100 focus:border-amber-500 text-gray-800'
                                                        }`}
                                                />
                                            </div>

                                            <button type="submit" className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 shadow shadow-amber-500/20 flex items-center justify-center gap-1 cursor-pointer">
                                                <Plus className="h-4 w-4" />
                                                <span>Add Coordinate</span>
                                            </button>
                                        </form>
                                    </motion.div>
                                )}

                                {/* HELP & SUPPORT SUBPANEL */}
                                {profile.currentPanel === 'help' && (
                                    <motion.div
                                        key="help-sub"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center gap-2">
                                            <HelpCircle className="h-5 w-5 text-amber-500" />
                                            <h3 className="text-base font-extrabold">Help & Support</h3>
                                        </div>

                                        <p className="text-xs text-gray-400">
                                            Welcome to the Golden Bite Premium Help Desk. We prepare all meals live and route them dynamically to guarantee freshness.
                                        </p>

                                        <div className="space-y-3">
                                            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/30 border-white/[0.04]' : 'bg-gray-50 border-gray-100'}`}>
                                                <h4 className="text-xs font-extrabold text-amber-500 uppercase">1. What is the delivery range?</h4>
                                                <p className="text-xs mt-1 text-gray-400 leading-relaxed font-light">
                                                    We deliver within a 15-mile radius of our gourmet live kitchen node. If you are further away, special thermal box routing applies.
                                                </p>
                                            </div>

                                            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/30 border-white/[0.04]' : 'bg-gray-50 border-gray-100'}`}>
                                                <h4 className="text-xs font-extrabold text-amber-500 uppercase">2. Gourmet delivery insurance?</h4>
                                                <p className="text-xs mt-1 text-gray-400 leading-relaxed font-light">
                                                    Yes! If we are late by even 1 minute over the promised limit, your burger customizer is fully waived on the next purchase.
                                                </p>
                                            </div>

                                            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-900/30 border-white/[0.04]' : 'bg-gray-50 border-gray-100'}`}>
                                                <h4 className="text-xs font-extrabold text-amber-500 uppercase">3. Need live support?</h4>
                                                <p className="text-xs mt-1 text-gray-400 leading-relaxed font-light">
                                                    You can immediately ping our VIP support representatives at <strong className="text-amber-500">support@amberbite.com</strong>.
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AnimatePresence>
    );
}