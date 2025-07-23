import type { ValidationResult } from '../types';
import { BLOCK_ID_PATTERN, BLOCK_ID_MIN_LENGTH, BLOCK_ID_MAX_LENGTH } from '../patterns';

/**
 * Validate block ID meets requirements:
 * - Exactly 3 characters
 * - Only alphanumeric characters
 */
export function validateBlockId(id: string): ValidationResult {
  if (id.length < BLOCK_ID_MIN_LENGTH || id.length > BLOCK_ID_MAX_LENGTH) {
    return {
      valid: false,
      error: `Block ID must be exactly 3 characters`
    };
  }
  
  if (!BLOCK_ID_PATTERN.test(id)) {
    return {
      valid: false,
      error: 'Block ID must contain only alphanumeric characters'
    };
  }
  
  return { valid: true };
}