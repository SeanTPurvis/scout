const mongoose = require("mongoose");

const Gyroscope = require('../models/gyroscope')

// Create new gyroscope document
exports.gyroscope_create = (req, res, next) => {
    const gyroscope = new Gyroscope({
        _id: new mongoose.Types.ObjectId(),
        user_email: req.body.user_email,
        time: req.body.time,
        x_angular_velocity: req.body.x_angular_velocity,
        y_angular_velocity: req.body.y_angular_velocity,
        z_angular_velocity: req.body.z_angular_velocity
    });

    gyroscope.save()
    .then(result => {
        res.status(201).json({
            message: 'Gyroscope reading created'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

// Get all gyroscope documents
exports.gyroscope_get_all = (req, res, next) => {
    Gyroscope.find()
    .select("_id user_email time x_angular_velocity y_angular_velocity z_angular_velocity")
    .exec()
    .then(documents => {
        
        const responseBody = {
            count: documents.length,
            gyroscopes: documents.map(document => {
                return {
                    _id: document._id,
                    user_email: document.user_email,
                    time: document.time,
                    x_angular_velocity: document.x_angular_velocity,
                    y_angular_velocity: document.y_angular_velocity,
                    z_angular_velocity: document.z_angular_velocity
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

// Get one gyroscope document
exports.gyroscope_get_one = (req, res, next) => {
    const id = req.params.gyroId;
    Gyroscope.findById(id)
    .select("_id user_email time x_angular_velocity y_angular_velocity z_angular_velocity")
    .exec()
    .then(gyroscope => {
        if (!gyroscope) {
            return res.status(404).json({
                message: "Gyroscope reading not found"
            });
        };
        
        res.status(200).json({
            gyroscope: gyroscope
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
};

// Delete one gyroscope document
exports.gyroscope_delete_one = (req, res, next) => {
    const id = req.params.gyroId;
    Gyroscope.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Gyroscope deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

// Delete all gyroscope documents that match the user_email provided
exports.gyroscope_delete_many_email = (req, res, next) => {
    const email = req.params.userEmail;
    Gyroscope.deleteMany({user_email: email})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "All gyroscope data by user deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}