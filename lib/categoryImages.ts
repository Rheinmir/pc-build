const CATEGORY_IMAGES: Record<string, string> = {
    "Graphics Card": "/categories/gpu.svg",
    "Processor":     "/categories/cpu.svg",
    "Motherboard":   "/categories/motherboard.svg",
    "RAM":           "/categories/ram.svg",
    "Storage":       "/categories/storage.svg",
    "Power Supply":  "/categories/psu.svg",
    "Case":          "/categories/case.svg",
    "Component":     "/categories/component.svg",
};

export function getImageForCategory(category: string): string {
    return CATEGORY_IMAGES[category] ?? "/categories/component.svg";
}
