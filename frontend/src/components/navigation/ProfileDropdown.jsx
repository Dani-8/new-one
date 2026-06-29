import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, User, Sparkles, LogOut } from 'lucide-react';

import Avatar from '../common/Avatar';
import { cubicTransition } from './transitions';

const ProfileDropdown = ({
    isOpen,
    onClose,
    currentRole,
    onRoleSelect,
    onNavigate,
    onLogout
}) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div ref={dropdownRef} className="absolute right-0 mt-3 w-72 z-50">
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.98 }}
                        transition={cubicTransition}
                        className="glass-card-premium border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl text-left"
                    >
                        {/* User Details */}
                        <div className="p-4 bg-white/2 border-b border-white/5 flex items-center gap-3">
                            <Avatar name="Sarah Jenkins" status="premium" size="md" />
                            <div className="min-w-0">
                                <p className="text-xs font-bold text-[#f3f4f6] truncate">Sarah Jenkins</p>
                                <p className="text-[10px] text-slate-400 truncate">sarah.jenkins@stayai.com</p>
                                <span className="inline-block mt-1 text-[8px] font-bold uppercase tracking-widest bg-[#d19f4a]/10 text-[#d19f4a] px-1.5 py-0.5 rounded border border-[#d19f4a]/20">
                                    {currentRole} Access
                                </span>
                            </div>
                        </div>

                        {/* Role Simulation Sandbox */}
                        <div className="p-3 bg-slate-900/60 border-b border-white/5">
                            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-2 px-1">
                                Simulation Role Switcher
                            </p>
                            <div className="grid grid-cols-3 gap-1">
                                {['user', 'owner', 'admin'].map((role) => (
                                    <button
                                        key={role}
                                        onClick={() => {
                                            onRoleSelect(role);
                                            onClose();
                                        }}
                                        className={`px-1.5 py-1 rounded-lg text-[9px] font-bold capitalize transition-all cursor-pointer ${currentRole === role
                                                ? 'bg-[#d19f4a] text-slate-950 font-extrabold'
                                                : 'bg-white/2 text-slate-400 hover:text-[#f3f4f6] hover:bg-white/5'
                                            }`}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* General Links */}
                        <div className="py-2">
                            {[
                                { label: 'My Console Dashboard', id: 'dashboard', icon: LayoutDashboard },
                                { label: 'Security Parameters', id: 'profile', icon: User },
                                { label: 'Subscription Level', id: 'pricing', icon: Sparkles }
                            ].map((link) => {
                                const Icon = link.icon;
                                return (
                                    <button
                                        key={link.id}
                                        onClick={() => {
                                            onNavigate(link.id);
                                            onClose();
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-xs text-slate-400 hover:text-[#f3f4f6] hover:bg-white/3 transition-colors cursor-pointer"
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                        <span>{link.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Logout Action */}
                        <div className="border-t border-white/5 py-1.5 bg-red-500/2 hover:bg-red-500/5 transition-colors">
                            <button
                                onClick={() => {
                                    onLogout();
                                    onClose();
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2 text-xs text-red-400 font-bold cursor-pointer"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                                <span>Disconnect Credentials</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ProfileDropdown;