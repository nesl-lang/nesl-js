"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHeredocDelimiter = validateHeredocDelimiter;
const patterns_1 = require("../patterns");
/**
 * Validate heredoc delimiter matches expected format
 * Must be exactly 'EOT_NESL_' + blockId
 */
function validateHeredocDelimiter(delimiter, blockId) {
    const expected = `${patterns_1.HEREDOC_PREFIX}${blockId}`;
    if (delimiter !== expected) {
        return {
            valid: false,
            error: `Heredoc delimiter must be '${expected}'`
        };
    }
    return { valid: true };
}
//# sourceMappingURL=validateHeredocDelimiter.js.map