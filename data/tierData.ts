export type TierItem = {
    name: string;
    description: string;
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
                { name: "NVIDIA RTX 4090", description: "The ultimate performance king." },
                { name: "NVIDIA RTX 4080 Super", description: "Top-tier 4K gaming." }
            ],
            A: [
                { name: "NVIDIA RTX 3080 Ti", description: "Last gen flagship, still a beast." },
                { name: "AMD Radeon RX 7900 XTX", description: "AMD's top contender." },
                { name: "NVIDIA RTX 4070 Ti Super", description: "Great 1440p high refresh." }
            ],
            B: [
                { name: "NVIDIA RTX 4070", description: "The sweet spot for most gamers." },
                { name: "AMD Radeon RX 7800 XT", description: "Excellent value for money." }
            ],
            C: [
                { name: "NVIDIA RTX 4060 Ti", description: "Capable mid-range." },
                { name: "AMD Radeon RX 7600 XT", description: "Solid entry-level performance." }
            ],
            D: [
                { name: "NVIDIA RTX 3050", description: "Basic gaming performance." },
                { name: "AMD Radeon RX 6500 XT", description: "Budget choice." }
            ]
        }
    },
    {
        category: "Processor",
        tiers: {
            S: [
                { name: "AMD Ryzen 9 7950X3D", description: "King of gaming and productivity." },
                { name: "Intel Core i9-14900K", description: "High-end multi-core performance." }
            ],
            A: [
                { name: "AMD Ryzen 7 7800X3D", description: "Best gaming CPU on the market." },
                { name: "AMD Ryzen 9 5900X", description: "Still a powerhouse for AM4." },
                { name: "Intel Core i7-14700K", description: "Strong balanced performer." }
            ],
            B: [
                { name: "AMD Ryzen 5 7600X", description: "Perfect choice for mid-range builds." },
                { name: "Intel Core i5-13600K", description: "Great value for gamers." }
            ],
            C: [
                { name: "AMD Ryzen 5 5600", description: "Budget AM4 classic." },
                { name: "Intel Core i3-13100", description: "Basic entry-level quad core." }
            ],
            D: [
                { name: "Intel Pentium Gold", description: "Very basic tasks only." },
                { name: "AMD Athlon 3000G", description: "Ultra budget." }
            ]
        }
    }
];
