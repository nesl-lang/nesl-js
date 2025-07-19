=== PROCESSED: 2025-07-19 13:14:24 ===
SUCCESS Block 1: Overwrote /Users/stuart/repos/nesl-lang/nesl-js/proj/comp/sham-action-parser/proj/doc/API.md
SUCCESS Block 2: Created /Users/stuart/repos/nesl-lang/nesl-js/proj/comp/sham-action-parser/proj/test-data/checkActionExists.json
SUCCESS Block 3: Created /Users/stuart/repos/nesl-lang/nesl-js/proj/comp/sham-action-parser/proj/test-data/parseParamValue.json
SUCCESS Block 4: Created /Users/stuart/repos/nesl-lang/nesl-js/proj/comp/sham-action-parser/proj/test-data/getMissingParams.json
SUCCESS Block 5: Created /Users/stuart/repos/nesl-lang/nesl-js/proj/comp/sham-action-parser/proj/test-data/validateUnknownParams.json
ERROR Block 6: File not found: proj/comp/sham-action-parser/proj/test-data/parseAction.json
ERROR Block 7: File not found: proj/comp/sham-action-parser/proj/test-data/parseAction.json
SUCCESS Block 8: Overwrote /Users/stuart/repos/nesl-lang/nesl-js/proj/comp/sham-action-parser/proj/src/parseAction.ts
SUCCESS Block 9: Created /Users/stuart/repos/nesl-lang/nesl-js/proj/comp/sham-action-parser/proj/test/checkActionExists.test.ts
SUCCESS Block 10: Created /Users/stuart/repos/nesl-lang/nesl-js/proj/comp/sham-action-parser/proj/test/parseParamValue.test.ts
SUCCESS Block 11: Created /Users/stuart/repos/nesl-lang/nesl-js/proj/comp/sham-action-parser/proj/test/getMissingParams.test.ts
SUCCESS Block 12: Created /Users/stuart/repos/nesl-lang/nesl-js/proj/comp/sham-action-parser/proj/test/validateUnknownParams.test.ts
SUCCESS Block 13: Created /Users/stuart/repos/nesl-lang/nesl-js/proj/comp/sham-action-parser/proj/test/parseAction.test.ts
SUCCESS Block 14: Overwrote /Users/stuart/repos/nesl-lang/nesl-js/proj/comp/sham-action-parser/proj/src/index.ts
ERROR Block 15: File not found: proj/comp/sham-action-parser/proj/doc/ARCH.md
===

I'll generate edit instructions to restore and improve the structure following XD5 principles.

## Edit Instructions

### 1. Fix API.md to Follow XD5 Format

```
<<<EXPLANATION>>>
Update API.md to follow XD5 template with proper structure, dependencies, and function signatures
<<<FILE>>>
proj/comp/sham-action-parser/proj/doc/API.md
<<<OVERWRITE>>>
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
<<<END>>>
```

### 2. Create Test Data for Internal Functions

```
<<<EXPLANATION>>>
Create test data for checkActionExists function with string-based inputs
<<<FILE>>>
proj/comp/sham-action-parser/proj/test-data/checkActionExists.json
<<<OVERWRITE>>>
{
  "cases": [
    {
      "name": "action exists in schema",
      "input": ["create_file", {
        "create_file": {
          "params": {
            "path": { "type": "string", "required": true },
            "content": { "type": "string", "required": true }
          }
        }
      }],
      "expected": true
    },
    {
      "name": "action does not exist",
      "input": ["unknown_action", {
        "create_file": {
          "params": {}
        }
      }],
      "expected": false
    },
    {
      "name": "empty schema object",
      "input": ["any_action", {}],
      "expected": false
    }
  ]
}
<<<END>>>
```

