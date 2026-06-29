import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';

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