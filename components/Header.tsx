import React, { useRef } from 'react';

type HeaderProps = {
    onSave?: () => void;
    onExport?: () => void;
    onImport?: (file: File) => void;
    showPriceFirst?: boolean;
    onToggleDisplay?: () => void;
};

export default function Header({ onSave, onExport, onImport, showPriceFirst, onToggleDisplay }: HeaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onImport) {
            onImport(file);
            // Reset input so the same file can be imported again if needed
            e.target.value = '';
        }
    };

    return (
        <header className="h-20 border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-40">
            <h2 className="text-xl font-semibold text-black">PC Build Calculator</h2>

            <div className="flex items-center space-x-6">
                {/* Mode Toggle */}
                <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={onToggleDisplay}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${!showPriceFirst ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Name
                    </button>
                    <button
                        onClick={onToggleDisplay}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${showPriceFirst ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Price
                    </button>
                </div>

                <div className="h-6 w-px bg-gray-200" />

                <div className="flex items-center space-x-3">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".xlsx, .xls"
                        className="hidden"
                    />
                    <button
                        onClick={handleImportClick}
                        className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg transition-all flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Import
                    </button>
                    <button
                        onClick={onExport}
                        className="px-4 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg transition-all flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export
                    </button>
                    <button
                        onClick={onSave}
                        className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-gray-200"
                        data-purpose="save-action"
                    >
                        Save Build
                    </button>
                </div>
            </div>
        </header>
    );
}
