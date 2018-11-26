function buildPhoneNumberPayload(payload) {
  const { count, rows } = payload;
  const resPayload = {
    total: 0,
    minNumber: '',
    maxNumber: '',
    phoneNumbers: [],
  };
  if (count > 0) {
    const minPhoneNumber = rows[0];
    const maxPhoneNumber = rows[count - 1];
    resPayload.total = count;
    resPayload.maxNumber = maxPhoneNumber.number;
    resPayload.minNumber = minPhoneNumber.number;
    resPayload.phoneNumbers = rows;
  }
  return resPayload;
}

module.exports = { buildPhoneNumberPayload };
