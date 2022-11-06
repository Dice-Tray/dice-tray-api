const express = require('express');
const AuthController = require('../controllers/AuthController');

// Create the router.
const router = express.Router();

// Create the individual user routes
router.post('/login', AuthController.login);

module.exports = router;
