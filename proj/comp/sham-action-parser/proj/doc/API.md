# SHAM Action Parser API

## Purpose
Parse SHAM block string values into typed data and validate against action schemas in a single pass.

## Public Interface

### parseAction(block: ShamBlock, schemas: ActionSchemas): ParseResult

Parses a SHAM block's string properties into typed values according to the action schema.

**Parameters:**
- `block`: ShamBlock with all string values from SHAM parser
- `schemas`: Action schemas loaded from unified-design.yaml

**Returns:**
- `ParseResult`: Either success with typed action or failure with errors

## Types

```typescript
interface ShamBlock {
  id: string;
  properties: Record<string, string>;  // ALL values are strings
  startLine: number;
  endLine: number | null;
}

interface ParseResult {
  success: boolean;
  action?: TypedAction;  // Only present on success
  errors?: ParseError[];  // Only present on failure
}

interface TypedAction {
  action: string;
  params: Record<string, any>;  // Typed values after parsing
}

interface ParseError {
  code: string;
  message: string;
  param?: string;  // Which parameter had the error
}
```

## Error Codes
- `UNKNOWN_ACTION`: Action type not found in schema
- `MISSING_REQUIRED`: Required parameter missing
- `INVALID_TYPE`: Value cannot be parsed to expected type
- `INVALID_ENUM`: Value not in allowed enum values
- `PARSE_ERROR`: General parsing failure