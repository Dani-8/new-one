import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, X, Compass, Sparkles, HelpCircle, LayoutDashboard, Building2,
    CalendarRange, BarChart3, Users, Settings, ShieldAlert, Bell, LogOut,
    Laptop, Tablet, Smartphone, Info, Coins, PlusCircle, ArrowRight
} from 'lucide-react';

import { Button } from '../../components/common/Button';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { PageContainer } from '../../components/common/PageContainer';
import { ProtectedLayoutPlaceholder } from '../../components/common/ProtectedLayoutPlaceholder';

import { MainLayout } from '../../layouts/MainLayout';
import { AuthLayout } from '../../layouts/AuthLayout';
import { DashboardLayout } from '../../layouts/DashboardLayout';

export default function LayoutsShowcase() {
    const [activeLayoutType, setActiveLayoutType] = useState('main');
    const [activeTab, setActiveTab] = useState('customer-bookings');
    const [currentRole, setCurrentRole] = useState('user');
    const [simulatedDevice, setSimulatedDevice] = useState('desktop');

    const simulateRoleLogin = (targetRole) => {
        setCurrentRole(targetRole);
        if (targetRole === 'admin') {
            setActiveLayoutType('dashboard');
            setActiveTab('admin-dashboard');
        } else if (targetRole === 'owner') {
            setActiveLayoutType('dashboard');
            setActiveTab('owner-dashboard');
        } else {
            setActiveLayoutType('dashboard');
            setActiveTab('customer-bookings');
        }
    };

    const handleNavigate = (path) => {
        if (path === 'login' || path === 'register') {
            setActiveLayoutType('auth');
        } else if (path === 'dashboard') {
            setActiveLayoutType('dashboard');
        } else {
            setActiveLayoutType('main');
        }
    };

    const handleLogout = () => {
        setCurrentRole('guest');
        setActiveLayoutType('main');
    };

    const deviceWidths = {
        desktop: 'w-full',
        tablet: 'max-w-[768px] border-x border-slate-800/80',
        mobile: 'max-w-[390px] border-x border-slate-800/80'
    };

    return (
        <div className="min-h-screen bg-[#02040a] text-[#f3f4f6] flex flex-col font-sans">
            {/* Controls Panel */}
            <section className="bg-[#090d16] border-b border-white/10 p-6 relative z-50 shadow-xl">
                <div className="max-w-7xl mx-auto flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="inline-flex items-center gap-1.5 bg-[#d19f4a]/10 border border-[#d19f4a]/20 rounded-full px-3 py-1 text-[10px] text-[#d19f4a] font-semibold uppercase tracking-wider mb-2">
                                Phase 2.3 Workbench
                            </div>
                            <h2 className="text-xl md:text-2xl font-black tracking-tight text-[#f3f4f6]">StayAI Layouts Simulator</h2>
                            <p className="text-xs text-slate-400">Interactively preview, switch viewports, and test active roles.</p>
                        </div>

                        <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl">
                            {[
                                { id: 'desktop', label: 'Desktop', icon: Laptop },
                                { id: 'tablet', label: 'Tablet', icon: Tablet },
                                { id: 'mobile', label: 'Mobile', icon: Smartphone }
                            ].map((device) => {
                                const Icon = device.icon;
                                return (
                                    <button
                                        key={device.id}
                                        onClick={() => setSimulatedDevice(device.id)}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${simulatedDevice === device.id ? 'bg-[#d19f4a] text-slate-950' : 'text-slate-400 hover:text-[#f3f4f6]'}`}
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                        <span className="hidden sm:inline-block">{device.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
                        <div className="flex bg-white/2 border border-white/5 p-1 rounded-xl shrink-0">
                            {[
                                { id: 'main', label: 'Main Portal Layout' },
                                { id: 'auth', label: 'Auth Split Layout' },
                                { id: 'dashboard', label: 'Console Layout' }
                            ].map((layout) => (
                                <button
                                    key={layout.id}
                                    onClick={() => {
                                        setActiveLayoutType(layout.id);
                                        if (layout.id === 'dashboard' && currentRole === 'guest') {
                                            setCurrentRole('user');
                                            setActiveTab('customer-bookings');
                                        }
                                    }}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeLayoutType === layout.id ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                                >
                                    {layout.label}
                                </button>
                            ))}
                        </div>

                        {activeLayoutType === 'dashboard' && (
                            <div className="flex bg-white/2 border border-white/5 p-1 rounded-xl">
                                {[
                                    { id: 'user', label: 'Customer' },
                                    { id: 'owner', label: 'Hotel Owner' },
                                    { id: 'admin', label: 'App Admin' }
                                ].map((role) => (
                                    <button
                                        key={role.id}
                                        onClick={() => simulateRoleLogin(role.id)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${currentRole === role.id ? 'bg-[#d19f4a]/15 text-[#d19f4a] font-bold border border-[#d19f4a]/25' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        {role.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Live Preview Frame */}
            <div className="flex-grow flex items-start justify-center p-4 md:p-10 relative">
                <div className={`min-h-[700px] bg-[#030712] shadow-2xl transition-all duration-300 overflow-hidden relative border border-white/5 rounded-2xl flex flex-col ${deviceWidths[simulatedDevice]}`}>

                    {activeLayoutType === 'main' && (
                        <MainLayout currentRole={currentRole} onNavigate={handleNavigate}>
                            <PageContainer
                                title="Explore Luxury Resorts Powered by AI"
                                subtitle="Summon Gemini algorithms to configure presidential stays, custom villas, and five-star sand cabins."
                                action={
                                    <Button variant="primary" size="sm" rightIcon={ArrowRight} onClick={() => setActiveLayoutType('auth')}>
                                        Secure Reservation
                                    </Button>
                                }
                            >
                                {/* Sample content cards */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* ... (keep your resort cards) */}
                                </div>
                            </PageContainer>
                        </MainLayout>
                    )}

                    {activeLayoutType === 'auth' && (
                        <AuthLayout onNavigate={handleNavigate}>
                            {/* Auth form content */}
                            <div className="space-y-6 text-left">
                                {/* ... your existing auth form */}
                            </div>
                        </AuthLayout>
                    )}

                    {activeLayoutType === 'dashboard' && (
                        <DashboardLayout
                            currentRole={currentRole}
                            activeTab={activeTab}
                            onTabSelect={setActiveTab}
                            onLogout={handleLogout}
                        >
                            {/* All your tab contents (customer, owner, admin) stay here */}
                            {/* ... */}
                        </DashboardLayout>
                    )}

                </div>
            </div>

            <footer className="border-t border-white/10 bg-[#090d16] py-6 text-center text-xs text-slate-500 select-none">
                StayAI Reusable Layout System Engine. Phase 2.3 Verified Spec.
            </footer>
        </div>
    );
}