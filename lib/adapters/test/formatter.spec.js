const { formatForGenerate, formatForSave } = require('../formatters');

describe('Formatters', () => {
  describe('formatForGenerate', () => {
    it('should return an object ', () => {
      const numbers = [
        { number: '3333333333', assigned: true },
        { number: '4444444444', assigned: true },
      ];
      const expected = {
        3333333333: { number: '3333333333', assigned: true },
        4444444444: { number: '4444444444', assigned: true },
      };

      const result = formatForGenerate(numbers);
      expect(result).toEqual(expected);
    });
    it('should return an empty object when arg is an empty array ', () => {
      const numbers = [];
      const expected = {};
      const result = formatForGenerate(numbers);
      expect(result).toEqual(expected);
    });

    it('should return an empty object when an array is not passed in a args ', () => {
      const numbers = null;
      const expected = {};
      const result = formatForGenerate(numbers);
      expect(result).toEqual(expected);
    });
  });

  describe('formatForSave', () => {
    it('should return an array ', () => {
      const expected = [
        { number: '3333333333', assigned: true },
        { number: '4444444444', assigned: true },
      ];
      const numbers = {
        3333333333: { number: '3333333333', assigned: true },
        4444444444: { number: '4444444444', assigned: true },
      };

      const result = formatForSave(numbers);
      expect(result).toEqual(expected);
    });
    it('should return an empty array ', () => {
      const expected = [];
      const numbers = {};
      const result = formatForSave(numbers);
      expect(result).toEqual(expected);
    });
    it('should return an empty array when arg is null ', () => {
      const expected = [];
      const result = formatForSave(null);
      expect(result).toEqual(expected);
    });
    it('should return an empty array when arg is an array ', () => {
      const expected = [];
      const result = formatForSave([]);
      expect(result).toEqual(expected);
    });
  });
});
