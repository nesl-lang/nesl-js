=== START FILE: ./proj/test-data/execute.md ===
# Execute Tests

## basic operations

### 001-single-file-create

```sh sham
#!SHAM [@three-char-SHA-256: abc]
action = "file_create"
path = "/tmp/test.txt"
content = "hello world"
#!END_SHAM_abc
```

```json
{
  "success": true,
  "totalBlocks": 1,
  "executedActions": 1,
  "results": [{
    "seq": 1,
    "blockId": "abc",
    "action": "file_create",
    "params": {
      "action": "file_create",
      "path": "/tmp/test.txt",
      "content": "hello world"
    },
    "success": true
  }],
  "parseErrors": []
}
```

### 002-multiple-blocks-mixed-success

```sh sham
#!SHAM [@three-char-SHA-256: f1r]
action = "file_create"
path = "/tmp/first.txt"
content = "first"
#!END_SHAM_f1r

Some text between blocks

#!SHAM [@three-char-SHA-256: s3c]
action = "file_write"
path = "/tmp/nonexistent/second.txt"
content = "fails"
#!END_SHAM_s3c
```

```json
{
  "success": false,
  "totalBlocks": 2,
  "executedActions": 2,
  "results": [{
    "seq": 1,
    "blockId": "f1r",
    "action": "file_create",
    "params": {
      "action": "file_create",
      "path": "/tmp/first.txt",
      "content": "first"
    },
    "success": true
  }, {
    "seq": 2,
    "blockId": "s3c",
    "action": "file_write",
    "params": {
      "action": "file_write",
      "path": "/tmp/nonexistent/second.txt",
      "content": "fails"
    },
    "success": false,
    "error": "ENOENT: no such file or directory"
  }],
  "parseErrors": []
}
```

## error handling

### 003-invalid-action

```sh sham
#!SHAM [@three-char-SHA-256: inv]
action = "invalid_action"
path = "/tmp/test.txt"
#!END_SHAM_inv
```

```json
{
  "success": false,
  "totalBlocks": 1,
  "executedActions": 0,
  "results": [{
    "seq": 1,
    "blockId": "inv",
    "action": "invalid_action",
    "params": {
      "action": "invalid_action",
      "path": "/tmp/test.txt"
    },
    "success": false,
    "error": "Unknown action: invalid_action"
  }],
  "parseErrors": []
}
```

### 004-parser-error-continues

```sh sham
#!SHAM [@three-char-SHA-256: dup]
key = "first"
key = "second"
#!END_SHAM_dup

#!SHAM [@three-char-SHA-256: ok]
action = "file_create"
path = "/tmp/after-error.txt"
content = "should work"
#!END_SHAM_ok
```

```json
{
  "success": false,
  "totalBlocks": 2,
  "executedActions": 1,
  "results": [{
    "seq": 1,
    "blockId": "ok",
    "action": "file_create",
    "params": {
      "action": "file_create",
      "path": "/tmp/after-error.txt",
      "content": "should work"
    },
    "success": true
  }],
  "parseErrors": [{
    "blockId": "dup",
    "error": {
      "code": "DUPLICATE_KEY",
      "message": "Duplicate key 'key' in block 'dup'"
    }
  }]
}
```

## command execution

### 005-exec-bash

```sh sham
#!SHAM [@three-char-SHA-256: cmd]
action = "exec"
code = "echo 'hello from shell'"
lang = "bash"
#!END_SHAM_cmd
```

```json
{
  "success": true,
  "totalBlocks": 1,
  "executedActions": 1,
  "results": [{
    "seq": 1,
    "blockId": "cmd",
    "action": "exec",
    "params": {
      "action": "exec",
      "code": "echo 'hello from shell'",
      "lang": "bash"
    },
    "success": true,
    "data": {
      "stdout": "hello from shell\n",
      "stderr": "",
      "exit_code": 0
    }
  }],
  "parseErrors": []
}
```
=== END FILE: ./proj/test-data/execute.md ===

=== START FILE: ./proj/comp/sham-validator/proj/test/validateAction.test.ts ===
import { validateAction } from '../src/index.js';
import testData from '../test-data/validateAction.json' assert { type: 'json' };

describe('validateAction', () => {
  testData.cases.forEach((testCase) => {
    it(testCase.name, () => {
      const [block, schemas] = testCase.input;
      const result = validateAction(block, schemas);
      expect(result).toEqual(testCase.expected);
    });
  });
});
=== END FILE: ./proj/comp/sham-validator/proj/test/validateAction.test.ts ===

