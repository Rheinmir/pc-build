const BASE = "https://images.unsplash.com";
const P = "?q=80&w=200&auto=format&fit=crop";

// Verified Unsplash photo IDs per hardware category
const CATEGORY_IMAGES: Record<string, string> = {
    "Graphics Card": `${BASE}/photo-1591488320449-011701bb6704${P}`, // RTX GPU
    "Processor":     `${BASE}/photo-1547082299-de196ea013d6${P}`, // CPU chip
    "Motherboard":   `${BASE}/photo-1518770660439-4636190af475${P}`, // PCB/motherboard
    "RAM":           `${BASE}/photo-1587145820266-a5951ee6f620${P}`, // RAM sticks
    "Storage":       `${BASE}/photo-1531492746076-161ca9bcad58${P}`, // SSD
    "Power Supply":  `${BASE}/photo-1588508065123-287b28e013da${P}`, // PSU
    "Case":          `${BASE}/photo-1587202372775-e229f172b9d7${P}`, // PC case
};

const FALLBACK = `${BASE}/photo-1591488320449-011701bb6704${P}`;

export function getImageForCategory(category: string): string {
    return CATEGORY_IMAGES[category] ?? FALLBACK;
}
