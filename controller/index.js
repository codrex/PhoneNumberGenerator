const {
  getNumbers,
  addNumbers,
} = require('../lib/modelRepositories/phoneNumber');
const { generatePhoneNumbers } = require('../lib/phoneNumberGen');
const { buildPhoneNumberPayload } = require('../lib/adapters/builders');
const {
  GET_NUMBER_ERROR_MSG,
  GEN_NUMBERS_ERROR_MSG,
  NUMBERS_TO_GEN,
  SORT_ORDER_ASC,
} = require('../constants');

function renderErrorPage(res, code, message) {
  res.status(code);
  res.render('error', { message });
}

async function getPhoneNumbers(req, res) {
  try {
    const { db, template = 'index', params } = req;
    const { order = SORT_ORDER_ASC } = params;
    const payload = await getNumbers(db, order);
    res.render(template, {
      title: 'phone number generator',
      ...buildPhoneNumberPayload(payload, order),
    });
  } catch (error) {
    renderErrorPage(res, 500, GET_NUMBER_ERROR_MSG);
  }
}

async function createPhoneNumbers(req, res, next) {
  try {
    const { db, params } = req;
    const { number = NUMBERS_TO_GEN } = params;
    const phoneNumbers = generatePhoneNumbers(number);
    await addNumbers(db, phoneNumbers);
    next();
  } catch (error) {
    renderErrorPage(res, 500, GEN_NUMBERS_ERROR_MSG);
  }
}

module.exports = {
  getPhoneNumbers,
  createPhoneNumbers,
  renderErrorPage,
};
