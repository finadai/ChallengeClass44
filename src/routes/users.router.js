const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { authenticate } = require('../middlewares/auth.middleware');

router.post('/premium/:uid', authenticate, usersController.changeUserRole);
router.post('/:uid/documents', authenticate, usersController.uploadDocuments);

module.exports = router;

