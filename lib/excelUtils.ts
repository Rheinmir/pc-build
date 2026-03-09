import * as XLSX from 'xlsx';
import { BuildItem } from '@/components/BuildTable';

export const exportToExcel = (items: BuildItem[], fileName: string = 'My_PC_Build.xlsx') => {
    // Transform items for better Excel readability
    const data = items.map(item => ({
        'Part Name': item.name,
        'Category': item.category,
        'Price': item.price,
        'Link': item.url
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Set column widths
    const wscols = [
        { wch: 50 }, // Part Name
        { wch: 20 }, // Category
        { wch: 15 }, // Price
        { wch: 50 }, // Link
    ];
    worksheet['!cols'] = wscols;

    // Create workbook and append worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Build');

    // Export file
    XLSX.writeFile(workbook, fileName);
};

export const importFromExcel = (file: File): Promise<Partial<BuildItem>[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = e.target?.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet) as any[];

                // Map Excel columns back to BuildItem structure
                const importedItems = json.map(row => ({
                    name: row['Part Name'] || row['name'] || 'Unknown Item',
                    category: row['Category'] || row['category'] || 'Component',
                    price: parseFloat(row['Price'] || row['price'] || '0'),
                    url: row['Link'] || row['url'] || '#',
                    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=200&auto=format&fit=crop" // Default image for imported items
                }));

                resolve(importedItems);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);
        reader.readAsBinaryString(file);
    });
};
