const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const {protect} = require ('../middleware/authMiddleware');
const {authorizeRoles} = require ('../middleware/roleMiddleware');



router.post('/products', protect, productController.createProduct);
router.get('/products', protect, productController.getProducts);
router.get('/products/:id', protect, productController.getProductById);
router.put('/products/:id', protect, productController.updateProduct);
router.delete('/products/:id', protect, productController.deleteProduct);
router.patch('/upload', protect, productController.updateProductImage);
router.post('/createproductwithEmail', protect, productController.createProductwithEmails);
module.exports = router;