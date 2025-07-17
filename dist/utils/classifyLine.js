"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifyLine = classifyLine;
/**
 * Classify a line by its content
 * Priority order: end_marker > header > assignment > empty
 */
function classifyLine(line) {
    const trimmed = line.trim();
    if (!trimmed) {
        return 'empty';
    }
    // Check in priority order from config
    if (trimmed.startsWith('#!END_SHAM_')) {
        return 'end_marker';
    }
    if (trimmed.startsWith('#!SHAM ')) {
        return 'header';
    }
    if (trimmed.includes('=')) {
        return 'assignment';
    }
    return 'unknown';
}
//# sourceMappingURL=classifyLine.js.map