"use client";
import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import QuickAdd from '@/components/QuickAdd';
import BuildTable, { BuildItem } from '@/components/BuildTable';
import { exportToExcel, importFromExcel } from '@/lib/excelUtils';
import { lookupMsrp } from '@/lib/lookupMsrp';
import { extractNameFromUrl } from '@/lib/extractName';
import { getImageForCategory } from '@/lib/categoryImages';
import { useT } from '@/lib/i18n';

export default function Home() {
  const [items, setItems] = useState<BuildItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useT();

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

  const handleAdd = (url: string, price: string, manualName?: string, msrp?: string) => {
    const priceNum = parseFloat(price);
    if (isNaN(priceNum)) return;

    let itemName: string;
    let category: string;

    if (manualName) {
      const [cat, ...nameParts] = manualName.split('::');
      itemName = nameParts.join('::');
      category = cat;
    } else {
      itemName = extractNameFromUrl(url);
      category = guessCategory(itemName);
    }

    const manualMsrp = msrp ? parseFloat(msrp) : undefined;
    const autoMsrp = lookupMsrp(itemName);
    const resolvedMsrp = (manualMsrp && !isNaN(manualMsrp)) ? manualMsrp : autoMsrp;

    const newItem: BuildItem = {
      id: Date.now().toString(),
      name: itemName,
      category,
      price: priceNum,
      msrp: resolvedMsrp,
      url: url,
      image: getImageForCategory(category, itemName),
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
    alert(t.buildSaved);
  };

  const handleExport = () => {
    if (items.length === 0) {
      alert(t.noPartsToExport);
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
        image: item.image || getImageForCategory(item.category || 'Component', item.name)
      }));

      if (confirm(t.importConfirm(newItems.length))) {
        setItems(newItems);
      } else {
        setItems([...items, ...newItems]);
      }
    } catch (error) {
      console.error("Import failed", error);
      alert(t.importFailed);
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
        <Header
          onSave={handleSave}
          onExport={handleExport}
          onImport={handleImport}
        />

        {/* Content Area */}
        <div className="p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Hero Stats Section */}
          <section className="space-y-1" data-purpose="hero-stats">
            <h1 className="text-4xl font-bold tracking-tight text-black">{t.buildTitle}</h1>
            <p className="font-medium text-gray-500">
              {items.length} {items.length === 1 ? t.partSingular : t.partPlural} &middot; {t.total}: <span className="text-black font-bold">{formatPrice(totalPrice)}</span>
            </p>
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
