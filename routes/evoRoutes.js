const express = require('express');
const evoController = require('../controllers/evoController');

const router = express.Router();

// Define the evolution route
router.use('/evolution', evoController);

module.exports = router;
