const random = require('lodash.random');
const { NUMBER_LEN, NUMBERS_TO_GEN } = require('../../constants');

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

function generatePhoneNumbers(numberToGen = NUMBERS_TO_GEN) {
  let counter = 0;
  const newNumbersRegister = {};
  const newNumbers = [];
  while (counter < numberToGen) {
    const number = generatePhoneNumber();
    const hasNumb = newNumbersRegister[number];
    if (!hasNumb) {
      newNumbersRegister[number] = true;
      newNumbers.push({ number, assigned: false });
      counter += 1;
    }
  }
  return newNumbers;
}

module.exports = {
  generatePhoneNumbers,
  generatePhoneNumber,
};