```
<<<EXPLANATION>>>
Create test data for parseParamValue function
<<<FILE>>>
proj/comp/sham-action-parser/proj/test-data/parseParamValue.json
<<<OVERWRITE>>>
{
  "cases": [
    {
      "name": "string type passthrough",
      "input": ["hello world", { "type": "string" }, "message"],
      "expected": {
        "success": true,
        "value": "hello world"
      }
    },
    {
      "name": "boolean true",
      "input": ["true", { "type": "boolean" }, "enabled"],
      "expected": {
        "success": true,
        "value": true
      }
    },
    {
      "name": "boolean false",
      "input": ["false", { "type": "boolean" }, "enabled"],
      "expected": {
        "success": true,
        "value": false
      }
    },
    {
      "name": "boolean invalid",
      "input": ["yes", { "type": "boolean" }, "enabled"],
      "expected": {
        "success": false,
        "error": {
          "code": "INVALID_TYPE",
          "message": "Parameter 'enabled' must be 'true' or 'false', got 'yes'",
          "param": "enabled"
        }
      }
    },
    {
      "name": "integer valid",
      "input": ["42", { "type": "integer" }, "count"],
      "expected": {
        "success": true,
        "value": 42
      }
    },
    {
      "name": "integer zero",
      "input": ["0", { "type": "integer" }, "count"],
      "expected": {
        "success": true,
        "value": 0
      }
    },
    {
      "name": "integer negative",
      "input": ["-10", { "type": "integer" }, "offset"],
      "expected": {
        "success": true,
        "value": -10
      }
    },
    {
      "name": "integer invalid",
      "input": ["42.5", { "type": "integer" }, "count"],
      "expected": {
        "success": false,
        "error": {
          "code": "INVALID_TYPE",
          "message": "Parameter 'count' must be an integer, got '42.5'",
          "param": "count"
        }
      }
    },
    {
      "name": "enum valid",
      "input": ["read", { "type": "enum", "values": ["read", "write", "execute"] }, "permission"],
      "expected": {
        "success": true,
        "value": "read"
      }
    },
    {
      "name": "enum invalid",
      "input": ["delete", { "type": "enum", "values": ["read", "write", "execute"] }, "permission"],
      "expected": {
        "success": false,
        "error": {
          "code": "INVALID_ENUM",
          "message": "Parameter 'permission' must be one of [read, write, execute], got 'delete'",
          "param": "permission"
        }
      }
    }
  ]
}
<<<END>>>
```

```
<<<EXPLANATION>>>
Create test data for getMissingParams function
<<<FILE>>>
proj/comp/sham-action-parser/proj/test-data/getMissingParams.json
<<<OVERWRITE>>>
{
  "cases": [
    {
      "name": "no missing params",
      "input": [
        ["path", "content"],
        {
          "path": { "type": "string", "required": true },
          "content": { "type": "string", "required": true }
        }
      ],
      "expected": []
    },
    {
      "name": "one missing required param",
      "input": [
        ["path"],
        {
          "path": { "type": "string", "required": true },
          "content": { "type": "string", "required": true }
        }
      ],
      "expected": ["content"]
    },
    {
      "name": "optional param not provided",
      "input": [
        ["path"],
        {
          "path": { "type": "string", "required": true },
          "mode": { "type": "string", "required": false }
        }
      ],
      "expected": []
    },
    {
      "name": "multiple missing params",
      "input": [
        [],
        {
          "source": { "type": "string", "required": true },
          "dest": { "type": "string", "required": true },
          "mode": { "type": "string", "required": false }
        }
      ],
      "expected": ["source", "dest"]
    }
  ]
}
<<<END>>>
```

```
<<<EXPLANATION>>>
Create test data for validateUnknownParams function
<<<FILE>>>
proj/comp/sham-action-parser/proj/test-data/validateUnknownParams.json
<<<OVERWRITE>>>
{
  "cases": [
    {
      "name": "no unknown params",
      "input": [
        ["path", "content"],
        {
          "path": { "type": "string", "required": true },
          "content": { "type": "string", "required": true }
        }
      ],
      "expected": []
    },
    {
      "name": "one unknown param",
      "input": [
        ["path", "content", "extra"],
        {
          "path": { "type": "string", "required": true },
          "content": { "type": "string", "required": true }
        }
      ],
      "expected": ["extra"]
    },
    {
      "name": "typo in param name",
      "input": [
        ["paht", "content"],
        {
          "path": { "type": "string", "required": true },
          "content": { "type": "string", "required": true }
        }
      ],
      "expected": ["paht"]
    }
  ]
}
<<<END>>>
```