=== START FILE: ./proj/comp/sham-validator/proj/test-data/validateAction.json ===
 {
  "cases": [
    {
      "name": "valid file_create action",
      "input": [
        {
          "id": "abc",
          "properties": {
            "action": "file_create",
            "path": "/tmp/test.txt",
            "content": "hello world"
          },
          "startLine": 1,
          "endLine": 5
        },
        {
          "file_create": {
            "parameters": {
              "path": {"type": "string", "required": true},
              "content": {"type": "string", "required": true}
            }
          }
        }
      ],
      "expected": {
        "valid": true,
        "block": {
          "id": "abc",
          "properties": {
            "action": "file_create",
            "path": "/tmp/test.txt",
            "content": "hello world"
          },
          "startLine": 1,
          "endLine": 5
        }
      }
    },
    {
      "name": "unknown action",
      "input": [
        {
          "id": "xyz",
          "properties": {
            "action": "invalid_action",
            "path": "/tmp/test.txt"
          },
          "startLine": 1,
          "endLine": 3
        },
        {
          "file_create": {
            "parameters": {
              "path": {"type": "string", "required": true},
              "content": {"type": "string", "required": true}
            }
          },
          "file_write": {
            "parameters": {
              "path": {"type": "string", "required": true},
              "content": {"type": "string", "required": true}
            }
          }
        }
      ],
      "expected": {
        "valid": false,
        "error": {
          "code": "UNKNOWN_ACTION",
          "action": "invalid_action",
          "availableActions": ["file_create", "file_write"],
          "message": "Unknown action 'invalid_action'. Available actions: file_create, file_write"
        }
      }
    },
    {
      "name": "missing required parameter",
      "input": [
        {
          "id": "def",
          "properties": {
            "action": "file_create",
            "path": "/tmp/test.txt"
          },
          "startLine": 1,
          "endLine": 3
        },
        {
          "file_create": {
            "parameters": {
              "path": {"type": "string", "required": true},
              "content": {"type": "string", "required": true}
            }
          }
        }
      ],
      "expected": {
        "valid": false,
        "error": {
          "code": "MISSING_PARAM",
          "action": "file_create",
          "param": "content",
          "message": "Missing required parameter 'content' for action 'file_create'"
        }
      }
    },
    {
      "name": "invalid parameter type",
      "input": [
        {
          "id": "ghi",
          "properties": {
            "action": "exec",
            "code": "print('hello')",
            "lang": "python",
            "timeout": "30s"
          },
          "startLine": 1,
          "endLine": 5
        },
        {
          "exec": {
            "parameters": {
              "code": {"type": "string", "required": true},
              "lang": {"type": "enum", "values": ["python", "javascript", "bash", "ruby"], "required": true},
              "timeout": {"type": "integer", "required": false}
            }
          }
        }
      ],
      "expected": {
        "valid": false,
        "error": {
          "code": "INVALID_TYPE",
          "action": "exec",
          "param": "timeout",
          "expected": "integer",
          "actual": "string",
          "message": "Invalid type for parameter 'timeout' in action 'exec': expected integer, got string"
        }
      }
    },
    {
      "name": "invalid enum value",
      "input": [
        {
          "id": "jkl",
          "properties": {
            "action": "exec",
            "code": "print('hello')",
            "lang": "perl"
          },
          "startLine": 1,
          "endLine": 4
        },
        {
          "exec": {
            "parameters": {
              "code": {"type": "string", "required": true},
              "lang": {"type": "enum", "values": ["python", "javascript", "bash", "ruby"], "required": true}
            }
          }
        }
      ],
      "expected": {
        "valid": false,
        "error": {
          "code": "INVALID_TYPE",
          "action": "exec",
          "param": "lang",
          "expected": "enum[python,javascript,bash,ruby]",
          "actual": "perl",
          "message": "Invalid value for parameter 'lang' in action 'exec': expected one of [python,javascript,bash,ruby], got 'perl'"
        }
      }
    },
    {
      "name": "extra parameters allowed",
      "input": [
        {
          "id": "mno",
          "properties": {
            "action": "file_create",
            "path": "/tmp/test.txt",
            "content": "hello",
            "extra": "ignored",
            "another": 123
          },
          "startLine": 1,
          "endLine": 7
        },
        {
          "file_create": {
            "parameters": {
              "path": {"type": "string", "required": true},
              "content": {"type": "string", "required": true}
            }
          }
        }
      ],
      "expected": {
        "valid": true,
        "block": {
          "id": "mno",
          "properties": {
            "action": "file_create",
            "path": "/tmp/test.txt",
            "content": "hello",
            "extra": "ignored",
            "another": 123
          },
          "startLine": 1,
          "endLine": 7
        }
      }
    },
    {
      "name": "null value for required parameter",
      "input": [
        {
          "id": "pqr",
          "properties": {
            "action": "file_create",
            "path": "/tmp/test.txt",
            "content": null
          },
          "startLine": 1,
          "endLine": 4
        },
        {
          "file_create": {
            "parameters": {
              "path": {"type": "string", "required": true},
              "content": {"type": "string", "required": true}
            }
          }
        }
      ],
      "expected": {
        "valid": false,
        "error": {
          "code": "MISSING_PARAM",
          "action": "file_create",
          "param": "content",
          "message": "Missing required parameter 'content' for action 'file_create'"
        }
      }
    },
    {
      "name": "empty string valid for string type",
      "input": [
        {
          "id": "stu",
          "properties": {
            "action": "file_create",
            "path": "/tmp/empty.txt",
            "content": ""
          },
          "startLine": 1,
          "endLine": 4
        },
        {
          "file_create": {
            "parameters": {
              "path": {"type": "string", "required": true},
              "content": {"type": "string", "required": true}
            }
          }
        }
      ],
      "expected": {
        "valid": true,
        "block": {
          "id": "stu",
          "properties": {
            "action": "file_create",
            "path": "/tmp/empty.txt",
            "content": ""
          },
          "startLine": 1,
          "endLine": 4
        }
      }
    },
    {
      "name": "boolean type validation",
      "input": [
        {
          "id": "vwx",
          "properties": {
            "action": "dir_create",
            "path": "/tmp/mydir",
            "recursive": "true"
          },
          "startLine": 1,
          "endLine": 4
        },
        {
          "dir_create": {
            "parameters": {
              "path": {"type": "string", "required": true},
              "recursive": {"type": "boolean", "required": false}
            }
          }
        }
      ],
      "expected": {
        "valid": false,
        "error": {
          "code": "INVALID_TYPE",
          "action": "dir_create",
          "param": "recursive",
          "expected": "boolean",
          "actual": "string",
          "message": "Invalid type for parameter 'recursive' in action 'dir_create': expected boolean, got string"
        }
      }
    },
    {
      "name": "integer type validation - valid",
      "input": [
        {
          "id": "yz1",
          "properties": {
            "action": "file_edit",
            "path": "/tmp/test.txt",
            "old_text": "foo",
            "new_text": "bar",
            "count": 5
          },
          "startLine": 1,
          "endLine": 6
        },
        {
          "file_edit": {
            "parameters": {
              "path": {"type": "string", "required": true},
              "old_text": {"type": "string", "required": true},
              "new_text": {"type": "string", "required": true},
              "count": {"type": "integer", "required": false}
            }
          }
        }
      ],
      "expected": {
        "valid": true,
        "block": {
          "id": "yz1",
          "properties": {
            "action": "file_edit",
            "path": "/tmp/test.txt",
            "old_text": "foo",
            "new_text": "bar",
            "count": 5
          },
          "startLine": 1,
          "endLine": 6
        }
      }
    },
    {
      "name": "integer type validation - float rejected",
      "input": [
        {
          "id": "234",
          "properties": {
            "action": "file_edit",
            "path": "/tmp/test.txt",
            "old_text": "foo",
            "new_text": "bar",
            "count": 5.5
          },
          "startLine": 1,
          "endLine": 6
        },
        {
          "file_edit": {
            "parameters": {
              "path": {"type": "string", "required": true},
              "old_text": {"type": "string", "required": true},
              "new_text": {"type": "string", "required": true},
              "count": {"type": "integer", "required": false}
            }
          }
        }
      ],
      "expected": {
        "valid": false,
        "error": {
          "code": "INVALID_TYPE",
          "action": "file_edit",
          "param": "count",
          "expected": "integer",
          "actual": "number",
          "message": "Invalid type for parameter 'count' in action 'file_edit': expected integer, got number"
        }
      }
    }
  ]
}
=== END FILE: ./proj/comp/sham-validator/proj/test-data/validateAction.json ===

