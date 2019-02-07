const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// Routes
const fileRoutes = require('./routes/files');

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/v1', fileRoutes);

module.exports = app;