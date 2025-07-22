"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBlockId = validateBlockId;
const patterns_1 = require("../patterns");
/**
 * Validate block ID meets requirements:
 * - Exactly 3 characters
 * - Only alphanumeric characters
 */
function validateBlockId(id) {
    if (id.length < patterns_1.BLOCK_ID_MIN_LENGTH || id.length > patterns_1.BLOCK_ID_MAX_LENGTH) {
        return {
            valid: false,
            error: `Block ID must be exactly ${patterns_1.BLOCK_ID_MIN_LENGTH} characters`
        };
    }
    if (!patterns_1.BLOCK_ID_PATTERN.test(id)) {
        return {
            valid: false,
            error: 'Block ID must contain only alphanumeric characters'
        };
    }
    return { valid: true };
}
//# sourceMappingURL=validateBlockId.js.map