=== START FILE: ./proj/comp/sham-validator/proj/doc/API.md ===
 # Component: sham-validator

## Component Type
standard

## Dependencies

```yaml
dependencies:
  external/nesl-js:
    types: [ShamBlock]
```

## Exports

```yaml
exports:
  functions: [validateAction]
  types: [ValidationError, ValidationResult]
```

### validateAction
- **Signature**: `validateAction(block: ShamBlock, schemas: ActionSchemas): ValidationResult`
- **Purpose**: Validates SHAM block against action schemas, ensuring action exists and has required parameters with correct types.
- **Returns**: `{ valid: true, block: ShamBlock } | { valid: false, error: ValidationError }`
- **Test-data**: `test-data/validateAction.json`

### ValidationError (type)
```typescript
interface ValidationError {
  code: 'UNKNOWN_ACTION' | 'MISSING_PARAM' | 'INVALID_TYPE' | 'SCHEMA_ERROR'
  action?: string              // The action that failed validation
  param?: string              // The parameter that failed (if applicable)
  expected?: string           // Expected type/value
  actual?: string            // Actual type/value received
  availableActions?: string[] // For UNKNOWN_ACTION errors
  message: string            // Human-readable error message
}
```

### ValidationResult (type)
```typescript
type ValidationResult = 
  | { valid: true; block: ShamBlock }
  | { valid: false; error: ValidationError }
```

### ActionSchemas (type)
```typescript
interface ActionSchemas {
  [actionName: string]: {
    parameters: {
      [paramName: string]: {
        type: 'string' | 'integer' | 'boolean' | 'enum'
        required: boolean
        values?: string[]  // For enum type
      }
    }
  }
}
```
=== END FILE: ./proj/comp/sham-validator/proj/doc/API.md ===

=== START FILE: ./proj/comp/sham-validator/proj/doc/ARCH.md ===
 # sham-validator Architecture

## Core Design Decisions

### Schema Management
**Decision**: Load schemas from JSON file at startup
**Rationale**: 
- Single source of truth with unified-design.yaml
- No runtime parsing overhead
- Easy to regenerate when YAML changes
**Trade-off**: Manual sync between YAML and JSON needed

### Validation Strategy
**Decision**: Structural validation only
**Rationale**:
- Fast, predictable validation
- Clear separation from execution concerns
- Semantic validation belongs at execution (e.g., file exists)

### Error Design
```typescript
interface ValidationError {
  code: 'UNKNOWN_ACTION' | 'MISSING_PARAM' | 'INVALID_TYPE' | 'SCHEMA_ERROR'
  action?: string
  param?: string
  expected?: string
  actual?: string
  availableActions?: string[]
  message: string
}
```

**Decision**: Rich error objects over string messages
**Rationale**: LLMs can parse structured errors better than prose

### Type Validation Rules
- `string`: typeof === 'string'
- `integer`: Number.isInteger()
- `boolean`: typeof === 'boolean'
- `enum`: value in allowed set
- Arrays and objects: Deep validation

### Schema Format
```json
{
  "file_create": {
    "parameters": {
      "path": {"type": "string", "required": true},
      "content": {"type": "string", "required": true}
    }
  },
  "exec": {
    "parameters": {
      "code": {"type": "string", "required": true},
      "lang": {"type": "enum", "values": ["python", "javascript", "bash", "ruby"], "required": true},
      "version": {"type": "string", "required": false},
      "cwd": {"type": "string", "required": false}
    }
  }
}
```

### Validation Flow
1. Check action exists in schema
2. Get action schema
3. Check all required params present
4. Validate each param type
5. Return validated block or error

