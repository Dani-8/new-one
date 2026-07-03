import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const springConfig = {
    type: 'spring',
    stiffness: 300,
    damping: 25,
    mass: 0.8
};

export const Checkbox = ({
    checked = false,
    onChange,
    label,
    disabled = false,
    className = '',
    ...props
}) => {
    return (
        <label className={`inline-flex items-center gap-3 cursor-pointer select-none group ${disabled ? 'opacity-40 pointer-events-none' : ''} ${className}`}>
            <div className="relative flex items-center justify-center">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="sr-only"
                    {...props}
                />
                <motion.div
                    animate={{
                        backgroundColor: checked ? 'rgba(209, 159, 74, 1)' : 'rgba(255, 255, 255, 0.02)',
                        borderColor: checked ? 'rgba(209, 159, 74, 1)' : 'rgba(255, 255, 255, 0.15)'
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 rounded border flex items-center justify-center text-slate-950 group-hover:border-[#d19f4a]/50"
                >
                    {checked && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={springConfig}
                        >
                            <Check className="w-3.5 h-3.5 stroke-[3px]" />
                        </motion.div>
                    )}
                </motion.div>
            </div>
            {label && <span className="text-sm font-medium text-slate-300 group-hover:text-[#f3f4f6]">{label}</span>}
        </label>
    );
};

export const Radio = ({
    checked = false,
    onChange,
    label,
    name,
    disabled = false,
    className = '',
    ...props
}) => {
    return (
        <label className={`inline-flex items-center gap-3 cursor-pointer select-none group ${disabled ? 'opacity-40 pointer-events-none' : ''} ${className}`}>
            <div className="relative flex items-center justify-center">
                <input
                    type="radio"
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="sr-only"
                    {...props}
                />
                <motion.div
                    animate={{
                        borderColor: checked ? 'rgba(209, 159, 74, 1)' : 'rgba(255, 255, 255, 0.15)',
                        boxShadow: checked ? '0 0 10px rgba(209, 159, 74, 0.15)' : 'none'
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 rounded-full border flex items-center justify-center group-hover:border-[#d19f4a]/50 bg-white/2"
                >
                    {checked && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={springConfig}
                            className="w-2.5 h-2.5 rounded-full bg-[#d19f4a]"
                        />
                    )}
                </motion.div>
            </div>
            {label && <span className="text-sm font-medium text-slate-300 group-hover:text-[#f3f4f6]">{label}</span>}
        </label>
    );
};

export const Switch = ({
    checked = false,
    onChange,
    label,
    disabled = false,
    className = '',
    ...props
}) => {
    return (
        <label className={`inline-flex items-center gap-4 cursor-pointer select-none ${disabled ? 'opacity-40 pointer-events-none' : ''} ${className}`}>
            <div className="relative">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="sr-only"
                    {...props}
                />
                <motion.div
                    animate={{
                        backgroundColor: checked ? 'rgba(209, 159, 74, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        borderColor: checked ? 'rgba(209, 159, 74, 0.3)' : 'rgba(255, 255, 255, 0.1)'
                    }}
                    className="w-11 h-6 rounded-full border transition-all duration-300"
                />
                <motion.div
                    animate={{
                        x: checked ? 20 : 4,
                        backgroundColor: checked ? 'rgba(209, 159, 74, 1)' : 'rgba(156, 163, 175, 1)'
                    }}
                    transition={springConfig}
                    className="absolute top-1 left-0 w-4 h-4 rounded-full"
                />
            </div>
            {label && <span className="text-sm font-medium text-slate-300">{label}</span>}
        </label>
    );
};

export default { Checkbox, Radio, Switch }