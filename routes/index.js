
const express = require('express');
const tagRoutes = require('../routes/tag');
const router = express.Router();
const productRoutes = require('../routes/product');
const userRoutes = require('../routes/users');
const authRoutes = require('../routes/auth');

router.use('/tag', tagRoutes);
router.use('/product', productRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;