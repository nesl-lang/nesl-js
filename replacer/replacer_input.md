=== PROCESSED: 2025-07-10 16:12:58 ===
SUCCESS Block 1: Updated /Users/stuart/repos/nesl-lang/nesl-js/app/src/block-extractor.ts
SUCCESS Block 2: Updated /Users/stuart/repos/nesl-lang/nesl-js/app/src/types.ts
===

Looking at the test failures and the line number convention discussion in TODO.md, the issue is clear:

**Current state:**
- `block-extractor.ts` line 56: `startLine: currentBlockStart + 1`
- This makes `startLine` point to the first content line, not the marker line
- Tests expect `startLine` to be the marker line

**The fix is simple:**

<<<EXPLANATION>>>
Remove the +1 offset when setting startLine in block-extractor.ts to match test expectations and architecture docs
<<<FILE>>>
app/src/block-extractor.ts
<<<SEARCH>>>
        blocks.push({
          content: currentBlockLines.join('\n'),
          startLine: currentBlockStart + 1  // Content starts on line after marker
        });
<<<REPLACE>>>
        blocks.push({
          content: currentBlockLines.join('\n'),
          startLine: currentBlockStart  // Line number of the marker itself
        });
<<<END>>>

<<<EXPLANATION>>>
Update comment to reflect that startLine is the marker line
<<<FILE>>>
app/src/types.ts
<<<SEARCH>>>
export interface Block {
  content: string;
  startLine: number; // 1-based file line number of the <<<<<<<<<nesl marker
}
<<<REPLACE>>>
export interface Block {
  content: string;
  startLine: number; // 1-based file line number where <<<<<<<<<nesl marker appears
}
<<<END>>>

This aligns with:
1. Test expectations (blocks at lines 1, 11, 19)
2. Architecture doc stating "Block.startLine represents the line number where the `<<<<<<<<<nesl` marker appears"
3. The parser's internal logic that adds 1 to get from marker line to content line

The other test failures (005_key_over_limit, 006_custom_delimiters) appear unrelated to line numbers - they're failing because no blocks are being extracted, likely due to custom delimiter configuration not being passed correctly.