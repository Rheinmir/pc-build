"use client";
import React from 'react';
import { tierData, TierItem } from '@/data/tierData';

type TierListModalProps = {
    isOpen: boolean;
    onClose: () => void;
    category: string;
    currentItemName: string;
};

const tierColors = {
    S: "bg-[#FF7F7F]",
    A: "bg-[#FFBF7F]",
    B: "bg-[#FFDF7F]",
    C: "bg-[#FFFF7F]",
    D: "bg-[#BEFF7F]"
};

export default function TierListModal({ isOpen, onClose, category, currentItemName }: TierListModalProps) {
    if (!isOpen) return null;

    const data = tierData.find(d => d.category === category);

    if (!data) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
                <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                    <h3 className="text-xl font-bold mb-4">No Data Available</h3>
                    <p className="text-gray-500 mb-6">We don't have tier data for the "{category}" category yet.</p>
                    <button onClick={onClose} className="w-full bg-black text-white py-3 rounded-xl font-bold">Close</button>
                </div>
            </div>
        );
    }

    const tiers: (keyof typeof data.tiers)[] = ['S', 'A', 'B', 'C', 'D'];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-[#1A1A1A] rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl border border-white/10">
                <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-[#252525]">
                    <div>
                        <h3 className="text-xl font-bold text-white">{category} Tier List</h3>
                        <p className="text-xs text-gray-400 mt-1">Comparing: <span className="text-primary-light font-bold">{currentItemName}</span></p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-1 bg-black">
                    {tiers.map((tier) => (
                        <div key={tier} className="flex min-h-[80px] bg-[#1A1A1A] group">
                            <div className={`${tierColors[tier]} w-24 flex items-center justify-center text-2xl font-black text-black/80 flex-shrink-0`}>
                                {tier}
                            </div>
                            <div className="flex-1 p-3 flex flex-wrap gap-2 items-center content-center">
                                {data.tiers[tier].map((item: TierItem, idx: number) => {
                                    const isCurrent = currentItemName.toLowerCase().includes(item.name.toLowerCase()) ||
                                        item.name.toLowerCase().includes(currentItemName.toLowerCase());

                                    return (
                                        <div
                                            key={idx}
                                            className={`px-4 py-2 rounded text-xs font-bold transition-all border ${isCurrent
                                                    ? "bg-white text-black border-white shadow-lg shadow-white/20 scale-105"
                                                    : "bg-[#252525] text-gray-300 border-white/5 hover:border-white/20"
                                                }`}
                                            title={item.description}
                                        >
                                            {item.name}
                                            {isCurrent && <span className="ml-2 text-[10px] uppercase">Selected</span>}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="w-12 flex flex-col items-center justify-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                    </svg>
                                </button>
                                <div className="flex flex-col">
                                    <button className="text-gray-400 hover:text-white transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        </svg>
                                    </button>
                                    <button className="text-gray-400 hover:text-white transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
