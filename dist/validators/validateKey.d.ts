import type { ValidationResult } from '../types';
/**
 * Validate key name meets requirements:
 * - Starts with Unicode letter or underscore
 * - Contains only Unicode letters, digits, underscores
 * - No whitespace or control characters
 * - Max 256 characters
 */
export declare function validateKey(key: string): ValidationResult;
//# sourceMappingURL=validateKey.d.ts.map