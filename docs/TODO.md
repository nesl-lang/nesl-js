https://claude.ai/chat/9deecd4a-d0fd-4652-a891-beb2284ffb4c

## Unresolved Questions & Executive Decisions

1. **How to handle `key = {`?**
   - Decision: Classify as assignment. Handler checks if value is exactly `{`, `[`, or `(`. If yes, push new context and transition state.

2. **When to check max nesting depth?**
   - Decision: When pushing new context. If stack.length >= 100, error.

3. **EOF context generation?**
   - Decision: Last 5 lines of block content. Empty string for content field.

4. **String parser integration?**
   - Decision: Call parseStringLiteral only after extracting value portion from assignment/array element.

5. **Delimiter mismatch recovery?**
   - Decision: Return partial structure, pop context, continue in parent. Not truly "fatal" - only fatal within current structure.

## Final Summary

The block parser is a line-oriented state machine with three states (OBJECT, ARRAY, MULTILINE) and an explicit context stack. Each line is classified syntactically, then the current state handler applies semantic rules.

Key simplifications:
- No lookahead needed
- No regex for classification
- Assignment handler does the heavy lifting for structure transitions
- Error recovery through line skipping (except delimiter mismatch)

The architecture is elegant: classify line → check state rules → update structure → repeat.

Ready to implement with this understanding.


-----------------------

Unresolved Questions & Decisions

Should rest preserve original spacing?

Decision: Yes. Preserve exact substring after = or - for accurate error reporting.
key = value → rest: " value"
key=value → rest: "value"


Remove string_literal from LineType?

Decision: Yes. Update types.ts to remove unused variant.


Is array element detection appropriate in classifier?

Decision: Yes. The - is structural syntax like =. The difference: = requires a key, - doesn't.


Should classifier handle all structural tokens?

Decision: Yes. Any syntax that affects state machine transitions belongs in classifier.



Final Design
Line classification identifies structural syntax only:

Delimiters: {, }, [, ], (, )
Assignment: contains = with non-empty key
Array element: starts with -
Blank lines
Everything else: unknown

State handlers receive classified lines and:

Validate context (right syntax for current state)
Parse values (strings, nested structures)
Update data structures
Transition states

This separation makes both components simpler and more testable.
https://claude.ai/chat/9deecd4a-d0fd-4652-a891-beb2284ffb4c

@#*$&^@#*&$^*@&#^$


## NESL Parser Implementation Decisions

### Architecture Clarifications
- Line classification identifies structural syntax only (delimiters, assignments, array elements)
- String literal detection happens in state handlers with access to options
- State machine with explicit context stack, not recursive functions
- Three states: OBJECT, ARRAY, MULTILINE

### Line Classifier Design
- Extracted to `line-classifier.ts` for testability
- Returns exact content in `line` field for error reporting (no trimming)
- Preserves exact spacing in `rest` field after `=` or `-`
- Does NOT detect string literals (avoids options dependency)
- Test cases saved in `nesl-test/tests/unit/line-classification/test-cases.json`

### Implementation Status
- ✅ Block extractor complete
- ✅ String parser complete  
- ✅ Line classifier complete with tests
- ❌ Block parser stub only

### Critical Realizations
- `{}` on single line requires inline structure detection
- Special cases proliferate without proper state machine
- Architecture doc underspecifies key behaviors:
  - How `key = {` transitions to OBJECT state
  - Inline structure detection logic
  - Empty assignment handling

### Next Steps
Implement proper state machine for block parser:

1. **Context stack management** - push/pop for nesting
2. **State handlers** - OBJECT, ARRAY, MULTILINE with proper transitions
3. **Value parsing** - integrate string parser, handle structures
4. **Error generation** - proper line numbers and context

Key challenge: Assignment handler must detect structural values (`{`, `[`, `(`) and transition states appropriately while rejecting inline structures like `key = {}`.

### Unresolved Questions
- Max nesting depth check: on push or in handler?
- Delimiter mismatch recovery: return partial structure or truly fatal?
- How to handle `key = {}` vs `key = {` + newline + `}`?

The hack approach fails. Must implement real parser.


@#*&$#*@&$^

note: " hack approach fails" is in reference to "export function parseBlock" in block-parser.ts

we tried doing a sloppy approach.  im pretty sure it needs to be totally rewritten.

and line-classifier is pretty good but first we need to fix thsi stuff in nesl-test/tests/unit/line-classification/test-cases.json

    { "input": "{}", "expected": { "type": "unknown", "line": "{}" } },

    ..... thsi should be functional inline empty object creation


    and what about this?

        { "input": "{x", "expected": { "type": "unknown", "line": "{x" } },

... should'nt aht be "object_start" but then the system gives an error eventually because the start is invalid ?  idk tho. wdyt?
