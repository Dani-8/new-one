import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const Pagination = ({
    currentPage = 1,
    totalPages = 10,
    onPageChange,
    className = '',
    ...props
}) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const visiblePages = pages.slice(
        Math.max(0, Math.min(currentPage - 3, totalPages - 5)),
        Math.min(totalPages, Math.max(5, currentPage + 2))
    );

    return (
        <div className={`flex items-center justify-center gap-1.5 ${className}`} {...props}>
            <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl border border-white/5 bg-white/3 text-slate-400 hover:text-[#f3f4f6] hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4" />
            </button>

            {currentPage > 3 && (
                <>
                    <button onClick={() => onPageChange(1)} className={`w-10 h-10 text-sm font-semibold rounded-xl border border-white/5 transition-colors cursor-pointer ${currentPage === 1 ? 'bg-[#d19f4a] text-[#030712] border-transparent' : 'bg-white/3 text-slate-400 hover:text-[#f3f4f6]'}`}>
                        1
                    </button>
                    {currentPage > 4 && <span className="text-slate-500 px-1 text-sm">...</span>}
                </>
            )}

            {visiblePages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 text-sm font-semibold rounded-xl border transition-all duration-300 cursor-pointer ${currentPage === page ? 'bg-[#d19f4a] text-[#030712] border-transparent font-bold shadow-lg shadow-[#d19f4a]/10' : 'bg-white/3 text-slate-400 hover:text-[#f3f4f6] border-white/5 hover:bg-white/5'}`}
                >
                    {page}
                </button>
            ))}

            {currentPage < totalPages - 2 && (
                <>
                    {currentPage < totalPages - 3 && <span className="text-slate-500 px-1 text-sm">...</span>}
                    <button onClick={() => onPageChange(totalPages)} className={`w-10 h-10 text-sm font-semibold rounded-xl border border-white/5 transition-colors cursor-pointer ${currentPage === totalPages ? 'bg-[#d19f4a] text-[#030712] border-transparent' : 'bg-white/3 text-slate-400 hover:text-[#f3f4f6]'}`}>
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl border border-white/5 bg-white/3 text-slate-400 hover:text-[#f3f4f6] hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
                <ArrowRight className="w-4 h-4" />
            </button>
        </div>
    );
};