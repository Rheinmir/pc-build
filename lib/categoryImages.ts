export function getImageForCategory(category: string, name?: string): string {
    const n = (name || '').toLowerCase();

    switch (category) {
        case 'Graphics Card':
            if (n.includes('intel') || n.includes('arc')) return '/img/intel-graphic-card.png';
            if (n.includes('amd') || n.includes('radeon') || n.includes(' rx ') || /rx\d/.test(n)) return '/img/amd-graphic-card.png';
            return '/img/nvidia-graphic-card.png'; // default: NVIDIA

        case 'Processor':
            if (n.includes('amd') || n.includes('ryzen') || n.includes('threadripper') || n.includes('athlon')) return '/img/amd-cpu.png';
            return '/img/intel-cpu.png'; // default: Intel

        case 'Motherboard':
            return '/img/motherboard.png';

        case 'RAM':
            return '/img/ram.png';

        case 'Storage':
            if (n.includes('hdd') || n.includes('hard disk') || n.includes('hard drive') || n.includes('ổ cứng cơ')) return '/img/hdd.png';
            return '/img/ssd.png'; // default: SSD (nvme, ssd, m.2)

        case 'Power Supply':
            return '/img/psu.png';

        case 'Case':
            return '/img/case.png';

        default:
            // Cooler detection for uncategorized components
            if (n.includes('liquid') || n.includes('aio') || n.includes('tản nhiệt nước')) return '/img/liquid-cooler.png';
            if (n.includes('cooler') || n.includes('fan') || n.includes('tản nhiệt')) return '/img/air-cooler.png';
            return '/img/motherboard.png';
    }
}
