import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'

const cubicTransition = {
    ease: [0.16, 1, 0.3, 1],
    duration: 0.35
};

export const Select = React.forwardRef(({
    label,
    options = [],
    value,
    onChange,
    placeholder = "Select option",
    error,
    className = '',
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className="w-full text-left space-y-1.5 relative" ref={dropdownRef}>
            {label && (
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
          w-full flex items-center justify-between bg-[#0a0e1a]/80 border rounded-xl text-sm text-[#f3f4f6] px-4 py-3.5 outline-none transition-all duration-300 cursor-pointer
          ${isOpen ? 'border-[#d19f4a] ring-1 ring-[#d19f4a]/30' : 'border-white/10'}
          ${error ? 'border-red-500/50' : ''}
          ${className}
        `}
            >
                <span className={selectedOption ? "text-[#f3f4f6]" : "text-slate-500"}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#d19f4a]' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={cubicTransition}
                        className="absolute z-50 w-full mt-2 bg-[#0d1324] border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl"
                    >
                        {options.map((option) => (
                            <li key={option.value}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (onChange) onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`
                    w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer
                    ${option.value === value ? 'bg-[#d19f4a]/15 text-[#d19f4a] font-medium' : 'text-slate-300 hover:bg-white/5'}
                  `}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{option.label}</span>
                                        {option.value === value && <Check className="w-4 h-4 text-[#d19f4a]" />}
                                    </div>
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
});

Select.displayName = 'Select';

export default Select;