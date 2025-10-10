import { Router } from 'express';

const categoryRoute = Router();
import { getCategoris, createCategory } from '../services/categoryService.js';

categoryRoute.route('/')
    .get(getCategoris)
    .post(createCategory)

export default categoryRoute;