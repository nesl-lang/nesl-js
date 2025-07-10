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

