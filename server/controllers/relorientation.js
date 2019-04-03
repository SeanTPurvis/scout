const mongoose = require("mongoose");

const Relorientation = require('../models/relorientation')

// Create new relorientation document
exports.relorientation_create = (req, res, next) => {
    const relorientation = new Relorientation({
        _id: new mongoose.Types.ObjectId(),
        user_email: req.body.user_email,
        time: req.body.time,
        rotation_matrix: req.body.rotation_matrix.slice(0)   
    });

    relorientation.save()
    .then(result => {
        res.status(201).json({
            message: 'Relorientation reading created'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

// Get all relorientation documents
exports.relorientation_get_all = (req, res, next) => {
    Relorientation.find()
    .select("_id user_email time x_position y_position z_position w_position")
    .exec()
    .then(documents => {
        
        const responseBody = {
            count: documents.length,
            relorientations: documents.map(document => {
                return {
                    _id: document._id,
                    user_email: document.user_email,
                    time: document.time,
                    rotation_matrix: document.rotation_matrix.slice(0)
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

// Get one relorientation document
exports.relorientation_get_one = (req, res, next) => {
    const id = req.params.relId;
    Relorientation.findById(id)
    .select("_id user_email time x_position y_position z_position w_position")
    .exec()
    .then(relorientation => {
        if (!relorientation) {
            return res.status(404).json({
                message: "Relorientation reading not found"
            });
        };
        
        res.status(200).json({
            relorientation: relorientation
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
};

// Delete one relorientation document
exports.relorientation_delete_one = (req, res, next) => {
    const id = req.params.relId;
    Relorientation.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Relorientation deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

// Delete all relorientation documents that match the user_email provided
exports.relorientation_delete_many_email = (req, res, next) => {
    const email = req.params.userEmail;
    Relorientation.deleteMany({user_email: email})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "All relorientation data by user deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}