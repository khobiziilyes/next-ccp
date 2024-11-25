export const ALGO_START = 4; // Can be calculated, but it's always 4.

export const EMPTY_CCP = BigInt(99999000000000000); // Used BigInt to avoid overflow ;).
export const MAGIC_NUM = 97; // No idea.
export const EMPTY_MOD = Number(EMPTY_CCP % BigInt(MAGIC_NUM)); // Always 85, left here for clarity.
