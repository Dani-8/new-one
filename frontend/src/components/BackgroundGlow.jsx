import React from 'react';

export default function BackgroundGlow({ isDarkMode }) {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none transition-colors duration-1000">
      {/* Base background color */}
      <div
        className={`absolute inset-0 transition-colors duration-1000 ${
          isDarkMode ? 'bg-[#141416]' : 'bg-[#faf7f9]'
        }`}
      />

      {/* Grid Pattern overlay - softened further */}
      <div 
        className={`absolute inset-0 opacity-[0.015] ${
          isDarkMode 
            ? 'bg-[linear-gradient(to_right,#f59e0b_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b_1px,transparent_1px)]' 
            : 'bg-[linear-gradient(to_right,#fcd34d_1px,transparent_1px),linear-gradient(to_bottom,#fcd34d_1px,transparent_1px)]'
        } bg-[size:5rem_5rem]`}
      />

      {/* Ultra-soft static corner gradient for premium sleek feel */}
      <div 
        className={`absolute top-0 right-0 w-[50vw] h-[50vh] rounded-full filter blur-[150px] opacity-[0.03] ${
          isDarkMode ? 'bg-amber-500' : 'bg-amber-300'
        }`}
      />
      <div 
        className={`absolute bottom-0 left-0 w-[50vw] h-[50vh] rounded-full filter blur-[150px] opacity-[0.02] ${
          isDarkMode ? 'bg-orange-500' : 'bg-orange-300'
        }`}
      />
    </div>
  );
}

