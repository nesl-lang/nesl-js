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