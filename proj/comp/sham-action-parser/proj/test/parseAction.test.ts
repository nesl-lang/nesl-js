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