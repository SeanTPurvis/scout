const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb://SeanTPurvis:" + process.env.MONGO_ATLAS_PASSWORD + "@scout-shard-00-00-iszaz.mongodb.net:27017,scout-shard-00-01-iszaz.mongodb.net:27017,scout-shard-00-02-iszaz.mongodb.net:27017/test?ssl=true&replicaSet=Scout-shard-0&authSource=admin&retryWrites=true",
{
    useMongoClient: true
})

// Include custom Routers
const imageRoutes = require('./api/routes/images');

// Request logger
app.use(morgan('dev'));

// Handle CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        return res.status(200).json({});
    }
});

// Routes that should handle requests
app.use('/api/v1/images', imageRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;