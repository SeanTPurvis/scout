const express = require('express');
const router = express.Router();

// Handle incoming GET requests to images
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Images were fetched'
    });
});

// Handle incoming POST requests to images
router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Image was saved'
    });
});

// Handle incoming GET requests to images using imageId
router.get('/:imageId', (req, res, next) => {
    res.status(200).json({
        message: 'Image details',
        imageId: req.params.imageId
    });
});

// Handle incoming DELETE to requests to images using imageId
router.delete('/:imageId', (req, res, next) => {
    res.status(200).json({
        message: 'Image deleted',
        imageId: req.params.imageId
    });
});

module.exports = router;