### 3. Update parseAction Test Data

```
<<<EXPLANATION>>>
Update parseAction test data to ensure all inputs are strings and add unknown parameter tests
<<<FILE>>>
proj/comp/sham-action-parser/proj/test-data/parseAction.json
<<<SEARCH>>>
  {
    "name": "Valid Actions",
    "tests": [
      {
        "name": "create_file with all params",
        "input": {
          "block": {
            "id": "cr1",
            "properties": {
              "action": "create_file",
              "path": "/tmp/test.txt",
              "content": "Hello World",
              "mode": "0644"
            }
          }
        },
        "expected": {
          "success": true,
          "action": {
            "action": "create_file",
            "params": {
              "path": "/tmp/test.txt",
              "content": "Hello World",
              "mode": "0644"
            }
          }
        }
      }
    ]
  },
<<<REPLACE>>>
  {
    "name": "Valid Actions",
    "tests": [
      {
        "name": "create_file with all params",
        "input": {
          "block": {
            "id": "cr1",
            "properties": {
              "action": "create_file",
              "path": "/tmp/test.txt",
              "content": "Hello World",
              "mode": "0644"
            },
            "startLine": 1,
            "endLine": 5
          }
        },
        "expected": {
          "success": true,
          "action": {
            "action": "create_file",
            "params": {
              "path": "/tmp/test.txt",
              "content": "Hello World",
              "mode": "0644"
            }
          }
        }
      },
      {
        "name": "action with boolean parameter",
        "input": {
          "block": {
            "id": "cp1",
            "properties": {
              "action": "copy",
              "source": "/tmp/src.txt",
              "dest": "/tmp/dest.txt",
              "recursive": "true"
            },
            "startLine": 1,
            "endLine": 5
          }
        },
        "expected": {
          "success": true,
          "action": {
            "action": "copy",
            "params": {
              "source": "/tmp/src.txt",
              "dest": "/tmp/dest.txt",
              "recursive": true
            }
          }
        }
      }
    ]
  },
<<<END>>>
```

```
<<<EXPLANATION>>>
Add test cases for unknown parameters
<<<FILE>>>
proj/comp/sham-action-parser/proj/test-data/parseAction.json
<<<SEARCH>>>
        }
      }
    ]
  }
]
<<<REPLACE>>>
        }
      }
    ]
  },
  {
    "name": "Unknown Parameters",
    "tests": [
      {
        "name": "Unknown parameter causes error",
        "input": {
          "block": {
            "id": "unk1",
            "properties": {
              "action": "create_file",
              "path": "/tmp/test.txt",
              "content": "Hello",
              "unknown_param": "value"
            },
            "startLine": 1,
            "endLine": 5
          }
        },
        "expected": {
          "success": false,
          "errors": [
            {
              "code": "UNKNOWN_PARAMETER",
              "message": "Unknown parameter 'unknown_param' for action 'create_file'",
              "param": "unknown_param"
            }
          ]
        }
      },
      {
        "name": "Typo in parameter name",
        "input": {
          "block": {
            "id": "typ1",
            "properties": {
              "action": "create_file",
              "paht": "/tmp/test.txt",
              "content": "Hello"
            },
            "startLine": 1,
            "endLine": 4
          }
        },
        "expected": {
          "success": false,
          "errors": [
            {
              "code": "MISSING_REQUIRED",
              "message": "Missing required parameter 'path'",
              "param": "path"
            },
            {
              "code": "UNKNOWN_PARAMETER",
              "message": "Unknown parameter 'paht' for action 'create_file'",
              "param": "paht"
            }
          ]
        }
      }
    ]
  }
]
<<<END>>>
```

