import { Router } from 'express';
import { getBrands, getBrandById, createBrand, updateBrand, deleteBrand } from '../services/brandService.js';

const brandRoute = Router();

brandRoute.route('/')
    .get(getBrands)
    .post(createBrand)

brandRoute.route('/:id')
    .get(getBrandById)
    .put(updateBrand)
    .delete(deleteBrand);

export default brandRoute;