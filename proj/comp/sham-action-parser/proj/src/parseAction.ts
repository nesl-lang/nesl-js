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