import React, { useState, useEffect } from 'react';
import { ChefHat, ShoppingBag, Bell, Compass, Sparkles, MapPin, CheckCircle, Shield, Info, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Hooks
import { useToasts } from './hooks/useToasts';
import { useCart } from './hooks/useCart';
import { useOrders } from './hooks/useOrders';
import { useLiveOrderSimulation } from './hooks/useLiveOrderSimulation';

// Data
import { getStoredFoods, saveStoredFoods, getCurrentUser, setCurrentUser as saveCurrentUser } from './data/data';

// Components
import BackgroundGlow from './components/BackgroundGlow';
import Navbar from './components/Navbar';
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

  // App Data
  const [foods, setFoods] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // View States
  const [isAuthView, setIsAuthView] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isOrdersHistoryOpen, setIsOrdersHistoryOpen] = useState(false);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isLiveTrackerOpen, setIsLiveTrackerOpen] = useState(true);

  // Custom Hooks
  const { toasts, triggerToast } = useToasts();
  const cart = useCart(triggerToast);
  const { orders, setOrders, handleCheckout, handleUpdateOrderStatus } = useOrders(triggerToast);

  // Live Order Simulation
  useLiveOrderSimulation(orders, setOrders, triggerToast);

  // Load Initial Data
  useEffect(() => {
    document.documentElement.classList.add('dark');
    
    setFoods(getStoredFoods());
    setOrders(getStoredOrders()); // from useOrders
    setCurrentUser(getCurrentUser());

    const storedFavs = localStorage.getItem('restaurant_favorites');
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  // Theme Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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

  // Admin Handlers
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
    triggerToast(`Updated recipe: ${food.name}`, 'success');
  };

  const handleDeleteFood = (foodId) => {
    const updated = foods.filter((f) => f.id !== foodId);
    setFoods(updated);
    saveStoredFoods(updated);
    triggerToast('Recipe removed from catalog', 'info');
  };

  const activeOrder = orders.find(
    (o) => o.userId === currentUser?.id && 
           o.status !== 'Delivered' && 
           o.status !== 'Cancelled'
  );

  return (
    <div className={`min-h-screen relative font-sans flex flex-col transition-colors duration-500 ${
      isDarkMode ? 'text-white' : 'text-gray-800'
    }`}>
      <BackgroundGlow isDarkMode={isDarkMode} />

      <Navbar
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthView(true)}
        onLogout={handleLogout}
        cartCount={cart.cartItems.reduce((acc, i) => acc + i.quantity, 0)}
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
          <AdminPanel
            foods={foods}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onAddFood={handleAddFood}
            onUpdateFood={handleUpdateFood}
            onDeleteFood={handleDeleteFood}
            isDarkMode={isDarkMode}
          />
        ) : currentUser ? (
          <div className="space-y-12">
            {selectedFoodId ? (
              <FoodDetailPage
                food={foods.find((f) => f.id === selectedFoodId)}
                onBack={() => setSelectedFoodId(null)}
                onAddToCart={cart.handleAddToCart}
                isDarkMode={isDarkMode}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                isAuthenticated={!!currentUser}
                onOpenAuth={() => setIsAuthView(true)}
              />
            ) : (
              <>
                <BrandHomepage isDarkMode={isDarkMode} onOpenAuth={() => setIsAuthView(true)} />

                <motion.section className={`p-6 sm:p-8 rounded-3xl border ${isDarkMode ? 'bg-zinc-900/30 border-white/[0.04]' : 'bg-slate-50/50 border-slate-100'}`}>
                  <MealBuilder
                    foods={foods}
                    onAddToCart={cart.handleAddToCart}
                    isDarkMode={isDarkMode}
                    onSelectFood={setSelectedFoodId}
                  />
                </motion.section>

                <div id="menu-section" className="scroll-mt-20">
                  <MenuSection
                    foods={foods}
                    onAddToCart={cart.handleAddToCart}
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

      {/* Toasts */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`p-4 rounded-xl shadow-lg border backdrop-blur-md pointer-events-auto flex items-center space-x-3 ${
                t.type === 'success' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' :
                t.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-300' :
                'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
              }`}
            >
              <Bell className="h-4 w-4" />
              <span className="text-xs font-bold font-sans">{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cart.cartItems}
        onUpdateQuantity={cart.handleUpdateCartQuantity}
        onRemoveItem={cart.handleRemoveCartItem}
        onCheckout={(deliveryInfo) => {
          const newOrder = handleCheckout(currentUser, cart.cartItems, deliveryInfo);
          if (newOrder) {
            cart.clearCart();
            setIsCartDrawerOpen(false);
            setIsLiveTrackerOpen(true);
            setIsOrdersHistoryOpen(true);
          }
        }}
        isDarkMode={isDarkMode}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthView(true)}
      />

      {/* <OrderHistoryModal
        isOpen={isOrdersHistoryOpen}
        onClose={() => setIsOrdersHistoryOpen(false)}
        orders={orders}
        isDarkMode={isDarkMode}
        currentUser={currentUser}
      /> */}

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
        onAddToCart={cart.handleAddToCart}
        foods={foods}
        onSelectFood={setSelectedFoodId}
      />

      {/* {activeOrder && isLiveTrackerOpen && (
        <LiveOrderTracker
          activeOrder={activeOrder}
          onClose={() => setIsLiveTrackerOpen(false)}
          isDarkMode={isDarkMode}
          onUpdateOrderStatus={handleUpdateOrderStatus}
        />
      )} */}

      {/* Footer */}
      <footer className={`py-12 border-t mt-12 ${isDarkMode ? 'bg-[#06040c] border-zinc-900 text-gray-500' : 'bg-amber-50/20 border-slate-100 text-gray-600'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-1.5">
            <ChefHat className="h-5 w-5 text-amber-500" />
            <span className="font-sans font-bold tracking-tight text-sm">
              Golden Bite Restaurant
            </span>
          </div>
          <p className="text-xs font-light max-w-md mx-auto leading-relaxed">
            Crafting glowing gastronomic experiences since 2026.
          </p>
        </div>
      </footer>
    </div>
  );
}