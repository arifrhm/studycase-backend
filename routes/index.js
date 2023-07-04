
const express = require('express');
const tagRoutes = require('../routes/tag');
const router = express.Router();
const productRoutes = require('../routes/product');
const userRoutes = require('../routes/users');
const authRoutes = require('../routes/auth');
const orderRoutes = require('../routes/order');
const deliveryAddress = require('../routes/deliveryAddress');

router.use('/tag', tagRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/order', orderRoutes);
router.use('/delivery-address', deliveryAddress);

module.exports = router;