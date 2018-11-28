const { buildPhoneNumberPayload, getTopAndBottom } = require('../builders');
const { SORT_ORDER_DESC } = require('../../../constants');

describe('Adapters', () => {
  describe('buildPhoneNumberPayload', () => {
    it('should return an object ', () => {
      const payload = {
        count: 2,
        rows: [
          { number: '3333333333', assigned: true },
          { number: '4444444444', assigned: true },
        ],
      };
      const result = buildPhoneNumberPayload(payload);
      expect(result.total).toBe(2);
      expect(result.maxNumber).toBe('4444444444');
      expect(result.minNumber).toBe('3333333333');
      expect(result.phoneNumbers).toEqual(payload.rows);
    });

    it('should return an object with empty values ', () => {
      const payload = {
        count: 0,
        rows: [],
      };
      const result = buildPhoneNumberPayload(payload);
      expect(result.total).toBe(0);
      expect(result.maxNumber).toBe('');
      expect(result.minNumber).toBe('');
      expect(result.phoneNumbers).toEqual(payload.rows);
    });
  });
  describe('getTopAndBottom', () => {
    it('should return top and bottom', () => {
      const { top, bottom } = getTopAndBottom(SORT_ORDER_DESC, 9);
      expect(top).toBe(8);
      expect(bottom).toBe(0);
    });
  });
});
