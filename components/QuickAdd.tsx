"use client";
import React, { useState } from 'react';

type QuickAddProps = {
    onAdd: (url: string, price: string, manualName?: string, msrp?: string) => void;
};

const CATEGORIES = ["Processor", "Graphics Card", "Motherboard", "RAM", "Storage", "Power Supply", "Case", "Component"];

export default function QuickAdd({ onAdd }: QuickAddProps) {
    const [mode, setMode] = useState<'url' | 'manual'>('url');
    const [urlInput, setUrlInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [categoryInput, setCategoryInput] = useState("Component");
    const [priceInput, setPriceInput] = useState("");
    const [msrpInput, setMsrpInput] = useState("");

    const handleAdd = () => {
        if (!priceInput) return;
        const msrp = msrpInput || undefined;
        if (mode === 'url') {
            if (!urlInput) return;
            onAdd(urlInput, priceInput, undefined, msrp);
        } else {
            if (!nameInput) return;
            onAdd('#', priceInput, `${categoryInput}::${nameInput}`, msrp);
        }
        setUrlInput("");
        setNameInput("");
        setPriceInput("");
        setMsrpInput("");
        setCategoryInput("Component");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleAdd();
    };

    return (
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm" data-purpose="quick-add-container">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                <h3 className="font-semibold text-black">Quick Add Component</h3>
                <div className="flex items-center bg-gray-200 p-0.5 rounded-lg">
                    <button
                        onClick={() => setMode('url')}
                        className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${mode === 'url' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        URL
                    </button>
                    <button
                        onClick={() => setMode('manual')}
                        className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${mode === 'manual' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Manual
                    </button>
                </div>
            </div>
            <div className="p-6">
                {mode === 'url' ? (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                        <div className="md:col-span-5">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Product URL (Shopee Supported)</label>
                            <input
                                type="url"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full bg-white border-gray-300 text-black rounded-xl focus:ring-black focus:border-black placeholder-gray-400 px-4 py-3 border transition-all"
                                placeholder="https://shopee.vn/example-product-link..."
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Price ($)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input type="number" value={priceInput} onChange={(e) => setPriceInput(e.target.value)} onKeyDown={handleKeyDown}
                                    className="w-full bg-white border-gray-300 text-black rounded-xl focus:ring-black focus:border-black placeholder-gray-400 pl-8 pr-4 py-3 border transition-all" placeholder="0" />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Release Price ($)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input type="number" value={msrpInput} onChange={(e) => setMsrpInput(e.target.value)} onKeyDown={handleKeyDown}
                                    className="w-full bg-white border-gray-300 text-black rounded-xl focus:ring-black focus:border-black placeholder-gray-400 pl-8 pr-4 py-3 border transition-all" placeholder="Optional" />
                            </div>
                        </div>
                        <div className="md:col-span-3">
                            <button onClick={handleAdd} className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition-colors shadow-sm" data-purpose="add-button">
                                Add to Build
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                        <div className="md:col-span-4">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Product Name</label>
                            <input
                                type="text"
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full bg-white border-gray-300 text-black rounded-xl focus:ring-black focus:border-black placeholder-gray-400 px-4 py-3 border transition-all"
                                placeholder="e.g. RTX 4070 Ti Super..."
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</label>
                            <select value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)}
                                className="w-full bg-white border-gray-300 text-black rounded-xl focus:ring-black focus:border-black px-4 py-3 border transition-all appearance-none">
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Price ($)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input type="number" value={priceInput} onChange={(e) => setPriceInput(e.target.value)} onKeyDown={handleKeyDown}
                                    className="w-full bg-white border-gray-300 text-black rounded-xl focus:ring-black focus:border-black placeholder-gray-400 pl-8 pr-4 py-3 border transition-all" placeholder="0" />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Release Price ($)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input type="number" value={msrpInput} onChange={(e) => setMsrpInput(e.target.value)} onKeyDown={handleKeyDown}
                                    className="w-full bg-white border-gray-300 text-black rounded-xl focus:ring-black focus:border-black placeholder-gray-400 pl-8 pr-4 py-3 border transition-all" placeholder="Optional" />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <button onClick={handleAdd} className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition-colors shadow-sm" data-purpose="add-button">
                                Add to Build
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
