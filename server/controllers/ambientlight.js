const mongoose = require("mongoose");

const Ambientlight = require('../models/ambientlight')

// Create new ambientlight document
exports.ambientlight_create = (req, res, next) => {
    const ambientlight = new Ambientlight({
        _id: new mongoose.Types.ObjectId(),
        user_email: req.body.user_email,
        time: req.body.time,
        lux: req.body.lux
    });

    ambientlight.save()
    .then(result => {
        res.status(201).json({
            message: 'Ambientlight reading created'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

// Get all ambientlight documents
exports.ambientlight_get_all = (req, res, next) => {
    Ambientlight.find()
    .select("_id user_email time x_position y_position z_position w_position")
    .exec()
    .then(documents => {
        
        const responseBody = {
            count: documents.length,
            ambientlights: documents.map(document => {
                return {
                    _id: document._id,
                    user_email: document.user_email,
                    time: document.time,
                    lux: document.lux
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

// Get one ambientlight document
exports.ambientlight_get_one = (req, res, next) => {
    const id = req.params.absId;
    Ambientlight.findById(id)
    .select("_id user_email time x_position y_position z_position w_position")
    .exec()
    .then(ambientlight => {
        if (!ambientlight) {
            return res.status(404).json({
                message: "Ambientlight reading not found"
            });
        };
        
        res.status(200).json({
            ambientlight: ambientlight
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
};

// Delete one ambientlight document
exports.ambientlight_delete_one = (req, res, next) => {
    const id = req.params.absId;
    Ambientlight.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Ambientlight deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

// Delete all ambientlight documents that match the user_email provided
exports.ambientlight_delete_many_email = (req, res, next) => {
    const email = req.params.userEmail;
    Ambientlight.deleteMany({user_email: email})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "All ambientlight data by user deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}