# Component: sham-action-parser

## Component Type
standard

## Documentation Debt
[Must be empty before implementation]

## Dependencies

```yaml
dependencies:
  external/js-yaml:
    functions: [load]
  
  external/fs:
    functions: [readFileSync]
  
  external/path:
    functions: [join]
```

## Exports

### parseAction
- **Signature**: `parseAction(block: ShamBlock, schemas?: ActionSchemas) -> ParseResult`
- **Purpose**: Parse SHAM block string values into typed data and validate against action schemas.
- **Throws**: Never (errors returned in result)
- **Test-data**: `test-data/parseAction.json`

### Types Exported
- `ShamBlock`: Input block with string properties from SHAM parser
- `ParseResult`: Success/failure result with typed action or errors
- `ParseError`: Error details with code, message, and parameter
- `TypedAction`: Parsed action with typed parameters

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
  code: 'UNKNOWN_ACTION' | 'MISSING_REQUIRED' | 'INVALID_TYPE' | 'INVALID_ENUM' | 'UNKNOWN_PARAMETER';
  message: string;
  param?: string;  // Which parameter had the error
}

// Internal types (not exported)
interface ActionSchema {
  params: Record<string, ParamSchema>;
}

interface ParamSchema {
  type: 'string' | 'boolean' | 'integer' | 'enum';
  required?: boolean;
  values?: string[];  // For enum type
}

interface ActionSchemas {
  [actionName: string]: ActionSchema;
}
```