import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Sparkles, ShieldCheck } from 'lucide-react';

import Badge from '../common/Badge';
import { cubicTransition } from './transitions';

const NotificationDropdown = ({ isOpen, onClose, notifications, onMarkAllRead, onNotificationClick }) => {
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

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <AnimatePresence>
            {isOpen && (
                <div ref={dropdownRef} className="absolute right-0 mt-3 w-80 md:w-96 z-50">
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 15, scale: 0.98 }}
                        transition={cubicTransition}
                        className="glass-card-premium border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl"
                    >
                        {/* Dropdown Header */}
                        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/2">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-[#f3f4f6]">Notifications</span>
                                {unreadCount > 0 && (
                                    <Badge variant="brand" size="sm">{unreadCount} New</Badge>
                                )}
                            </div>
                            {unreadCount > 0 && (
                                <button
                                    onClick={onMarkAllRead}
                                    className="text-[10px] font-bold uppercase tracking-wider text-[#d19f4a] hover:text-[#bd863d] transition-colors cursor-pointer"
                                >
                                    Mark all read
                                </button>
                            )}
                        </div>

                        {/* Notifications Scroller */}
                        <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-slate-500 space-y-2 text-xs">
                                    <Bell className="w-8 h-8 mx-auto text-slate-600 stroke-[1.5]" />
                                    <p>Your luxury alert roster is empty.</p>
                                </div>
                            ) : (
                                notifications.map((notif) => (
                                    <button
                                        key={notif.id}
                                        onClick={() => {
                                            onNotificationClick(notif.id);
                                            onClose();
                                        }}
                                        className={`w-full text-left p-4 hover:bg-white/3 transition-colors flex gap-3 cursor-pointer items-start ${!notif.read ? 'bg-white/1' : ''}`}
                                    >
                                        <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${notif.type === 'ai' ? 'bg-[#d19f4a]/10 text-[#d19f4a]' :
                                                notif.type === 'booking' ? 'bg-[#10b981]/10 text-[#10b981]' :
                                                    'bg-blue-500/10 text-blue-400'
                                            }`}>
                                            {notif.type === 'ai' ? <Sparkles className="w-3.5 h-3.5" /> :
                                                notif.type === 'booking' ? <ShieldCheck className="w-3.5 h-3.5" /> :
                                                    <Bell className="w-3.5 h-3.5" />}
                                        </div>
                                        <div className="space-y-1 min-w-0 flex-grow">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className={`text-xs font-bold leading-none ${!notif.read ? 'text-[#f3f4f6]' : 'text-slate-400'}`}>
                                                    {notif.title}
                                                </p>
                                                {!notif.read && (
                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#d19f4a] shrink-0" />
                                                )}
                                            </div>
                                            <p className="text-[11px] text-slate-400 leading-normal truncate-2-lines">
                                                {notif.description}
                                            </p>
                                            <span className="text-[9px] text-slate-500 block">
                                                {notif.time}
                                            </span>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>

                        {/* Dropdown Footer */}
                        <div className="p-3 text-center border-t border-white/5 bg-slate-900/40">
                            <button
                                onClick={onClose}
                                className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-[#f3f4f6] transition-colors"
                            >
                                Close Alert Feed
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default NotificationDropdown