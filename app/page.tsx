"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import QuickAdd from '@/components/QuickAdd';
import BuildTable, { BuildItem } from '@/components/BuildTable';
import { exportToExcel, importFromExcel } from '@/lib/excelUtils';

export default function Home() {
  const [items, setItems] = useState<BuildItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pc-builder-current-items');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved items", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Auto-save to "current" storage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('pc-builder-current-items', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const extractNameFromUrl = (url: string) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname.includes('shopee.vn') || parsed.hostname.includes('shopee.com')) {
        const path = parsed.pathname;
        if (path.includes('-i.')) {
          const parts = path.split('-i.');
          const slugPart = parts[0].split('/').pop() || "";
          return decodeURIComponent(slugPart).replace(/-/g, ' ');
        }
        return "Shopee Item";
      }
      return parsed.hostname.replace('www.', '') + " Item";
    } catch {
      return "Custom Component";
    }
  };

  const guessCategory = (name: string): string => {
    const n = name.toLowerCase();
    if (n.includes('rtx') || n.includes('gtx') || n.includes('radeon') || n.includes('vga') || n.includes('card màn hình')) return "Graphics Card";
    if (n.includes('ryzen') || n.includes('intel core') || n.includes('cpu') || n.includes('vi xử lý')) return "Processor";
    if (n.includes('mainboard') || n.includes('bo mạch chủ') || n.includes('motherboard')) return "Motherboard";
    if (n.includes('ram') || n.includes('memory')) return "RAM";
    if (n.includes('ssd') || n.includes('hdd') || n.includes('ổ cứng')) return "Storage";
    if (n.includes('psu') || n.includes('nguồn') || n.includes('power supply')) return "Power Supply";
    if (n.includes('case') || n.includes('vỏ máy')) return "Case";
    return "Component";
  };

  const handleAdd = (url: string, price: string) => {
    const priceNum = parseFloat(price);
    if (isNaN(priceNum)) return;

    const itemName = extractNameFromUrl(url);

    const newItem: BuildItem = {
      id: Date.now().toString(),
      name: itemName,
      category: guessCategory(itemName),
      price: priceNum,
      url: url,
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=200&auto=format&fit=crop", // Default tech image
    };

    setItems([...items, newItem]);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSave = () => {
    // Save to a "saved builds" list in addition to "current"
    const savedBuilds = JSON.parse(localStorage.getItem('pc-builder-saved-builds') || '[]');
    const newBuild = {
      id: Date.now().toString(),
      name: `Build ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      items: items,
      total: items.reduce((acc, item) => acc + item.price, 0)
    };
    localStorage.setItem('pc-builder-saved-builds', JSON.stringify([...savedBuilds, newBuild]));
    alert("Build saved successfully to your library!");
  };

  const handleExport = () => {
    if (items.length === 0) {
      alert("Add some parts before exporting!");
      return;
    }
    exportToExcel(items);
  };

  const handleImport = async (file: File) => {
    try {
      const importedData = await importFromExcel(file);
      const newItems: BuildItem[] = importedData.map((item, idx) => ({
        id: (Date.now() + idx).toString(),
        name: item.name || 'Unknown Item',
        category: item.category || 'Component',
        price: item.price || 0,
        url: item.url || '#',
        image: item.image || "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=200&auto=format&fit=crop"
      }));

      if (confirm(`Do you want to replace your current build with ${newItems.length} items from the Excel file? (Cancel to add them to your current build)`)) {
        setItems(newItems);
      } else {
        setItems([...items, ...newItems]);
      }
    } catch (error) {
      console.error("Import failed", error);
      alert("Failed to import Excel file. Please make sure it follows the correct format.");
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 flex flex-col min-w-0" data-purpose="main-dashboard-content">
        <Header onSave={handleSave} onExport={handleExport} onImport={handleImport} />

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
