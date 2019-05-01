const mongoose = require('mongoose');

const microphoneSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_email: { type: String },
    time: { type: Date, default: Date.now },
    capture: Buffer
})

module.exports = mongoose.model('Microphone', microphoneSchema);