import React, { useState } from 'react';
import TierListModal from './TierListModal';

export type BuildItem = {
    id: string;
    name: string;
    category: string;
    price: number;
    msrp?: number;
    url: string;
    image: string;
};

type BuildTableProps = {
    items: BuildItem[];
    onDelete: (id: string) => void;
    formatPrice: (price: number) => string;
    showPriceFirst?: boolean;
};

export default function BuildTable({ items, onDelete, formatPrice, showPriceFirst = false }: BuildTableProps) {
    const [selectedItem, setSelectedItem] = useState<{ name: string, category: string } | null>(null);
    const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

    return (
        <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm" data-purpose="build-details-table">
            <TierListModal
                isOpen={!!selectedItem}
                onClose={() => setSelectedItem(null)}
                category={selectedItem?.category || ""}
                currentItemName={selectedItem?.name || ""}
            />
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-black">Current Build Details</h3>
            </div>
            <div className="overflow-x-auto">
                {items.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                        <p className="font-medium text-lg">Your build is empty</p>
                        <p className="text-sm">Start adding components above to build your dream PC.</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200">
                                <th className="px-6 py-4">{showPriceFirst ? 'Price' : 'Component Name'}</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">{showPriceFirst ? 'Component Name' : 'Price'}</th>
                                <th className="px-6 py-4">Release Price</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {items.map((item) => (
                                <tr key={item.id} className="transition-colors group hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                alt={item.name}
                                                className="w-10 h-10 rounded border border-gray-200 object-cover"
                                                src={item.image}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src =
                                                        "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=200&auto=format&fit=crop";
                                                }}
                                            />
                                            <div className="flex flex-col min-w-0 flex-1">
                                                {showPriceFirst ? (
                                                    <span className="font-bold text-black text-sm">{formatPrice(item.price)}</span>
                                                ) : (
                                                    <a
                                                        href={item.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="font-medium text-gray-900 hover:text-black hover:underline transition-all truncate block"
                                                        title={item.name}
                                                    >
                                                        {item.name}
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => setSelectedItem({ name: item.name, category: item.category })}
                                                    className="text-[10px] font-bold text-gray-400 hover:text-black transition-colors flex items-center gap-1 uppercase tracking-wider mt-1"
                                                >
                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                                    </svg>
                                                    View Tier
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold rounded uppercase tracking-wide">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-black text-sm">
                                        {showPriceFirst ? (
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-medium text-gray-500 hover:text-black hover:underline transition-all line-clamp-1 text-xs max-w-[180px] block"
                                                title={item.name}
                                            >
                                                {item.name}
                                            </a>
                                        ) : formatPrice(item.price)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.msrp != null ? (
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-700 text-sm">{formatPrice(item.msrp)}</span>
                                                {item.price < item.msrp && (
                                                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide">
                                                        -{Math.round((1 - item.price / item.msrp) * 100)}% off
                                                    </span>
                                                )}
                                                {item.price > item.msrp && (
                                                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-wide">
                                                        +{Math.round((item.price / item.msrp - 1) * 100)}% over
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-gray-300">—</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => onDelete(item.id)}
                                            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all"
                                            title="Remove component"
                                        >
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                <p className="text-sm font-medium">
                    Current Total: <span className="font-bold ml-2 text-black">{formatPrice(totalPrice)}</span>
                </p>
            </div>
        </section>
    );
}
