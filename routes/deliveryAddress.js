const express = require('express');
const deliveryAddressController = require('../controllers/deliveryAddressController');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new user
router.post('/', deliveryAddressController.create);

// Get all users
router.get('/', auth, deliveryAddressController.all);

// Get a single user
router.get('/:id', auth, deliveryAddressController.getbyID);

// Update a user
router.put('/:id', auth, deliveryAddressController.updateByID);

// Delete a user
router.delete('/:id', auth, deliveryAddressController.updateByID);

module.exports = router;

