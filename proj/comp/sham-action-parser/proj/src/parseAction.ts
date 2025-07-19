import { readFileSync } from 'fs';
import { join } from 'path';
import yaml from 'js-yaml';

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
  code: string;
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

// Load schemas from YAML
function loadSchemas(): ActionSchemas {
  const schemaPath = join(__dirname, '../../../unified-design/proj/unified-design.yaml');
  const content = readFileSync(schemaPath, 'utf8');
  const data = yaml.load(content) as any;
  return data.actions || {};
}

// Parse string value to typed value based on schema
function parseValue(value: string, schema: ParamSchema, paramName: string): { value?: any; error?: ParseError } {
  switch (schema.type) {
    case 'string':
      return { value };
    
    case 'boolean':
      if (value === 'true') return { value: true };
      if (value === 'false') return { value: false };
      return {
        error: {
          code: 'INVALID_TYPE',
          message: `Parameter '${paramName}' must be 'true' or 'false', got '${value}'`,
          param: paramName
        }
      };
    
    case 'integer':
      const num = parseInt(value, 10);
      if (Number.isInteger(num) && num.toString() === value) {
        return { value: num };
      }
      return {
        error: {
          code: 'INVALID_TYPE',
          message: `Parameter '${paramName}' must be an integer, got '${value}'`,
          param: paramName
        }
      };
    
    case 'enum':
      if (schema.values && schema.values.includes(value)) {
        return { value };
      }
      return {
        error: {
          code: 'INVALID_ENUM',
          message: `Parameter '${paramName}' must be one of [${schema.values?.join(', ')}], got '${value}'`,
          param: paramName
        }
      };
    
    default:
      return {
        error: {
          code: 'PARSE_ERROR',
          message: `Unknown type '${schema.type}' for parameter '${paramName}'`,
          param: paramName
        }
      };
  }
}

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
  
  // Check if action exists in schema
  const actionSchema = loadedSchemas[actionName];
  if (!actionSchema) {
    return {
      success: false,
      errors: [{
        code: 'UNKNOWN_ACTION',
        message: `Unknown action type '${actionName}'`
      }]
    };
  }
  
  // Parse and validate parameters
  const typedParams: Record<string, any> = {};
  
  // Check all required params are present
  for (const [paramName, paramSchema] of Object.entries(actionSchema.params)) {
    if (paramSchema.required && !(paramName in block.properties)) {
      errors.push({
        code: 'MISSING_REQUIRED',
        message: `Missing required parameter '${paramName}'`,
        param: paramName
      });
    }
  }
  
  // Parse all provided params
  for (const [key, value] of Object.entries(block.properties)) {
    if (key === 'action') continue;  // Already processed
    
    const paramSchema = actionSchema.params[key];
    if (!paramSchema) {
      // Unknown parameter - for now, pass through as string
      typedParams[key] = value;
      continue;
    }
    
    const parseResult = parseValue(value, paramSchema, key);
    if (parseResult.error) {
      errors.push(parseResult.error);
    } else {
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