### 4. Refactor Implementation to Modular Structure

```
<<<EXPLANATION>>>
Refactor parseAction.ts to have testable internal functions while maintaining single-pass approach
<<<FILE>>>
proj/comp/sham-action-parser/proj/src/parseAction.ts
<<<OVERWRITE>>>
import { readFileSync } from 'fs';
import { join } from 'path';
import yaml from 'js-yaml';

// Types
interface ShamBlock {
  id: string;
  properties: Record<string, string>;
  startLine: number;
  endLine: number | null;
}

interface ParseResult {
  success: boolean;
  action?: TypedAction;
  errors?: ParseError[];
}

interface TypedAction {
  action: string;
  params: Record<string, any>;
}

interface ParseError {
  code: 'UNKNOWN_ACTION' | 'MISSING_REQUIRED' | 'INVALID_TYPE' | 'INVALID_ENUM' | 'UNKNOWN_PARAMETER';
  message: string;
  param?: string;
}

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

interface ParsedValue {
  success: boolean;
  value?: any;
  error?: ParseError;
}

// Internal functions for unit testing

export function loadSchemas(): ActionSchemas {
  const schemaPath = join(__dirname, '../../../unified-design/proj/unified-design.yaml');
  const content = readFileSync(schemaPath, 'utf8');
  const data = yaml.load(content) as any;
  return data.actions || {};
}

export function checkActionExists(action: string, schemas: ActionSchemas): boolean {
  return action in schemas;
}

export function parseParamValue(value: string, schema: ParamSchema, paramName: string): ParsedValue {
  switch (schema.type) {
    case 'string':
      return { success: true, value };
    
    case 'boolean':
      if (value === 'true') return { success: true, value: true };
      if (value === 'false') return { success: true, value: false };
      return {
        success: false,
        error: {
          code: 'INVALID_TYPE',
          message: `Parameter '${paramName}' must be 'true' or 'false', got '${value}'`,
          param: paramName
        }
      };
    
    case 'integer':
      const num = parseInt(value, 10);
      if (Number.isInteger(num) && num.toString() === value) {
        return { success: true, value: num };
      }
      return {
        success: false,
        error: {
          code: 'INVALID_TYPE',
          message: `Parameter '${paramName}' must be an integer, got '${value}'`,
          param: paramName
        }
      };
    
    case 'enum':
      if (schema.values && schema.values.includes(value)) {
        return { success: true, value };
      }
      return {
        success: false,
        error: {
          code: 'INVALID_ENUM',
          message: `Parameter '${paramName}' must be one of [${schema.values?.join(', ')}], got '${value}'`,
          param: paramName
        }
      };
    
    default:
      return {
        success: false,
        error: {
          code: 'INVALID_TYPE',
          message: `Unknown type '${schema.type}' for parameter '${paramName}'`,
          param: paramName
        }
      };
  }
}

export function getMissingParams(provided: string[], schema: ActionSchema): string[] {
  const missing: string[] = [];
  
  for (const [paramName, paramSchema] of Object.entries(schema.params)) {
    if (paramSchema.required && !provided.includes(paramName)) {
      missing.push(paramName);
    }
  }
  
  return missing;
}

export function validateUnknownParams(provided: string[], schema: ActionSchema): string[] {
  const schemaParams = Object.keys(schema.params);
  return provided.filter(param => param !== 'action' && !schemaParams.includes(param));
}

// Main export function

export function parseAction(block: ShamBlock, schemas?: ActionSchemas): ParseResult {
  const errors: ParseError[] = [];
  const loadedSchemas = schemas || loadSchemas();
  
  // Get action from properties
  const actionName = block.properties.action;
  if (!actionName) {
    return {
      success: false,
      errors: [{
        code: 'MISSING_REQUIRED',
        message: "Missing required 'action' parameter"
      }]
    };
  }
  
  // Check if action exists
  if (!checkActionExists(actionName, loadedSchemas)) {
    return {
      success: false,
      errors: [{
        code: 'UNKNOWN_ACTION',
        message: `Unknown action type '${actionName}'`
      }]
    };
  }
  
  const actionSchema = loadedSchemas[actionName];
  const providedParams = Object.keys(block.properties);
  
  // Check for missing required params
  const missingParams = getMissingParams(providedParams, actionSchema);
  for (const param of missingParams) {
    errors.push({
      code: 'MISSING_REQUIRED',
      message: `Missing required parameter '${param}'`,
      param
    });
  }
  
  // Check for unknown params
  const unknownParams = validateUnknownParams(providedParams, actionSchema);
  for (const param of unknownParams) {
    errors.push({
      code: 'UNKNOWN_PARAMETER',
      message: `Unknown parameter '${param}' for action '${actionName}'`,
      param
    });
  }
  
  // Parse all known params
  const typedParams: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(block.properties)) {
    if (key === 'action') continue;
    
    const paramSchema = actionSchema.params[key];
    if (!paramSchema) continue; // Unknown param, already reported
    
    const parseResult = parseParamValue(value, paramSchema, key);
    if (!parseResult.success && parseResult.error) {
      errors.push(parseResult.error);
    } else if (parseResult.success) {
      typedParams[key] = parseResult.value;
    }
  }
  
  if (errors.length > 0) {
    return { success: false, errors };
  }
  
  return {
    success: true,
    action: {
      action: actionName,
      params: typedParams
    }
  };
}
<<<END>>>
```

