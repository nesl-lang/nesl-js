interface InvalidChar {
    position: number;
    char: string;
}
/**
 * Find first invalid character in a key
 * Returns 0-based UTF-16 code unit position and the character
 * Note: For characters outside BMP, position may point to a surrogate pair
 */
export declare function findInvalidCharPosition(key: string): InvalidChar | null;
export {};
//# sourceMappingURL=findInvalidCharPosition.d.ts.map