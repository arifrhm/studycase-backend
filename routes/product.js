const express = require('express');
const productController = require('../controllers/productController')
const uploadFileMiddleware = require('../middleware/uploadMiddleware');
const multer  = require('multer');
const mime = require('mime');

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/products')
    },
    filename: function (req, file, cb) {
      cb(null, `product-${  Date.now()  }${Math.floor(Math.random() * 100)}.${  mime.getExtension(file.mimetype)}`);
    }
  })
const upload = multer({ storage });

router.get('/', productController.all);
router.post('/', upload.single('image'), uploadFileMiddleware.getFileName, productController.create);
router.get('/:id',productController.getbyID);
router.patch('/:id',productController.updateByID);
router.delete('/:id',productController.deleteByID);


module.exports = router;