### 5. Create Unit Test Files

```
<<<EXPLANATION>>>
Create unit test for checkActionExists
<<<FILE>>>
proj/comp/sham-action-parser/proj/test/checkActionExists.test.ts
<<<OVERWRITE>>>
import { describe, it, expect } from 'vitest';
import { checkActionExists } from '../src/parseAction';
import testCases from '../test-data/checkActionExists.json';

describe('checkActionExists', () => {
  testCases.cases.forEach(testCase => {
    it(testCase.name, () => {
      const result = checkActionExists(...testCase.input);
      expect(result).toEqual(testCase.expected);
    });
  });
});
<<<END>>>
```

```
<<<EXPLANATION>>>
Create unit test for parseParamValue
<<<FILE>>>
proj/comp/sham-action-parser/proj/test/parseParamValue.test.ts
<<<OVERWRITE>>>
import { describe, it, expect } from 'vitest';
import { parseParamValue } from '../src/parseAction';
import testCases from '../test-data/parseParamValue.json';

describe('parseParamValue', () => {
  testCases.cases.forEach(testCase => {
    it(testCase.name, () => {
      const result = parseParamValue(...testCase.input);
      expect(result).toEqual(testCase.expected);
    });
  });
});
<<<END>>>
```

```
<<<EXPLANATION>>>
Create unit test for getMissingParams
<<<FILE>>>
proj/comp/sham-action-parser/proj/test/getMissingParams.test.ts
<<<OVERWRITE>>>
import { describe, it, expect } from 'vitest';
import { getMissingParams } from '../src/parseAction';
import testCases from '../test-data/getMissingParams.json';

describe('getMissingParams', () => {
  testCases.cases.forEach(testCase => {
    it(testCase.name, () => {
      const result = getMissingParams(...testCase.input);
      expect(result).toEqual(testCase.expected);
    });
  });
});
<<<END>>>
```

```
<<<EXPLANATION>>>
Create unit test for validateUnknownParams
<<<FILE>>>
proj/comp/sham-action-parser/proj/test/validateUnknownParams.test.ts
<<<OVERWRITE>>>
import { describe, it, expect } from 'vitest';
import { validateUnknownParams } from '../src/parseAction';
import testCases from '../test-data/validateUnknownParams.json';

describe('validateUnknownParams', () => {
  testCases.cases.forEach(testCase => {
    it(testCase.name, () => {
      const result = validateUnknownParams(...testCase.input);
      expect(result).toEqual(testCase.expected);
    });
  });
});
<<<END>>>
```

