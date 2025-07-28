# 🪺 NESL Parser

A JavaScript/TypeScript parser for NESL (No Escape Syntax Language) - a structured configuration format designed for secure, unambiguous data storage.

## Why NESL?

NESL was designed to minimize errors when LLMs need to preserve text exactly, including all whitespace, blank lines, and special characters.

In testing against other formats (JSON, YAML, TOML, various heredoc styles, and conflict markers), LLMs made fewer content preservation errors with NESL, though errors still occur. Common issues with other formats include:
- Lost or altered whitespace (critical for code, poetry, ASCII art)
- Incorrectly escaped quotes and special characters
- Mangled indentation in multi-line content
- Dropped blank lines that carry semantic meaning

NESL's heredoc syntax provides clear boundaries for content preservation:

```nesl
#!nesl [@three-char-SHA-256: q7r]
content = <<'EOT_q7r'
    This preserves:
    - Leading spaces
    - Blank lines below:

    - Special chars: "quotes" 'apostrophes' \backslashes
    - No escaping needed inside heredocs
EOT_q7r
#!end_q7r
```

The format's design reduces (but doesn't eliminate) common LLM errors:
1. Simple, consistent block structure
2. No escape sequences within heredocs
3. Clear visual boundaries for multi-line content
4. Minimal syntax variations

## Installation

```bash
npm install nesl
```

## Quick Start

```javascript
import { parseNesl } from 'nesl';

const input = `
#!nesl [@three-char-SHA-256: 92b]
name = "John Doe"
email = "john@example.com"
#!end_92b
`;

const result = parseNesl(input);
console.log(result);
// Output:
// {
//   blocks: [{
//     id: 'abc',
//     properties: {
//       name: 'John Doe',
//       email: 'john@example.com'
//     },
//     startLine: 1,
//     endLine: 4
//   }],
//   errors: []
// }
```

## NESL Format Overview

NESL is a block-based format where each block:
- Begins with `#!nesl [@three-char-SHA-256: XXX]` (where XXX is a 3-character alphanumeric ID)
- Contains key-value pairs with quoted string values
- Ends with `#!end_XXX`

### Basic Syntax

```nesl
#!nesl [@three-char-SHA-256: cfg]
database_url = "postgres://localhost/mydb"
api_key = "secret-key-123"
debug_mode = "true"
#!end_cfg
```

### Multi-line Values (Heredoc)

For multi-line content, use heredoc syntax:

```nesl
#!nesl [@three-char-SHA-256: rz7]
content = <<'EOT_rz7'
This is a multi-line
string that preserves
line breaks and formatting.
EOT_rz7
#!end_rz7
```

## API Reference

### `parseNesl(content: string): ParseResult`

Parses NESL content and returns blocks and errors.

#### Returns

```typescript
interface ParseResult {
  blocks: Block[];
  errors: ParseError[];
}

interface Block {
  id: string;                        // Block identifier (3 chars)
  properties: Record<string, string>; // Key-value pairs
  startLine: number;                 // 1-based line number
  endLine: number | null;            // null if unclosed
}

interface ParseError {
  code: string;                      // Error code
  line: number;                      // 1-based line number
  column: number;                    // 1-based column (UTF-16 units)
  length: number;                    // Error span length
  blockId: string | null;            // Associated block ID
  content: string;                   // Line content
  context: string;                   // Surrounding lines
  message: string;                   // Human-readable message
}
```

## Format Rules

### Block IDs
- Must be exactly 3 characters
- Only alphanumeric characters (A-Z, a-z, 0-9)

### Keys
- Start with Unicode letter or underscore
- Contain only Unicode letters, digits, underscores
- Maximum 256 characters
- No whitespace or control characters

### Values
- Must be quoted strings or heredoc
- Quoted strings use JSON escaping rules
- Heredoc preserves exact content between delimiters

### Heredoc Delimiters
- Delimiters in single quotes to emphasize exact char preservation
- Must follow pattern `EOT_` + block ID
- Example: Block `m78` uses delimiter `EOT_m78`

## Error Handling

The parser reports detailed errors with context:

```javascript
const result = parseNesl(`#!nesl [@three-char-SHA-256: 3v4]
invalid key name! = "value"
#!end_3v4`);

console.log(result.errors[0]);
// {
//   code: 'INVALID_KEY',
//   line: 2,
//   column: 1,
//   length: 17,
//   message: "Key contains invalid character ' ' at position 8",
//   ...
// }
```

### Common Error Codes

- `INVALID_BLOCK_ID` - Block ID doesn't meet requirements
- `INVALID_KEY` - Key contains invalid characters
- `DUPLICATE_KEY` - Key appears multiple times in block
- `UNCLOSED_QUOTE` - String missing closing quote
- `UNCLOSED_BLOCK` - Block missing end marker
- `UNCLOSED_HEREDOC` - Heredoc missing delimiter
- `MISMATCHED_END` - End marker doesn't match block ID
- `TRAILING_CONTENT` - Content after quoted value

## Limitations

- File size limit: 100MB
- Block IDs: 2-8 characters (currently enforced as exactly 3)
- Key length: 256 characters maximum
- Values must be strings (no numbers, booleans, or objects)
- No comments supported
- UTF-16 based positioning (relevant for emoji/surrogate pairs)

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import { parseNesl, Block, ParseError, ParseResult } from 'nesl';
```

## License

MIT