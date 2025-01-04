const express = require('express');
const {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById
} = require('../controllers/productController');

const router = express.Router();

router.get('/products', getAllProducts); 
router.get('/products/:id', getProductById); 
router.post('/products', createProduct); 
router.delete('/products/:id', deleteProductById); 

module.exports = router;
