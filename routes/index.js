const express = require('express');
const { getPhoneNumbers } = require('../controller');

const router = express.Router();

router.get('/', getPhoneNumbers);

module.exports = router;
