"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEndMarker = parseEndMarker;
/**
 * Parse NESL end marker line
 * Expected format: #!end_XXX
 */
function parseEndMarker(line) {
    const match = line.match(/^#!end_([A-Za-z0-9]{2,8})$/);
    if (!match) {
        return { isEnd: false };
    }
    return {
        isEnd: true,
        blockId: match[1]
    };
}
//# sourceMappingURL=parseEndMarker.js.map