```
<<<EXPLANATION>>>
Create main parseAction test
<<<FILE>>>
proj/comp/sham-action-parser/proj/test/parseAction.test.ts
<<<OVERWRITE>>>
import { describe, it, expect } from 'vitest';
import { parseAction } from '../src/parseAction';
import testData from '../test-data/parseAction.json';

// Mock the loadSchemas function
const mockSchemas = {
  create_file: {
    params: {
      path: { type: 'string', required: true },
      content: { type: 'string', required: true },
      mode: { type: 'string', required: false }
    }
  },
  copy: {
    params: {
      source: { type: 'string', required: true },
      dest: { type: 'string', required: true },
      recursive: { type: 'boolean', required: false }
    }
  }
};

describe('parseAction', () => {
  testData.forEach(group => {
    describe(group.name, () => {
      group.tests.forEach(test => {
        it(test.name, () => {
          const result = parseAction(test.input.block, mockSchemas);
          expect(result).toEqual(test.expected);
        });
      });
    });
  });
});
<<<END>>>
```

### 6. Update Exports

```
<<<EXPLANATION>>>
Update index.ts to only export public API, not internal functions
<<<FILE>>>
proj/comp/sham-action-parser/proj/src/index.ts
<<<OVERWRITE>>>
export { parseAction } from './parseAction';
export type { ParseResult, ParseError, TypedAction, ShamBlock } from './parseAction';
<<<END>>>
```

### 7. Update Architecture Documentation

```
<<<EXPLANATION>>>
Update ARCH.md to reflect the modular but single-pass design
<<<FILE>>>
proj/comp/sham-action-parser/proj/doc/ARCH.md
<<<SEARCH>>>
## Design Decisions

1. **Single-Pass Parse+Validate**: Type conversion and validation are inseparable operations
2. **Schema-Driven**: All validation rules come from unified-design.yaml
3. **String Input Only**: SHAM parser outputs only strings; this component does all type conversion
4. **Type Coercion Rules**:
   - Boolean: "true" → true, "false" → false, anything else is error
   - Integer: parseInt(str, 10) with Number.isInteger() check
   - Enum: Exact string match from schema values array
   - String: Pass through unchanged
<<<REPLACE>>>
## Design Decisions

1. **Single-Pass Parse+Validate**: Type conversion and validation are inseparable operations
2. **Schema-Driven**: All validation rules come from unified-design.yaml
3. **String Input Only**: SHAM parser outputs only strings; this component does all type conversion
4. **Type Coercion Rules**:
   - Boolean: "true" → true, "false" → false, anything else is error
   - Integer: parseInt(str, 10) with Number.isInteger() check
   - Enum: Exact string match from schema values array
   - String: Pass through unchanged
5. **Modular Internal Structure**: Pure functions for testability while maintaining single-pass semantics
6. **Error Collection**: Collect all errors rather than fail-fast for better UX
7. **Unknown Parameters**: Treated as errors to catch typos early
8. **Case Sensitivity**: Strict matching (e.g., "true" not "True")

## Internal Architecture

While `parseAction` is the only public function, it's composed of testable units:
- `checkActionExists`: Verify action is in schema
- `parseParamValue`: Convert string to typed value
- `getMissingParams`: Find required params not provided
- `validateUnknownParams`: Find params not in schema

This allows comprehensive unit testing while keeping the single-pass guarantee.
<<<END>>>
```

## Summary

These edits:
1. ✅ Restore modular test structure with proper string inputs
2. ✅ Fix API.md to follow XD5 format exactly
3. ✅ Refactor implementation to be modular but single-pass
4. ✅ Create comprehensive test data files
5. ✅ Add strict unknown parameter checking
6. ✅ Follow XD5's test-first and documentation-complete principles

The key improvements:
- Internal functions are testable units but not exported
- All test data shows string inputs
- Unknown parameters cause errors (no silent pass-through)
- Follows XD5 structure and philosophy
- Maintains single-pass parse+validate insight