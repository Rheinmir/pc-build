"use client";
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import QuickAdd from '@/components/QuickAdd';
import BuildTable, { BuildItem } from '@/components/BuildTable';

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

  const handleAdd = (url: string, price: string) => {
    const priceNum = parseFloat(price);
    if (isNaN(priceNum)) return;

    const itemName = extractNameFromUrl(url);

    const newItem: BuildItem = {
      id: Date.now().toString(),
      name: itemName,
      category: "Component", // Default category or could be guessed
      price: priceNum,
      url: url,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeLZ9-jRi6sHYXOhaabDLZzs_IyR4tJrds4XjL5dy14Esp4nYpdpaHqmE6L_yd4xHP1ePMQlgux7EnXy7c7-sPau2ow2JPAz69N6OgbViSsWnLfPzvMOzj2T5Fpz82TjRcPlCLeyhwgpbOkpLK7JaHVdFpkDFU1l3-4I3hgjPKPyk-fKb4IOu52xAOKk3I2diDG45jRVFt_gCzLe5yy3BhP57fdXBNMjQD0xjGnCBkTVtqacjhzzAaakU3w0IE5lykOL37ijhJiiMY", // Placeholder image
    };

    setItems([...items, newItem]);
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
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Header />

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

          <QuickAdd onAdd={handleAdd} />

          <BuildTable
            items={items}
            onDelete={handleDelete}
            formatPrice={formatPrice}
          />
        </div>
      </main>
    </div>
  );
}
