import { ChefHat } from 'lucide-react';

export default function Footer({ isDarkMode }) {
  return (
    <footer
      className={`py-12 border-t mt-12 transition-colors duration-300 ${
        isDarkMode
          ? 'bg-[#06040c] border-zinc-900 text-gray-500'
          : 'bg-amber-50/20 border-slate-100 text-gray-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="flex items-center justify-center gap-1.5">
          <ChefHat className="h-5 w-5 text-amber-500" />
          <span className="font-sans font-bold tracking-tight text-sm">
            <span className="text-amber-500">Golden</span> Bite Restaurant
          </span>
        </div>

        <p className="text-xs font-light max-w-md mx-auto leading-relaxed">
          Crafting glowing gastronomic experiences since 2026. Custom ingredients, blazing fast deliveries, and pristine modern vibes.
        </p>

        <div className="text-[10px] opacity-60 font-mono">
          © 2026 Golden Bite Corp. All rights reserved. Built with love and glowing amber particles.
        </div>
      </div>
    </footer>
  );
}