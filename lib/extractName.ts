export function extractNameFromUrl(url: string): string {
    try {
        const parsed = new URL(url);
        if (parsed.hostname.includes('shopee.vn') || parsed.hostname.includes('shopee.com')) {
            const path = parsed.pathname;
            if (path.includes('-i.')) {
                const parts = path.split('-i.');
                const slugPart = parts[0].split('/').pop() || "";
                return decodeURIComponent(slugPart).replace(/-/g, ' ');
            }
            return "Shopee Item";
        }
        return parsed.hostname.replace('www.', '') + " Item";
    } catch {
        return "Custom Component";
    }
}
