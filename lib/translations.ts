export type Lang = 'en' | 'vi';

export const translations = {
  en: {
    // Header
    title: "PC Build Calculator",
    name: "NAME",
    price: "PRICE",
    import: "Import",
    export: "Export",
    saveBuild: "Save Build",

    // Sidebar
    appName: "PC Builder Pro",
    expertMode: "Expert Mode",
    navBuild: "Build",
    navSaved: "Saved",
    savedLibrary: "Your Saved Library",
    noSavedBuilds: "No saved builds yet.",
    builderName: "Builder",
    proAccount: "Pro Account",

    // Page
    buildTitle: "My Custom Rig",
    partSingular: "part",
    partPlural: "parts",
    total: "Total",
    buildSaved: "Build saved successfully to your library!",
    noPartsToExport: "Add some parts before exporting!",
    importConfirm: (n: number) => `Do you want to replace your current build with ${n} items from the Excel file? (Cancel to add them to your current build)`,
    importFailed: "Failed to import Excel file. Please make sure it follows the correct format.",

    // QuickAdd
    quickAddTitle: "Quick Add Component",
    modeUrl: "URL",
    modeManual: "Manual",
    labelProductUrl: "Product URL (Shopee Supported)",
    placeholderUrl: "https://shopee.vn/example-product-link...",
    labelProductName: "Product Name",
    placeholderNameUrl: "Auto-filled from URL...",
    placeholderNameManual: "e.g. RTX 4070 Ti Super...",
    labelCategory: "Category",
    labelYourPrice: "Your Price ($)",
    labelReleasePrice: "Release Price",
    addToBuild: "Add to Build",
    autoLabel: "Auto",

    // BuildTable
    currentBuildDetails: "Current Build Details",
    colPrice: "Price",
    colCategory: "Category",
    colName: "Component Name",
    colRelease: "Release Price",
    colActions: "Actions",
    emptyTitle: "Your build is empty",
    emptySubtitle: "Start adding components above to build your dream PC.",
    viewTier: "View Tier",
    currentTotal: "Current Total:",
    pctOff: (n: number) => `-${n}% off`,
    pctOver: (n: number) => `+${n}% over`,
    removeComponent: "Remove component",

    // TierList
    tierListTitle: (cat: string) => `${cat} Tier List`,
    comparing: "Comparing:",
    noDataTitle: "No Data Available",
    noDataDesc: (cat: string) => `We don't have tier data for the "${cat}" category yet.`,
    close: "Close",
    selected: "Selected",
    dropHere: "Drop here",

    // Categories
    categories: {
      "Processor": "Processor",
      "Graphics Card": "Graphics Card",
      "Motherboard": "Motherboard",
      "RAM": "RAM",
      "Storage": "Storage",
      "Power Supply": "Power Supply",
      "Case": "Case",
      "Component": "Component",
    },
  },

  vi: {
    // Header
    title: "Tính Giá Build PC",
    name: "TÊN",
    price: "GIÁ",
    import: "Nhập",
    export: "Xuất",
    saveBuild: "Lưu Build",

    // Sidebar
    appName: "PC Builder Pro",
    expertMode: "Chế Độ Chuyên Gia",
    navBuild: "Build",
    navSaved: "Đã Lưu",
    savedLibrary: "Thư Viện Đã Lưu",
    noSavedBuilds: "Chưa có build nào được lưu.",
    builderName: "Builder",
    proAccount: "Tài Khoản Pro",

    // Page
    buildTitle: "Build Của Tôi",
    partSingular: "linh kiện",
    partPlural: "linh kiện",
    total: "Tổng",
    buildSaved: "Đã lưu build vào thư viện!",
    noPartsToExport: "Hãy thêm linh kiện trước khi xuất!",
    importConfirm: (n: number) => `Bạn có muốn thay thế build hiện tại bằng ${n} linh kiện từ file Excel không? (Huỷ để thêm vào build hiện tại)`,
    importFailed: "Không thể nhập file Excel. Vui lòng kiểm tra định dạng file.",

    // QuickAdd
    quickAddTitle: "Thêm Linh Kiện Nhanh",
    modeUrl: "URL",
    modeManual: "Thủ Công",
    labelProductUrl: "Link Sản Phẩm (Hỗ trợ Shopee)",
    placeholderUrl: "https://shopee.vn/ten-san-pham...",
    labelProductName: "Tên Sản Phẩm",
    placeholderNameUrl: "Tự động điền từ URL...",
    placeholderNameManual: "VD: RTX 4070 Ti Super...",
    labelCategory: "Danh Mục",
    labelYourPrice: "Giá Của Bạn (₫)",
    labelReleasePrice: "Giá Gốc",
    addToBuild: "Thêm Vào Build",
    autoLabel: "Tự động",

    // BuildTable
    currentBuildDetails: "Chi Tiết Build Hiện Tại",
    colPrice: "Giá",
    colCategory: "Danh Mục",
    colName: "Tên Linh Kiện",
    colRelease: "Giá Gốc",
    colActions: "Thao Tác",
    emptyTitle: "Build của bạn chưa có gì",
    emptySubtitle: "Hãy thêm linh kiện ở trên để bắt đầu build PC mơ ước.",
    viewTier: "Xem Tier",
    currentTotal: "Tổng Hiện Tại:",
    pctOff: (n: number) => `-${n}% rẻ hơn`,
    pctOver: (n: number) => `+${n}% đắt hơn`,
    removeComponent: "Xoá linh kiện",

    // TierList
    tierListTitle: (cat: string) => `Tier List ${cat}`,
    comparing: "Đang so sánh:",
    noDataTitle: "Chưa Có Dữ Liệu",
    noDataDesc: (cat: string) => `Chúng tôi chưa có dữ liệu tier cho danh mục "${cat}".`,
    close: "Đóng",
    selected: "Đang Chọn",
    dropHere: "Thả vào đây",

    // Categories
    categories: {
      "Processor": "Bộ Xử Lý",
      "Graphics Card": "Card Màn Hình",
      "Motherboard": "Bo Mạch Chủ",
      "RAM": "RAM",
      "Storage": "Ổ Cứng",
      "Power Supply": "Nguồn",
      "Case": "Vỏ Case",
      "Component": "Linh Kiện Khác",
    },
  },
} as const;

export type Translations = typeof translations['en'];
