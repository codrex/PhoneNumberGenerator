const { SORT_ORDER_DESC } = require('../../constants');

function getTopAndBottom(order, len) {
  let top = 0;
  let bottom = len - 1;
  if (order === SORT_ORDER_DESC) {
    top = len - 1;
    bottom = 0;
  }
  return { top, bottom };
}
function buildPhoneNumberPayload(payload, order) {
  const { count, rows } = payload;
  const resPayload = {
    total: 0,
    minNumber: '',
    maxNumber: '',
    phoneNumbers: [],
  };
  if (count > 0) {
    const { bottom, top } = getTopAndBottom(order, count);
    const topPhoneNumber = rows[top];
    const bottomPhoneNumber = rows[bottom];
    resPayload.total = count;
    resPayload.maxNumber = bottomPhoneNumber.number;
    resPayload.minNumber = topPhoneNumber.number;
    resPayload.phoneNumbers = rows;
  }
  return resPayload;
}

module.exports = { buildPhoneNumberPayload, getTopAndBottom };
