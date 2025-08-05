"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHeader = parseHeader;
/**
 * Parse NESL header line
 * Expected format: #!nesl [@three-char-SHA-256: XXX]
 */
function parseHeader(line) {
    // const match = line.match(/^#!nesl \[@three-char-SHA-256: ([^\]]+)\]$/);
    // be more flexible.  bc even opus 4 often uses the wrong thing there.  
    // the long version is really just a signal for dumber LLMs
    // TODO: When warning system is implemented, add warning for non-standard header format
    // Warning: Delimiter should be on its own line for standard heredoc format
    const match = line.match(/^#!nesl \[@(?:[a-zA-Z0-9-]+): ([^\]]+)\]$/);
    if (!match) {
        return { isValid: false };
    }
    return {
        isValid: true,
        blockId: match[1]
    };
}
//# sourceMappingURL=parseHeader.js.map