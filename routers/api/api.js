import { Router } from 'express';

const apiRouter = Router();
import productsRoute from '../productsRoute.js';
import categoryRoute from '../categoryRoute.js';
import brandRoute from '../brandRoute.js';

apiRouter.route('/')
    .get((req, res) => {
        res.status(200).json({
            message: 'Welcome to the Store API',
            version: '1.0.0'
        });
    });

apiRouter.use('/products', productsRoute);
apiRouter.use('/categories', categoryRoute);
apiRouter.use('/brands', brandRoute);
export default apiRouter;