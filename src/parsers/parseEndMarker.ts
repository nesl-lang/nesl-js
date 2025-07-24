import type { EndMarkerResult } from '../types';

/**
 * Parse NESL end marker line
 * Expected format: #!end_XXX
 */
export function parseEndMarker(line: string): EndMarkerResult {
  const match = line.match(/^#!end_([A-Za-z0-9]{2,8})$/);   

  
  if (!match) {
    return { isEnd: false };
  }
  
  return {
    isEnd: true,
    blockId: match[1]
  };
}