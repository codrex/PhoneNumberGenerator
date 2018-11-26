const { getNumbers } = require('../lib/modelRepositories/phoneNumber');
const { buildPhoneNumberPayload } = require('../lib/adapters');

async function getPhoneNumbers(req, res) {
  const { db } = req;
  const payload = await getNumbers(db);
  res.render('index', {
    title: 'phone number generator',
    ...buildPhoneNumberPayload(payload),
  });
}

module.exports = {
  getPhoneNumbers,
};
