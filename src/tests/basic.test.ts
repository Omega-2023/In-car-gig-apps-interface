import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDistance, formatTime } from '../utils/format';

describe('Utility Functions', () => {
  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(12.50)).toBe('$12.50');
      expect(formatCurrency(0)).toBe('$0.00');
      expect(formatCurrency(1000.99)).toBe('$1,000.99');
    });
  });

  describe('formatDistance', () => {
    it('should format distance correctly', () => {
      expect(formatDistance(0.05)).toBe('< 0.1 mi');
      expect(formatDistance(1.2)).toBe('1.2 mi');
      expect(formatDistance(10)).toBe('10.0 mi');
    });
  });

  describe('formatTime', () => {
    it('should format time correctly', () => {
      expect(formatTime(30)).toBe('30 min');
      expect(formatTime(60)).toBe('1h');
      expect(formatTime(90)).toBe('1h 30m');
      expect(formatTime(120)).toBe('2h');
    });
  });
});
