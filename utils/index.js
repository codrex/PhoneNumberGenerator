function isBoolean(value) {
  if (typeof value !== 'boolean') {
    throw new Error('Only even values are allowed!');
  }
}
function toBoolean(value) {
  if (typeof value === 'boolean') return value;
  return Boolean(value);
}

module.exports = {
  toBoolean,
  isBoolean,
};
