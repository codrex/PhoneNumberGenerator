const { toBoolean } = require('../');

describe('utils', () => {
  describe('toBoolean', () => {
    it('should convert to boolean', () => {
      expect(toBoolean(0)).toBe(false);
    });
  });
});
