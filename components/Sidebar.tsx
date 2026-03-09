import React from 'react';

export default function Sidebar() {
    return (
        <aside className="w-64 border-r flex flex-col fixed inset-y-0 z-50 border-gray-200 bg-gray-50" data-purpose="navigation-sidebar">
            {/* Logo Section */}
            <div className="p-6 flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-white" data-purpose="logo-icon">
                    <svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-tight text-black">PC Builder Pro</h1>
                    <p className="text-xs font-medium text-gray-500">Expert Mode</p>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 mt-4 space-y-2">
                <a className="flex items-center px-4 py-3 bg-white text-black rounded-xl transition-all duration-200 border border-gray-200 shadow-sm" data-purpose="nav-item-active" href="#">
                    <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    <span className="font-medium">Build</span>
                </a>
                <a className="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-100 hover:text-black rounded-xl transition-all duration-200 group" data-purpose="nav-item" href="#">
                    <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </svg>
                    <span className="font-medium">Saved</span>
                </a>
            </nav>

            {/* User Profile Footer */}
            <div className="p-4 border-t border-gray-200" data-purpose="sidebar-footer">
                <div className="flex items-center p-3 rounded-xl bg-gray-100">
                    <img alt="Builder Avatar" className="w-10 h-10 rounded-lg border border-gray-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsFYV3M1xpRr_uVqlg1ecJisPr32q5mlJnuGMI9kpAmPYpLqPQ7V-4ZK7GXzmGW4Y5-orn1UCcY_d_wpGoXGS_x1e9_AlXUy4ul5Ptp9J4ZudEB1XcCufkJlm_jz4-b1DyqVwensaYgoQLIGMPjU_THaI88cfJ81BTXGcQeQuFR0iobEcggir8K5tZl9QWoCbDnf6yTWPOzzBqKVEwyg7wkqYmLKlcJ0at-cySp6ZEPMK2NmsfwcG-R-xOm8YXiCFcaK36YWzkbF7V" />
                    <div className="ml-3 overflow-hidden">
                        <p className="text-sm font-semibold truncate">Builder</p>
                        <p className="text-xs text-gray-500 truncate">Pro Account</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
