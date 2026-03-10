const CATEGORY_IMAGES: Record<string, string> = {
    "Graphics Card": "/categories/nvidia-gpu.svg",
    "Processor":     "/categories/intel-cpu.svg",
    "Motherboard":   "/categories/motherboard.svg",
    "RAM":           "/categories/ram.svg",
    "Storage":       "/categories/storage.svg",
    "Power Supply":  "/categories/psu.svg",
    "Case":          "/categories/case.svg",
    "Component":     "/categories/component.svg",
};

export function getImageForCategory(category: string, name?: string): string {
    const n = (name || '').toLowerCase();

    if (category === 'Processor') {
        if (n.includes('amd') || n.includes('ryzen') || n.includes('threadripper') || n.includes('athlon')) return "/categories/amd-cpu.svg";
        if (n.includes('intel') || n.includes('core i') || n.includes('xeon') || n.includes('pentium') || n.includes('celeron')) return "/categories/intel-cpu.svg";
    }

    if (category === 'Graphics Card') {
        if (n.includes('radeon') || n.includes(' rx ') || n.includes('rx7') || n.includes('rx6') || n.includes('rx5')) return "/categories/amd-gpu.svg";
        if (n.includes('nvidia') || n.includes('rtx') || n.includes('gtx') || n.includes('geforce')) return "/categories/nvidia-gpu.svg";
    }

    return CATEGORY_IMAGES[category] ?? "/categories/component.svg";
}
