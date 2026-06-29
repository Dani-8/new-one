import React from 'react';
import {
    adminLinks,
    ownerLinks,
    customerLinks
} from './constants';

const Sidebar = ({
    currentRole,
    activeTab,
    onTabSelect,
    collapsed,
    onToggleCollapse
}) => {

    const sidebarLinks =
        currentRole === 'admin'
            ? adminLinks
            : currentRole === 'owner'
                ? ownerLinks
                : customerLinks;

    return (
        <aside
            className={`
        hidden md:flex flex-col border-r border-white/5 bg-[#0a0e1a]/30 shrink-0 select-none transition-all duration-300 relative
        ${collapsed ? 'w-20' : 'w-64'}
      `}
        >
            {/* Route Anchors */}
            <div className="flex-grow py-6 px-4 space-y-1.5 text-left">
                <p
                    className={`text-[9px] font-bold uppercase tracking-widest text-slate-500 px-3 mb-4 ${collapsed ? 'text-center' : ''
                        }`}
                >
                    {collapsed ? 'CMD' : 'Console Domains'}
                </p>

                {sidebarLinks.map((route) => {
                    const Icon = route.icon;
                    const isActive = activeTab === route.id;

                    return (
                        <button
                            key={route.id}
                            onClick={() => onTabSelect(route.id)}
                            className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer relative group
                ${isActive
                                    ? 'bg-[#d19f4a]/15 text-[#d19f4a]'
                                    : 'text-slate-400 hover:text-[#f3f4f6] hover:bg-white/2'
                                }
                ${collapsed ? 'justify-center px-2' : ''}
              `}
                        >
                            <Icon className="w-4 h-4 text-current shrink-0" />

                            {!collapsed && <span>{route.label}</span>}

                            {!collapsed && route.premium && (
                                <span className="ml-auto text-[8px] font-extrabold bg-[#d19f4a]/10 text-[#d19f4a] px-1 py-0.5 rounded border border-[#d19f4a]/15 animate-pulse">
                                    AI
                                </span>
                            )}

                            {collapsed && (
                                <div className="absolute left-full ml-4 px-2 py-1 bg-[#0a0e1a] border border-white/10 text-white text-[10px] rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                                    {route.label}
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Collapse Anchor */}
            <div className="p-4 border-t border-white/5 bg-slate-900/10">
                <button
                    onClick={onToggleCollapse}
                    className="w-full text-slate-500 hover:text-slate-300 text-[10px] font-bold uppercase tracking-wider py-2.5 rounded-lg hover:bg-white/2 transition-all cursor-pointer"
                >
                    {collapsed ? '→' : '← Hide Console'}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;