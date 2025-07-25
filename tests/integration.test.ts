import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { marked } from 'marked';
import { parseNesl } from '../src/parser';

const testPath = join(__dirname, '../nesl-shared/nesl-test/integration.md');

const mdContent = readFileSync(testPath, 'utf8');

const tokens = marked.lexer(mdContent);
const codeBlocks = tokens.filter(t => t.type === 'code');
const testNames = tokens.filter(t => t.type === 'heading' && t.depth === 3).map(t => t.text);

describe('NESL Parser Integration Tests', () => {
  testNames.forEach((name, i) => {
    const baseIndex = i * 2;
    it(name, () => {
      const input = codeBlocks[baseIndex].text;
      const expected = JSON.parse(codeBlocks[baseIndex + 1].text);
      const result = parseNesl(input);
      expect(result).toEqual(expected);
    });
  });
});