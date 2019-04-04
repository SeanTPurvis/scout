const mongoose = require('mongoose');

const linaccelerationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_email: { type: String },
    time: { type: Date, default: Date.now },
    x_acceleration: { type: Number },
    y_acceleration: { type: Number },
    z_acceleration: { type: Number } 
})

module.exports = mongoose.model('Linacceleration', linaccelerationSchema);