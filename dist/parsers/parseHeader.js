"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHeader = parseHeader;
/**
 * Parse SHAM header line
 * Expected format: #!SHAM [@three-char-SHA-256: XXX]
 */
function parseHeader(line) {
    const match = line.match(/^#!SHAM \[@three-char-SHA-256: ([^\]]+)\]$/);
    if (!match) {
        return { isValid: false };
    }
    return {
        isValid: true,
        blockId: match[1]
    };
}
//# sourceMappingURL=parseHeader.js.map