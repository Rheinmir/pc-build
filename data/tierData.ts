export type TierItem = {
    name: string;
    description: string;
    msrp?: number;
};

export type TierCategory = {
    category: string;
    tiers: {
        S: TierItem[];
        A: TierItem[];
        B: TierItem[];
        C: TierItem[];
        D: TierItem[];
    };
};

export const tierData: TierCategory[] = [
    {
        category: "Graphics Card",
        tiers: {
            S: [
                { name: "NVIDIA RTX 5090", description: "Generational leap — absolute performance king.", msrp: 1999 },
                { name: "NVIDIA RTX 5080", description: "RTX 50 flagship, dominates 4K.", msrp: 999 },
                { name: "NVIDIA RTX 4090", description: "Previous gen king, still destroys 4K.", msrp: 1599 },
                { name: "NVIDIA RTX 4080 Super", description: "Top-tier 4K with great efficiency.", msrp: 999 },
                { name: "NVIDIA RTX 4080", description: "High-end 4K powerhouse.", msrp: 1199 },
            ],
            A: [
                { name: "NVIDIA RTX 5070 Ti", description: "RTX 50 high-end, ~4080 Super performance.", msrp: 749 },
                { name: "NVIDIA RTX 5070", description: "Excellent RTX 50 value for 1440p/4K.", msrp: 549 },
                { name: "NVIDIA RTX 4070 Ti Super", description: "Great 1440p high refresh.", msrp: 799 },
                { name: "NVIDIA RTX 4070 Ti", description: "Excellent 4K gaming.", msrp: 799 },
                { name: "AMD Radeon RX 7900 XTX", description: "AMD's top contender.", msrp: 999 },
                { name: "AMD Radeon RX 7900 XT", description: "Strong AMD alternative.", msrp: 899 },
                { name: "NVIDIA RTX 3080 Ti", description: "Last gen flagship, still a beast.", msrp: 1199 },
            ],
            B: [
                { name: "NVIDIA RTX 4070 Super", description: "Best value 1440p card.", msrp: 599 },
                { name: "NVIDIA RTX 4070", description: "The sweet spot for most gamers.", msrp: 599 },
                { name: "AMD Radeon RX 7800 XT", description: "Excellent value for money.", msrp: 499 },
                { name: "NVIDIA RTX 3080", description: "Last-gen 4K performer.", msrp: 699 },
                { name: "AMD Radeon RX 7700 XT", description: "Solid 1080p/1440p option.", msrp: 449 },
            ],
            C: [
                { name: "NVIDIA RTX 5060 Ti", description: "RTX 50 midrange, strong 1080p/entry 1440p.", msrp: 379 },
                { name: "NVIDIA RTX 4060 Ti", description: "Capable mid-range.", msrp: 399 },
                { name: "NVIDIA RTX 5060", description: "1080p on RTX 50 architecture.", msrp: 299 },
                { name: "NVIDIA RTX 4060", description: "1080p gaming solid choice.", msrp: 299 },
                { name: "AMD Radeon RX 7600 XT", description: "Solid entry-level performance.", msrp: 329 },
                { name: "Intel Arc B580", description: "Intel's best GPU, strong 1080p/entry 1440p.", msrp: 249 },
                { name: "AMD Radeon RX 7600", description: "Budget 1080p option.", msrp: 269 },
                { name: "NVIDIA RTX 3060 Ti", description: "Great 1080p/1440p value.", msrp: 399 },
                { name: "NVIDIA RTX 3060", description: "Mainstream gaming card.", msrp: 329 },
                { name: "Intel Arc B570", description: "Budget Intel Arc, decent 1080p.", msrp: 219 },
            ],
            D: [
                { name: "Intel Arc A770", description: "Older Intel flagship, decent but dated.", msrp: 349 },
                { name: "NVIDIA RTX 3050", description: "Basic gaming performance.", msrp: 249 },
                { name: "Intel Arc A750", description: "Older mid-range Intel Arc.", msrp: 289 },
                { name: "AMD Radeon RX 6600", description: "Entry 1080p.", msrp: 329 },
                { name: "Intel Arc A580", description: "Budget Intel Arc entry.", msrp: 179 },
                { name: "AMD Radeon RX 6500 XT", description: "Budget, limited bandwidth.", msrp: 199 },
                { name: "Intel Arc A380", description: "Ultra budget Intel entry-level.", msrp: 139 },
                { name: "NVIDIA GTX 1660 Super", description: "Older budget option.", msrp: 229 },
            ]
        }
    },
    {
        category: "Processor",
        tiers: {
            S: [
                { name: "AMD Ryzen 9 7950X3D", description: "King of gaming and productivity.", msrp: 699 },
                { name: "AMD Ryzen 9 7950X", description: "Top-tier workstation CPU.", msrp: 699 },
                { name: "Intel Core i9-14900K", description: "High-end multi-core performance.", msrp: 589 },
                { name: "Intel Core i9-13900K", description: "Previous-gen high-end.", msrp: 589 },
            ],
            A: [
                { name: "AMD Ryzen 7 7800X3D", description: "Best gaming CPU on the market.", msrp: 449 },
                { name: "AMD Ryzen 9 7900X3D", description: "Gaming + productivity balance.", msrp: 449 },
                { name: "AMD Ryzen 9 5900X", description: "Still a powerhouse for AM4.", msrp: 549 },
                { name: "Intel Core i7-14700K", description: "Strong balanced performer.", msrp: 409 },
                { name: "Intel Core i7-13700K", description: "Previous gen high-end.", msrp: 409 },
                { name: "AMD Ryzen 7 7700X", description: "Great AM5 mid-high.", msrp: 399 },
            ],
            B: [
                { name: "AMD Ryzen 5 7600X", description: "Perfect choice for mid-range builds.", msrp: 299 },
                { name: "AMD Ryzen 5 7600", description: "Efficient AM5 midrange.", msrp: 229 },
                { name: "Intel Core i5-13600K", description: "Great value for gamers.", msrp: 319 },
                { name: "Intel Core i5-14600K", description: "Strong gaming midrange.", msrp: 319 },
                { name: "AMD Ryzen 5 5600X", description: "AM4 midrange classic.", msrp: 299 },
                { name: "AMD Ryzen 5 5600GT", description: "AM4 with integrated graphics.", msrp: 149 },
            ],
            C: [
                { name: "AMD Ryzen 5 5600", description: "Budget AM4 classic.", msrp: 129 },
                { name: "Intel Core i3-13100", description: "Basic entry-level quad core.", msrp: 134 },
                { name: "Intel Core i5-12400", description: "Budget Alder Lake option.", msrp: 192 },
                { name: "AMD Ryzen 5 4600G", description: "AM4 with iGPU.", msrp: 159 },
            ],
            D: [
                { name: "Intel Pentium Gold", description: "Very basic tasks only.", msrp: 64 },
                { name: "AMD Athlon 3000G", description: "Ultra budget.", msrp: 49 },
                { name: "Intel Core i3-12100", description: "Basic budget quad.", msrp: 122 },
            ]
        }
    },
    {
        category: "Motherboard",
        tiers: {
            S: [
                { name: "ASUS ROG Maximus Z790", description: "Flagship Z790 for overclocking.", msrp: 699 },
                { name: "MSI MEG Z790 ACE", description: "Top-tier Z790 board.", msrp: 599 },
            ],
            A: [
                { name: "ASUS ROG Strix Z790-E", description: "Premium gaming Z790.", msrp: 449 },
                { name: "MSI MAG Z790 Tomahawk", description: "Great value Z790.", msrp: 279 },
                { name: "Gigabyte Z790 AORUS Elite", description: "Feature-rich Z790.", msrp: 299 },
            ],
            B: [
                { name: "ASUS TUF Gaming Z790", description: "Reliable mid-range Z790.", msrp: 229 },
                { name: "MSI Pro Z790-A", description: "Budget Z790.", msrp: 199 },
                { name: "ASUS ROG Strix B650-A", description: "AM5 gaming board.", msrp: 249 },
            ],
            C: [
                { name: "MSI MAG B650 Tomahawk", description: "Value AM5 option.", msrp: 199 },
                { name: "Gigabyte B650M DS3H", description: "Entry AM5.", msrp: 139 },
                { name: "ASUS Prime B550M-A", description: "Budget AM4.", msrp: 119 },
            ],
            D: [
                { name: "MSI B450M-A Pro", description: "Budget AM4 entry.", msrp: 79 },
                { name: "Gigabyte B450M DS3H", description: "Very budget AM4.", msrp: 69 },
            ]
        }
    },
    {
        category: "RAM",
        tiers: {
            S: [
                { name: "G.Skill Trident Z5 RGB DDR5-6400 32GB", description: "Top DDR5 kit.", msrp: 189 },
                { name: "Corsair Dominator Platinum DDR5-6000 32GB", description: "Premium DDR5.", msrp: 179 },
            ],
            A: [
                { name: "G.Skill Ripjaws S5 DDR5-6000 32GB", description: "Great DDR5 value.", msrp: 109 },
                { name: "Kingston Fury Beast DDR5-5600 32GB", description: "Solid DDR5 kit.", msrp: 99 },
                { name: "Corsair Vengeance DDR5-5600 32GB", description: "Reliable DDR5.", msrp: 99 },
            ],
            B: [
                { name: "G.Skill Ripjaws V DDR4-3600 16GB", description: "Best value DDR4 kit.", msrp: 49 },
                { name: "Corsair Vengeance LPX DDR4-3200 16GB", description: "Popular DDR4 kit.", msrp: 44 },
                { name: "Kingston Fury Beast DDR4-3200 16GB", description: "Reliable DDR4.", msrp: 39 },
            ],
            C: [
                { name: "Crucial DDR4-3200 16GB", description: "Budget-friendly DDR4.", msrp: 35 },
                { name: "Team T-Force DDR4-3200 16GB", description: "Decent budget RAM.", msrp: 34 },
            ],
            D: [
                { name: "Generic DDR4-2666 8GB", description: "Absolute minimum.", msrp: 18 },
            ]
        }
    },
    {
        category: "Storage",
        tiers: {
            S: [
                { name: "Samsung 990 Pro 2TB", description: "Fastest consumer NVMe.", msrp: 179 },
                { name: "WD Black SN850X 2TB", description: "Top gaming NVMe.", msrp: 159 },
            ],
            A: [
                { name: "Samsung 980 Pro 2TB", description: "Excellent Gen4 NVMe.", msrp: 149 },
                { name: "Seagate FireCuda 530 2TB", description: "Fast Gen4 SSD.", msrp: 159 },
                { name: "Crucial T700 2TB", description: "Gen5 NVMe value.", msrp: 199 },
            ],
            B: [
                { name: "Samsung 870 EVO 1TB", description: "Reliable SATA SSD.", msrp: 89 },
                { name: "WD Blue SN580 1TB", description: "Good value Gen4.", msrp: 69 },
                { name: "Kingston NV3 1TB", description: "Budget NVMe option.", msrp: 59 },
            ],
            C: [
                { name: "Crucial MX500 1TB", description: "Reliable budget SATA.", msrp: 74 },
                { name: "Seagate BarraCuda 2TB HDD", description: "High capacity budget storage.", msrp: 54 },
            ],
            D: [
                { name: "WD Blue 1TB HDD", description: "Basic spinning disk.", msrp: 44 },
                { name: "Generic SATA SSD 256GB", description: "Bare minimum SSD.", msrp: 24 },
            ]
        }
    },
    {
        category: "Power Supply",
        tiers: {
            S: [
                { name: "Corsair HX1000i 1000W", description: "Premium fully modular 80+ Platinum.", msrp: 249 },
                { name: "Seasonic Prime TX-850 850W", description: "Best-in-class PSU.", msrp: 199 },
            ],
            A: [
                { name: "Corsair RM850x 850W", description: "Reliable 80+ Gold modular.", msrp: 149 },
                { name: "EVGA SuperNOVA 850 G6", description: "Great modular gold PSU.", msrp: 139 },
                { name: "be quiet! Straight Power 11 750W", description: "Silent premium PSU.", msrp: 139 },
            ],
            B: [
                { name: "Corsair CV650 650W", description: "Budget reliable PSU.", msrp: 79 },
                { name: "Seasonic Focus GX-750 750W", description: "Great value gold PSU.", msrp: 119 },
                { name: "MSI MAG A750GL 750W", description: "Mid-range 80+ Gold.", msrp: 99 },
            ],
            C: [
                { name: "Cooler Master MWE 650W", description: "Budget 80+ Bronze.", msrp: 64 },
                { name: "Thermaltake Smart 600W", description: "Basic budget PSU.", msrp: 49 },
            ],
            D: [
                { name: "Generic 500W PSU", description: "Risky budget option.", msrp: 29 },
            ]
        }
    },
    {
        category: "Case",
        tiers: {
            S: [
                { name: "Lian Li O11 Dynamic EVO", description: "Premium dual-chamber airflow.", msrp: 179 },
                { name: "Fractal Design Torrent", description: "Best airflow case available.", msrp: 189 },
            ],
            A: [
                { name: "Lian Li O11 Dynamic", description: "Popular dual-chamber case.", msrp: 139 },
                { name: "NZXT H510 Flow", description: "Clean airflow mid-tower.", msrp: 99 },
                { name: "Corsair 4000D Airflow", description: "Great airflow at mid price.", msrp: 104 },
                { name: "be quiet! Pure Base 500DX", description: "Silent with good airflow.", msrp: 109 },
            ],
            B: [
                { name: "Fractal Design Pop Air", description: "Budget airflow option.", msrp: 89 },
                { name: "Cooler Master MasterBox TD500", description: "Value mesh case.", msrp: 89 },
                { name: "NZXT H5 Flow", description: "Compact clean airflow.", msrp: 99 },
            ],
            C: [
                { name: "Phanteks P300A", description: "Budget mesh case.", msrp: 59 },
                { name: "Cooler Master Q300L", description: "Budget micro-ATX.", msrp: 49 },
            ],
            D: [
                { name: "Generic ATX Case", description: "Basic budget enclosure.", msrp: 30 },
            ]
        }
    }
];

// Flat list for fast MSRP lookup
export const msrpLookup: { name: string; msrp: number }[] = tierData.flatMap(cat =>
    Object.values(cat.tiers).flat().filter(item => item.msrp != null).map(item => ({
        name: item.name.toLowerCase(),
        msrp: item.msrp!
    }))
);
