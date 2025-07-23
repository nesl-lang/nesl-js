=== PROCESSED: 2025-07-22 22:22:25 ===
SUCCESS Block 1: Updated /Users/stuart/repos/nesl-lang/nesl-js/src/types.ts
SUCCESS Block 2: Updated /Users/stuart/repos/nesl-lang/nesl-js/src/parsers/parseHeader.ts
SUCCESS Block 3: Updated /Users/stuart/repos/nesl-lang/nesl-js/src/parser.ts
SUCCESS Block 4: Updated /Users/stuart/repos/nesl-lang/nesl-js/src/parser.ts
===

<<<EXPLANATION>>>

Revert HeaderResult type to remove blockIdPosition - position tracking not needed in parsing phase

<<<FILE>>>

/Users/stuart/repos/nesl-lang/nesl-js/src/types.ts

<<<SEARCH>>>
export interface HeaderResult {
  isValid: boolean;
  blockId?: string;
  blockIdPosition?: number; // 0-based position of block ID in line
}
<<<REPLACE>>>
export interface HeaderResult {
  isValid: boolean;
  blockId?: string;
}
<<<END>>>


<<<EXPLANATION>>>

Revert parseHeader to original implementation without position tracking

<<<FILE>>>

/Users/stuart/repos/nesl-lang/nesl-js/src/parsers/parseHeader.ts

<<<SEARCH>>>
/**
 * Parse SHAM header line
 * Expected format: #!SHAM [@three-char-SHA-256: XXX]
 * Returns block ID and its 0-based position in the line
 */
export function parseHeader(line: string): HeaderResult {
  const match = line.match(/^#!SHAM \[@three-char-SHA-256: ([^\]]+)\]$/);
  
  if (!match) {
    return { isValid: false };
  }
  
  // Calculate position of the captured block ID
  // match.index is start of full match, find where capture group starts
  const prefixLength = '#!SHAM [@three-char-SHA-256: '.length;
  const blockIdPosition = match.index! + prefixLength;
  
  return {
    isValid: true,
    blockId: match[1],
    blockIdPosition
  };
}
<<<REPLACE>>>
/**
 * Parse SHAM header line
 * Expected format: #!SHAM [@three-char-SHA-256: XXX]
 */
export function parseHeader(line: string): HeaderResult {
  const match = line.match(/^#!SHAM \[@three-char-SHA-256: ([^\]]+)\]$/);
  
  if (!match) {
    return { isValid: false };
  }
  
  return {
    isValid: true,
    blockId: match[1]
  };
}
<<<END>>>


<<<EXPLANATION>>>

Update parser to calculate block ID position only when validation fails, avoiding indexOf ambiguity

<<<FILE>>>

/Users/stuart/repos/nesl-lang/nesl-js/src/parser.ts

<<<SEARCH>>>
        if (lineType === 'header') {
          const headerResult = parseHeader(line);
          if (headerResult.isValid && headerResult.blockId) {
            const validation = validateBlockId(headerResult.blockId);
            if (validation.valid) {
              currentBlock = {
                id: headerResult.blockId,
                properties: {},
                startLine: lineNum,
                endLine: null
              };
              state = 'IN_BLOCK';
            } else {
              addError(
                'INVALID_BLOCK_ID',
                lineNum,
                validation.error || 'Invalid block ID',
                headerResult.blockIdPosition ?? 0,
                headerResult.blockId.length
              );
            }
          } else {
            addError('MALFORMED_HEADER', lineNum, 'Invalid SHAM header format');
          }
        } else if (lineType !== 'empty') {
          // Non-empty line outside of block - skip silently
        }
<<<REPLACE>>>
        if (lineType === 'header') {
          const headerResult = parseHeader(line);
          if (headerResult.isValid && headerResult.blockId) {
            const validation = validateBlockId(headerResult.blockId);
            if (validation.valid) {
              currentBlock = {
                id: headerResult.blockId,
                properties: {},
                startLine: lineNum,
                endLine: null
              };
              state = 'IN_BLOCK';
            } else {
              // Calculate position based on known header format
              const prefixLength = '#!SHAM [@three-char-SHA-256: '.length;
              const blockIdPosition = line.startsWith('#!SHAM [@three-char-SHA-256: ') 
                ? prefixLength 
                : 0;
              addError(
                'INVALID_BLOCK_ID',
                lineNum,
                validation.error || 'Invalid block ID',
                blockIdPosition,
                headerResult.blockId.length
              );
            }
          } else {
            addError('MALFORMED_HEADER', lineNum, 'Invalid SHAM header format');
          }
        } else if (lineType !== 'empty') {
          // Non-empty line outside of block - skip silently
        }
<<<END>>>


<<<EXPLANATION>>>

Update second header parsing location with same position calculation approach

<<<FILE>>>

/Users/stuart/repos/nesl-lang/nesl-js/src/parser.ts

<<<SEARCH>>>
          const headerResult = parseHeader(line);
          if (headerResult.isValid && headerResult.blockId) {
            const validation = validateBlockId(headerResult.blockId);
            if (validation.valid) {
              // Save previous block without endLine
              blocks.push(currentBlock);
              currentBlock = {
                id: headerResult.blockId,
                properties: {},
                startLine: lineNum,
                endLine: null
              };
            } else {
              // Save previous block and go to seeking state
              blocks.push(currentBlock);
              currentBlock = null;
              state = 'SEEKING_HEADER';
              addError(
                'INVALID_BLOCK_ID',
                lineNum,
                validation.error || 'Invalid block ID',
                headerResult.blockIdPosition ?? 0,
                headerResult.blockId.length
              );
            }
          }
<<<REPLACE>>>
          const headerResult = parseHeader(line);
          if (headerResult.isValid && headerResult.blockId) {
            const validation = validateBlockId(headerResult.blockId);
            if (validation.valid) {
              // Save previous block without endLine
              blocks.push(currentBlock);
              currentBlock = {
                id: headerResult.blockId,
                properties: {},
                startLine: lineNum,
                endLine: null
              };
            } else {
              // Save previous block and go to seeking state
              blocks.push(currentBlock);
              currentBlock = null;
              state = 'SEEKING_HEADER';
              // Calculate position based on known header format
              const prefixLength = '#!SHAM [@three-char-SHA-256: '.length;
              const blockIdPosition = line.startsWith('#!SHAM [@three-char-SHA-256: ') 
                ? prefixLength 
                : 0;
              addError(
                'INVALID_BLOCK_ID',
                lineNum,
                validation.error || 'Invalid block ID',
                blockIdPosition,
                headerResult.blockId.length
              );
            }
          }
<<<END>>>