### Edge Cases
- **Extra parameters**: Allowed, pass through unchanged
- **Null values**: Treated as missing for required params
- **Empty strings**: Valid for string type
- **Type coercion**: None - strict type checking

### Performance Considerations
- Schema loaded once at startup
- No async operations
- O(n) where n is parameter count
- Early exit on first error

### Future Considerations
- **Schema versioning**: How to handle schema evolution?
- **Custom validators**: For complex types like paths?
- **Warning vs errors**: Some validations could be warnings?
=== END FILE: ./proj/comp/sham-validator/proj/doc/ARCH.md ===

=== START FILE: ./proj/comp/sham-validator/proj/src/index.ts ===
// Types from API.md
export interface ValidationError {
  code: 'UNKNOWN_ACTION' | 'MISSING_PARAM' | 'INVALID_TYPE' | 'SCHEMA_ERROR';
  action?: string;
  param?: string;
  expected?: string;
  actual?: string;
  availableActions?: string[];
  message: string;
}

export type ValidationResult = 
  | { valid: true; block: any }
  | { valid: false; error: ValidationError };

export interface ActionSchemas {
  [actionName: string]: {
    parameters: {
      [paramName: string]: {
        type: 'string' | 'integer' | 'boolean' | 'enum';
        required: boolean;
        values?: string[];
      }
    }
  }
}

// Stub implementation - will fail all tests
export function validateAction(_block: any, _schemas: ActionSchemas): ValidationResult {
  throw new Error('Not implemented');
}
=== END FILE: ./proj/comp/sham-validator/proj/src/index.ts ===

=== START FILE: ./proj/doc/API.md ===
# Component: clada

## Component Type
standard

## Dependencies

```yaml
dependencies:
  proj/comp/sham-ast-converter:
    functions: [convertToAction]
    types: [ConversionError]
  
  proj/comp/fs-ops:
    functions: [createFile, writeFile, deleteFile, moveFile, readFile,
                createDir, deleteDir, listDir, searchFiles, globFiles]
    types: [FileOpResult]
  
  proj/comp/exec:
    functions: [executeCommand]
    types: [ExecResult]
  
  proj/comp/git-tx:
    functions: [ensureCleanRepo, commitChanges]
    types: [GitError]
  
  external/nesl-js:
    functions: [parseSHAM]
    types: [ShamParseResult, ShamBlock, ShamError]
```

## Exports

```yaml
exports:
  classes:
    Clada:
      methods: [execute]
  types: 
    - ExecutionResult
    - ActionResult  
    - ParseError
    - CladaOptions
```

### Clada (class)
- **Purpose**: Main orchestrator executing SHAM blocks from LLM output
- **Constructor**: `new Clada(options?: CladaOptions)`

### execute
- **Signature**: `async execute(llmOutput: string): Promise<ExecutionResult>`
- **Purpose**: Parse and execute all SHAM blocks in LLM output, commit results
- **Process**: 
  1. Ensure clean git state
  2. Parse SHAM blocks
  3. Convert to actions
  4. Execute all valid actions
  5. Commit changes with summary
- **Throws**: Never - all errors captured in ExecutionResult
- **Test-data**: `test-data/execute/`

### ExecutionResult (type)
```typescript
interface ExecutionResult {
  success: boolean              // False if any action failed
  totalBlocks: number          // Count of SHAM blocks found
  executedActions: number      // Count of actions attempted
  results: ActionResult[]      // All execution results
  parseErrors: ParseError[]    // SHAM parsing errors
  gitCommit?: string          // Commit SHA if successful
  fatalError?: string         // Git or system failure
}
```

### ActionResult (type)
```typescript
interface ActionResult {
  seq: number                  // Execution order
  blockId: string             // SHAM block ID
  action: string              // Action type (duplicated from params for clarity)
  params: Record<string, any> // All SHAM properties including 'action'
  success: boolean
  error?: string              // Error message if failed
  data?: any                  // Action-specific output
}
```

### ParseError (type)
```typescript
interface ParseError {
  blockId?: string            // If error is block-specific
  error: ShamError            // From parser
}
```

### CladaOptions (type)
```typescript
interface CladaOptions {
  repoPath?: string           // Default: process.cwd()
  gitCommit?: boolean         // Default: true
}
```

## Internal Architecture

### Execution Flow
```
execute(llmOutput)
  → parseSHAM(llmOutput) → ShamParseResult
  → for each valid block:
    → convertToAction(block) → Record<string, any> | null
    → if valid action (has 'action' field):
      → route to appropriate executor
      → capture result
  → commitChanges(results)
  → return ExecutionResult
```

### Action Routing
Direct function mapping:
- `file_create` → `createFile(params)`
- `file_write` → `writeFile(params)`
- `file_delete` → `deleteFile(params)`
- `file_move` → `moveFile(params)`
- `file_read` → `readFile(params)`
- `dir_create` → `createDir(params)`
- `dir_delete` → `deleteDir(params)`
- `ls` → `listDir(params)`
- `grep` → `searchFiles(params)`
- `glob` → `globFiles(params)`
- `exec` → `executeCommand(params)`

### Error Handling
- Parser errors: Skip block, record error
- Conversion errors: Skip action, record error
- Execution errors: Continue execution, record error
- Git errors: Fatal, abort with fatalError
=== END FILE: ./proj/doc/API.md ===

=== START FILE: ./proj/doc/TODO.md ===

Issues revealed by execute.md test design:

Missing gitCommit field in expected results
Context operations not tested - are they SHAM actions?
Git state check not tested - what if dirty repo?
Directory creation for file operations unclear
=== END FILE: ./proj/doc/TODO.md ===

=== START FILE: ./proj/doc/ARCH.md ===
# Clada Architecture

