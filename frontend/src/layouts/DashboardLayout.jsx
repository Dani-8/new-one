import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, LayoutDashboard, Building2, Users, Settings, 
    CalendarRange, BarChart3, Sparkles, User, Bell } from 'lucide-react';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

export const DashboardLayout = ({ children, currentRole = 'user', activeTab, onTabSelect, onLogout }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const adminRoutes = [
        { label: 'Platform Monitor', icon: LayoutDashboard, id: 'admin-dashboard' },
        { label: 'Verify Properties', icon: Building2, id: 'admin-hotels' },
        { label: 'Register Accounts', icon: Users, id: 'admin-users' },
        { label: 'System Configuration', icon: Settings, id: 'admin-settings' }
    ];

    const ownerRoutes = [
        { label: 'Commercial Dashboard', icon: LayoutDashboard, id: 'owner-dashboard' },
        { label: 'Asset Directories', icon: Building2, id: 'owner-hotels' },
        { label: 'Reservation Records', icon: CalendarRange, id: 'owner-bookings' },
        { label: 'Revenue & Analytics', icon: BarChart3, id: 'owner-analytics' }
    ];

    const customerRoutes = [
        { label: 'My Bookings', icon: CalendarRange, id: 'customer-bookings' },
        { label: 'AI Concierge Desk', icon: Sparkles, id: 'customer-planner', premium: true },
        { label: 'My Profile', icon: User, id: 'customer-profile' }
    ];

    const menuRoutes = currentRole === 'admin' ? adminRoutes : currentRole === 'owner' ? ownerRoutes : customerRoutes;

    return (
        <div className="min-h-screen bg-[#030712] text-[#f3f4f6] flex flex-col font-sans">
            <header className="sticky top-0 z-40 bg-[#0a0e1a]/85 border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer">
                        <Menu className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#d19f4a] flex items-center justify-center font-black text-[#030712] text-lg">S</div>
                        <div className="text-left">
                            <span className="font-extrabold text-md md:text-lg">Stay<span className="text-[#d19f4a]">AI</span></span>
                            <span className="hidden sm:inline-block ml-2 text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-slate-400 uppercase tracking-widest font-semibold">
                                {currentRole} Console
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 transition-colors cursor-pointer">
                        <Bell className="w-4 h-4" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#d19f4a] rounded-full animate-pulse" />
                    </button>

                    <div className="flex items-center gap-3 border-l border-white/5 pl-4">
                        <Avatar name="Sarah Jenkins" status="premium" size="sm" />
                        <div className="hidden sm:block text-left">
                            <p className="text-xs font-bold">Sarah Jenkins</p>
                            <p className="text-[9px] text-slate-400 uppercase tracking-wider">Premium Elite</p>
                        </div>
                        <button onClick={onLogout} className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex-grow flex relative">
                <aside className={`hidden md:flex flex-col border-r border-white/5 bg-[#0a0e1a]/40 shrink-0 select-none transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
                    <div className="flex-grow py-6 px-4 space-y-1.5 text-left">
                        {menuRoutes.map((route) => {
                            const Icon = route.icon;
                            const isActive = activeTab === route.id;
                            return (
                                <button
                                    key={route.id}
                                    onClick={() => onTabSelect(route.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer
                    ${isActive ? 'bg-[#d19f4a]/15 text-[#d19f4a] shadow-inner' : 'text-slate-400 hover:text-[#f3f4f6] hover:bg-white/2'}
                    ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
                                >
                                    <Icon className="w-4 h-4 text-current shrink-0" />
                                    {!sidebarCollapsed && <span>{route.label}</span>}
                                    {!sidebarCollapsed && route.premium && <span className="ml-auto text-[9px] bg-[#d19f4a]/10 text-[#d19f4a] px-1.5 py-0.5 rounded border border-[#d19f4a]/15">AI</span>}
                                </button>
                            );
                        })}
                    </div>

                    <div className="p-4 border-t border-white/5">
                        <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="w-full text-slate-500 hover:text-slate-300 text-xs font-semibold py-2 rounded-lg hover:bg-white/2 transition-colors cursor-pointer">
                            {sidebarCollapsed ? '→' : '← Collapse Panel'}
                        </button>
                    </div>
                </aside>

                {/* Mobile Sidebar + Main Content same as before */}
                {/* ... (I shortened it to save space) */}

                <main className="flex-grow flex flex-col overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};