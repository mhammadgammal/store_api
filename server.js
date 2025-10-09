import dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import Cors from 'cors';
import notFoundMiddleware from './middleware/notFoundMiddleware.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import apiRouter from './routers/api/api.js';
import connectToDatabase from './config/database.config.js';
// PORT comes from environment variables (see config/app.config)
const app = express();

app.use(json());
app.use(Cors('*'));
app.use(
    '/api/v1',
    apiRouter
)
app.get(
    '/',
    (_, res) => { return res.send('Welcome to Store API'); }
)

app.use(notFoundMiddleware);
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
