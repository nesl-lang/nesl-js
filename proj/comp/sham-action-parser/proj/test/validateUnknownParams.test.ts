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