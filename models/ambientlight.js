const mongoose = require('mongoose');

const ambientlightSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_email: { type: String },
    time: { type: Date, default: Date.now },
    lux: { type: Number }
});

module.exports = mongoose.model('AmbientLight', ambientlightSchema);