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
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 flex flex-col min-w-0" data-purpose="main-dashboard-content">
        <Header />

        {/* Content Area */}
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Hero Stats Section */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6" data-purpose="hero-stats">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold tracking-tight text-black">My Custom Rig</h1>
              <p className="font-medium text-gray-600">
                Current Estimated Cost: <span className="text-lg text-black font-bold">{formatPrice(totalPrice)}</span>
              </p>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-2xl w-full md:w-64 shadow-sm" data-purpose="summary-card">
              <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-1">Total Items</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-black">{items.length}</span>
                <span className="text-gray-400 font-medium">Parts</span>
              </div>
            </div>
          </section>

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
