
const express = require('express');
const tagRoutes = require('../routes/tag');
const router = express.Router();
const productRoutes = require('../routes/product');
const userRoutes = require('../routes/users');

router.use('/tag', tagRoutes);
router.use('/product', productRoutes);
router.use('/users', userRoutes);

module.exports = router;