require('dotenv').config();
const { PORT } = require('./config/app.config');
const express = require('express');
const Cors = require('cors');
const notFoundMiddleware = require('./middleware/notFoundMiddleware');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware')
const apiRouter = require('./routers/api/api');
const connectToDatabase = require('./config/database.config');
const app = express();

app.use(express.json());
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
const port = PORT || 3000;
connectToDatabase().then(
    () => {
        app.listen(
            port,
            () => console.log(`Server is running: http://localhost:${port}...`)
        )
    }
).catch((err) => console.error('Failed to connect to the database:', err.message))
