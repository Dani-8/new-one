import React from 'react';
import Badge from '../common/Badge';
import { directoryColumns } from './constants';

const Footer = ({ onNavigate }) => {
    return (
        <footer className="border-t border-white/5 bg-[#030712] pt-16 pb-8 px-4 md:px-8 select-none relative overflow-hidden text-left">

            {/* Dynamic Gold Light Ray behind footer */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[300px] bg-gradient-to-t from-amber-500/2 to-transparent blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto space-y-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

                    {/* Brand Info */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-[#d19f4a] flex items-center justify-center font-black text-[#030712] text-lg">
                                S
                            </div>
                            
                            <span className="font-extrabold text-lg tracking-tight text-[#f3f4f6]">
                                Stay<span className="text-[#d19f4a]">AI</span>
                            </span>
                        </div>

                        <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                            Synthesizing deep generative intelligence and secure blockchain
                            verification models to formulate the premier elite travel planning
                            infrastructure of our time.
                        </p>

                        <div className="flex items-center gap-2 pt-2">
                            <Badge variant="brand">Tier AA Secure</Badge>
                            <Badge variant="neutral">PCI DSS Verified</Badge>
                        </div>
                    </div>

                    {/* Directory Columns */}
                    {directoryColumns.map((col, idx) => (
                        <div key={idx} className="space-y-4">
                            <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#d19f4a]">
                                {col.title}
                            </h5>

                            <ul className="space-y-2">
                                {col.links.map((link, lIdx) => (
                                    <li key={lIdx}>
                                        <button
                                            onClick={() => onNavigate(link.id)}
                                            className="text-xs text-slate-400 hover:text-[#f3f4f6] transition-colors cursor-pointer"
                                        >
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Panel */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[10px] uppercase tracking-wider font-bold">
                    <p>
                        © {new Date().getFullYear()} StayAI Inc. High-fidelity travel architectures.
                    </p>

                    <div className="flex gap-6">
                        <a href="#" className="hover:text-slate-300 transition-colors">
                            Privacy Policy
                        </a>

                        <a href="#" className="hover:text-slate-300 transition-colors">
                            Terms of Service
                        </a>

                        <a href="#" className="hover:text-[#d19f4a] transition-colors">
                            Developer Systems
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer