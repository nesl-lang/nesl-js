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