## Core Design Decisions

### Transaction Model
- **No automatic rollback** - All operations commit, including failures
- **Failures are data** - LLM needs failure feedback for next steps
- **Forward-only progress** - Cheaper than regenerating responses
- **Manual rollback only** - Human-initiated via git commands
- **Boundary**: One git commit per `execute()` call
- **API**: Explicit transaction management (details TBD)

### SHAM Processing Pipeline
1. SHAM parser (external npm) → AST
2. AST → Action objects (sham-ast-converter)
3. Actions → Execution → Results

### SHAM AST Structure
```typescript
interface ShamParseResult {
  blocks: ShamBlock[]
  errors: ShamError[]
}

interface ShamBlock {
  id: string           // 3-char SHA-256
  properties: {
    action: string     // Maps to tool name (e.g., "file_create")
    [key: string]: any // Tool-specific parameters
  }
  startLine: number
  endLine: number
}

interface ShamError {
  code: string         // e.g., "DUPLICATE_KEY"
  line: number
  column: number
  length: number
  blockId: string
  content: string
  context: string
  message: string
}
```

### Error Propagation Strategy
- **Parser errors**: Skip blocks with parser errors, execute valid blocks only
- **Validation errors**: Skip invalid actions, execute valid ones
- **Execution errors**: Continue with remaining actions
- **Result**: Complete execution log with successes and failures

### Action Mapping
- SHAM `action` property maps directly to tool names from unified-design.yaml
- Use canonical names: `file_create`, `file_write`, `exec`, etc.
- Converter passes through SHAM properties unchanged (validates 'action' field exists)
- Each executor function extracts needed parameters from the properties object

### Execution Model
- **Synchronous**: All operations block until complete
- **CWD Management**: Session-based working directory
  - Default: Repository root
  - Each exec can override with `cwd` parameter
  - CWD persists within session, not across transactions
- **Results Format**: Flat array with sequence numbers
```typescript
interface ActionResult {
  seq: number          // Execution order
  blockId: string      // SHAM block ID
  action: string       // Action type
  params: any          // Input parameters
  success: boolean
  error?: string       // Error message if failed
  data?: any           // Action-specific output (stdout, content, etc.)
}
```

### Security Model (V1)
- **None**: Full filesystem access
- **No validation**: Any path allowed
- **No sandboxing**: Direct execution
- **V2 Future**: Path allowlisting per unified-design.yaml

## Component Structure
```
clada/
├── proj/
│   ├── comp/
│   │   ├── sham-ast-converter/  # AST → Actions
│   │   ├── fs-ops/              # File/directory operations
│   │   ├── exec/                # Command execution
│   │   └── git-tx/              # Git transaction management
│   └── doc/
│       ├── API.md               # Main orchestrator API
│       ├── ARCH.md              # This document
│       └── ABSTRACT.md          # Project overview
```

## Implementation Priorities
1. `sham-ast-converter` - Cannot test without this
2. `fs-ops` - Core functionality
3. `exec` - Command execution
4. `git-tx` - Transaction wrapper

## Open Questions

### Critical
1. **SHAM parser package**: `nesl-js` from GitHub
   - Install: `npm install github:nesl-lang/nesl-js`
   - Import: `const { parseSHAM } = require('nesl-js')`
   - Returns empty blocks/errors for malformed input (not partial parsing)
2. **Transaction API**: Single `execute()` method processes SHAM block array

### Design
1. **Parser error handling**: Skip blocks with parser errors entirely
2. **Git conflict handling**: How to handle conflicts during manual rollback?
3. **Concurrent access**: Multiple clada instances on same repo?
4. **Partial failure behavior**: Continue executing after first failure
5. **Parameter validation**: Each executor validates its own required parameters
6. **Error messages**: Node.js fs errors pass through unchanged

### Future
1. **Execution isolation**: Container/VM strategy for V2
2. **Streaming results**: Return results as actions complete or batch at end?

## Design Rationale

### Why No Automatic Rollback
Traditional transaction systems rollback on failure to maintain consistency. Clada explicitly rejects this because:
1. **LLM responses are expensive** - Regenerating costs time and money
2. **Partial success is informative** - LLM learns from failures
3. **Git preserves history** - Can always manually revert
4. **Forward progress over perfection** - Incremental improvement model

### Why Synchronous Execution
1. **Deterministic results** - LLM needs to know exact outcomes
2. **Sequential dependencies** - Later actions may depend on earlier ones
3. **Simpler implementation** - No async state management
4. **Git compatibility** - Git operations are inherently synchronous

=== END FILE: ./proj/doc/ARCH.md ===

=== START FILE: ./proj/src/clada.ts ===
/**
 * Main Clada class - orchestrates SHAM block execution
 */

import type { CladaOptions, ExecutionResult } from './types.js';

export class Clada {
  private _options: Required<CladaOptions>;

  constructor(options: CladaOptions = {}) {
    this._options = {
      repoPath: options.repoPath ?? process.cwd(),
      gitCommit: options.gitCommit ?? true
    };
  }

  /**
   * Parse and execute all SHAM blocks in LLM output
   * @param llmOutput - String containing SHAM blocks
   * @returns Execution results with success/failure details
   */
  async execute(_llmOutput: string): Promise<ExecutionResult> {
    // TODO: Implementation
    console.log(`Executing in repo: ${this._options.repoPath}`);
    throw new Error('Not implemented');
  }
}
=== END FILE: ./proj/src/clada.ts ===

=== START FILE: ./proj/src/types.ts ===
/**
 * Type definitions for Clada
 */

