import { Router } from 'express';

const categoryRoute = Router();
import { getCategoris, createCategory, getCategoryById } from '../services/categoryService.js';

categoryRoute.route('/')
    .get(getCategoris)
    .post(createCategory)

categoryRoute.route('/:id')
    .get(getCategoryById)
export default categoryRoute;