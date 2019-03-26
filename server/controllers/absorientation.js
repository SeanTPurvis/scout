const mongoose = require("mongoose");

const Absorientation = require('../models/absorientation')

// Create new absorientation document
exports.absorientation_create = (req, res, next) => {
    const absorientation = new Absorientation({
        _id: new mongoose.Types.ObjectId(),
        user_email: req.body.user_email,
        time: req.body.time,
        x_position: req.body.x_position,
        y_position: req.body.y_position,
        z_position: req.body.z_position,
        w_position: req.body.w_position
    });

    absorientation.save()
    .then(result => {
        res.status(201).json({
            message: 'Absorientation reading created'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
}

// Get all absorientation documents
exports.absorientation_get_all = (req, res, next) => {
    Absorientation.find()
    .select("_id user_email time x_position y_position z_position w_position")
    .exec()
    .then(documents => {
        
        const responseBody = {
            count: documents.length,
            absorientations: documents.map(document => {
                return {
                    _id: document._id,
                    user_email: document.user_email,
                    time: document.time,
                    x_position: document.x_position,
                    y_position: document.y_position,
                    z_position: document.z_position,
                    w_position: document.w_position
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

// Get one absorientation document
exports.absorientation_get_one = (req, res, next) => {
    const id = req.params.absId;
    Absorientation.findById(id)
    .select("_id user_email time x_position y_position z_position w_position")
    .exec()
    .then(absorientation => {
        if (!absorientation) {
            return res.status(404).json({
                message: "Absorientation reading not found"
            });
        };
        
        res.status(200).json({
            absorientation: absorientation
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
};

// Delete one absorientation document
exports.absorientation_delete_one = (req, res, next) => {
    const id = req.params.absId;
    Absorientation.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Absorientation deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}

// Delete all absorientation documents that match the user_email provided
exports.absorientation_delete_many_email = (req, res, next) => {
    const email = req.params.userEmail;
    Absorientation.deleteMany({user_email: email})
    .exec()
    .then(result => {
        res.status(200).json({
            message: "All absorientation data by user deleted"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}