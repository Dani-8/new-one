import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Layers, Sliders, FileText, Bell, Sparkles, Home, RefreshCw, Eye, Trash2, Mail, Info, AlertTriangle, CheckCircle, X
} from 'lucide-react';

import Button from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Textarea } from '../../components/common/Textarea';
import { Select } from '../../components/common/Select';
import { Checkbox, Radio, Switch } from '../../components/common/ToggleControls';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';
import { Modal } from '../../components/common/Modal';
import { Skeleton } from '../../components/feedback/Skeleton';
import { Alert } from '../../components/common/Alert';
import { Toast } from '../../components/feedback/Toast';
import { EmptyState } from '../../components/common/EmptyState';
import { Pagination } from '../../components/common/Pagination';
import { Breadcrumb, Tooltip } from '../../components/common/Navigation';

const springConfig = { type: 'spring', stiffness: 300, damping: 25, mass: 0.8 };
const cubicTransition = { ease: [0.16, 1, 0.3, 1], duration: 0.35 };

export default function ComponentLibraryShowcase() {
    const [activeTab, setActiveTab] = useState('buttons');
    const [btnLoading, setBtnLoading] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [selectVal, setSelectVal] = useState('');
    const [checkedVal, setCheckedVal] = useState(true);
    const [radioVal, setRadioVal] = useState('hotel');
    const [switchVal, setSwitchVal] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [toasts, setToasts] = useState([]);

    const triggerToast = (title, message, variant) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, title, message, variant }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const simulateLoading = () => {
        setBtnLoading(true);
        setTimeout(() => {
            setBtnLoading(false);
            triggerToast('Action Success', 'Simulated operation completed successfully.', 'success');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-[#030712] text-[#f3f4f6] flex flex-col selection:bg-[#d19f4a] selection:text-slate-950 font-sans leading-relaxed relative">
            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/5 to-transparent blur-3xl pointer-events-none" />

            {/* Header */}
            <header className="sticky top-0 z-40 bg-[#030712]/70 backdrop-blur-md border-b border-white/5 px-6 py-5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d19f4a] to-[#bd863d] flex items-center justify-center font-bold text-slate-950 text-xl tracking-wider">
                            S
                        </div>
                        <div>
                            <span className="text-xl font-bold tracking-tight">
                                Stay<span className="text-[#d19f4a]">AI</span> component library
                            </span>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mt-0.5">Onyx Velvet & Champagne Gold Spec</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="brand">Phase 2.2 Spec</Badge>
                        <Badge variant="success">WCAG AA Compliant</Badge>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8 relative">
                {/* Sidebar */}
                <div className="w-full lg:w-64 shrink-0">
                    <div className="sticky top-28 glass-card border-white/5 p-4 rounded-2xl space-y-1.5 bg-white/[0.02] backdrop-blur-md">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 mb-3">Primitive Categories</p>

                        {[
                            { id: 'buttons', label: 'Buttons', icon: Layers },
                            { id: 'inputs', label: 'Inputs & Controls', icon: Sliders },
                            { id: 'cards', label: 'Cards & Badges', icon: FileText },
                            { id: 'feedback', label: 'Feedback & Modals', icon: Bell },
                            { id: 'navs', label: 'Navigation', icon: Home }
                        ].map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer
                    ${activeTab === tab.id ? 'bg-[#d19f4a]/15 text-[#d19f4a]' : 'text-slate-400 hover:text-[#f3f4f6] hover:bg-white/5'}`}
                                >
                                    <Icon className="w-4 h-4 text-current" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-grow min-w-0">
                    <AnimatePresence mode="wait">
                        {activeTab === 'buttons' && (
                            <motion.div
                                key="buttons"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={cubicTransition}
                                className="space-y-8"
                            >
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Buttons</h2>
                                    <p className="text-slate-400 text-sm">Elegant structural click targets configured for luxury interfaces.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Button Variants */}
                                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-6">
                                        <h3 className="text-sm font-semibold text-[#d19f4a] uppercase tracking-wider">Button Variants</h3>
                                        <div className="flex flex-wrap gap-3">
                                            <Button variant="primary">Primary Button</Button>
                                            <Button variant="secondary">Secondary</Button>
                                            <Button variant="outline">Outline</Button>
                                            <Button variant="ghost">Ghost Style</Button>
                                            <Button variant="danger">Destructive</Button>
                                        </div>
                                    </div>

                                    {/* Interactive states & Sizes */}
                                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-6">
                                        <h3 className="text-sm font-semibold text-[#d19f4a] uppercase tracking-wider">States & Sizes</h3>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <Button size="sm" variant="primary">Small</Button>
                                            <Button size="md" variant="primary">Medium</Button>
                                            <Button size="lg" variant="primary">Large</Button>
                                            <Button
                                                variant="primary"
                                                loading={btnLoading}
                                                onClick={simulateLoading}
                                                icon={<RefreshCw className={`w-4 h-4 ${btnLoading ? 'animate-spin' : ''}`} />}
                                            >
                                                {btnLoading ? 'Processing...' : 'Click to Load'}
                                            </Button>
                                            <Button variant="primary" disabled>Disabled State</Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'inputs' && (
                            <motion.div
                                key="inputs"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={cubicTransition}
                                className="space-y-8"
                            >
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Inputs & Controls</h2>
                                    <p className="text-slate-400 text-sm">Crisp textual captures and toggle primitives prioritizing responsive input flow.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Textual Inputs */}
                                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-5">
                                        <h3 className="text-sm font-semibold text-[#d19f4a] uppercase tracking-wider">Form Fields</h3>
                                        <Input
                                            label="Your Premium Space Name"
                                            placeholder="e.g. Sapphire Suite"
                                            value={textInput}
                                            onChange={(e) => setTextInput(e.target.value)}
                                        />
                                        <Select
                                            label="Select Room Configuration"
                                            value={selectVal}
                                            onChange={(e) => setSelectVal(e.target.value)}
                                            options={[
                                                { value: 'luxury', label: 'Luxury Penthouse' },
                                                { value: 'ocean', label: 'Oceanfront Villa' },
                                                { value: 'garden', label: 'Secret Garden Loft' }
                                            ]}
                                        />
                                        <Textarea
                                            label="Interior Design Directives"
                                            placeholder="Provide specific notes regarding spatial design..."
                                            rows={3}
                                        />
                                    </div>

                                    {/* Toggles and Knobs */}
                                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-6">
                                        <h3 className="text-sm font-semibold text-[#d19f4a] uppercase tracking-wider">Toggle Controls</h3>
                                        <div className="space-y-4">
                                            <Checkbox
                                                label="Enable high priority maintenance logs"
                                                checked={checkedVal}
                                                onChange={(e) => setCheckedVal(e.target.checked)}
                                            />

                                            <div className="space-y-2">
                                                <span className="text-xs font-semibold text-slate-400 block mb-1">Select Property Paradigm</span>
                                                <div className="space-y-2">
                                                    <Radio
                                                        label="Hotel (Commercial)"
                                                        name="property"
                                                        value="hotel"
                                                        checked={radioVal === 'hotel'}
                                                        onChange={() => setRadioVal('hotel')}
                                                    />
                                                    <Radio
                                                        label="Residence (Private)"
                                                        name="property"
                                                        value="residence"
                                                        checked={radioVal === 'residence'}
                                                        onChange={() => setRadioVal('residence')}
                                                    />
                                                </div>
                                            </div>

                                            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                                                <div>
                                                    <span className="text-sm font-semibold text-white block">Auto-reconciliation</span>
                                                    <span className="text-xs text-slate-400">Instantly balance property assets in background</span>
                                                </div>
                                                <Switch
                                                    checked={switchVal}
                                                    onChange={() => setSwitchVal(!switchVal)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'cards' && (
                            <motion.div
                                key="cards"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={cubicTransition}
                                className="space-y-8"
                            >
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Cards & Badges</h2>
                                    <p className="text-slate-400 text-sm">Flexible layouts, profile identifiers, and decorative status indicators.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Cards and Content blocks */}
                                    <Card className="p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Badge variant="brand">VIP Status</Badge>
                                            <span className="text-[10px] text-slate-500 font-mono">ID: 0x921A</span>
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-lg font-bold text-white">Elysian Heights Residence</h4>
                                            <p className="text-xs text-slate-400 leading-relaxed">
                                                Exquisite dual-level residence featuring private sky pools and 360 panoramic views.
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-2">
                                                <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" alt="Audrey Vance" size="sm" />
                                                <div>
                                                    <p className="text-xs font-bold text-white">Audrey Vance</p>
                                                    <p className="text-[10px] text-slate-500">Curator</p>
                                                </div>
                                            </div>
                                            <Button size="sm" variant="outline">Inspect Details</Button>
                                        </div>
                                    </Card>

                                    {/* Badges and Avatars gallery */}
                                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-6">
                                        <h3 className="text-sm font-semibold text-[#d19f4a] uppercase tracking-wider">Badges, Avatars & Skeletons</h3>
                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="default">Default</Badge>
                                                <Badge variant="brand">Brand</Badge>
                                                <Badge variant="success">Success</Badge>
                                                <Badge variant="warning">Warning</Badge>
                                                <Badge variant="danger">Danger</Badge>
                                            </div>

                                            <div className="flex items-center gap-3 pt-2">
                                                <Avatar size="sm" alt="User Sm" />
                                                <Avatar size="md" alt="User Md" />
                                                <Avatar size="lg" alt="User Lg" />
                                                <div className="text-xs text-slate-400 ml-2">Fallback initials & responsive sizing</div>
                                            </div>

                                            <div className="space-y-2 pt-2 border-t border-white/5">
                                                <span className="text-xs font-mono text-slate-500">Skeleton Loading States</span>
                                                <div className="space-y-2">
                                                    <Skeleton className="h-4 w-3/4" />
                                                    <Skeleton className="h-3 w-1/2" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'feedback' && (
                            <motion.div
                                key="feedback"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={cubicTransition}
                                className="space-y-8"
                            >
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Feedback & Modals</h2>
                                    <p className="text-slate-400 text-sm">System messages, modal viewports, toast signals, and empty state illustrations.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Trigger interfaces */}
                                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-6">
                                        <h3 className="text-sm font-semibold text-[#d19f4a] uppercase tracking-wider">Dynamic Alerts & Dialogs</h3>

                                        <div className="space-y-3">
                                            <Alert
                                                variant="info"
                                                title="Database Sync Mode Active"
                                                description="Modifications will seamlessly propagate downstream to your physical properties."
                                            />
                                            <Alert
                                                variant="warning"
                                                title="Unsaved Architectural Spec"
                                                description="Please verify updates prior to deploying configurations to master server."
                                            />
                                        </div>

                                        <div className="flex flex-wrap gap-3 pt-2">
                                            <Button variant="outline" onClick={() => setModalOpen(true)}>
                                                Launch Configuration Modal
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={() => triggerToast('System Signal', 'New asset report processed successfully.', 'info')}
                                            >
                                                Trigger Notification Toast
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Empty state context */}
                                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center">
                                        <EmptyState
                                            title="No Connected Entities Found"
                                            description="To populate layout modules, authorize and configure a luxury hardware node."
                                            actionLabel="Link First Entity"
                                            onAction={() => triggerToast('Hardware Link', 'Initializing handshake sequence...', 'info')}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'navs' && (
                            <motion.div
                                key="navs"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={cubicTransition}
                                className="space-y-8"
                            >
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Navigation & Utilities</h2>
                                    <p className="text-slate-400 text-sm">Flow markers, site hierarchies, pagination structures, and helpful descriptive overlays.</p>
                                </div>

                                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-8">
                                    {/* Breadcrumbs */}
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-semibold text-[#d19f4a] uppercase tracking-wider">Breadcrumb Hierarchy</h3>
                                        <Breadcrumb
                                            items={[
                                                { label: 'Sandbox Root', href: '#' },
                                                { label: 'Property Modules', href: '#' },
                                                { label: 'Sapphire Suites Control Deck' }
                                            ]}
                                        />
                                    </div>

                                    {/* Tooltips */}
                                    <div className="space-y-3 pt-4 border-t border-white/5">
                                        <h3 className="text-sm font-semibold text-[#d19f4a] uppercase tracking-wider">Contextual Tooltips</h3>
                                        <div className="flex gap-4 items-center">
                                            <Tooltip content="Provides instant physical location synchronization.">
                                                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold cursor-help">
                                                    Hover to Inspect Node info
                                                </span>
                                            </Tooltip>
                                            <Tooltip content="Configures the primary encryption token.">
                                                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold cursor-help">
                                                    Hover to Inspect Security Protocol
                                                </span>
                                            </Tooltip>
                                        </div>
                                    </div>

                                    {/* Pagination */}
                                    <div className="space-y-3 pt-4 border-t border-white/5">
                                        <h3 className="text-sm font-semibold text-[#d19f4a] uppercase tracking-wider font-mono text-xs">Dynamic Pagination ({currentPage} / 10)</h3>
                                        <div className="flex justify-start">
                                            <Pagination
                                                currentPage={currentPage}
                                                totalPages={10}
                                                onPageChange={(page) => {
                                                    setCurrentPage(page);
                                                    triggerToast('Page Jumped', `Transitioned view context to state ${page}.`, 'info');
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* Toasts */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-auto">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <Toast
                            key={toast.id}
                            id={toast.id}
                            title={toast.title}
                            message={toast.message}
                            variant={toast.variant}
                            onClose={removeToast}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* Modal */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Luxury Room Parameters Configuration">
                <div className="space-y-6 pt-4">
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Modify structural characteristics and state assignments of this selected luxury residential workspace.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Assigned Curator Name" placeholder="Audrey Vance" />
                        <Select
                            label="Room Status Paradigm"
                            options={[
                                { value: 'ready', label: 'Occupancy Ready' },
                                { value: 'maint', label: 'In Maintenance' },
                                { value: 'reserve', label: 'Reserved' }
                            ]}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                        <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel Action</Button>
                        <Button variant="primary" onClick={() => {
                            setModalOpen(false);
                            triggerToast('System Saved', 'Configuration parameters successfully committed.', 'success');
                        }}>Commit Specifications</Button>
                    </div>
                </div>
            </Modal>

            <footer className="border-t border-white/5 bg-[#030712] py-6 text-center text-xs text-slate-500 select-none">
                © {new Date().getFullYear()} StayAI Inc. Premium luxury component sandbox dashboard.
            </footer>
        </div>
    );
}