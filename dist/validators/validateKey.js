"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateKey = validateKey;
const patterns_1 = require("../patterns");
/**
 * Validate key name meets requirements:
 * - Starts with Unicode letter or underscore
 * - Contains only Unicode letters, digits, underscores
 * - No whitespace or control characters
 * - Max 256 characters
 */
function validateKey(key) {
    if (!key) {
        return { valid: false, error: 'Key cannot be empty' };
    }
    if (key.length > patterns_1.KEY_MAX_LENGTH) {
        return { valid: false, error: `Key exceeds ${patterns_1.KEY_MAX_LENGTH} character limit` };
    }
    // Check first character using iterator to handle surrogate pairs
    const firstChar = [...key][0];
    if (!firstChar.match(/[\p{L}_]/u)) {
        return { valid: false, error: 'Key must start with letter or underscore' };
    }
    // Check for excluded characters (zero-width spaces, control chars) FIRST
    if (patterns_1.EXCLUDE_CHARS_PATTERN.test(key)) {
        return { valid: false, error: 'Key contains invalid characters' };
    }
    // Then check all characters are valid
    if (!patterns_1.KEY_CHARS_PATTERN.test(key)) {
        return { valid: false, error: 'Key contains invalid characters' };
    }
    return { valid: true };
}
//# sourceMappingURL=validateKey.js.map