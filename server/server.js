const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const logger = require('./logger.js');
const userRouter = require('./UserRouter.js');
const connectDB = require('./database.js');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(logger);
app.use(morgan('combined'));
app.use('/', userRouter);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Resource Not Found' });
});

const start = async () => {
    try {
        const connect = await connectDB();
        console.log('Connected to MongoDB');
        app.listen(8000, () => {
            console.log('Server running on port 8000');
        });
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
};

start();