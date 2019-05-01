const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_email: { type: String },
    time: { type: Date, default: Date.now },
    data: { type: String } // Base64 encoded string
})

module.exports = mongoose.model('Image', imageSchema);