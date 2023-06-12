
const express = require('express');
const tagRoutes = require('../routes/tag');
const router = express.Router();
const productRoutes = require('../routes/product');
const userRoutes = require('../routes/users');
const authRoutes = require('../routes/auth');
const orderRoutes = require('../routes/order');

router.use('/tag', tagRoutes);
router.use('/product', productRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/order', orderRoutes);

module.exports = router;