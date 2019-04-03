const mongoose = require('mongoose');

const relorientationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_email: { type: String },
    time: { type: Date, default: Date.now },
    rotation_matrix: []
});

module.exports = mongoose.model('Relorientation', relorientationSchema);