function formatForGenerate(numbers = []) {
  if (Array.isArray(numbers)) {
    return numbers.reduce((previous, current) => {
      previous[current.number] = current; //eslint-disable-line
      return previous;
    }, {});
  }
  return {};
}
function formatForSave(numbers = {}) {
  if (numbers instanceof Object && !Array.isArray(numbers)) {
    return Object.keys(numbers).map(key => numbers[key]);
  }
  return [];
}

module.exports = {
  formatForSave,
  formatForGenerate,
};
