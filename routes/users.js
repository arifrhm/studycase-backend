var express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const generateToken = require('../middleware/generateToken');

// Create a new user
router.post('/', async (req, res) => {
  try {
      const { name, email, password, isAdmin } = req.body;
      const user = new User({ name, email, password, isAdmin });
      await user.save();
      res.status(201).json(user);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});

//Create genreate token endpoint
async function login(req, res) {
  try {
      // Check if user exists and password is correct
      const user = await User.findOne({ username: req.body.username });
      if (!user) return res.status(400).json({ error: 'Invalid username or password' });
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) return res.status(400).json({ error: 'Invalid username or password' });
      // Generate JWT token and send back to client
      const token = generateToken(user);
      res.json({ token });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
}
// Login endpoint
router.post('/login', login);

// Get all users
router.get('/', auth, async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Get a single user
router.get('/:id', auth, async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (!user) throw new Error('User not found');
      res.json(user);
  } catch (err) {
      res.status(404).json({ error: err.message });
  }
});

// Update a user
router.put('/:id', auth, async (req, res) => {
  try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) throw new Error('User not found');
      res.json(user);
  } catch (err) {
      res.status(404).json({ error: err.message });
  }
});

// Delete a user
router.delete('/:id', auth, async (req, res) => {
  try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) throw new Error('User not found');
      res.sendStatus(204);
  } catch (err) {
      res.status(404).json({ error: err.message });
  }
});

module.exports = router;

