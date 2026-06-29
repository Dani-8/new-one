import React from 'react';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = ({ items = [] }) => {
    return (
        <nav className="flex items-center flex-wrap gap-1 text-xs">
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {index > 0 && (
                        <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
                    )}

                    {item.active ? (
                        <span className="font-bold text-[#f3f4f6]">
                            {item.label}
                        </span>
                    ) : (
                        <a
                            href={item.href}
                            className="text-slate-400 hover:text-[#d19f4a] transition-colors"
                        >
                            {item.label}
                        </a>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;