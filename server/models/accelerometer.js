const mongoose = require('mongoose');

const accelerometerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_email: { type: String },
    time: { type: Date, default: Date.now },
    x_axis: { type: Number },
    y_axis: { type: Number },
    z_axis: { type: Number } 
});

module.exports = mongoose.model('Accelerometer', accelerometerSchema);