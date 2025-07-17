import type { AssignmentResult } from '../types';
/**
 * Parse a line that might be a key-value assignment
 * Returns 0-based UTF-16 code unit positions for errors
 *
 * Position semantics by error type:
 * - EMPTY_KEY: Points to the '=' character
 * - INVALID_OPERATOR: Points to start of invalid operator (e.g., ':=' starts at ':')
 * - UNCLOSED_QUOTE: Points to the opening quote
 * - INVALID_VALUE: Points to start of the invalid value content
 * - TRAILING_CONTENT: Points to first character after valid value
 * - MALFORMED_ASSIGNMENT: Full line (position 0, length = line.length)
 */
export declare function parseAssignment(line: string): AssignmentResult;
//# sourceMappingURL=parseAssignment.d.ts.map