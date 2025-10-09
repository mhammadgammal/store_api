import { Router } from 'express';

const productsRoute = Router();
import { getAllProducts, getProductById, search, createProduct, updateProduct, deleteProduct } from '../controller/productsController.js';
productsRoute.route('/')
    .get(getAllProducts)
    .post(createProduct)

productsRoute.get('/search', search)

productsRoute.route('/:id')
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct)

export default productsRoute;