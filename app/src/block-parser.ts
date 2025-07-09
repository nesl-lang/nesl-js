import type { ParseResult, ParseOptions } from './types.js';

/**
 * Parses a single NESL block's content into structured data.
 * 
 * @param content - Block content without <<<<<<<<<nesl/=========nesl markers
 * @param startLine - Line number where block starts in original file (1-based)
 * @param options - Optional parser configuration
 * @returns Parsed data and any errors encountered
 */
export function parseBlock(
  content: string, 
  startLine: number, 
  options?: ParseOptions
): ParseResult {
  // Stub implementation - all tests will fail
  return { 
    data: [], 
    errors: [] 
  };
}