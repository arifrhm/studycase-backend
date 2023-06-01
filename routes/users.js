const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new user
router.post('/', userController.create);

// Login endpoint
router.post('/login', userController.login);

// Get all users
router.get('/', auth, userController.all);

// Get a single user
router.get('/:id', auth, userController.getbyID);

// Update a user
router.put('/:id', auth, userController.updateByID);

// Delete a user
router.delete('/:id', auth, userController.updateByID);

module.exports = router;

