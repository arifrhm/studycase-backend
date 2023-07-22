const express = require('express');
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new user
router.post('/', auth, orderController.create);

// Get all users
router.get('/', auth, orderController.all);

// Get a single user
router.get('/:id', auth, orderController.getbyID);

// Update a user
router.put('/:id', auth, orderController.updateByID);

// Delete a user
router.delete('/:id', auth, orderController.updateByID);

module.exports = router;

