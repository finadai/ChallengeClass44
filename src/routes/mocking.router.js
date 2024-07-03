const express = require('express');
const router = express.Router();
const mockingController = require('../controllers/mocking.controller');

router.get('/mockingproducts', mockingController.mockProducts);

module.exports = router;
