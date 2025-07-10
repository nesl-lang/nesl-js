import type { 
  ParseResult, 
  ParseOptions, 
  LineType,
  ParseError,
  NeslValue,
  State
} from './types.js';

/**
 * Classifies a line into its syntactic type.
 * Pure function - no state, just string analysis.
 */
function classifyLine(line: string): LineType {
  const trimmed = line.trim();
  
  // Empty line
  if (!trimmed) {
    return { type: 'blank' };
  }
  
  // Structure delimiters (must be alone on line)
  if (trimmed === '{') return { type: 'object_start' };
  if (trimmed === '}') return { type: 'object_end' };
  if (trimmed === '[') return { type: 'array_start' };
  if (trimmed === ']') return { type: 'array_end' };
  if (trimmed === '(') return { type: 'multiline_start' };
  if (trimmed === ')') return { type: 'multiline_end' };
  
  // Assignment: contains = with non-empty key
  const eqIndex = line.indexOf('=');
  if (eqIndex > 0) {
    const key = line.substring(0, eqIndex).trim();
    if (key) {
      const rest = line.substring(eqIndex + 1);
      return { type: 'assignment', key, rest };
    }
  }
  
  // Array element: starts with -
  const dashIndex = line.indexOf('-');
  if (dashIndex >= 0 && line.substring(0, dashIndex).trim() === '') {
    // Dash is first non-whitespace character
    const rest = line.substring(dashIndex + 1);
    return { type: 'array_element', rest };
  }
  
  // String literal: starts with string open marker
  // This check will need the actual marker from options
  if (trimmed.startsWith('R"""pv(')) {
    return { type: 'string_literal', line: trimmed };
  }
  
  // Unknown line type
  return { type: 'unknown', line: trimmed };
}

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
  const lines = content.split('\n');
  const errors: ParseError[] = [];
  
  // Must start with object
  if (lines.length === 0) {
    return { data: [], errors };
  }
  
  const firstLine = classifyLine(lines[0]);
  if (firstLine.type !== 'object_start') {
    errors.push({
      line: startLine,
      code: 'root_must_be_object',
      message: `NESL blocks must contain a single root object. Found ${firstLine.type} instead`,
      content: lines[0],
      context: lines.slice(0, 5).join('\n')
    });
    return { data: [], errors };
  }
  
  // Simple case: empty object
  if (lines.length === 2 && classifyLine(lines[1]).type === 'object_end') {
    return { data: [{}], errors };
  }
  
  // TODO: Handle non-empty objects
  return { data: [], errors };
}