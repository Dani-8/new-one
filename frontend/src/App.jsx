import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChefHat, Bell, Sparkles, Shield, ArrowRight } from 'lucide-react';

// Data Helpers
import {
    getStoredFoods,
    saveStoredFoods,
    getCurrentUser,
    setCurrentUser as saveCurrentUser,
} from './data/data';

// Hooks
import { useToasts } from './hooks/useToasts';
import { useCart } from './hooks/useCart';
import { useOrders } from './hooks/useOrders';
import { useLiveOrderSimulation } from './hooks/useLiveOrderSimulation';

// Components
import BackgroundGlow from './components/BackgroundGlow';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import LoginView from './features/auth/LoginView';
import ProfileDrawer from './features/auth/ProfileDrawer';
import MenuSection from './features/menu/MenuSection';
import MealBuilder from './features/menu/MealBuilder';
import FoodDetailPage from './features/menu/FoodDetailPage';
import CartDrawer from './features/cart/CartDrawer';
import OrderHistoryModal from './features/orders/OrderHistoryModal';
import LiveOrderTracker from './features/orders/LiveOrderTracker';
import AdminPanel from './features/admin/AdminPanel';
import BrandHomepage from './features/home/BrandHomepage';

export default function App() {
    // Theme & Identity
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdminView, setIsAdminView] = useState(false);
    const [selectedFoodId, setSelectedFoodId] = useState(null);

    // App Data State
    const [foods, setFoods] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // View & Dialog states
    const [isAuthView, setIsAuthView] = useState(false);
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
    const [isOrdersHistoryOpen, setIsOrdersHistoryOpen] = useState(false);
    const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
    const [isLiveTrackerOpen, setIsLiveTrackerOpen] = useState(true);

    // Extracted hooks
    const { toasts, triggerToast } = useToasts();
    const {
        cartItems,
        handleAddToCart,
        handleUpdateCartQuantity,
        handleRemoveCartItem,
        clearCart,
    } = useCart(triggerToast);
    const { orders, setOrders, handleCheckout, handleUpdateOrderStatus } = useOrders(triggerToast);

    // Live order simulation (30s interval)
    useLiveOrderSimulation(orders, setOrders, triggerToast);

    // 1. Load Initial Data
    useEffect(() => {
        document.documentElement.classList.add('dark');
        setFoods(getStoredFoods());
        setCurrentUser(getCurrentUser());

        const storedFavs = localStorage.getItem('restaurant_favorites');
        if (storedFavs) {
            setFavorites(JSON.parse(storedFavs));
        }
    }, []);

    // Update HTML body theme classes
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Checkout wrapper (needs currentUser + cartItems + closes drawer)
    const onCheckout = (deliveryInfo) => {
        const newOrder = handleCheckout(currentUser, cartItems, deliveryInfo);
        if (!newOrder) return;
        clearCart();
        setIsCartDrawerOpen(false);
        setIsLiveTrackerOpen(true);
        setIsOrdersHistoryOpen(true);
    };

    // Admin Actions (foods)
    const handleAddFood = (food) => {
        const newFood = { ...food, id: `food_${Date.now()}` };
        const updated = [...foods, newFood];
        setFoods(updated);
        saveStoredFoods(updated);
        triggerToast(`Created new recipe: ${food.name}`, 'success');
    };

    const handleUpdateFood = (food) => {
        const updated = foods.map((f) => (f.id === food.id ? food : f));
        setFoods(updated);
        saveStoredFoods(updated);
        triggerToast(`Updated recipe details: ${food.name}`, 'success');
    };

    const handleDeleteFood = (foodId) => {
        const updated = foods.filter((f) => f.id !== foodId);
        setFoods(updated);
        saveStoredFoods(updated);
        triggerToast('Recipe removed from catalog', 'info');
    };

    // Identity Actions
    const handleAuthSuccess = (user) => {
        setCurrentUser(user);
        setIsAdminView(user.role === 'admin');
        setIsAuthView(false);
        triggerToast(`Welcome, ${user.name}! Enjoy your meal.`, 'success');
    };

    const handleLogout = () => {
        setCurrentUser(null);
        saveCurrentUser(null);
        setIsAdminView(false);
        triggerToast('Logged out successfully. See you again!', 'info');
    };

    const handleToggleFavorite = (foodId) => {
        setFavorites((prev) => {
            const updated = prev.includes(foodId)
                ? prev.filter((id) => id !== foodId)
                : [...prev, foodId];
            localStorage.setItem('restaurant_favorites', JSON.stringify(updated));
            triggerToast(prev.includes(foodId) ? 'Removed from favorites' : 'Saved to favorites ❤️', 'success');
            return updated;
        });
    };

    // Find the current user's active (undelivered/uncancelled) order
    const activeOrder = orders.find(
        (o) => o.userId === currentUser?.id && o.status !== 'Delivered' && o.status !== 'Cancelled'
    );


    return (
        <div
            className={`min-h-screen relative font-sans flex flex-col transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-gray-800'
                }`}
        >
            <BackgroundGlow isDarkMode={isDarkMode} />

            <Navbar
                currentUser={currentUser}
                onOpenAuth={() => setIsAuthView(true)}
                onLogout={handleLogout}
                cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                onOpenCart={() => setIsCartDrawerOpen(true)}
                isDarkMode={isDarkMode}
                onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                isAdminView={isAdminView}
                onToggleAdminView={setIsAdminView}
                onOpenOrdersHistory={() => setIsOrdersHistoryOpen(true)}
                onOpenProfileDrawer={() => setIsProfileDrawerOpen(true)}
                onGoHome={() => {
                    setIsAuthView(false);
                    setSelectedFoodId(null);
                }}
            />

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
                {isAdminView ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div
                            className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isDarkMode ? 'bg-[#1b162c]/60 border-purple-500/20' : 'bg-purple-50 border-purple-100'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-purple-600 text-white shadow-md">
                                    <Shield className="h-5 w-5" />
                                </div>
                                
                                <div>
                                    <h2 className="text-sm font-extrabold flex items-center gap-1.5 uppercase tracking-wider">
                                        Store Manager Mode
                                    </h2>

                                    <p className="text-xs opacity-75 mt-0.5">
                                        Managing live kitchen requests and gourmet recipes on {currentUser?.name || 'Admin'}'s catalog.
                                    </p>
                                </div>
                            </div>

                            
                            <button
                                onClick={() => setIsAdminView(false)}
                                className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-all cursor-pointer shadow"
                            >
                                Go to Customer Front
                            </button>
                        </div>

                        <AdminPanel
                            foods={foods}
                            orders={orders}
                            onUpdateOrderStatus={handleUpdateOrderStatus}
                            onAddFood={handleAddFood}
                            onUpdateFood={handleUpdateFood}
                            onDeleteFood={handleDeleteFood}
                            isDarkMode={isDarkMode}
                        />
                    </motion.div>
                ) : currentUser ? (
                    <div className="space-y-12">
                        {selectedFoodId ? (
                            <FoodDetailPage
                                food={foods.find((f) => f.id === selectedFoodId)}
                                onBack={() => setSelectedFoodId(null)}
                                onAddToCart={handleAddToCart}
                                isDarkMode={isDarkMode}
                                favorites={favorites}
                                onToggleFavorite={handleToggleFavorite}
                                isAuthenticated={!!currentUser}
                                onOpenAuth={() => setIsAuthView(true)}
                            />
                        ) : (
                            <>
                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="relative rounded-3xl overflow-hidden border border-zinc-800/40 dark:border-white/[0.04] shadow-xl"
                                >
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                                            alt="Delicious food platter background"
                                            className="w-full h-full object-cover filter brightness-[0.35]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0812] via-[#0a0812]/70 to-transparent" />
                                    </div>

                                    <div className="relative z-10 px-6 sm:px-12 py-16 sm:py-24 max-w-xl text-white space-y-6">
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                                            <Sparkles className="h-3.5 w-3.5" />
                                            <span>Free delivery on orders above $30</span>
                                        </div>

                                        <h1 className="font-sans text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                                            Savor the{' '}
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 font-extrabold animate-pulse">
                                                Glow
                                            </span>
                                            , Taste the Art.
                                        </h1>

                                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
                                            Welcome back to Golden Bite, where luxury recipes meet magical warm aesthetics. Select your
                                            customizable ingredients and track live, freshly prepared bites straight to your door.
                                        </p>

                                        <div className="pt-4 flex flex-wrap gap-3">
                                            <a
                                                href="#menu-section"
                                                className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 shadow-lg shadow-amber-500/25 flex items-center gap-1 cursor-pointer hover:scale-102 transition-transform duration-150"
                                            >
                                                <span>Browse Menu</span>
                                                <ArrowRight className="h-4 w-4" />
                                            </a>
                                        </div>
                                    </div>
                                </motion.section>

                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode
                                            ? 'bg-zinc-900/30 border-white/[0.04] shadow-md'
                                            : 'bg-slate-50/50 border-slate-100 shadow-sm'
                                        }`}
                                >
                                    <MealBuilder
                                        foods={foods}
                                        onAddToCart={handleAddToCart}
                                        isDarkMode={isDarkMode}
                                        onSelectFood={setSelectedFoodId}
                                    />
                                </motion.section>

                                <div id="menu-section" className="scroll-mt-20">
                                    <MenuSection
                                        foods={foods}
                                        onAddToCart={handleAddToCart}
                                        isDarkMode={isDarkMode}
                                        onOpenAuth={() => setIsAuthView(true)}
                                        isAuthenticated={!!currentUser}
                                        favorites={favorites}
                                        onToggleFavorite={handleToggleFavorite}
                                        onSelectFood={setSelectedFoodId}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                ) : isAuthView ? (
                    <LoginView
                        onAuthSuccess={handleAuthSuccess}
                        onBack={() => setIsAuthView(false)}
                        isDarkMode={isDarkMode}
                    />
                ) : (
                    <BrandHomepage isDarkMode={isDarkMode} onOpenAuth={() => setIsAuthView(true)} />
                )}
            </main>

            <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm">
                <AnimatePresence>
                    {toasts.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            className={`p-4 rounded-xl shadow-lg border backdrop-blur-md pointer-events-auto flex items-center space-x-3 transition-all duration-300 ${t.type === 'success'
                                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 shadow-amber-500/5'
                                    : t.type === 'error'
                                        ? 'bg-red-500/10 border-red-500/30 text-red-300 shadow-red-500/5'
                                        : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300 shadow-indigo-500/5'
                                }`}
                        >
                            <div className="p-1 rounded-full bg-amber-500/20 text-amber-400">
                                <Bell className="h-4 w-4 animate-swing" />
                            </div>
                            <span className="text-xs font-bold font-sans">{t.message}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>


            {/* Footer */}
            <Footer isDarkMode={isDarkMode} />



            <CartDrawer
                isOpen={isCartDrawerOpen}
                onClose={() => setIsCartDrawerOpen(false)}
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateCartQuantity}
                onRemoveItem={handleRemoveCartItem}
                onCheckout={onCheckout}
                isDarkMode={isDarkMode}
                currentUser={currentUser}
                onOpenAuth={() => setIsAuthView(true)}
            />

            <OrderHistoryModal
                isOpen={isOrdersHistoryOpen}
                onClose={() => setIsOrdersHistoryOpen(false)}
                orders={orders}
                isDarkMode={isDarkMode}
                currentUser={currentUser}
            />

            <ProfileDrawer
                isOpen={isProfileDrawerOpen}
                onClose={() => setIsProfileDrawerOpen(false)}
                currentUser={currentUser}
                onLogout={handleLogout}
                isDarkMode={isDarkMode}
                onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                onOpenOrdersHistory={() => setIsOrdersHistoryOpen(true)}
                orders={orders}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onAddToCart={handleAddToCart}
                foods={foods}
                onSelectFood={setSelectedFoodId}
            />

            {activeOrder && isLiveTrackerOpen && (
                <LiveOrderTracker
                    activeOrder={activeOrder}
                    onClose={() => setIsLiveTrackerOpen(false)}
                    isDarkMode={isDarkMode}
                    onUpdateOrderStatus={handleUpdateOrderStatus}
                />
            )}
        </div>
    );
}