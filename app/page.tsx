"use client";
import React, { useState } from 'react';

type BuildItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  url: string;
  image: string;
};

export default function Home() {
  const [items, setItems] = useState<BuildItem[]>([
    {
      id: "1",
      name: "NVIDIA GeForce RTX 3080 Ti",
      category: "Graphics Card",
      price: 799.99,
      url: "#",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAB2wvOvdvMvcjyz-nqnyPGxHOqx4mpT7QOpt9gDC7F6JurfrUAzd-ZvZoTMMY-q_0n8Zk8cQ0OmEw2u63iiFXT1HeznAoLK-VkwzpxrEChgz9MUd0JgYS0I-5_40-F_mE-ozJm-75JRSd9issN_ecKfXCSjCXEcGAmlPfs3gtOh1xK44DGefCizaETD63houlAZ2ERnuSgeTKqRw9BuFDXOolrqcDaFr1yWbH0vOXXkyniNZkkiWYZpGhC78YYpKVNJAl9xlTZiXRI"
    },
    {
      id: "2",
      name: "AMD Ryzen 9 5900X",
      category: "Processor",
      price: 349.00,
      url: "#",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFeEFzn_SFyNa0cWTLje7H_b5J_BF8mOBD9WJPmD_VkL7PG14VDBB0S_PhiYNSVUPNElwVawCkzSGCocIP7o3ewQ6y4rKr-NJExIIe1FOkKl8H7TQRIumKgS57bWiMujlu-3JqZ5mfbLnYVlL-PdOHaLPNuM4xjubFV8bKJ3OWUu4NppO3XIUmQQEN9FxXgiQPUXTEiC3FPSwHN7OT6KROQVegqB2VU3OnPWduNLUqoagfEtntrJI0r5db2VNw5fbkTl3lo3RJ2FQi"
    },
  ]);

  const [urlInput, setUrlInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  const extractNameFromUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes('shopee.vn') || parsed.hostname.includes('shopee.com')) {
        const path = parsed.pathname;
        if (path.includes('-i.')) {
          const slug = path.split('-i.')[0].replace('/', '');
          return decodeURIComponent(slug).replace(/-/g, ' ');
        }
        return "Shopee Item";
      }
      return parsed.hostname.replace('www.', '') + " Item";
    } catch {
      return "Custom Component";
    }
  };

  const handleQuickAdd = () => {
    if (!urlInput || !priceInput) return;

    const priceNum = parseFloat(priceInput);
    if (isNaN(priceNum)) return;

    const itemName = extractNameFromUrl(urlInput);

    const newItem: BuildItem = {
      id: Date.now().toString(),
      name: itemName,
      category: "Component", // Default category or could be guessed
      price: priceNum,
      url: urlInput,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeLZ9-jRi6sHYXOhaabDLZzs_IyR4tJrds4XjL5dy14Esp4nYpdpaHqmE6L_yd4xHP1ePMQlgux7EnXy7c7-sPau2ow2JPAz69N6OgbViSsWnLfPzvMOzj2T5Fpz82TjRcPlCLeyhwgpbOkpLK7JaHVdFpkDFU1l3-4I3hgjPKPyk-fKb4IOu52xAOKk3I2diDG45jRVFt_gCzLe5yy3BhP57fdXBNMjQD0xjGnCBkTVtqacjhzzAaakU3w0IE5lykOL37ijhJiiMY", // Placeholder image
    };

    setItems([...items, newItem]);
    setUrlInput("");
    setPriceInput("");
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const formatPrice = (price: number) => {
    // We format as currency, if users use VND they can enter big numbers, let's just do standard localized string
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
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

        <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto w-full">
          {/* Dashboard Hero/Stats */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-2">My Custom Rig</h1>
              <p className="text-slate-500 text-lg flex items-center gap-2">
                Current Estimated Cost:
                <span className="text-primary font-bold transition-all">{formatPrice(totalPrice)}</span>
              </p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl flex-1 md:min-w-[180px]">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Total Items</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{items.length} Parts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Add Section */}
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
                  onClick={handleQuickAdd}
                  className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold py-2 rounded-lg hover:opacity-90 transition-opacity active:scale-95">
                  Add
                </button>
              </div>
            </div>
          </section>

          {/* Current Build Table */}
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
                            onClick={() => handleDelete(item.id)}
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
        </div>
      </main>
    </div>
  );
}
