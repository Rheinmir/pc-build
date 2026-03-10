"use client";
import React, { useState, useEffect } from 'react';
import { useT } from '@/lib/i18n';

type SavedBuild = {
    id: string;
    name: string;
    items: any[];
    total: number;
};

export default function Sidebar() {
    const [savedBuilds, setSavedBuilds] = useState<SavedBuild[]>([]);
    const [showSaved, setShowSaved] = useState(false);
    const { t } = useT();

    useEffect(() => {
        if (showSaved) {
            const saved = localStorage.getItem('pc-builder-saved-builds');
            if (saved) {
                setSavedBuilds(JSON.parse(saved));
            }
        }
    }, [showSaved]);

    const loadBuild = (build: SavedBuild) => {
        if (confirm(`Load "${build.name}"? This will replace your current build.`)) {
            localStorage.setItem('pc-builder-current-items', JSON.stringify(build.items));
            window.location.reload(); // Simple way to reload the app with new state
        }
    };

    return (
        <aside className="w-64 border-r flex flex-col fixed inset-y-0 z-50 border-gray-200 bg-gray-50 overflow-y-auto" data-purpose="navigation-sidebar">
            {/* Logo Section */}
            <div className="p-6 flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-white" data-purpose="logo-icon">
                    <svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-tight text-black">{t.appName}</h1>
                    <p className="text-xs font-medium text-gray-500">{t.expertMode}</p>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 mt-4 space-y-2">
                <button
                    onClick={() => setShowSaved(false)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${!showSaved ? 'bg-white text-black border border-gray-200 shadow-sm' : 'text-gray-400 hover:bg-gray-100 hover:text-black'}`}
                >
                    <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    <span className="font-medium">{t.navBuild}</span>
                </button>
                <button
                    onClick={() => setShowSaved(true)}
                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${showSaved ? 'bg-white text-black border border-gray-200 shadow-sm' : 'text-gray-400 hover:bg-gray-100 hover:text-black'}`}
                >
                    <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    <span className="font-medium">{t.navSaved}</span>
                </button>

                {showSaved && (
                    <div className="mt-6 pt-6 border-t border-gray-200 animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-4">{t.savedLibrary}</p>
                        <div className="space-y-2">
                            {savedBuilds.length === 0 ? (
                                <p className="text-xs text-gray-500 px-4 italic">{t.noSavedBuilds}</p>
                            ) : (
                                savedBuilds.map(build => (
                                    <button
                                        key={build.id}
                                        onClick={() => loadBuild(build)}
                                        className="w-full text-left px-4 py-2 hover:bg-white rounded-lg transition-colors group"
                                    >
                                        <p className="text-sm font-semibold text-gray-700 group-hover:text-black truncate">{build.name}</p>
                                        <p className="text-[10px] text-gray-400">${build.total.toFixed(2)}</p>
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* User Profile Footer */}
            <div className="p-4 border-t border-gray-200" data-purpose="sidebar-footer">
                <div className="flex items-center p-3 rounded-xl bg-gray-100">
                    <img alt="Builder Avatar" className="w-10 h-10 rounded-lg border border-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsFYV3M1xpRr_uVqlg1ecJisPr32q5mlJnuGMI9kpAmPYpLqPQ7V-4ZK7GXzmGW4Y5-orn1UCcY_d_wpGoXGS_x1e9_AlXUy4ul5Ptp9J4ZudEB1XcCufkJlm_jz4-b1DyqVwensaYgoQLIGMPjU_THaI88cfJ81BTXGcQeQuFR0iobEcggir8K5tZl9QWoCbDnf6yTWPOzzBqKVEwyg7wkqYmLKlcJ0at-cySp6ZEPMK2NmsfwcG-R-xOm8YXiCFcaK36YWzkbF7V" />
                    <div className="ml-3 overflow-hidden">
                        <p className="text-sm font-semibold truncate">{t.builderName}</p>
                        <p className="text-xs text-gray-500 truncate">{t.proAccount}</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
