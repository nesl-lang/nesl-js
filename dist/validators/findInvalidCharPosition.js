"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findInvalidCharPosition = findInvalidCharPosition;
const patterns_1 = require("../patterns");
/**
 * Find first invalid character in a key
 * Returns 0-based UTF-16 code unit position and the character
 * Note: For characters outside BMP, position may point to a surrogate pair
 */
function findInvalidCharPosition(key) {
    let position = 0;
    // Use string iterator to handle surrogate pairs correctly
    for (const char of key) {
        // First position must be letter or underscore
        if (position === 0 && !char.match(/[\p{L}_]/u)) {
            return { position, char };
        }
        // Other positions must be letter, number, or underscore
        if (position > 0 && !char.match(/[\p{L}\p{N}_]/u)) {
            return { position, char };
        }
        // Check for excluded characters (control, zero-width)
        if (patterns_1.EXCLUDE_CHARS_PATTERN.test(char)) {
            return { position, char };
        }
        // Advance position by the number of code units this character uses
        position += char.length;
    }
    return null;
}
//# sourceMappingURL=findInvalidCharPosition.js.map