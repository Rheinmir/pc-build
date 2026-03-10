"use client";
import React, { useState, useEffect, useRef } from 'react';
import { lookupMsrp } from '@/lib/lookupMsrp';
import { extractNameFromUrl } from '@/lib/extractName';
import { msrpLookup } from '@/data/tierData';
import { useT } from '@/lib/i18n';

type QuickAddProps = {
    onAdd: (url: string, price: string, manualName?: string, msrp?: string) => void;
};

const CATEGORIES = ["Processor", "Graphics Card", "Motherboard", "RAM", "Storage", "Power Supply", "Case", "Component"] as const;

// Pre-compute display names once
const SUGGESTIONS = msrpLookup.map(item => ({
    display: item.name.replace(/\b\w/g, c => c.toUpperCase()),
    raw: item.name,
    msrp: item.msrp,
}));

function guessCategory(name: string): string {
    const n = name.toLowerCase();
    if (n.includes('rtx') || n.includes('gtx') || n.includes('radeon') || n.includes('vga') || n.includes('card màn hình')) return "Graphics Card";
    if (n.includes('ryzen') || n.includes('intel core') || n.includes('cpu') || n.includes('vi xử lý')) return "Processor";
    if (n.includes('mainboard') || n.includes('bo mạch chủ') || n.includes('motherboard')) return "Motherboard";
    if (n.includes('ram') || n.includes('memory')) return "RAM";
    if (n.includes('ssd') || n.includes('hdd') || n.includes('ổ cứng')) return "Storage";
    if (n.includes('psu') || n.includes('nguồn') || n.includes('power supply')) return "Power Supply";
    if (n.includes('case') || n.includes('vỏ máy')) return "Case";
    return "Component";
}

