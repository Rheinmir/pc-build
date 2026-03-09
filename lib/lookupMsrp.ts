import { msrpLookup } from '@/data/tierData';

/**
 * Fuzzy-match a component name against the MSRP database.
 * Returns the MSRP if a confident match is found, otherwise undefined.
 */
export function lookupMsrp(name: string): number | undefined {
    const query = name.toLowerCase();

    // Try exact match first
    const exact = msrpLookup.find(item => item.name === query);
    if (exact) return exact.msrp;

    // Score each entry: count how many words from the db name appear in the query
    let bestScore = 0;
    let bestMsrp: number | undefined;

    for (const item of msrpLookup) {
        const words = item.name.split(' ').filter(w => w.length > 2);
        const matches = words.filter(w => query.includes(w)).length;
        const score = matches / words.length;

        if (score > bestScore) {
            bestScore = score;
            bestMsrp = item.msrp;
        }
    }

    // Only return if at least 60% of the db name's words matched
    return bestScore >= 0.6 ? bestMsrp : undefined;
}
