const express = require('express');
const router = express.Router();
const strapiController = require('../controllers/strapiController');

// Define routes
router.get('/tests', strapiController.getAllTests);
router.get('/tests/:id', strapiController.getTestById);
router.post('/tests', strapiController.createTest);
router.put('/tests/:id', strapiController.updateTest);
router.delete('/tests/:id', strapiController.deleteTest);

module.exports = router; 