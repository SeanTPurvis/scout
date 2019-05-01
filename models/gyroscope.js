const mongoose = require('mongoose');

const gyroscopeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_email: { type: String },
    time: { type: Date, default: Date.now },
    x_angular_velocity: { type: Number },
    y_angular_velocity: { type: Number },
    z_angular_velocity: { type: Number } 
});

module.exports = mongoose.model('Gyroscope', gyroscopeSchema);