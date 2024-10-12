const mongoose = require('mongoose');

const levelSchema = mongoose.Schema({
    name: { type: String, required: true }
}, { timestamps: true });

const Level = mongoose.model('level', levelSchema);
module.exports = Level;
