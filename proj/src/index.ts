
/**
 * Main entry point for SHAM parser
 */

import { Clada } from './clada.js';
import type { CladaOptions, ExecutionResult } from './types.js';

// Re-export main class and types
export { Clada, type CladaOptions, type ExecutionResult };

// Export default instance factory
export function createClada(options?: CladaOptions): Clada {
  return new Clada(options);
}