const mongoose = require('mongoose');

const absorientationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_email: { type: String },
    time: { type: Date, default: Date.now },
    x_position: { type: Number }, 
    y_position: { type: Number },
    z_position: { type: Number },
    w_position: { type: Number }
})

module.exports = mongoose.model('Absorientation', absorientationSchema);