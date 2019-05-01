const mongoose = require("mongoose");

const Microphone = require('../models/microphone')

// Create new microphone document
exports.microphone_create = (req, res, next) => {
    const microphone = new Microphone({
        _id: new mongoose.Types.ObjectId(),
        user_email: req.body.user_email,
        time: req.body.time,
        capture: req.body.capture
    });

    microphone.save()
    .then(result => {
        res.status(201).json({
            message: 'Microphone reading created'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

// Get all microphone documents
exports.microphone_get_all = (req, res, next) => {
    Microphone.find()
    .select("_id user_email time capture")
    .exec()
    .then(documents => {
        
        const responseBody = {
            count: documents.length,
            microphones: documents.map(document => {
                return {
                    _id: document._id,
                    user_email: document.user_email,
                    time: document.time,
                    capture: document.capture
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

// Get one microphone document
exports.microphone_get_one = (req, res, next) => {
    const id = req.params.micId;
    Microphone.findById(id)
    .select("_id user_email time capture")
    .exec()
    .then(microphone => {
        if (!microphone) {
            return res.status(404).json({
                message: "Microphone reading not found"
            });
        };
        
        res.status(200).json({
            microphone: microphone
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
};

// Delete one microphone document
exports.microphone_delete_one = (req, res, next) => {
    const id = req.params.micId;
    Microphone.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Microphone deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

// Delete all microphone documents that match the user_email provided
exports.microphone_delete_many_email = (req, res, next) => {
    const email = req.params.userEmail;
    Microphone.deleteMany({user_email: email})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "All microphone data by user deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}