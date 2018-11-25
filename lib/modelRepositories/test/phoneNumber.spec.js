const { getNumbers, addNumbers } = require('../phoneNumber');
const db = require('../../../models');

async function createNumbers(numbers) {
  await db.PhoneNumber.bulkCreate(numbers);
}
describe('Phone number model repository', () => {
  describe('getNumber', () => {
    it('should return numbers ', async () => {
      const numbers = [
        { number: '22222222', assigned: false },
        { number: '2222cc2222', assigned: false },
      ];
      await createNumbers(numbers);
      const { count, rows } = await getNumbers(db);
      expect(count).toBe(numbers.length);
      expect(rows.length).toBe(numbers.length);
      expect(rows[0].number).toBe(numbers[0].number);
      expect(rows[0].assigned).toBe(numbers[0].assigned);
    });
  });

  describe('addNumbers', () => {
    it('should create records ', async () => {
      const numbers = [
        { number: '0940595069', assigned: false },
        { number: '5050505050', assigned: false },
      ];
      const phoneNumbers = await addNumbers(db, numbers);
      expect(phoneNumbers.length).toBe(numbers.length);
      expect(phoneNumbers[0].number).toBe(numbers[0].number);
      expect(phoneNumbers[0].assigned).toBe(numbers[0].assigned);
    });

    it('should fail when there are duplicate numbers ', async () => {
      const numbers = [
        { number: '0940595069', assigned: false },
        { number: '5050505050', assigned: false },
        { number: '0940595069', assigned: false },
      ];
      await expect(addNumbers(db, numbers)).rejects.toThrow();
    });

    it('should fail when number length is less than 10', async () => {
      const numbers = [{ number: '0940569', assigned: false }];
      await expect(addNumbers(db, numbers)).rejects.toThrow();
    });
    it('should fail when number length is more than 10', async () => {
      const numbers = [{ number: '094056933333', assigned: false }];
      await expect(addNumbers(db, numbers)).rejects.toThrow();
    });

    it('should fail when is number is NaN', async () => {
      const numbers = [{ number: '09405693rk', assigned: false }];
      await expect(addNumbers(db, numbers)).rejects.toThrow();
    });

    it('should fail when assigned is not a boolean', async () => {
      const numbers = [{ number: '5050505059', assigned: 'falsed' }];
      await expect(addNumbers(db, numbers)).rejects.toThrow();
    });

    it('should fail when assigned is empty', async () => {
      const numbers = [{ number: '5050505059' }];
      await expect(addNumbers(db, numbers)).rejects.toThrow();
    });

    it('should fail when number is not an array', async () => {
      const numbers = { number: '5050505059' };
      await expect(addNumbers(db, numbers)).rejects.toThrow();
    });
  });
});