export default function QuickAdd({ onAdd }: QuickAddProps) {
    const [mode, setMode] = useState<'url' | 'manual'>('url');
    const [urlInput, setUrlInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [categoryInput, setCategoryInput] = useState("Component");
    const [priceInput, setPriceInput] = useState("");
    const [autoMsrp, setAutoMsrp] = useState<number | undefined>();
    const [suggestions, setSuggestions] = useState<typeof SUGGESTIONS>([]);
    const [activeIdx, setActiveIdx] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const nameEditedRef = useRef(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { t } = useT();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Auto-fill name + category from URL
    useEffect(() => {
        if (mode !== 'url') return;
        const extracted = extractNameFromUrl(urlInput);
        const usable = extracted && extracted !== 'Custom Component' && extracted !== 'Shopee Item' && !extracted.endsWith(' Item');
        if (usable && !nameEditedRef.current) {
            setNameInput(extracted);
            setCategoryInput(guessCategory(extracted));
        }
        if (!urlInput) {
            nameEditedRef.current = false;
            setNameInput("");
            setCategoryInput("Component");
        }
    }, [urlInput, mode]);

    // Auto-lookup MSRP as user types name
    useEffect(() => {
        if (!nameInput) { setAutoMsrp(undefined); return; }
        const found = lookupMsrp(nameInput);
        setAutoMsrp(found);
    }, [nameInput]);

    // Filter suggestions from database
    useEffect(() => {
        if (!nameInput || nameInput.length < 2) {
            setSuggestions([]);
            setActiveIdx(-1);
            return;
        }
        const q = nameInput.toLowerCase();
        const words = q.split(/\s+/).filter(w => w.length > 1);
        const filtered = SUGGESTIONS.filter(s => {
            const raw = s.raw;
            return words.every(w => raw.includes(w)) || raw.includes(q);
        }).slice(0, 6);
        setSuggestions(filtered);
        setActiveIdx(-1);
    }, [nameInput]);

    const selectSuggestion = (s: typeof SUGGESTIONS[0]) => {
        setNameInput(s.display);
        setCategoryInput(guessCategory(s.display));
        setAutoMsrp(s.msrp);
        setShowSuggestions(false);
        nameEditedRef.current = true;
    };

    const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (showSuggestions && suggestions.length > 0) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIdx(i => Math.min(i + 1, suggestions.length - 1));
                return;
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIdx(i => Math.max(i - 1, -1));
                return;
            }
            if (e.key === 'Enter' && activeIdx >= 0) {
                e.preventDefault();
                selectSuggestion(suggestions[activeIdx]);
                return;
            }
            if (e.key === 'Escape') {
                setShowSuggestions(false);
                return;
            }
        }
        if (e.key === 'Enter') handleAdd();
    };

    const handleAdd = () => {
        if (!priceInput) return;
        if (mode === 'url') {
            if (!urlInput) return;
            const msrp = autoMsrp ? String(autoMsrp) : undefined;
            const label = nameInput ? `${categoryInput}::${nameInput}` : undefined;
            onAdd(urlInput, priceInput, label, msrp);
        } else {
            if (!nameInput) return;
            const msrp = autoMsrp ? String(autoMsrp) : undefined;
            onAdd('#', priceInput, `${categoryInput}::${nameInput}`, msrp);
        }
        setUrlInput("");
        setNameInput("");
        setPriceInput("");
        setAutoMsrp(undefined);
        setCategoryInput("Component");
        setSuggestions([]);
        nameEditedRef.current = false;
    };

    return (
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm" data-purpose="quick-add-container">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-2xl flex items-center justify-between">
                <h3 className="font-semibold text-black">{t.quickAddTitle}</h3>
                <div className="flex items-center bg-gray-200 p-0.5 rounded-lg">
                    <button onClick={() => setMode('url')}
                        className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${mode === 'url' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                        {t.modeUrl}
                    </button>
                    <button onClick={() => setMode('manual')}
                        className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${mode === 'manual' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                        {t.modeManual}
                    </button>
                </div>
            </div>
            <div className="p-6 space-y-4">
                {mode === 'url' && (
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t.labelProductUrl}</label>
                        <input type="url" value={urlInput} onChange={(e) => setUrlInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }}
                            className="w-full bg-white border-gray-300 text-black rounded-xl focus:ring-black focus:border-black placeholder-gray-400 px-4 py-3 border transition-all"
                            placeholder={t.placeholderUrl} />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                    {/* Name input with custom dropdown */}
                    <div className="md:col-span-4 relative" ref={wrapperRef}>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                            {t.labelProductName}
                            {mode === 'url' && nameInput && !nameEditedRef.current && (
                                <span className="text-[9px] text-blue-500 font-bold normal-case tracking-normal">{t.autoLabel}</span>
                            )}
                        </label>
                        <input
                            type="text"
                            value={nameInput}
                            onChange={(e) => {
                                nameEditedRef.current = true;
                                setNameInput(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => { if (nameInput.length >= 2) setShowSuggestions(true); }}
                            onKeyDown={handleNameKeyDown}
                            className="w-full bg-white border-gray-300 text-black rounded-xl focus:ring-black focus:border-black placeholder-gray-400 px-4 py-3 border transition-all"
                            placeholder={mode === 'url' ? t.placeholderNameUrl : t.placeholderNameManual}
                            autoComplete="off"
                        />
                        {/* Suggestion dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                                {suggestions.map((s, i) => (
                                    <li key={s.raw}
                                        onMouseDown={(e) => { e.preventDefault(); selectSuggestion(s); }}
                                        className={`flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm transition-colors ${i === activeIdx ? 'bg-black text-white' : 'text-gray-800 hover:bg-gray-50'}`}>
                                        <span>{s.display}</span>
                                        <span className={`text-xs font-medium ml-4 shrink-0 ${i === activeIdx ? 'text-gray-300' : 'text-gray-400'}`}>
                                            ${s.msrp.toLocaleString()}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t.labelCategory}</label>
                        <select value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)}
                            className="w-full bg-white border-gray-300 text-black rounded-xl focus:ring-black focus:border-black px-4 py-3 border transition-all appearance-none">
                            {CATEGORIES.map(c => (
                                <option key={c} value={c}>
                                    {t.categories[c]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t.labelYourPrice}</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <input type="number" value={priceInput} onChange={(e) => setPriceInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') handleAdd(); }}
                                className="w-full bg-white border-gray-300 text-black rounded-xl focus:ring-black focus:border-black placeholder-gray-400 pl-8 pr-4 py-3 border transition-all" placeholder="0" />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                            {t.labelReleasePrice}
                            {autoMsrp && <span className="text-[9px] text-green-600 font-bold normal-case tracking-normal">{t.autoLabel}</span>}
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                            <input type="text" readOnly value={autoMsrp ? autoMsrp.toFixed(2) : ''}
                                className="w-full bg-gray-50 border-gray-200 text-gray-500 rounded-xl pl-8 pr-4 py-3 border cursor-default"
                                placeholder="—" />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <button onClick={handleAdd} className="w-full bg-black hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition-colors shadow-sm" data-purpose="add-button">
                            {t.addToBuild}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
