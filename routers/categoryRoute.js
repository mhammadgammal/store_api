import { Router } from 'express';

const categoryRoute = Router();
import { getCategoris, createCategory, getCategoryById, updateCategory, deleteCategory } from '../services/categoryService.js';

categoryRoute.route('/')
    .get(getCategoris)
    .post(createCategory)

categoryRoute.route('/:id')
    .get(getCategoryById)
    .put(updateCategory)
    .delete(deleteCategory);

export default categoryRoute;