export interface CladaOptions {
  repoPath?: string;       // Default: process.cwd()
  gitCommit?: boolean;     // Default: true
}

export interface ExecutionResult {
  success: boolean;              // False if any action failed
  totalBlocks: number;          // Count of SHAM blocks found
  executedActions: number;      // Count of actions attempted
  results: ActionResult[];      // All execution results
  parseErrors: ParseError[];    // SHAM parsing errors
  gitCommit?: string;          // Commit SHA if successful
  fatalError?: string;         // Git or system failure
}

export interface ActionResult {
  seq: number;                  // Execution order
  blockId: string;             // SHAM block ID
  action: string;              // Action type
  params: Record<string, any>; // All SHAM properties including 'action'
  success: boolean;
  error?: string;              // Error message if failed
  data?: any;                  // Action-specific output
}

export interface ParseError {
  blockId?: string;            // If error is block-specific
  error: any;                  // From parser (ShamError type)
}
=== END FILE: ./proj/src/types.ts ===

=== START FILE: ./proj/src/index.ts ===
/**
 * Main entry point for Clada
 * Common LLM Actions Desktop Actuator
 */

import { Clada } from './clada.js';
import type { CladaOptions, ExecutionResult } from './types.js';

// Re-export main class and types
export { Clada, type CladaOptions, type ExecutionResult };

// Export default instance factory
export function createClada(options?: CladaOptions): Clada {
  return new Clada(options);
}
=== END FILE: ./proj/src/index.ts ===

=== START FILE: ./unified-design.yaml ===
# AI Coder Tools Schema - Unified Design

# Clada executes filesystem and runtime commands embedded in LLM output using SHAM syntax. It provides deterministic filesystem access and shell command execution for LLM coding agents.

# SHAM syntax example:

SHAM_synatx_example: |
  ```sh sham
  #!SHAM [@three-char-SHA-256: k7m]
  action = "file_create"
  path = "/tmp/\"hello\".txt"
  content = <<'EOT_SHAM_k7m'
  Hello world!
  how are you?
  EOT_SHAM_k7m
  #!END_SHAM_k7m
  ```


tools:
  # File Operations
  file_create:
    type: write
    description: Create new file
    accessibility: [llm]
    parameters:
      path: {type: string, required: true, format: absolute_path}
      content: {type: string, required: true}
    returns: {success: boolean, error?: string}
    
  file_write:
    type: write
    description: Replace entire file content
    accessibility: [llm]
    parameters:
      path: {type: string, required: true, format: absolute_path}
      content: {type: string, required: true}
    returns: {success: boolean, error?: string}
    
  file_edit:
    type: write
    description: Replace substring in file
    accessibility: [llm]
    parameters:
      path: {type: string, required: true, format: absolute_path}
      old_text: {type: string, required: true}
      new_text: {type: string, required: true}
      count: {type: integer, required: false, default: 1}
    returns: {success: boolean, replacements_made?: integer, error?: string}
    
  file_append:
    type: write
    description: Append to file
    accessibility: [llm]
    parameters:
      path: {type: string, required: true, format: absolute_path}
      content: {type: string, required: true}
    returns: {success: boolean, error?: string}
    
  file_delete:
    type: write
    description: Delete file
    accessibility: [llm]
    parameters:
      path: {type: string, required: true, format: absolute_path}
    returns: {success: boolean, error?: string}
    
  file_move:
    type: write
    description: Move/rename file
    accessibility: [llm]
    parameters:
      old_path: {type: string, required: true, format: absolute_path}
      new_path: {type: string, required: true, format: absolute_path}
    returns: {success: boolean, error?: string}
    
  file_read:
    type: read
    description: Read file content (ephemeral)
    accessibility: [llm]
    parameters:
      path: {type: string, required: true, format: absolute_path}
    returns: {success: boolean, content?: string, error?: string}
    
  # Directory Operations
  dir_create:
    type: write
    description: Create directory
    accessibility: [llm]
    parameters:
      path: {type: string, required: true, format: absolute_path}
    returns: {success: boolean, error?: string}
    
  dir_delete:
    type: write
    description: Delete directory
    accessibility: [llm]
    parameters:
      path: {type: string, required: true, format: absolute_path}
    returns: {success: boolean, error?: string}
    
  # Read Operations
  ls:
    type: read
    description: List directory contents
    accessibility: [llm]
    parameters:
      path: {type: string, required: true, format: absolute_path}
    returns: 
      success: boolean
      data?: array of {name: string, type: file|directory, size: integer, modified: timestamp}
      error?: string
    
  grep:
    type: read
    description: Search pattern in files
    accessibility: [llm]
    parameters:
      pattern: {type: string, required: true}
      path: {type: string, required: true, format: absolute_path}
      include: {type: string, required: false}
    returns: 
      success: boolean
      data?: array of {file: string, line_number: integer, line: string}
      error?: string
    
  glob:
    type: read
    description: Find files matching pattern
    accessibility: [llm]
    parameters:
      pattern: {type: string, required: true}
      base_path: {type: string, required: true, format: absolute_path}
    returns: 
      success: boolean
      data?: array of strings
      error?: string
    
  # Execution
  exec:
    type: dynamic
    description: Execute code
    accessibility: [llm]
    parameters:
      code: {type: string, required: true}
      lang: {type: enum, values: [python, javascript, bash, ruby], required: true}
      version: {type: string, required: false}
      cwd: {type: string, required: false, format: absolute_path}
    returns: {success: boolean, stdout?: string, stderr?: string, exit_code?: integer, error?: string}

  # Context Operations
  context_add:
    type: meta
    description: Add item to working context (persistent)
    accessibility: [llm, user]
    parameters:
      path: {type: string, required: true, format: absolute_path}
    returns: {success: boolean, error?: string}
      
  context_remove:
    type: meta
    description: Remove item from working context
    accessibility: [llm, user]
    parameters:
      path: {type: string, required: true, format: absolute_path}
    returns: {success: boolean, error?: string}
      
  context_list:
    type: meta
    description: List items in working context
    accessibility: [llm, user]
    parameters: {}
    returns: 
      success: boolean
      data?: array of {path: string, size: integer}
      error?: string
    
  context_prune:
    type: meta
    description: Remove unused items from working context
    accessibility: [llm, user]
    parameters: {}
    returns: {success: boolean, removed?: array of strings, error?: string}
    
  context_clear:
    type: meta
    description: Clear all working context items
    accessibility: [llm, user]
    parameters: {}
    returns: {success: boolean, error?: string}
    
  # Git Operations
  git_squash:
    type: git
    description: Squash commits
    slash_command: true
    parameters:
      mode: {type: enum, values: [auto_ai, ai_messages, hours, days, contiguous_only=true, msg_contains], required: true}
      message: {type: string, required: false}
      hours: {type: integer, required: false, when: "mode=hours"}
      days: {type: integer, required: false, when: "mode=days"}
      msg_target: {type: string, required: false, when: "mode=msg_contains"}
    returns: {success: boolean, error?: string}
      
  undo:
    type: git
    description: Undo last AI changes
    accessibility: [user]
    constraints: ["No changes since last AI operation"]
    parameters: {}
    returns: {success: boolean, error?: string}
    
  git_step_back:
    type: git
    description: Move to previous commit
    accessibility: [user]
    behavior: Stashes untracked changes
    parameters: {}
    returns: {success: boolean, stashed_files?: array of strings, error?: string}
    
  git_step_forward:
    type: git
    description: Move to next commit
    accessibility: [user]
    behavior: Attempts to pop stashed changes
    parameters: {}
    returns: {success: boolean, conflicts?: array of strings, error?: string}

