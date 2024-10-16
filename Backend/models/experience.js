const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema({
    type: { type: String, require: true },
    name: { type: String, required: true },
    beginning: { type: Date, required: true },
    end: { type: Date, required: true },
    current: { type: Boolean, require: true },
    structureName: { type: String, required: true },
    description: { type: String },
    cvId: { type: mongoose.Schema.Types.ObjectId, ref: 'CV' }
}, { timestamps: true });

const Experience = mongoose.model('experience', experienceSchema);
module.exports = Experience;