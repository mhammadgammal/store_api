const express = require('express');

const apiRouter = express.Router();

apiRouter.route('/')
    .get((req, res) => {
        res.status(200).json({
            message: 'Welcome to the Store API',
            version: '1.0.0'
        });
    });



module.exports = apiRouter;