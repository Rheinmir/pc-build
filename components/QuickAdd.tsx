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
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-4">Quick Add Component</h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-7">
                    <label className="block text-xs font-bold text-slate-500 mb-1">Product URL (Shopee Supported)</label>
                    <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="https://shopee.vn/example..."
                    />
                </div>
                <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-slate-500 mb-1">Price (Number)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-serif">$</span>
                        <input
                            type="number"
                            value={priceInput}
                            onChange={(e) => setPriceInput(e.target.value)}
                            className="w-full pl-7 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            placeholder="0"
                        />
                    </div>
                </div>
                <div className="md:col-span-2 flex items-end">
                    <button
                        onClick={handleAdd}
                        className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold py-2 rounded-lg hover:opacity-90 transition-opacity active:scale-95">
                        Add
                    </button>
                </div>
            </div>
        </section>
    );
}
