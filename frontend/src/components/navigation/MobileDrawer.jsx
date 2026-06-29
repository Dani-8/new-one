import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut } from 'lucide-react';

import Avatar from '../common/Avatar';
import { publicLinks } from './constants';
import { springTransition } from './transitions';

const MobileDrawer = ({
    isOpen,
    onClose,
    currentRole,
    onNavigate,
    onLogout
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Frosted Backdrop Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-[#030712]/80 backdrop-blur-sm md:hidden"
                    />

                    {/* Drawer Slide-out Menu */}
                    <motion.div
                        initial={{ x: 300 }}
                        animate={{ x: 0 }}
                        exit={{ x: 300 }}
                        transition={springTransition}
                        className="fixed top-0 bottom-0 right-0 w-80 bg-[#0a0e1a] border-l border-white/10 z-50 p-6 flex flex-col justify-between shadow-2xl md:hidden text-left"
                    >
                        <div className="space-y-8">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#d19f4a] flex items-center justify-center font-black text-[#030712] text-md">
                                        S
                                    </div>
                                    <span className="font-extrabold text-sm text-[#f3f4f6]">
                                        Stay<span className="text-[#d19f4a]">AI</span>
                                    </span>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="p-1.5 rounded-lg text-slate-400 hover:bg-white/5 cursor-pointer"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <div className="space-y-1.5">
                                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 px-3 mb-2">
                                    Main Directory
                                </p>

                                {publicLinks.map((route) => {
                                    const Icon = route.icon;

                                    return (
                                        <button
                                            key={route.id}
                                            onClick={() => {
                                                onNavigate(route.id);
                                                onClose();
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#f3f4f6] hover:bg-white/2 text-left cursor-pointer"
                                        >
                                            <Icon className="w-4 h-4 shrink-0 text-[#d19f4a]" />
                                            <span>{route.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Mobile Footer Status Details */}
                        <div className="border-t border-white/5 pt-4 space-y-4">
                            <div className="flex items-center gap-3 bg-white/2 p-3 rounded-xl border border-white/5">
                                <Avatar name="Sarah Jenkins" status="premium" size="sm" />
                                <div className="min-w-0">
                                    <p className="text-xs font-bold text-white truncate">
                                        Sarah Jenkins
                                    </p>
                                    <p className="text-[9px] text-slate-400 capitalize truncate">
                                        Role: {currentRole}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    onLogout();
                                    onClose();
                                }}
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 text-red-400 bg-red-500/5 hover:bg-red-500/10 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                            >
                                <LogOut className="w-4 h-4 shrink-0" />
                                <span>Disconnect Profile</span>
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileDrawer;