import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Home, Compass, User, Compass as AIConcierge, LogIn, Sparkles, 
  LayoutDashboard, Building2, CalendarRange, BarChart3, Users, Settings, 
  ShieldAlert, Bell, LogOut, Laptop, Tablet, Smartphone, Info, Coins,
  CheckCircle, PlusCircle, HelpCircle, ArrowLeft, ArrowRight
} from 'lucide-react';

// Premium spring and ease settings matching Phase 2.1 specifications
const springTransition = {
  type: 'spring',
  stiffness: 260,
  damping: 25,
  mass: 0.8
};

const fadeTransition = {
  duration: 0.25,
  ease: [0.16, 1, 0.3, 1]
};

// Direct, reliable, fully styled UI components to ensure the layouts run independently in the preview sandbox
const Button = ({ children, variant = 'primary', size = 'md', className = '', onClick, leftIcon: LeftIcon, ...props }) => {
  const base = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 select-none cursor-pointer focus:outline-none";
  const variants = {
    primary: "bg-gradient-to-r from-[#d19f4a] to-[#bd863d] text-[#030712] hover:opacity-95 active:scale-[0.98] shadow-lg shadow-[#d19f4a]/10",
    secondary: "bg-white/5 border border-white/10 text-[#f3f4f6] hover:bg-white/10 hover:border-white/20 active:scale-[0.98]",
    glass: "bg-white/2 border border-white/5 backdrop-blur-md text-[#d19f4a] hover:bg-white/5 hover:border-[#d19f4a]/30"
  };
  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5 rounded-lg",
    md: "px-5 py-2.5 text-sm gap-2 rounded-xl",
    lg: "px-7 py-3.5 text-base gap-2.5 rounded-2xl"
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick} {...props}>
      {LeftIcon && <LeftIcon className="w-4 h-4 text-current" />}
      {children}
    </button>
  );
};

const Avatar = ({ name, role, status = 'none', size = 'md' }) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-lg"
  };
  const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'U';
  return (
    <div className="relative inline-block shrink-0">
      <div className={`rounded-full border border-white/10 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center font-bold text-[#f3f4f6] ${sizes[size]}`}>
        {initials}
      </div>
      {status === 'premium' && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#d19f4a] rounded-full ring-2 ring-[#030712] flex items-center justify-center text-[8px] text-slate-950 font-bold">★</span>
      )}
    </div>
  );
};

