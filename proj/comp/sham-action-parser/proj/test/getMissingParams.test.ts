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