module.exports = {
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  env: {
    jest: true,
    browser: true,
    es6: true
  },
  rules: {
    'max-len': [2, 80, 4]
  }
};
