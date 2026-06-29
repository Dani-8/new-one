import React, { useState } from 'react';

import Navbar from '../../components/navigation/Navbar';
import Sidebar from '../../components/navigation/Sidebar';
import MobileDrawer from '../../components/navigation/MobileDrawer';
import Footer from '../../components/navigation/Footer';

import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Card from '../../components/common/Card';
// import Breadcrumb from '../../components/common/Breadcrumb';

import { Sparkles, ArrowRight } from 'lucide-react';

export default function NavigationShowcase() {
    const [currentRole, setCurrentRole] = useState('user'); // 'user' | 'owner' | 'admin'
    const [activeTab, setActiveTab] = useState('customer-bookings');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    // Custom static Breadcrumb stack
    const [breadcrumbStack, setBreadcrumbStack] = useState([
        { label: 'Console Dashboard', href: '#' },
        { label: 'Account Matrix', href: '#' },
        { label: 'Booking Records', href: '#', active: true }
    ]);

    // High-fidelity local alerts/notifications store
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'ai',
            title: 'AI Travel Plan Finalized',
            description: 'Gemini has parsed your room request and completed the Overwater sand itinerary.',
            time: '2 mins ago',
            read: false
        },
        {
            id: 2,
            type: 'booking',
            title: 'Booking Confirmed',
            description: 'Your payment hash transaction for Overwater sand cabana has successfully cleared.',
            time: '1 hour ago',
            read: false
        },
        {
            id: 3,
            type: 'alert',
            title: 'Security Sync Succeeded',
            description: 'Biometric profile validation matrices successfully checked under standard criteria.',
            time: '2 hours ago',
            read: true
        }
    ]);

    const handleMarkAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const handleNotificationClick = (id) => {
        setNotifications(prev =>
            prev.map(n => (n.id === id ? { ...n, read: true } : n))
        );
    };

    const handleRoleSelect = (targetRole) => {
        setCurrentRole(targetRole);

        if (targetRole === 'admin') {
            setActiveTab('admin-dashboard');
            setBreadcrumbStack([
                { label: 'Admin Panel', href: '#' },
                { label: 'Hotels Verification', href: '#', active: true }
            ]);
        } else if (targetRole === 'owner') {
            setActiveTab('owner-dashboard');
            setBreadcrumbStack([
                { label: 'Owner Portal', href: '#' },
                { label: 'Listed Hotels', href: '#', active: true }
            ]);
        } else {
            setActiveTab('customer-bookings');
            setBreadcrumbStack([
                { label: 'Guest Console', href: '#' },
                { label: 'My Bookings', href: '#', active: true }
            ]);
        }
    };

    const handleTabSelect = (tabId) => {
        setActiveTab(tabId);

        const splitLabel = tabId
            .split('-')
            .map(t => t.toUpperCase())
            .join(' > ');

        setBreadcrumbStack([
            { label: 'StayAI Console', href: '#' },
            { label: splitLabel, href: '#', active: true }
        ]);
    };

    return (

        <div className="min-h-screen bg-[#02040a] text-[#f3f4f6] flex flex-col font-sans relative select-none">

            {/* Dynamic Background Amber Blur */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[350px] bg-gradient-to-b from-amber-500/5 to-transparent blur-3xl pointer-events-none" />

            {/* 1. TOP DYNAMIC NAVBAR */}
            <Navbar
                currentRole={currentRole}
                onRoleSelect={handleRoleSelect}
                onNavigate={(path) =>
                    console.log('Simulating public link navigation path:', path)
                }
                onLogout={() =>
                    console.log('Simulating disconnect handshake logic...')
                }
                notifications={notifications}
                onMarkAllRead={handleMarkAllRead}
                onNotificationClick={handleNotificationClick}
                onMobileMenuToggle={() => setMobileDrawerOpen(true)}
            />

            {/* 2. DYNAMIC MOBILE DRAWER CONTAINER */}
            <MobileDrawer
                isOpen={mobileDrawerOpen}
                onClose={() => setMobileDrawerOpen(false)}
                currentRole={currentRole}
                onNavigate={(path) =>
                    console.log('Simulating mobile navigation link path:', path)
                }
                onLogout={() => console.log('Disconnect profile triggered.')}
            />

            {/* 3. CORE TWO-COLUMN DASHBOARD LAYOUT SHOWER */}
            <div className="flex-grow flex relative">

                {/* Persistent left sidebar */}
                <Sidebar
                    currentRole={currentRole}
                    activeTab={activeTab}
                    onTabSelect={handleTabSelect}
                    collapsed={sidebarCollapsed}
                    onToggleCollapse={() =>
                        setSidebarCollapsed(!sidebarCollapsed)
                    }
                />

                {/* Right main workspace panels */}
                <main className="flex-grow overflow-y-auto p-6 md:p-10 space-y-6 text-left relative z-10 max-w-5xl mx-auto">

                    {/* Top Breadcrumb Integration Banner */}
                    <div className="p-4 rounded-xl border border-white/5 bg-slate-900/40 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                                Active Navigation Location
                            </span>

                            <Breadcrumb items={breadcrumbStack} />
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <Badge variant="brand">Verified Route</Badge>
                            <Badge variant="success">SSL 256-bit</Badge>
                        </div>
                    </div>

                    {/* Central Diagnostic Dashboard */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Nav System Settings Info */}
                        <Card className="lg:col-span-2 space-y-4">
                            <h3 className="text-base font-bold text-white flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-[#d19f4a]" />
                                Navigation Rationale Overview
                            </h3>

                            <p className="text-xs text-slate-400 leading-relaxed">
                                StayAI utilizes a highly decoupled, role-based navigation
                                model. The primary Navigation controllers route client
                                streams dynamically without invoking database threads
                                directly. This prevents unauthorized administrative
                                consoles from initializing memory loads on standard
                                client devices.
                            </p>

                            <div className="pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white/2 p-3 rounded-xl border border-white/5">
                                    <span className="text-[9px] font-bold text-[#d19f4a] uppercase tracking-wider block mb-1">
                                        Navbar System State
                                    </span>

                                    <p className="text-[11px] text-slate-400">
                                        Fixed headers utilizing custom frosted acrylic layers
                                        provide continuous directory guidance across page
                                        streams.
                                    </p>
                                </div>

                                <div className="bg-white/2 p-3 rounded-xl border border-white/5">
                                    <span className="text-[9px] font-bold text-[#10b981] uppercase tracking-wider block mb-1">
                                        Notifications Module
                                    </span>

                                    <p className="text-[11px] text-slate-400">
                                        Low-latency alert drop-downs feed real-time AI and
                                        payment updates directly from transactional state
                                        loops.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Simulated Live States */}
                        <Card className="space-y-4">
                            <h3 className="text-base font-bold text-white">
                                Handshake States
                            </h3>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-xs text-slate-400">
                                        Selected Profile Role
                                    </span>
                                    <Badge variant="brand">{currentRole}</Badge>
                                </div>

                                <div className="flex justify-between items-center py-2 border-b border-white/5">
                                    <span className="text-xs text-slate-400">
                                        Alert Notification Feed
                                    </span>

                                    <Badge
                                        variant={
                                            notifications.filter(n => !n.read).length > 0
                                                ? 'warning'
                                                : 'neutral'
                                        }
                                    >
                                        {notifications.filter(n => !n.read).length} Active
                                    </Badge>
                                </div>

                                <div className="flex justify-between items-center py-2">
                                    <span className="text-xs text-slate-400">
                                        Sidebar State
                                    </span>

                                    <span className="text-xs font-bold text-slate-300">
                                        {sidebarCollapsed
                                            ? 'Collapsed Panel'
                                            : 'Expanded Panel'}
                                    </span>
                                </div>
                            </div>

                            {/* Simulation Role Select Fast Box */}
                            <div className="bg-white/2 p-3 rounded-xl border border-white/5 space-y-2">
                                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                                    Fast Role Overrides
                                </p>

                                <div className="grid grid-cols-3 gap-1.5">
                                    {['user', 'owner', 'admin'].map(r => (
                                        <button
                                            key={r}
                                            onClick={() => handleRoleSelect(r)}
                                            className={`py-1 text-[10px] uppercase font-bold rounded-lg cursor-pointer ${currentRole === r
                                                ? 'bg-[#d19f4a] text-[#030712] font-extrabold'
                                                : 'bg-slate-900 hover:bg-white/5 text-slate-400'
                                                }`}
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Interactive Component Sandbox Guide Card */}
                    <Card
                        variant="premium"
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                    >
                        <div className="space-y-1">
                            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-[#d19f4a] shrink-0" />
                                Fast Navigation Verification Check
                            </h4>

                            <p className="text-xs text-slate-400 max-w-2xl">
                                Test responsiveness by toggling different roles in the
                                Profile Dropdown or triggering the collapsable Sidebar
                                below. On smaller screens, the mobile navigation drawer
                                activates automatically.
                            </p>
                        </div>

                        <Button
                            variant="primary"
                            size="sm"
                            rightIcon={ArrowRight}
                            onClick={() => setMobileDrawerOpen(true)}
                        >
                            Test Mobile Drawer
                        </Button>
                    </Card>
                </main>
            </div>

            {/* 4. PREMIUM SYSTEM FOOTER */}
            <Footer
                onNavigate={(path) =>
                    console.log('Footer link dispatch trigger:', path)
                }
            />
        </div>
    );
}