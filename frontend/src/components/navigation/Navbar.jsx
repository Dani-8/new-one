import React, { useState } from 'react';
import { Bell, Menu, ChevronDown } from 'lucide-react';

import Avatar from '../common/Avatar';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
import { publicLinks } from './constants';

const Navbar = ({
    currentRole,
    onRoleSelect,
    onNavigate,
    onLogout,
    notifications,
    onMarkAllRead,
    onNotificationClick,
    onMobileMenuToggle
}) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    const activeNotifications = notifications.filter(n => !n.read).length;

    return (
        <header className="sticky top-0 z-40 bg-[#030712]/75 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Left Side: Brand Logo */}
                <div
                    onClick={() => onNavigate('home')}
                    className="flex items-center gap-3 cursor-pointer select-none group"
                >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d19f4a] to-[#bd863d] flex items-center justify-center font-black text-[#030712] text-xl tracking-wider transition-transform duration-300 group-hover:scale-105">
                        S
                    </div>
                    <div className="text-left">
                        <span className="text-xl font-bold tracking-tight text-[#f3f4f6]">
                            Stay<span className="text-[#d19f4a]">AI</span>
                        </span>
                        <p className="text-[8px] font-bold tracking-widest text-slate-500 uppercase mt-0.5">
                            Luxury Concierge
                        </p>
                    </div>
                </div>

                {/* Center Navigation Links (Hidden on Mobile) */}
                <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider">
                    {publicLinks.map((link) => {
                        const Icon = link.icon;

                        return (
                            <button
                                key={link.id}
                                onClick={() => onNavigate(link.id)}
                                className="flex items-center gap-2 text-slate-400 hover:text-[#d19f4a] transition-all cursor-pointer group relative py-1.5"
                            >
                                <Icon className="w-3.5 h-3.5 text-current" />
                                <span>{link.label}</span>

                                {link.premium && (
                                    <span className="text-[8px] font-extrabold bg-[#d19f4a]/10 text-[#d19f4a] px-1.5 py-0.5 rounded border border-[#d19f4a]/20 animate-pulse">
                                        AI
                                    </span>
                                )}

                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d19f4a] group-hover:w-full transition-all duration-300" />
                            </button>
                        );
                    })}
                </nav>

                {/* Right Actions Block */}
                <div className="flex items-center gap-4">

                    {/* Notifications Trigger */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setNotifOpen(!notifOpen);
                                setProfileOpen(false);
                            }}
                            className="relative p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 transition-colors cursor-pointer"
                        >
                            <Bell className="w-4 h-4" />

                            {activeNotifications > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#d19f4a] rounded-full border border-slate-950 animate-pulse" />
                            )}
                        </button>

                        <NotificationDropdown
                            isOpen={notifOpen}
                            onClose={() => setNotifOpen(false)}
                            notifications={notifications}
                            onMarkAllRead={onMarkAllRead}
                            onNotificationClick={onNotificationClick}
                        />
                    </div>

                    {/* Profile Dropdown Trigger */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setProfileOpen(!profileOpen);
                                setNotifOpen(false);
                            }}
                            className="flex items-center gap-3 bg-white/3 hover:bg-white/5 border border-white/5 rounded-xl px-3 py-1.5 transition-colors cursor-pointer"
                        >
                            <Avatar name="Sarah Jenkins" status="premium" size="sm" />

                            <div className="hidden sm:block text-left min-w-0 max-w-[100px]">
                                <p className="text-[11px] font-bold text-[#f3f4f6] truncate leading-tight">
                                    Sarah Jenkins
                                </p>
                                <p className="text-[9px] text-slate-400 uppercase tracking-widest truncate">
                                    {currentRole}
                                </p>
                            </div>

                            <ChevronDown
                                className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${profileOpen ? 'rotate-180 text-[#d19f4a]' : ''
                                    }`}
                            />
                        </button>

                        <ProfileDropdown
                            isOpen={profileOpen}
                            onClose={() => setProfileOpen(false)}
                            currentRole={currentRole}
                            onRoleSelect={onRoleSelect}
                            onNavigate={onNavigate}
                            onLogout={onLogout}
                        />
                    </div>

                    {/* Mobile Menu Action Toggle */}
                    <button
                        onClick={onMobileMenuToggle}
                        className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;