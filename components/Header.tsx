import React from 'react';

export default function Header() {
    return (
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8">
            <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold">PC Build Calculator</h2>
            </div>
            <div className="flex items-center gap-4">
                <button className="bg-primary text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
                    Save Build
                </button>
            </div>
        </header>
    );
}
