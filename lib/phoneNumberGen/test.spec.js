const { generatePhoneNumber, generatePhoneNumbers } = require('./');

describe('phoneNumberGen', () => {
  describe('generatePhoneNumber', () => {
    it('should generate a random phone number ', () => {
      const number = generatePhoneNumber();
      expect(typeof Number(number)).toBe('number');
    });
    it('should generate a random phone number that start with 0 ', () => {
      for (let i = 0; i < 10; i += 1) {
        const numberArr = generatePhoneNumber().split('');
        expect(numberArr[0]).toBe('0');
      }
    });

    it('should generate a random phone number with the length of 10', () => {
      const number = generatePhoneNumber();
      expect(number.length).toBe(10);
    });
  });

  describe('generatePhoneNumbers', () => {
    it('should generate 20 numbers  ', () => {
      const numbers = generatePhoneNumbers(20, {});
      expect(Object.keys(numbers).length).toBe(20);
    });

    it('should generate 20 unique numbers  ', () => {
      const numbersGenBefore = generatePhoneNumbers(2000, {});
      const numbers = generatePhoneNumbers(20, numbersGenBefore);
      expect(Object.keys({ ...numbers, ...numbersGenBefore }).length).toBe(2020);
    });

    it('should generate unassigned numbers  ', () => {
      const numbers = generatePhoneNumbers(10, {});
      Object.keys(numbers).forEach((number) => {
        expect(numbers[number].assigned).toBe(false);
      });
    });
  });
});
