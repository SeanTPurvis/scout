const mongoose = require("mongoose");

const Accelerometer = require('../models/accelerometer')

// Create new accelerometer document
exports.accelerometer_create = (req, res, next) => {
    const accelerometer = new Accelerometer({
        _id: new mongoose.Types.ObjectId(),
        user_email: req.body.user_email,
        time: req.body.time,
        x_acceleration: req.body.x_acceleration,
        y_acceleration: req.body.y_acceleration,
        z_acceleration: req.body.z_acceleration
    });

    accelerometer.save()
    .then(result => {
        res.status(201).json({
            message: 'Accelerometer reading created'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

// Get all accelerometer documents
exports.accelerometer_get_all = (req, res, next) => {
    Accelerometer.find()
    .select("_id user_email time x_acceleration y_acceleration z_acceleration")
    .exec()
    .then(documents => {
        
        const responseBody = {
            count: documents.length,
            accelerometers: documents.map(document => {
                return {
                    _id: document._id,
                    user_email: document.user_email,
                    time: document.time,
                    x_acceleration: document.x_acceleration,
                    y_acceleration: document.y_acceleration,
                    z_acceleration: document.z_acceleration
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

// Get one accelerometer document
exports.accelerometer_get_one = (req, res, next) => {
    const id = req.params.accId;
    Accelerometer.findById(id)
    .select("_id user_email time x_acceleration y_acceleration z_acceleration")
    .exec()
    .then(accelerometer => {
        if (!accelerometer) {
            return res.status(404).json({
                message: "Accelerometer reading not found"
            });
        };
        
        res.status(200).json({
            accelerometer: accelerometer
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
};

// Delete one accelerometer document
exports.accelerometer_delete_one = (req, res, next) => {
    const id = req.params.accId;
    Accelerometer.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Accelerometer deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

// Delete all accelerometer documents that match the user_email provided
exports.accelerometer_delete_many_email = (req, res, next) => {
    const email = req.params.userEmail;
    Accelerometer.deleteMany({user_email: email})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "All accelerometer data by user deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}