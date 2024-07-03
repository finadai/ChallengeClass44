const express = require('express');
const router = express.Router();
const loggerTestController = require('../controllers/loggerTest.controller');

router.get('/loggerTest', loggerTestController.testLogger);

module.exports = router;
