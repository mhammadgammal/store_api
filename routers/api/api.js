const express = require('express');

const apiRouter = express.Router();
const productsRoute = require('../productsRoute')
apiRouter.route('/')
    .get((req, res) => {
        res.status(200).json({
            message: 'Welcome to the Store API',
            version: '1.0.0'
        });
    });

apiRouter.use('/products', productsRoute);
module.exports = apiRouter;