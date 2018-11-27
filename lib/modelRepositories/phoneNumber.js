const { NUMBERS_MUST_BE_AN_ARRAY } = require('../../constants');

async function getNumbers(db, order) {
  const phoneNumbers = await db.PhoneNumber.findAndCountAll({
    order: [['number', order]],
  });
  return phoneNumbers;
}

async function addNumbers(db, numbers = []) {
  if (Array.isArray(numbers)) {
    const phoneNumbers = await db.PhoneNumber.bulkCreate(numbers, {
      validate: true,
    });
    return phoneNumbers;
  }
  throw new Error(NUMBERS_MUST_BE_AN_ARRAY);
}

module.exports = { getNumbers, addNumbers };
