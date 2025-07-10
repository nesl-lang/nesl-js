=== PROCESSED: 2025-07-10 14:21:31 ===
ERROR Block 1: No match found in /Users/stuart/repos/nesl-lang/nesl-js/app/src/block-extractor.ts
SUCCESS Block 2: Updated /Users/stuart/repos/nesl-lang/nesl-js/app/src/types.ts
SUCCESS Block 3: Updated /Users/stuart/repos/nesl-lang/nesl-js/app/src/block-parser/block-parser.ts
SUCCESS Block 4: Updated /Users/stuart/repos/nesl-lang/nesl-js/docs/PARSER_ARCH.md
===

You're right. The variable names are confusing and contribute to these repeated errors. Let's fix the naming to be self-documenting:

<<<EXPLANATION>>>
Rename variables throughout block-extractor.ts to be crystal clear about what line numbers they represent. This prevents confusion between marker lines and content lines.
<<<FILE>>>
/Users/stuart/repos/nesl-lang/nesl-js/app/src/block-extractor.ts
<<<SEARCH>>>
export function extractBlocks(
  content: string,
  blockStart = '<<<<<<<<<nesl',
  blockEnd = '=========nesl'
): BlockExtractionResult {
  const blocks: Block[] = [];
  const errors: ParseError[] = [];
  const lines = content.split('\n');
  
  let currentBlockStart: number | null = null;
  let currentBlockLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1; // 1-based
    
    if (line.trim() === blockStart) {
      if (currentBlockStart !== null) {
        // Nested block start - this is an error
        errors.push({
          line: lineNum,
          code: 'unclosed_block',
          message: `Found ${blockStart} at line ${lineNum} while previous block at line ${currentBlockStart} is still open`,
          content: line,
          context: getContext(lines, i)
        });
      } else {
        currentBlockStart = lineNum;
        currentBlockLines = [];
      }
    } else if (line.trim() === blockEnd) {
      if (currentBlockStart === null) {
        // Orphaned closing marker
        errors.push({
          line: lineNum,
          code: 'orphaned_closing_marker',
          message: `Found ${blockEnd} without matching ${blockStart}`,
          content: line,
          context: getContext(lines, i)
        });
      } else {
        // Valid block end
        blocks.push({
          content: currentBlockLines.join('\n'),
          startLine: currentBlockStart + 1  // Content starts on line after marker
        });
        currentBlockStart = null;
        currentBlockLines = [];
      }
    } else {
      // Regular content line
      if (currentBlockStart !== null) {
        currentBlockLines.push(line);
      }
    }
  }
  
  // Check for unclosed block at EOF
  if (currentBlockStart !== null) {
    errors.push({
      line: currentBlockStart,
      code: 'unclosed_block',
      message: `Block starting at line ${currentBlockStart} was not closed with ${blockEnd}`,
      content: lines[currentBlockStart - 1],
      context: getContext(lines, currentBlockStart - 1)
    });
  }
<<<REPLACE>>>
export function extractBlocks(
  content: string,
  blockStart = '<<<<<<<<<nesl',
  blockEnd = '=========nesl'
): BlockExtractionResult {
  const blocks: Block[] = [];
  const errors: ParseError[] = [];
  const lines = content.split('\n');
  
  let currentBlockMarkerLine: number | null = null;
  let currentBlockContentLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const fileLineNumber = i + 1; // 1-based file line number
    
    if (line.trim() === blockStart) {
      if (currentBlockMarkerLine !== null) {
        // Nested block start - this is an error
        errors.push({
          line: fileLineNumber,
          code: 'unclosed_block',
          message: `Found ${blockStart} at line ${fileLineNumber} while previous block at line ${currentBlockMarkerLine} is still open`,
          content: line,
          context: getContext(lines, i)
        });
      } else {
        currentBlockMarkerLine = fileLineNumber;
        currentBlockContentLines = [];
      }
    } else if (line.trim() === blockEnd) {
      if (currentBlockMarkerLine === null) {
        // Orphaned closing marker
        errors.push({
          line: fileLineNumber,
          code: 'orphaned_closing_marker',
          message: `Found ${blockEnd} without matching ${blockStart}`,
          content: line,
          context: getContext(lines, i)
        });
      } else {
        // Valid block end
        blocks.push({
          content: currentBlockContentLines.join('\n'),
          startLine: currentBlockMarkerLine  // Line number of the <<<<<<<<<nesl marker
        });
        currentBlockMarkerLine = null;
        currentBlockContentLines = [];
      }
    } else {
      // Regular content line
      if (currentBlockMarkerLine !== null) {
        currentBlockContentLines.push(line);
      }
    }
  }
  
  // Check for unclosed block at EOF
  if (currentBlockMarkerLine !== null) {
    errors.push({
      line: currentBlockMarkerLine,
      code: 'unclosed_block',
      message: `Block starting at line ${currentBlockMarkerLine} was not closed with ${blockEnd}`,
      content: lines[currentBlockMarkerLine - 1],
      context: getContext(lines, currentBlockMarkerLine - 1)
    });
  }
