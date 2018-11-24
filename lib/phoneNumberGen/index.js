const random = require('lodash.random');
const { NUMBER_LEN, NUMBERS_TO_GEN } = require('../constants');

function generatePhoneNumber() {
  let number = '0';
  let index = 0;
  const len = NUMBER_LEN - 1;
  while (index < len) {
    number += random(0, 9);
    index += 1;
  }
  return number;
}

function generatePhoneNumbers(numberToGen = NUMBERS_TO_GEN, currentNumbers = {}) {
  let numbersGen = 0;
  const newNumbers = {};
  while (numbersGen < numberToGen) {
    const number = generatePhoneNumber();
    const hasNumb = currentNumbers[number] || newNumbers[number];
    if (!hasNumb) {
      newNumbers[number] = { assigned: false, number };
      numbersGen += 1;
    }
  }
  return newNumbers;
}

module.exports = {
  generatePhoneNumbers,
  generatePhoneNumber,
};
