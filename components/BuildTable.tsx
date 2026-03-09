import React from 'react';

export type BuildItem = {
    id: string;
    name: string;
    category: string;
    price: number;
    url: string;
    image: string;
};

type BuildTableProps = {
    items: BuildItem[];
    onDelete: (id: string) => void;
    formatPrice: (price: number) => string;
};

export default function BuildTable({ items, onDelete, formatPrice }: BuildTableProps) {
    return (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold">Current Build Details</h3>
            </div>
            <div className="overflow-x-auto">
                {items.length === 0 ? (
                    <div className="p-8 text-center text-slate-400">
                        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">shopping_cart</span>
                        <p>Your build is empty. Add some components!</p>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                                <th className="px-6 py-3">Component Name</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {items.map((item) => (
                                <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                                                <img src={item.image} alt={item.category} className="object-cover size-full" />
                                            </div>
                                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:text-primary transition-colors line-clamp-2" title={item.name}>
                                                {item.name}
                                            </a>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-medium px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold">{formatPrice(item.price)}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => onDelete(item.id)}
                                            className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 active:scale-95"
                                            title="Delete Item"
                                        >
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex justify-between">
                <span className="text-slate-500 text-sm font-medium">Showing {items.length} component(s)</span>
            </div>
        </section>
    );
}
