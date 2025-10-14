import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();
import express, { json } from 'express';
import Cors from 'cors';
import routeNotFoundMiddleware from './middleware/routeNotFoundMiddleware.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import apiRouter from './routers/api/api.js';
import connectToDatabase from './config/database.config.js';
import methodNotAllowed from './middleware/methodNotAllowed.js';
// PORT comes from environment variables (see config/app.config)
const app = express();

app.use(json());
app.use(morgan('dev'));
app.use(Cors('*'));
app.use(
    '/api/v1',
    apiRouter
)
app.get(
    '/',
    (_, res) => { return res.send('Welcome to Store API'); }
)

app.use(methodNotAllowed);
app.use(routeNotFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;
connectToDatabase().then(
    () => {
        app.listen(
            port,
            () => console.log(`Server is running: http://localhost:${port}...`)
        )
    }
).catch((err) => console.error('Failed to connect to the database:', err.message))
