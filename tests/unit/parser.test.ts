import { describe, it, expect } from 'vitest';
import { parseNesl } from '../../src/parser';
import type { ParseResult } from '../../src/types';

describe('parseNesl unit tests', () => {
  it('should report correct error length for keys with leading whitespace', () => {
    const input = `#!nesl [@three-char-SHA-256: abc]
 key = "value"
#!end_abc`;

    const result = parseNesl(input);
    
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].code).toBe('INVALID_KEY');
    expect(result.errors[0].column).toBe(1);
    expect(result.errors[0].length).toBe(4); // ' key' = 4 chars
  });

  it('should report correct error length for keys with leading and trailing whitespace', () => {
    const input = `
#!nesl [@three-char-SHA-256: abc]
 key   = "value"
#!end_abc`;

    const result = parseNesl(input);
    
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].code).toBe('INVALID_KEY');
    expect(result.errors[0].column).toBe(1);
    expect(result.errors[0].length).toBe(4); // ' key' = 4 chars (leading space + key, not trailing spaces)
  });

  it('should report correct error length for keys with only trailing whitespace', () => {
    const input = `#!nesl [@three-char-SHA-256: abc]
key   = "value"
#!end_abc`;

    const result = parseNesl(input);
    
    // This should pass - no leading whitespace means no error
    expect(result.errors).toHaveLength(0);
    expect(result.blocks[0].properties.key).toBe('value');
  });

  it('should correctly parse test case 007 (heredoc-after-valid-end)', () => {
    const input = `#!nesl [@three-char-SHA-256: col]
content = <<'EOT_col'
This line is fine
EOT_col
This breaks parsing
EOT_col
#!end_col`;

    const expected: ParseResult = {
      blocks: [{
        id: 'col',
        properties: {
          content: 'This line is fine'
        },
        startLine: 1,
        endLine: 7
      }],
      errors: [{
        code: 'MALFORMED_ASSIGNMENT',
        line: 5,
        column: 1,
        length: 19,
        blockId: 'col',
        content: 'This breaks parsing',
        context: "This line is fine\nEOT_col\nThis breaks parsing\nEOT_col\n#!end_col",
        message: "Invalid line format in block 'col': not a valid key-value assignment or empty line"
      }, {
        code: 'MALFORMED_ASSIGNMENT',
        line: 6,
        column: 1,
        length: 7,
        blockId: 'col',
        content: 'EOT_col',
        context: "This line is fine\nEOT_col\nThis breaks parsing\nEOT_col\n#!end_col",
        message: "Invalid line format in block 'col': not a valid key-value assignment or empty line"
      }]
    };

    const result = parseNesl(input);
    expect(result).toEqual(expected);
  });
});