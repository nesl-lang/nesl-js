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
export function parseAssignment(line: string): AssignmentResult {
  // Find equals sign first - it's the anchor for everything else
  const equalIndex = line.indexOf('=');
  if (equalIndex === -1) {
    return {
      success: false,
      error: {
        code: 'MALFORMED_ASSIGNMENT',
        position: 0,
        length: line.length
      }
    };
  }
  
  // Check for empty key
  const beforeEqual = line.substring(0, equalIndex);
  const key = beforeEqual.trim();
  
  if (!key) {
    return {
      success: false,
      error: {
        code: 'EMPTY_KEY',
        position: equalIndex,
        length: 1
      }
    };
  }
  
  // Check for invalid operators BEFORE the equals
  const invalidOp = line.match(/:=|=>/);
  if (invalidOp && invalidOp.index !== undefined && invalidOp.index < equalIndex + 1) {
    return {
      success: false,
      error: {
        code: 'INVALID_OPERATOR',
        position: invalidOp.index,
        length: invalidOp[0].length
      }
    };
  }
  
  const afterEqual = line.substring(equalIndex + 1);
  const trimmedAfterEqual = afterEqual.trim();
  
  // Check if value is empty
  if (!trimmedAfterEqual) {
    // Point to position after the equals and any spaces
    const afterEqualLength = afterEqual.length;
    return {
      success: false,
      error: {
        code: 'INVALID_VALUE',
        position: equalIndex + 1 + afterEqualLength,
        length: 1
      }
    };
  }
  
  // Check for quoted value
  if (trimmedAfterEqual.startsWith('"')) {
    const valueStartIndex = equalIndex + 1 + afterEqual.indexOf('"');
    let i = 1; // Start after opening quote
    let escaped = false;
    let closingQuoteIndex = -1;
    
    while (i < trimmedAfterEqual.length) {
      if (trimmedAfterEqual[i] === '\\' && !escaped) {
        escaped = true;
      } else if (trimmedAfterEqual[i] === '"' && !escaped) {
        closingQuoteIndex = i;
        break;
      } else {
        escaped = false;
      }
      i++;
    }
    
    if (closingQuoteIndex === -1) {
      return {
        success: false,
        error: {
          code: 'UNCLOSED_QUOTE',
          position: valueStartIndex,
          length: line.length - valueStartIndex
        }
      };
    }
    
    // Check for trailing content after closing quote
    const afterClosingQuote = trimmedAfterEqual.substring(closingQuoteIndex + 1);
    if (afterClosingQuote.trim()) {
      const trailingStartInTrimmed = closingQuoteIndex + 1 + afterClosingQuote.search(/\S/);
      const trailingStartInLine = equalIndex + 1 + afterEqual.indexOf(trimmedAfterEqual) + trailingStartInTrimmed;
      return {
        success: false,
        error: {
          code: 'TRAILING_CONTENT',
          position: trailingStartInLine,
          length: line.length - trailingStartInLine
        }
      };
    }
    
    try {
      const quotedPart = trimmedAfterEqual.substring(0, closingQuoteIndex + 1);
      const value = JSON.parse(quotedPart);
      return { success: true, type: 'key-value', key, value };
    } catch {
      return {
        success: false,
        error: {
          code: 'INVALID_VALUE',
          position: valueStartIndex,
          length: closingQuoteIndex + 1
        }
      };
    }
  }
  
  // Check for heredoc
  const heredocMatch = trimmedAfterEqual.match(/^<<'([^']+)'$/);
  if (heredocMatch) {
    return { success: true, type: 'heredoc', key, delimiter: heredocMatch[1] };
  }
  
  // Invalid value format
  const valueStart = equalIndex + 1 + afterEqual.indexOf(trimmedAfterEqual);
  return {
    success: false,
    error: {
      code: 'INVALID_VALUE',
      position: valueStart,
      length: trimmedAfterEqual.length
    }
  };
}