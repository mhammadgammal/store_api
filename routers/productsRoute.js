const express = require('express');

const productsRoute = express.Router();
const {
    getAllProducts,
    getProductById,
    search,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controller/productsController');
productsRoute.route('/')
    .get(getAllProducts)
    .post(createProduct)

productsRoute.get('/search', search)

productsRoute.route('/:id')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct)

module.exports = productsRoute;