type HeaderProps = {
    onSave?: () => void;
};

export default function Header({ onSave }: HeaderProps) {
    return (
        <header className="h-20 border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-40">
            <h2 className="text-xl font-semibold text-black">PC Build Calculator</h2>
            <div className="flex items-center space-x-4">
                <button
                    onClick={onSave}
                    className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-gray-200"
                    data-purpose="save-action"
                >
                    Save Build
                </button>
            </div>
        </header>
    );
}
