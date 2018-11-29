const express = require('express');
const {
  getPhoneNumbers,
  createPhoneNumbers,
  renderErrorPage,
} = require('../controller');

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
router.use('*', (req, res) => renderErrorPage(res, 404, '404: Page not fount'));

module.exports = router;
