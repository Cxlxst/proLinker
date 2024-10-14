const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema({
    name: { type: String, required: true },
    beginning: { type: Date, required: true },
    end: { type: Date, required: true },
    structureName: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

const Experience = mongoose.model('experience', experienceSchema);
module.exports = Experience;