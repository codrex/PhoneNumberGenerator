const express = require('express');
const { getPhoneNumbers, createPhoneNumbers } = require('../controller');

const router = express.Router();
function getRoute(template) {
  return (req, res, next) => {
    req.template = template;
    getPhoneNumbers(req, res, next);
  };
}
router.get('/', getPhoneNumbers);
router.get('/sort/:order', getRoute('table'));
router.post('/generate/:number', createPhoneNumbers, getRoute('table'));

module.exports = router;
