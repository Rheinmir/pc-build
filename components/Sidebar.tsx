import React from 'react';

export default function Sidebar() {
    return (
        <aside className="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col hidden md:flex">
            <div className="p-6 flex items-center gap-3">
                <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">desktop_windows</span>
                </div>
                <div>
                    <h1 className="text-sm font-bold leading-tight">PC Builder Pro</h1>
                    <p className="text-xs text-slate-500">Expert Mode</p>
                </div>
            </div>
            <nav className="flex-1 px-4 space-y-1">
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-medium" href="#">
                    <span className="material-symbols-outlined">build</span>
                    <span className="text-sm">Build</span>
                </a>
                <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
                    <span className="material-symbols-outlined">favorite</span>
                    <span className="text-sm">Saved</span>
                </a>
            </nav>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 p-2">
                    <div className="size-8 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-200 flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm">person</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">Builder</p>
                        <p className="text-[10px] text-slate-500 truncate">Pro Account</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
