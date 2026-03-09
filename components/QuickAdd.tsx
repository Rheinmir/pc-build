"use client";
import React, { useState } from 'react';

type QuickAddProps = {
    onAdd: (url: string, price: string) => void;
};

export default function QuickAdd({ onAdd }: QuickAddProps) {
    const [urlInput, setUrlInput] = useState("");
    const [priceInput, setPriceInput] = useState("");

    const handleAdd = () => {
        if (!urlInput || !priceInput) return;
        onAdd(urlInput, priceInput);
        setUrlInput("");
        setPriceInput("");
    };

    return (
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm" data-purpose="quick-add-container">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-black">Quick Add Component</h3>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                    <div className="md:col-span-7">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Product URL (Shopee Supported)</label>
                        <input
                            type="url"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            className="w-full bg-white border-gray-300 text-black rounded-xl focus:ring-black focus:border-black placeholder-gray-400 px-4 py-3 border transition-all"
                            placeholder="https://shopee.vn/example-product-link..."
                        />
                    </div>
                    <div className="md:col-span-3">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Price (Number)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <input
                                type="number"
                                value={priceInput}
                                onChange={(e) => setPriceInput(e.target.value)}
                                className="w-full bg-white border-gray-300 text-black rounded-xl focus:ring-black focus:border-black placeholder-gray-400 pl-8 pr-4 py-3 border transition-all"
                                placeholder="0"
                            />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <button
                            onClick={handleAdd}
                            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition-colors shadow-sm"
                            data-purpose="add-button"
                        >
                            Add to Build
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