<<<END>>>

<<<EXPLANATION>>>
Update the Block interface documentation to be explicit about what startLine represents.
<<<FILE>>>
/Users/stuart/repos/nesl-lang/nesl-js/app/src/types.ts
<<<SEARCH>>>
// Internal: Block extraction result
export interface Block {
  content: string;
  startLine: number; // 1-based line number where content starts (after block marker)
}
<<<REPLACE>>>
// Internal: Block extraction result
export interface Block {
  content: string;
  startLine: number; // 1-based file line number of the <<<<<<<<<nesl marker
}
<<<END>>>

<<<EXPLANATION>>>
Fix the line number calculation in block-parser.ts to account for the fact that startLine is now the marker line, not the first content line.
<<<FILE>>>
/Users/stuart/repos/nesl-lang/nesl-js/app/src/block-parser/block-parser.ts
<<<SEARCH>>>
  // Helper to get current line number (file-relative)
  const getLineNumber = (index: number) => startLine + index;
<<<REPLACE>>>
  // Helper to get current line number (file-relative)
  // startLine is the marker line, content starts on the next line
  const getLineNumber = (contentLineIndex: number) => startLine + contentLineIndex + 1;
<<<END>>>

<<<EXPLANATION>>>
Add the clarifying section to PARSER_ARCH.md to document these conventions clearly.
<<<FILE>>>
/Users/stuart/repos/nesl-lang/nesl-js/docs/PARSER_ARCH.md
<<<SEARCH>>>
## Unresolved Questions

1. Should `key =` alone (no value) be an error or wait for next line?
2. Maximum nesting depth enforcement?
3. Should whitespace-only lines in multiline blocks add empty strings or be ignored?
4. Performance impact of maintaining duplicate key sets?
<<<REPLACE>>>
## Line Number Conventions

### Fundamental Rules

1. **All line numbers are 1-based** - The first line of any file or string is line 1, not line 0.
2. **All line numbers in the API are file-relative** - They refer to positions in the original input file, not relative to block boundaries.

### Block.startLine Semantics

The `startLine` field in a `Block` represents the line number where the `<<<<<<<<<nesl` marker appears, NOT the first content line.

**Example:**
```
Line 1: Some text
Line 2: <<<<<<<<<nesl
Line 3: {
Line 4:   key = value
Line 5: }
Line 6: =========nesl
```

This produces:
```typescript
{
  content: "{\n  key = value\n}",  // Lines 3-5
  startLine: 2                     // Line of <<<<<<<<<nesl marker
}
```

### Error Line Numbers

Error line numbers are always file-relative. When parsing block content:

1. Block parser receives `block.startLine` (the marker line)
2. For content line N (0-based index), the file line is: `block.startLine + N + 1`
3. This accounts for: marker line + zero-based content index + 1 for next line

**Example:**
- Block marker at file line 10
- Error on first line of block content (index 0)
- File line for error: 10 + 0 + 1 = 11

### Why This Design?

- **Consistency**: All line numbers in the API refer to the same coordinate system (the original file)
- **Debugging**: Errors can be traced directly to file positions without mental translation
- **Block extraction**: The marker line is semantically where the block "starts" in the file

## Unresolved Questions

1. Should `key =` alone (no value) be an error or wait for next line?
2. Maximum nesting depth enforcement?
3. Should whitespace-only lines in multiline blocks add empty strings or be ignored?
4. Performance impact of maintaining duplicate key sets?
<<<END>>>

These changes make the code self-documenting by:
1. Renaming `currentBlockStart` → `currentBlockMarkerLine` 
2. Renaming `currentBlockLines` → `currentBlockContentLines`
3. Renaming `lineNum` → `fileLineNumber`
4. Adding explicit comments about the +1 offset in `getLineNumber`
5. Updating documentation to be unambiguous