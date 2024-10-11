const mongoose = require('mongoose');

const levelSchema = mongoose.Schema({
    id_level: { type: Number, required: true },
    name: { type: String, required: true }
}, { timestamps: true });

const Level = mongoose.model('Level', levelSchema);
module.exports = Level;
