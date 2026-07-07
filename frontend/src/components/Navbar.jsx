import { Sun, Moon, ShoppingBag, ShieldCheck, User as UserIcon, LogOut, History, ChefHat } from 'lucide-react';

export default function Navbar({
    currentUser,
    onOpenAuth,
    onLogout,
    cartCount,
    onOpenCart,
    isDarkMode,
    onToggleTheme,
    isAdminView,
    onToggleAdminView,
    onOpenOrdersHistory,
    onOpenProfileDrawer,
    onGoHome
}) {
    return (
        <header className={`sticky top-0 z-40 w-full backdrop-blur-md transition-colors duration-300 border-b ${isDarkMode
                ? 'bg-[#141416]/85 border-white/[0.04]'
                : 'bg-white/85 border-amber-100'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo and Title */}
                <div
                    onClick={onGoHome}
                    className="flex items-center space-x-3 cursor-pointer select-none hover:opacity-90 transition-opacity"
                >
                    <div className="relative group">
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 opacity-75 blur-[4px] group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                        <div className={`relative p-2 rounded-full ${isDarkMode ? 'bg-zinc-900/60' : 'bg-amber-50'}`}>
                            <ChefHat className="h-6 w-6 text-amber-500 animate-pulse" />
                        </div>
                    </div>
                    <div>
                        <h1 className="font-sans text-lg font-bold tracking-tight flex items-center gap-1.5">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 font-extrabold uppercase">
                                Golden
                            </span>
                            <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>
                                Bite
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                        </h1>
                    </div>
                </div>

                {/* Action Controls */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    {/* Quick Role Toggle (For Testing / Ease of use) */}
                    {currentUser?.role === 'admin' && (
                        <div className={`flex items-center rounded-xl p-1 text-xs border ${isDarkMode ? 'bg-zinc-900/40 border-white/[0.04]' : 'bg-amber-50 border-amber-100'
                            }`}>
                            <button
                                onClick={() => onToggleAdminView(false)}
                                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${!isAdminView
                                        ? 'bg-amber-500 text-white shadow-sm'
                                        : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-amber-600'
                                    }`}
                            >
                                Customer
                            </button>
                            <button
                                onClick={() => onToggleAdminView(true)}
                                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${isAdminView
                                        ? 'bg-purple-600 text-white shadow-sm'
                                        : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-purple-600'
                                    }`}
                            >
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Admin
                            </button>
                        </div>
                    )}

                    {/* Cart Trigger (Hidden in Admin View and if not logged in) */}
                    {!isAdminView && currentUser && (
                        <button
                            onClick={onOpenCart}
                            className={`relative p-2.5 rounded-xl transition-all border cursor-pointer hover:scale-105 duration-200 ${isDarkMode
                                    ? 'border-amber-500/20 text-amber-400 hover:bg-amber-500/5'
                                    : 'border-amber-100 text-amber-600 hover:bg-amber-50'
                                }`}
                            title="Shopping Cart"
                        >
                            <ShoppingBag className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white ring-2 ring-transparent animate-bounce">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    )}

                    {/* Auth Button (Avatar triggers Profile Drawer when logged in) */}
                    {currentUser ? (
                        <button
                            onClick={onOpenProfileDrawer}
                            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 text-white font-extrabold text-xs shadow-md shadow-amber-500/15 hover:scale-[1.08] active:scale-[0.95] duration-200 transition-all border border-amber-500/20 cursor-pointer"
                            title="View Account"
                            id="navbar-profile-avatar"
                        >
                            {currentUser.name ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : <UserIcon className="h-4 w-4" />}
                            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#141416] animate-pulse" />
                        </button>
                    ) : (
                        <button
                            onClick={onOpenAuth}
                            className="flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 shadow-md shadow-amber-500/15 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                        >
                            <UserIcon className="h-4 w-4" />
                            <span>Login / Sign Up</span>
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