const Badge = ({ children, variant = 'neutral' }) => {
  const variants = {
    neutral: "bg-white/5 text-slate-300 border border-white/5",
    brand: "bg-[#d19f4a]/15 text-[#d19f4a] border border-[#d19f4a]/25",
    success: "bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/25",
    error: "bg-red-500/15 text-red-400 border border-red-500/25"
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${variants[variant]}`}>
      {children}
    </span>
  );
};


/**
 * 1. PAGE CONTAINER
 * Standardized structural padding wrapper used as the core slot across all layouts.
 */
export const PageContainer = ({ children, title, subtitle, action, className = '' }) => {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 space-y-6 md:space-y-8 ${className}`}>
      {(title || subtitle || action) && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-1.5 text-left">
            {title && (
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[#f3f4f6]">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="flex items-center gap-3 shrink-0">{action}</div>}
        </div>
      )}
      <div className="w-full text-left">{children}</div>
    </div>
  );
};

/**
 * 2. PROTECTED ROUTE / LAYOUT PLACEHOLDER
 * Wraps dynamic content with high-contrast role checking simulations.
 */
export const ProtectedLayoutPlaceholder = ({ children, requiredRole = 'user', currentRole = 'guest', onSimulateLogin }) => {
  const isAuthorized = currentRole === requiredRole || currentRole === 'admin';

  return (
    <div className="w-full min-h-[400px] flex items-center justify-center p-4">
      {isAuthorized ? (
        <div className="w-full h-full">{children}</div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-slate-900/60 border border-red-500/20 rounded-2xl p-8 text-center space-y-6 backdrop-blur-md shadow-2xl"
        >
          <div className="w-14 h-14 bg-red-500/15 border border-red-500/30 rounded-full flex items-center justify-center mx-auto text-red-400">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-extrabold text-[#f3f4f6]">Access Authorization Barrier</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Viewing this domain requires authorization privileges of <Badge variant="error">{requiredRole}</Badge>. Your current profile has access rights of <Badge>{currentRole}</Badge>.
            </p>
          </div>
          <div className="bg-white/2 border border-white/5 rounded-xl p-3 text-xs font-mono text-slate-500 text-left">
            Error: HTTP_AUTHENTICATION_FORBIDDEN_403
          </div>
          <Button variant="primary" size="sm" className="w-full" onClick={() => onSimulateLogin(requiredRole)}>
            Bypass & Authorize as {requiredRole}
          </Button>
        </motion.div>
      )}
    </div>
  );
};


/**
 * 3. MAIN PORTAL LAYOUT
 * Persistent top sticky header, desktop/mobile responsive nav menus, active luxury styling wrappers, footer blocks.
 */
export const MainLayout = ({ children, currentRole = 'guest', onNavigate, onRoleSelect }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Explore Destinations', icon: Compass, id: 'explore' },
    { label: 'AI Travel Planner', icon: Sparkles, id: 'planner', premium: true },
    { label: 'Dynamic Help Desk', icon: HelpCircle, id: 'help' }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-[#f3f4f6] flex flex-col relative overflow-hidden font-sans">
      {/* Dynamic Background Light Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-amber-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Global Navigation Hub */}
      <header className="sticky top-0 z-40 bg-[#030712]/75 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo Identity */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d19f4a] to-[#bd863d] flex items-center justify-center font-black text-[#030712] text-xl tracking-wider">
              S
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight">
                Stay<span className="text-[#d19f4a]">AI</span>
              </span>
              <p className="text-[9px] font-semibold tracking-widest text-slate-500 uppercase mt-0.5">Luxury Concierge</p>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="flex items-center gap-2 text-slate-400 hover:text-[#d19f4a] transition-colors duration-200 cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                  {link.premium && <span className="text-[9px] bg-[#d19f4a]/15 text-[#d19f4a] px-1.5 py-0.5 rounded border border-[#d19f4a]/20">AI</span>}
                </button>
              );
            })}
          </nav>

          {/* User Status / Interaction Control */}
          <div className="hidden md:flex items-center gap-4">
            {currentRole === 'guest' ? (
              <>
                <button onClick={() => onNavigate('login')} className="text-sm font-bold text-slate-300 hover:text-white cursor-pointer">Sign In</button>
                <Button variant="primary" size="sm" onClick={() => onNavigate('register')}>Get Started</Button>
              </>
            ) : (
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 cursor-pointer" onClick={() => onNavigate('dashboard')}>
                <div className="text-right">
                  <p className="text-xs font-bold text-[#f3f4f6]">Sarah Jenkins</p>
                  <p className="text-[9px] text-slate-400 capitalize">{currentRole}</p>
                </div>
                <Avatar name="Sarah Jenkins" status="premium" size="sm" />
              </div>
            )}
          </div>

          {/* Mobile Menu Action Toggle */}
          <button 
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlays */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed inset-x-0 top-[73px] z-30 bg-[#030712] border-b border-white/10 p-6 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      onNavigate(link.id);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-left font-semibold text-slate-300 hover:text-[#d19f4a] py-2 border-b border-white/5"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>
            
            {/* User Details / Mobile Interactive Actions */}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
              {currentRole === 'guest' ? (
                <>
                  <Button variant="secondary" onClick={() => { onNavigate('login'); setMobileMenuOpen(false); }}>Sign In</Button>
                  <Button variant="primary" onClick={() => { onNavigate('register'); setMobileMenuOpen(false); }}>Get Started</Button>
                </>
              ) : (
                <div className="flex items-center justify-between p-3 bg-white/2 rounded-xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <Avatar name="Sarah Jenkins" status="premium" size="sm" />
                    <div className="text-left">
                      <p className="text-sm font-bold">Sarah Jenkins</p>
                      <p className="text-xs text-slate-400 capitalize">{currentRole}</p>
                    </div>
                  </div>
                  <Button variant="glass" size="sm" onClick={() => { onNavigate('dashboard'); setMobileMenuOpen(false); }}>Dashboard</Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container Slotted Content */}
      <main className="flex-grow flex flex-col justify-start">
        {children}
      </main>

      {/* Public Footer Platform Details */}
      <footer className="border-t border-white/5 bg-[#030712] py-12 px-4 md:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} StayAI Inc. High-fidelity travel platforms.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Developer APIs</a>
          </div>
        </div>
      </footer>
    </div>
  );
};


/**
 * 4. AUTH LAYOUT
 * Dual-pane visual layout splitter. Left side contains dynamic brand values and micro-animations, right side holds active form fields.
 */
export const AuthLayout = ({ children, onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#030712] text-[#f3f4f6] flex relative overflow-hidden font-sans">
      {/* Dynamic Gold Radial Glow behind the auth panel */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-radial-gradient from-[#d19f4a]/10 to-transparent rounded-full pointer-events-none" />

      {/* Left Pane - Premium Brand Graphics */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#050914] border-r border-white/5 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 filter grayscale contrast-120" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-lg text-left space-y-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-12 h-12 rounded-2xl bg-[#d19f4a] flex items-center justify-center font-black text-[#030712] text-2xl tracking-wider">
              S
            </div>
            <span className="text-2xl font-black tracking-tight">
              Stay<span className="text-[#d19f4a]">AI</span>
            </span>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-[#f3f4f6]">
              Unlock the Ultimate Luxury Travel Itinerary.
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              Establish biometrically verified guest accounts to coordinate premium flight paths, champagne resort bookings, and secure real-time AI Travel concierge operations.
            </p>
          </div>

          <div className="flex gap-4 items-center p-4 rounded-xl border border-white/5 bg-white/1 backdrop-blur-md">
            <div className="w-10 h-10 rounded-lg bg-[#d19f4a]/10 flex items-center justify-center text-[#d19f4a]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#f3f4f6]">Empowered by Gemini 1.5 Pro</p>
              <p className="text-[10px] text-slate-500">Continuous context travel modeling is active.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane - Standard Dynamic Forms */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 md:p-12 relative z-10">
        
        {/* Top Header Controls */}
        <div className="flex justify-between items-center">
          <button 
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-[#d19f4a] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          
          <Badge variant="brand">SSL Secured 256-bit</Badge>
        </div>

        {/* Central Content Portal */}
        <div className="max-w-md w-full mx-auto my-auto py-12 space-y-8">
          {children}
        </div>

        {/* Bottom Metadata Details */}
        <div className="text-center text-slate-500 text-xs">
          © {new Date().getFullYear()} StayAI. Security parameters verified under encryption protocol.
        </div>
      </div>
    </div>
  );
};


/**
 * 5. DASHBOARD LAYOUT
 * Clean sidebar responsive dashboard layout, handling secondary links, notification counts, user profiles, and active tab pointers.
 */
export const DashboardLayout = ({ children, currentRole = 'user', activeTab, onTabSelect, onLogout }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Configuration definitions mapping out available menus according to assigned profiles
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

  // Pick target sidebar route configurations based on assigned profile
  const menuRoutes = 
    currentRole === 'admin' ? adminRoutes : 
    currentRole === 'owner' ? ownerRoutes : 
    customerRoutes;

  return (
    <div className="min-h-screen bg-[#030712] text-[#f3f4f6] flex flex-col font-sans">
      
      {/* Top Header Hub (Mobile + Desktop Top Control Header) */}
      <header className="sticky top-0 z-40 bg-[#0a0e1a]/85 border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between">
        
        {/* Left Side: Collapse Button + Brand Identifiers */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#d19f4a] flex items-center justify-center font-black text-[#030712] text-lg">S</div>
            <div>
              <span className="font-extrabold text-md md:text-lg">Stay<span className="text-[#d19f4a]">AI</span></span>
              <span className="hidden sm:inline-block ml-2 text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-slate-400 uppercase tracking-widest font-semibold">
                {currentRole} Console
              </span>
            </div>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Notifications Placeholder */}
          <button className="relative p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-white/5 transition-colors cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#d19f4a] rounded-full animate-pulse" />
          </button>

          {/* User Details Menu */}
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

      {/* Main Structural Layout Hub */}
      <div className="flex-grow flex relative">
        
        {/* Side Panel Drawer (Desktop Navigation) */}
        <aside 
          className={`
            hidden md:flex flex-col border-r border-white/5 bg-[#0a0e1a]/40 shrink-0 select-none transition-all duration-300
            ${sidebarCollapsed ? 'w-20' : 'w-64'}
          `}
        >
          {/* Nav Links mapping */}
          <div className="flex-grow py-6 px-4 space-y-1.5">
            {menuRoutes.map((route) => {
              const Icon = route.icon;
              const isActive = activeTab === route.id;
              return (
                <button
                  key={route.id}
                  onClick={() => onTabSelect(route.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer
                    ${isActive ? 'bg-[#d19f4a]/15 text-[#d19f4a] shadow-inner' : 'text-slate-400 hover:text-[#f3f4f6] hover:bg-white/2'}
                    ${sidebarCollapsed ? 'justify-center px-2' : ''}
                  `}
                >
                  <Icon className={`w-4 h-4 text-current shrink-0`} />
                  {!sidebarCollapsed && <span>{route.label}</span>}
                  {!sidebarCollapsed && route.premium && (
                    <span className="ml-auto text-[9px] bg-[#d19f4a]/10 text-[#d19f4a] px-1.5 py-0.5 rounded border border-[#d19f4a]/15">AI</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Side actions */}
          <div className="p-4 border-t border-white/5">
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full text-slate-500 hover:text-slate-300 text-xs font-semibold py-2 rounded-lg hover:bg-white/2 transition-colors cursor-pointer"
            >
              {sidebarCollapsed ? '→' : '← Collapse Panel'}
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Blur Overlay Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="md:hidden fixed inset-0 z-30 bg-[#030712]/80 backdrop-blur-sm"
              />

              {/* Sidebar drawer panel */}
              <motion.div 
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={springTransition}
                className="md:hidden fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0a0e1a] border-r border-white/10 p-6 flex flex-col justify-between shadow-2xl"
              >
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#d19f4a] flex items-center justify-center font-black text-[#030712] text-md">S</div>
                      <span className="font-extrabold text-sm">Stay<span className="text-[#d19f4a]">AI</span></span>
                    </div>
                    <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-white/5 cursor-pointer">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    {menuRoutes.map((route) => {
                      const Icon = route.icon;
                      const isActive = activeTab === route.id;
                      return (
                        <button
                          key={route.id}
                          onClick={() => {
                            onTabSelect(route.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`
                            w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 text-left cursor-pointer
                            ${isActive ? 'bg-[#d19f4a]/15 text-[#d19f4a]' : 'text-slate-400 hover:text-[#f3f4f6]'}
                          `}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{route.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-semibold transition-colors cursor-pointer">
                    <LogOut className="w-4 h-4 shrink-0" />
                    <span>Logout Account</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Core Layout Slotted Content View */}
        <main className="flex-grow flex flex-col overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
};


// Default exported interactive harness that simulates viewports, roles, and components
export default function LayoutsShowcase() {
  const [activeLayoutType, setActiveLayoutType] = useState('main'); // 'main' | 'auth' | 'dashboard'
  const [activeTab, setActiveTab] = useState('customer-bookings');
  const [currentRole, setCurrentRole] = useState('user'); // 'guest' | 'user' | 'owner' | 'admin'
  const [simulatedDevice, setSimulatedDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [isLoggedOut, setIsLoggedOut] = useState(false);

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

  // Maps display sizing parameters for our interactive preview device frame
  const deviceWidths = {
    desktop: 'w-full',
    tablet: 'max-w-[768px] border-x border-slate-800/80',
    mobile: 'max-w-[390px] border-x border-slate-800/80'
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-[#f3f4f6] flex flex-col font-sans">
      
      {/* 1. LAYOUTS CONTROLS PANEL */}
      <section className="bg-[#090d16] border-b border-white/10 p-6 relative z-50 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#d19f4a]/10 border border-[#d19f4a]/20 rounded-full px-3 py-1 text-[10px] text-[#d19f4a] font-semibold uppercase tracking-wider mb-2">
                Phase 2.3 Workbench
              </div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight text-[#f3f4f6]">StayAI Layouts Simulator</h2>
              <p className="text-xs text-slate-400">Interactively preview, switch viewports, and test active roles across all structural layouts.</p>
            </div>

            {/* Simulated Device Switcher */}
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
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${simulatedDevice === device.id ? 'bg-[#d19f4a] text-slate-950 font-bold' : 'text-slate-400 hover:text-[#f3f4f6]'}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline-block">{device.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
            {/* Choose Layout Type */}
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

            {/* Choose simulated role parameters */}
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${currentRole === role.id ? 'bg-[#d19f4a]/15 text-[#d19f4a] font-bold border border-[#d19f4a]/25' : 'text-slate-400 border border-transparent hover:text-white'}`}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. LIVE INTERACTIVE SIMULATOR FRAME */}
      <div className="flex-grow flex items-start justify-center p-4 md:p-10 relative">
        <div 
          className={`
            min-h-[700px] h-full bg-[#030712] shadow-2xl transition-all duration-300 overflow-hidden relative border border-white/5 rounded-2xl flex flex-col
            ${deviceWidths[simulatedDevice]}
          `}
        >
          
          {/* Main Layout Rendering Trigger */}
          {activeLayoutType === 'main' && (
            <MainLayout currentRole={currentRole} onNavigate={handleNavigate} onRoleSelect={simulateRoleLogin}>
              <PageContainer 
                title="Explore Luxury Resorts Powered by AI" 
                subtitle="Summon Gemini algorithms to configure presidential stays, custom villas, and five-star sand cabins with instant confirmation parameters."
                action={
                  <Button variant="primary" size="sm" rightIcon={ArrowRight} onClick={() => setActiveLayoutType('auth')}>
                    Secure Reservation
                  </Button>
                }
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: 'Presidential Penthouse', location: 'Dubai Sands', price: '$2,500/night', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80' },
                    { title: 'Lagoon Paradise Cabana', location: 'Maldives Overwater', price: '$1,900/night', image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&q=80' },
                    { title: 'Scandinavian Carbon Suite', location: 'Oslo Highlands', price: '$1,200/night', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80' }
                  ].map((resort, idx) => (
                    <div key={idx} className="bg-white/2 rounded-2xl border border-white/5 overflow-hidden group hover:border-[#d19f4a]/20 transition-colors duration-300 text-left">
                      <div className="h-48 overflow-hidden relative">
                        <img src={resort.image} alt={resort.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <span className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-[#d19f4a]">{resort.price}</span>
                      </div>
                      <div className="p-6 space-y-3">
                        <Badge variant="brand">Verified Tier</Badge>
                        <div>
                          <h4 className="font-extrabold text-md text-[#f3f4f6]">{resort.title}</h4>
                          <p className="text-xs text-slate-400">{resort.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </PageContainer>
            </MainLayout>
          )}

          {/* Auth Layout Split Rendering Trigger */}
          {activeLayoutType === 'auth' && (
            <AuthLayout onNavigate={handleNavigate}>
              <div className="space-y-6 text-left">
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-[#f3f4f6]">Biometric Authorization</h3>
                  <p className="text-sm text-slate-400">Initiate encrypted handshake configurations to sign into StayAI portals.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Registered Identity Address</label>
                    <input type="email" placeholder="e.g. resident@stayai.com" defaultValue="sarah.jenkins@stayai.com" className="w-full bg-white/2 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#d19f4a] outline-none transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Access Cryptographic Password</label>
                    <input type="password" placeholder="Enter secure passphrase" value="••••••••••••••" className="w-full bg-white/2 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#d19f4a] outline-none transition-colors" />
                  </div>
                </div>

                <Button variant="primary" className="w-full" onClick={() => simulateRoleLogin('user')}>
                  Decrypt Credentials & Authorize
                </Button>

                <div className="text-center text-xs text-slate-400">
                  New resident? <button onClick={() => simulateRoleLogin('user')} className="text-[#d19f4a] underline cursor-pointer">Register Profile</button>
                </div>
              </div>
            </AuthLayout>
          )}

          {/* Dashboard Console Layout Rendering Trigger */}
          {activeLayoutType === 'dashboard' && (
            <DashboardLayout 
              currentRole={currentRole} 
              activeTab={activeTab} 
              onTabSelect={setActiveTab} 
              onLogout={handleLogout}
            >
              
              {/* Customer Dashboard Content Block */}
              {activeTab === 'customer-bookings' && (
                <ProtectedLayoutPlaceholder requiredRole="user" currentRole={currentRole} onSimulateLogin={simulateRoleLogin}>
                  <PageContainer 
                    title="Active Itineraries" 
                    subtitle="Monitor upcoming check-ins, dynamic boarding details, and AI trip updates."
                    action={<Button variant="primary" size="sm" leftIcon={PlusCircle}>New Booking</Button>}
                  >
                    <div className="bg-white/2 border border-white/5 rounded-2xl p-6 space-y-4 text-left">
                      <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-xl bg-[#d19f4a]/10 border border-[#d19f4a]/25 flex items-center justify-center text-[#d19f4a]">
                            <Compass className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm">Onyx Sands Resort</h4>
                            <p className="text-xs text-slate-400">Check-in: Nov 14, 2026</p>
                          </div>
                        </div>
                        <Badge variant="success">Confirmed</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/1 rounded-xl p-3 border border-white/5">
                        <Info className="w-4 h-4 text-[#d19f4a]" />
                        <span>AI update: Climate models indicate beautiful sunny weather with pleasant 26°C beachfront winds.</span>
                      </div>
                    </div>
                  </PageContainer>
                </ProtectedLayoutPlaceholder>
              )}

              {activeTab === 'customer-planner' && (
                <ProtectedLayoutPlaceholder requiredRole="user" currentRole={currentRole} onSimulateLogin={simulateRoleLogin}>
                  <PageContainer 
                    title="AI Travel Concierge Desk" 
                    subtitle="Secure continuous prompt travel optimizations using Gemini API integrations."
                  >
                    <div className="border border-dashed border-[#d19f4a]/30 bg-[#d19f4a]/5 rounded-2xl p-8 text-center space-y-6">
                      <div className="w-14 h-14 bg-[#d19f4a]/10 border border-[#d19f4a]/20 rounded-full flex items-center justify-center mx-auto text-[#d19f4a]">
                        <Sparkles className="w-7 h-7" />
                      </div>
                      <div className="max-w-md mx-auto space-y-2">
                        <h4 className="font-extrabold text-lg">Continuous Context Planner Active</h4>
                        <p className="text-sm text-slate-400">Provide itinerary requests below. Gemini's LLM pipeline parses climate records, room inventories, and transportation paths to build your schedule.</p>
                      </div>
                      <div className="flex gap-2 max-w-xl mx-auto bg-slate-900 border border-white/10 p-2 rounded-xl">
                        <input type="text" placeholder="e.g. 'Generate a 5-day romantic beach escape in the Maldives with active reef spots...'" className="flex-grow bg-transparent outline-none px-3 text-sm text-[#f3f4f6]" />
                        <Button variant="primary" size="sm">Draft Plan</Button>
                      </div>
                    </div>
                  </PageContainer>
                </ProtectedLayoutPlaceholder>
              )}

              {activeTab === 'customer-profile' && (
                <ProtectedLayoutPlaceholder requiredRole="user" currentRole={currentRole} onSimulateLogin={simulateRoleLogin}>
                  <PageContainer title="Guest Profile" subtitle="Verify encryption parameters and billing setups.">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/2 border border-white/5 rounded-2xl p-6 space-y-4">
                        <h4 className="font-extrabold text-sm text-[#f3f4f6]">Authentication Matrix</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs py-2 border-b border-white/5"><span className="text-slate-400">Full Name</span><span className="font-bold">Sarah Jenkins</span></div>
                          <div className="flex justify-between text-xs py-2 border-b border-white/5"><span className="text-slate-400">Account Tier</span><span className="text-[#d19f4a] font-bold">Premium Resident</span></div>
                          <div className="flex justify-between text-xs py-2 border-b border-white/5"><span className="text-slate-400">Fingerprint Key</span><span className="font-mono text-slate-500">SHA256_F9238X...</span></div>
                        </div>
                      </div>
                      <div className="bg-white/2 border border-white/5 rounded-2xl p-6 space-y-4">
                        <h4 className="font-extrabold text-sm text-[#f3f4f6]">Billing Setup</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs py-2 border-b border-white/5"><span className="text-slate-400">Active Wallet</span><span className="font-bold">Apple Pay Express</span></div>
                          <div className="flex justify-between text-xs py-2 border-b border-white/5"><span className="text-slate-400">Secured Node</span><span className="text-[#10b981] font-bold">Encrypted Link Enabled</span></div>
                        </div>
                      </div>
                    </div>
                  </PageContainer>
                </ProtectedLayoutPlaceholder>
              )}

              {/* Owner Dashboard Content Block */}
              {activeTab === 'owner-dashboard' && (
                <ProtectedLayoutPlaceholder requiredRole="owner" currentRole={currentRole} onSimulateLogin={simulateRoleLogin}>
                  <PageContainer 
                    title="Commercial Overview" 
                    subtitle="Review reservation volume, aggregate revenue collections, and property performance."
                    action={<Badge variant="success">Sync Cycle Active</Badge>}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="bg-white/2 border border-white/5 rounded-2xl p-6 space-y-2">
                        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Gross Revenue</p>
                        <h3 className="text-2xl md:text-3xl font-black text-[#d19f4a] flex items-center gap-2">
                          <Coins className="w-6 h-6 shrink-0" /> $482,900
                        </h3>
                        <p className="text-[10px] text-emerald-400">▲ +14% compared to Q3 forecast</p>
                      </div>
                      <div className="bg-white/2 border border-white/5 rounded-2xl p-6 space-y-2">
                        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Reserves Booked</p>
                        <h3 className="text-2xl md:text-3xl font-black text-[#f3f4f6]">182 Nights</h3>
                        <p className="text-[10px] text-emerald-400">▲ 92% occupancy target met</p>
                      </div>
                      <div className="bg-white/2 border border-white/5 rounded-2xl p-6 space-y-2">
                        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Platform Star Rating</p>
                        <h3 className="text-2xl md:text-3xl font-black text-[#f3f4f6]">4.92 / 5.0</h3>
                        <p className="text-[10px] text-slate-400">Based on 320 verified resident reviews</p>
                      </div>
                    </div>
                  </PageContainer>
                </ProtectedLayoutPlaceholder>
              )}

              {activeTab === 'owner-hotels' && (
                <ProtectedLayoutPlaceholder requiredRole="owner" currentRole={currentRole} onSimulateLogin={simulateRoleLogin}>
                  <PageContainer 
                    title="Asset Directories" 
                    subtitle="Manage hotel catalogs, room inventories, and dynamic pricing metrics."
                    action={<Button variant="primary" size="sm" leftIcon={PlusCircle}>List New Property</Button>}
                  >
                    <div className="bg-white/2 border border-white/5 rounded-2xl p-6 space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b border-white/5">
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                            <Building2 className="w-6 h-6" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-sm">Chateau Sands</h4>
                            <p className="text-xs text-slate-400">8 Rooms Listed • Luxury Segment</p>
                          </div>
                        </div>
                        <Badge variant="success">Active</Badge>
                      </div>
                    </div>
                  </PageContainer>
                </ProtectedLayoutPlaceholder>
              )}

              {activeTab === 'owner-bookings' && (
                <ProtectedLayoutPlaceholder requiredRole="owner" currentRole={currentRole} onSimulateLogin={simulateRoleLogin}>
                  <PageContainer title="Reservation Records" subtitle="Manage upcoming check-ins, guest demands, and dynamic calendars.">
                    <div className="bg-white/2 border border-white/5 rounded-2xl p-6 text-center text-slate-500 text-sm py-16">
                      No pending room check-ins recorded for today's roster.
                    </div>
                  </PageContainer>
                </ProtectedLayoutPlaceholder>
              )}

              {activeTab === 'owner-analytics' && (
                <ProtectedLayoutPlaceholder requiredRole="owner" currentRole={currentRole} onSimulateLogin={simulateRoleLogin}>
                  <PageContainer title="Revenue & Analytics" subtitle="Analyze deep demographic analytics and seasonal room rates.">
                    <div className="bg-white/2 border border-white/5 rounded-2xl p-6 text-center text-slate-500 text-sm py-16">
                      Revenue graphs and occupancy projections will populate here.
                    </div>
                  </PageContainer>
                </ProtectedLayoutPlaceholder>
              )}

              {/* Admin Dashboard Content Block */}
              {activeTab === 'admin-dashboard' && (
                <ProtectedLayoutPlaceholder requiredRole="admin" currentRole={currentRole} onSimulateLogin={simulateRoleLogin}>
                  <PageContainer 
                    title="Platform Infrastructure Monitor" 
                    subtitle="Observe node latency levels, database read-write cycles, and aggregate service health pools."
                    action={<Badge variant="success">System Online</Badge>}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-white/2 border border-white/5 rounded-2xl p-6 space-y-2">
                        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">MongoDB Node</p>
                        <h4 className="text-lg font-bold text-[#10b981]">🟢 Connected</h4>
                        <p className="text-[10px] text-slate-400">Response Latency: 12ms</p>
                      </div>
                      <div className="bg-white/2 border border-white/5 rounded-2xl p-6 space-y-2">
                        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Upstash Redis</p>
                        <h4 className="text-lg font-bold text-[#10b981]">🟢 Cache Enabled</h4>
                        <p className="text-[10px] text-slate-400">Memory Load: 14%</p>
                      </div>
                      <div className="bg-white/2 border border-white/5 rounded-2xl p-6 space-y-2">
                        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Gemini SDK Pipeline</p>
                        <h4 className="text-lg font-bold text-[#10b981]">🟢 Ready</h4>
                        <p className="text-[10px] text-slate-400">Context modeling active</p>
                      </div>
                      <div className="bg-white/2 border border-white/5 rounded-2xl p-6 space-y-2">
                        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Active Threads</p>
                        <h4 className="text-lg font-bold text-[#f3f4f6]">1,480 Active</h4>
                        <p className="text-[10px] text-emerald-400">99.98% transmission index</p>
                      </div>
                    </div>
                  </PageContainer>
                </ProtectedLayoutPlaceholder>
              )}

              {activeTab === 'admin-hotels' && (
                <ProtectedLayoutPlaceholder requiredRole="admin" currentRole={currentRole} onSimulateLogin={simulateRoleLogin}>
                  <PageContainer title="Verify Properties" subtitle="Review pending commercial lists seeking system clearance.">
                    <div className="bg-white/2 border border-white/5 rounded-2xl p-6 text-center text-slate-500 text-sm py-16">
                      No pending commercial assets require system clearances.
                    </div>
                  </PageContainer>
                </ProtectedLayoutPlaceholder>
              )}

              {activeTab === 'admin-users' && (
                <ProtectedLayoutPlaceholder requiredRole="admin" currentRole={currentRole} onSimulateLogin={simulateRoleLogin}>
                  <PageContainer title="Register Accounts" subtitle="Audit structural platform users, roles, and administrative statuses.">
                    <div className="bg-white/2 border border-white/5 rounded-2xl p-6 text-center text-slate-500 text-sm py-16">
                      Rosters of registered platform accounts are loading...
                    </div>
                  </PageContainer>
                </ProtectedLayoutPlaceholder>
              )}

              {activeTab === 'admin-settings' && (
                <ProtectedLayoutPlaceholder requiredRole="admin" currentRole={currentRole} onSimulateLogin={simulateRoleLogin}>
                  <PageContainer title="System Settings" subtitle="Configure system parameters, global rate limits, and caching strategies.">
                    <div className="bg-white/2 border border-white/5 rounded-2xl p-6 text-center text-slate-500 text-sm py-16">
                      System controls configuration panel.
                    </div>
                  </PageContainer>
                </ProtectedLayoutPlaceholder>
              )}

            </DashboardLayout>
          )}

        </div>
      </div>

      {/* FOOTER SYSTEM DETAILS */}
      <footer className="border-t border-white/10 bg-[#090d16] py-6 text-center text-xs text-slate-500 select-none">
        StayAI Reusable Layout System Engine. Phase 2.3 Verified Spec.
      </footer>
    </div>
  );
}