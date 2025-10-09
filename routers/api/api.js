import { Router } from 'express';

const apiRouter = Router();
import productsRoute from '../productsRoute.js';
apiRouter.route('/')
    .get((req, res) => {
        res.status(200).json({
            message: 'Welcome to the Store API',
            version: '1.0.0'
        });
    });

apiRouter.use('/products', productsRoute);
export default apiRouter;