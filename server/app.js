const express = require('express');
const morgan = require('morgan');
const app = express();


// Include custom Routers
const imageRoutes = require('./api/routes/images');

// Request logger
app.use(morgan('dev'));

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