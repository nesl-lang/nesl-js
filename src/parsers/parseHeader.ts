import type { HeaderResult } from '../types';

/**
 * Parse NESL header line
 * Expected format: #!nesl [@three-char-SHA-256: XXX]
 */
export function parseHeader(line: string): HeaderResult {
  const match = line.match(/^#!nesl \[@three-char-SHA-256: ([^\]]+)\]$/);
  
  if (!match) {
    return { isValid: false };
  }
  
  return {
    isValid: true,
    blockId: match[1]
  };
}