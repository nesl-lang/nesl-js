import { StringResult, ParseOptions } from './types.js';

const DEFAULT_MARKERS = {
  stringOpen: 'R"""pv(',
  stringClose: ')pv"""',
};

/**
 * Parse a NESL string literal from a line.
 * Algorithm: Find first stringOpen, find LAST stringClose, extract content between.
 * 
 * @param line - The line to parse
 * @param options - Parser options with custom markers
 * @returns Parsed string value or error
 */
export function parseString(
  line: string,
  options: ParseOptions = {}
): StringResult {
  const markers = {
    stringOpen: options.stringOpen || DEFAULT_MARKERS.stringOpen,
    stringClose: options.stringClose || DEFAULT_MARKERS.stringClose,
  };

  const startIdx = line.indexOf(markers.stringOpen);
  if (startIdx === -1) {
    return { success: false, error: 'string_unterminated' };
  }

  const lastEndIdx = line.lastIndexOf(markers.stringClose);
  if (lastEndIdx === -1) {
    return { success: false, error: 'string_unterminated' };
  }

  // Ensure closing marker comes after opening marker
  const minEndPosition = startIdx + markers.stringOpen.length;
  if (lastEndIdx < minEndPosition) {
    return { success: false, error: 'string_unterminated' };
  }

  // Check for content after closing marker
  const afterContent = line.slice(lastEndIdx + markers.stringClose.length);
  if (afterContent.trim()) {
    return { success: false, error: 'content_after_string' };
  }

  const value = line.slice(startIdx + markers.stringOpen.length, lastEndIdx);
  
  // Check max length if specified
  if (options.maxValueLength && value.length > options.maxValueLength) {
    return { success: false, error: 'string_unterminated' }; // No specific error code for length
  }

  return { success: true, value };
}