// Node modules.
const express = require('express');
// Relative modules.
const UserController = require('../controllers/UserController');

// Create the router.
const router = express.Router();

// Create the individual user routes
router.post('/users', UserController.create);
router.get('/users/:userID', UserController.getUserByID);
router.put('/users/:userID', UserController.updateUserByID);
router.delete('/users/:userID', UserController.deleteUserByID);

//create the batch route
router.get('/users', UserController.getAll);

export default router;
