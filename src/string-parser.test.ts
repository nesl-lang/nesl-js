import { describe, it, expect } from 'vitest';
import { parseString } from './string-parser.js';

describe('parseString', () => {
  describe('basic cases', () => {
    it('parses simple string', () => {
      const result = parseString('key = R"""pv(hello world)pv"""');
      expect(result).toEqual({ success: true, value: 'hello world' });
    });

    it('parses empty string', () => {
      const result = parseString('key = R"""pv()pv"""');
      expect(result).toEqual({ success: true, value: '' });
    });

    it('preserves whitespace', () => {
      const result = parseString('key = R"""pv(  spaces  )pv"""');
      expect(result).toEqual({ success: true, value: '  spaces  ' });
    });

    it('handles unicode', () => {
      const result = parseString('key = R"""pv(Hello 世界 🌍)pv"""');
      expect(result).toEqual({ success: true, value: 'Hello 世界 🌍' });
    });
  });

  describe('delimiter in content', () => {
    it('handles closing delimiter in middle', () => {
      const result = parseString('key = R"""pv(contains )pv""" in the middle)pv"""');
      expect(result).toEqual({ success: true, value: 'contains )pv""" in the middle' });
    });

    it('handles multiple closing delimiters', () => {
      const result = parseString('key = R"""pv(has )pv""" and also )pv""" patterns)pv"""');
      expect(result).toEqual({ success: true, value: 'has )pv""" and also )pv""" patterns' });
    });

    it('handles opening delimiter in content', () => {
      const result = parseString('key = R"""pv(contains R"""pv( inside)pv"""');
      expect(result).toEqual({ success: true, value: 'contains R"""pv( inside' });
    });

    it('handles nested-looking pattern', () => {
      const result = parseString('key = R"""pv(R"""pv(not actually nested)pv""")pv"""');
      expect(result).toEqual({ success: true, value: 'R"""pv(not actually nested)pv"""' });
    });
  });

  describe('multiple strings on one line', () => {
    it('captures from first open to last close', () => {
      const result = parseString('key = R"""pv(first)pv""" R"""pv(second)pv"""');
      expect(result).toEqual({ success: true, value: 'first)pv""" R"""pv(second' });
    });

    it('handles triple markers', () => {
      const result = parseString('key = R"""pv(one)pv""" R"""pv(two)pv""" R"""pv(three)pv"""');
      expect(result).toEqual({ success: true, value: 'one)pv""" R"""pv(two)pv""" R"""pv(three' });
    });
  });

  describe('error cases', () => {
    it('returns error when no string marker found', () => {
      const result = parseString('key = value');
      expect(result).toEqual({ success: false, error: 'string_unterminated' });
    });

    it('returns error when not closed', () => {
      const result = parseString('key = R"""pv(never ends');
      expect(result).toEqual({ success: false, error: 'string_unterminated' });
    });

    it('returns error when closing marker before opening', () => {
      const result = parseString(')pv""" R"""pv(backwards');
      expect(result).toEqual({ success: false, error: 'string_unterminated' });
    });

    it('returns error when content after closing', () => {
      const result = parseString('key = R"""pv(value)pv""" extra content');
      expect(result).toEqual({ success: false, error: 'content_after_string' });
    });

    it('allows whitespace after closing', () => {
      const result = parseString('key = R"""pv(value)pv"""   \t  ');
      expect(result).toEqual({ success: true, value: 'value' });
    });
  });

  describe('custom markers', () => {
    const customOptions = {
      stringOpen: '%%%[',
      stringClose: ']%%%',
    };

    it('parses with custom markers', () => {
      const result = parseString('key = %%%[custom value]%%%', customOptions);
      expect(result).toEqual({ success: true, value: 'custom value' });
    });

    it('handles delimiter collision with custom markers', () => {
      const result = parseString('key = %%%[has ]%%% in middle]%%%', customOptions);
      expect(result).toEqual({ success: true, value: 'has ]%%% in middle' });
    });
  });

  describe('max length', () => {
    it('accepts strings within limit', () => {
      const result = parseString('key = R"""pv(short)pv"""', { maxValueLength: 10 });
      expect(result).toEqual({ success: true, value: 'short' });
    });

    it('rejects strings exceeding limit', () => {
      const result = parseString('key = R"""pv(this is too long)pv"""', { maxValueLength: 10 });
      expect(result).toEqual({ success: false, error: 'string_unterminated' });
    });
  });
});