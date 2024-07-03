const express = require('express');
const router = express.Router();
const passwordResetController = require('../controllers/passwordReset.controller');

router.post('/requestReset', passwordResetController.requestReset);
router.post('/resetPassword', passwordResetController.resetPassword);

module.exports = router;
