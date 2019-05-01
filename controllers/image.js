const mongoose = require("mongoose");

const Image = require('../models/image')

// Create new image document
exports.image_create = (req, res, next) => {
    const image = new Image({
        _id: new mongoose.Types.ObjectId(),
        user_email: req.body.user_email,
        time: req.body.time,
        data: req.body.data
    });

    image.save()
    .then(result => {
        res.status(201).json({
            message: 'Image reading created'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

// Get all image documents
exports.image_get_all = (req, res, next) => {
    Image.find()
    .select("_id user_email time mage")
    .exec()
    .then(documents => {
        
        const responseBody = {
            count: documents.length,
            images: documents.map(document => {
                return {
                    _id: document._id,
                    user_email: document.user_email,
                    time: document.time,
                    data: document.data
                }
            })
        };

        res.status(200).json(responseBody);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })

}

// Get one image document
exports.image_get_one = (req, res, next) => {
    const id = req.params.imageId;
    Image.findById(id)
    .select("_id user_email time data")
    .exec()
    .then(image => {
        if (!image) {
            return res.status(404).json({
                message: "Image reading not found"
            });
        };
        
        res.status(200).json({
            image: image
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
};

// Delete one image document
exports.image_delete_one = (req, res, next) => {
    const id = req.params.imageId;
    Image.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Image deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

// Delete all image documents that match the user_email provided
exports.image_delete_many_email = (req, res, next) => {
    const email = req.params.userEmail;
    Image.deleteMany({user_email: email})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "All image data by user deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}