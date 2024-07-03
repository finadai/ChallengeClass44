const express = require('express');
const router = express.Router();
const viewsController = require('../controllers/views.controller');

router.get('/register', viewsController.showRegisterPage);
router.get('/login', viewsController.showLoginPage);
router.get('/', viewsController.showProductsPage);

module.exports = router;
