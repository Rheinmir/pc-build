const BASE = "https://images.unsplash.com";
const PARAMS = "?q=80&w=200&auto=format&fit=crop";

// One curated Unsplash photo per hardware category
const CATEGORY_IMAGES: Record<string, string> = {
    "Graphics Card":  `${BASE}/photo-1591488320449-011701bb6704${PARAMS}`,
    "Processor":      `${BASE}/photo-1555617980-de63ef5c2e37${PARAMS}`,
    "Motherboard":    `${BASE}/photo-1518770660439-4636190af475${PARAMS}`,
    "RAM":            `${BASE}/photo-1562976540-1502c2145851${PARAMS}`,
    "Storage":        `${BASE}/photo-1597872200969-2b65d56bd16b${PARAMS}`,
    "Power Supply":   `${BASE}/photo-1587202372775-e229f172b9d7${PARAMS}`,
    "Case":           `${BASE}/photo-1587202372634-32705e3bf49c${PARAMS}`,
};

const FALLBACK = `${BASE}/photo-1591488320449-011701bb6704${PARAMS}`;

export function getImageForCategory(category: string): string {
    return CATEGORY_IMAGES[category] ?? FALLBACK;
}