# Transaction Management
transaction_model:
  strategy: operation_group
  conflict_detection:
    methods:
      - mtime comparison (fast but unreliable)
      - checksum comparison (slower but accurate)
      - git status check (catches git-tracked changes)
    timing:
      - Check immediately before operation group
      - Check after each write operation
      - Final check before commit
  implementation:
    - Begin: git commit current state
    - Execute: track all operations
    - Validate: check for external modifications
    - Success: git commit with summary
    - Failure: git reset --hard to start
  atomicity: none  # Git operations are NOT atomic at filesystem level
  
# Security Model
security:
  path_validation:
    type: allowlist
    allowed_roots:
      - /home/user/projects
      - /tmp/ai-coder
    blacklist_patterns:
      - .*\.ssh.*
      - .*\.git/config
      - /etc/.*
      - /sys/.*
      - /proc/.*
  canonicalization: required  # Resolve ../ and symlinks before checking
  
# System Configuration
config:
  encoding: utf-8
  line_endings: preserve  # Don't normalize
  max_file_size: 10485760  # 10MB
  git_auto_push: false  # Require explicit push
  commit_message_format: "AI: {operation_summary}"

TODO: |   
  Transaction Safety: The git-based transaction model has race conditions:

    Gap between "git commit" and first operation
    Non-atomic filesystem ops vs git state
=== END FILE: ./unified-design.yaml ===

=== START FILE: ./README.md ===
# 💚 clada
common llm actions desktop actuator

=== END FILE: ./README.md ===

=== START FILE: ./xd5_ref.md ===
# XD5 LLM Quick Reference

"supplemental context reference materials" or soemtihgn. SCRM. use this term instead of "context" or "working context"

## Core Principle
Documentation maintains dependency graphs for deterministic SCRM assembly. Track dependencies as discovered during implementation.

## File Structure
```
<repo>/
└── proj/
    ├── doc/
    │   ├── API.md        # ⚠️ CRITICAL: All dependencies + exports
    │   ├── ABSTRACT.md   # 60-word purpose + 300-word overview
    │   └── ARCH.md       # Technical decisions, constraints
    ├── test-data/        # Test cases as JSON/MD files
    ├── test/             # Minimal harnesses loading test-data
    ├── test-intn/        # Integration tests for dependencies
    ├── src/              # Implementation
    └── comp/             # Sub-components (recursive)
```

## API.md Template
```markdown
# Component: {name}

## Component Type
standard | types-only

## Documentation Debt
[Must be empty before implementation]
- [ ] Undefined interfaces
- [ ] Missing function signatures
- [ ] Unspecified types

## Dependencies
[Update as implementation reveals needs]

```yaml
dependencies:
  proj/comp/payment:
    functions: [validateCard, processRefund]
    types: [PaymentResult, CardType]
    errors: [PaymentError]
  
  proj/comp/auth:
    functions: [checkPermission, validateToken]
    types: [User, TokenPayload]
  
  proj/comp/logger:
    functions: [logTransaction]  # Audit requirement
  
  proj/comp/payment-types: "*"  # Wildcard for types-only
  
  external/lodash:
    functions: [groupBy, mapValues]
  
  external/@stripe/stripe-js:
    types: [Stripe, PaymentIntent]
    functions: [loadStripe]
