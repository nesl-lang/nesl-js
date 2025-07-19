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