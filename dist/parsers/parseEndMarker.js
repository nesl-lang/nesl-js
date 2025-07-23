"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEndMarker = parseEndMarker;
/**
 * Parse SHAM end marker line
 * Expected format: #!END_SHAM_XXX
 */
function parseEndMarker(line) {
    const match = line.match(/^#!END_SHAM_([A-Za-z0-9]{2,8})$/);
    if (!match) {
        return { isEnd: false };
    }
    return {
        isEnd: true,
        blockId: match[1]
    };
}
//# sourceMappingURL=parseEndMarker.js.map