```

## Exports
### {functionName}
- **Signature**: `{functionName}(param: Type) -> ReturnType`
- **Purpose**: Single sentence.
- **Throws**: `{ErrorType}` when {condition}
- **Test-data**: `test-data/{path}/{functionName}.json`



## Workflow

### Core Flow: Design → Test → Implement

1. **Write docs**: ABSTRACT.md → ARCH.md → API.md
2. **Design tests**: E2E hypothesis → Decompose → Unit tests  
3. **Implement**: Functions (red/green) → Revise E2E → Wire component

### Test Authority & Evolution

**Tests Are Source of Truth (But Not Infallible)**
- Tests define what code SHOULD do
- During debug: ALWAYS fix code to match tests first
- Test errors discovered? Ask human: "I believe test X is incorrect because Y. Should I update it?"
- NEVER auto-modify tests while debugging
- Each test change needs explicit approval

### Detailed Flow

1. **E2E Test Hypothesis** - Write component test-data (expect evolution)
2. **Pseudocode** - Rough implementation to discover structure
3. **Extract Functions** - Identify & extract all pure functions
4. **Unit Tests** - Write test-data for each function
5. **Implement Functions** - Red/green/debug (fix code, not tests)
   - **CHECKPOINT: Any discoveries? → Update docs before continuing**
   - New dependencies? Update API.md
   - Wrong signatures? Fix documentation
   - Missing types? Define them first
6. **Revise E2E Tests** - Align with discovered behavior (ask human)
7. **Wire Component** - Connect tested functions
8. **Debug E2E** - Fix code until green

**Debug Protocol**: Test fails? → Try fixing code → Still failing? → Consider test error → Request human approval for any test change

**If docs are wrong**: STOP → Update docs → Update tests → Continue



### Critical Implementation Rules

**🛑 STOP Protocol**: If implementation reveals doc errors:
1. STOP immediately
2. Update API.md/ARCH.md
3. Continue with correct docs

**Test Immutability**: 
- Test harnesses = frozen after creation
- Test data = only change with human approval
- Fix code, not tests (unless explicitly approved)

**Dependency Updates**:
- Add to API.md as discovered
- Include transitive deps if needed for understanding
- External deps must be explicit

## Test Data Format
```json
{
  "cases": [
    {
      "name": "descriptive name",
      "input": [arg1, arg2],
      "expected": {result},
      "throws": "ErrorType"  // optional
    }
  ]
}
```

## Pre-Implementation Checkpoint

**Before writing ANY code, verify:**
- [ ] All function signatures fully specified in API.md?
- [ ] All types defined with complete field lists?
- [ ] All dependencies declared with specific imports?
- [ ] Test data files created?
- [ ] Documentation Debt section is EMPTY?

**If ANY unchecked → STOP, complete specifications first**

## Implementation Gates

**HARD STOP if incomplete:**
1. **Specification completeness** - No undefined types, no TBD signatures
2. **Dependency accuracy** - Every import must be in API.md
3. **Test data existence** - Files must exist before code

**During implementation:**
- New dependency needed? → STOP, update API.md first
- Signature doesn't match? → STOP, fix documentation first
- Missing type definition? → STOP, define it first

During implementation:
- [ ] Tests fail first (red phase)?
- [ ] Docs match reality? (if not → STOP)
- [ ] All imports declared in API.md?

## Common Patterns

**Extract pure functions during pseudocode**:
```javascript
// Pseudocode reveals:
// extractedFn: validateInput(x) -> bool
// extractedFn: processData(data) -> result
```

**Types-only components**: No test/ or src/, only doc/

**Path conventions**: All relative to `<repo>/`
- Component: `proj/comp/{name}`
- Nested: `proj/comp/{parent}/comp/{child}`

## CRITICAL LLM RULE
**Never suggest implementation without complete specifications**
- Missing function signatures? → Refuse to implement
- Undefined types? → Demand specification first
- "We'll figure it out during coding" → VIOLATION
- User asks to implement with gaps? → Point to Documentation Debt
=== END FILE: ./xd5_ref.md ===

=== START FILE: ./package.json ===
{
  "name": "clada",
  "version": "0.1.0",
  "description": "Common LLM Actions Desktop Actuator",
  "type": "module",
  "engines": {
    "node": ">=20.0.0"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsx watch proj/src/index.ts",
    "start": "node dist/src/index.js",
    "test": "vitest",
    "test:run": "vitest run",
    "typecheck": "tsc --noEmit",
    "lint": "eslint proj/**/*.ts",
    "lint:fix": "eslint proj/**/*.ts --fix",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "nesl-js": "github:nesl-lang/nesl-js"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "eslint": "^8.56.0",
    "tsx": "^4.7.0",
    "typescript": "^5.3.3",
    "vitest": "^1.2.0"
  },
  "keywords": ["llm", "actions", "filesystem", "sham"],
  "author": "",
  "license": "MIT"
}
=== END FILE: ./package.json ===

=== START FILE: ./.nvmrc ===
20.11.0
=== END FILE: ./.nvmrc ===

=== START FILE: ./tsconfig.json ===
{
  "compilerOptions": {
    // Modern output settings
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    
    // Strict type checking
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    
    // Additional checks
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    
    // Output settings
    "outDir": "./dist",
    "rootDir": "./proj",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    
    // Module resolution
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    
    // Path mapping for cleaner imports
    "baseUrl": "."
  },
  "include": [
    "proj/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/test/**",
    "**/test-data/**"
  ]
}
=== END FILE: ./tsconfig.json ===

=== START FILE: ./eslint.config.js ===
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': typescript
    },
    rules: {
      ...typescript.configs.recommended.rules,
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error'
    }
  }
];
=== END FILE: ./eslint.config.js ===

=== START FILE: ./vitest.config.ts ===
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['proj/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'proj/test/',
        '**/*.test.ts'
      ]
    }
  },
  resolve: {
    alias: {}
  }
});
=== END FILE: ./vitest.config.ts ===