const mongoose = require('mongoose');

const cvSchema = mongoose.Schema({
    region: { type: String, required: true },
    city: { type: String, required: true },
    visibility: { type: Boolean, default: true },
    experiences: { type: mongoose.Schema.Types.Mixed },
    studies: { type: mongoose.Schema.Types.Mixed },
    hard_skill: { type: [String], required: true },
    soft_skill: { type: [String], required: true },
    hobbies: { type: String },
    profil: { type: String },
    id_language: { type: Number, required: true },
    job_type_id: { type: mongoose.Schema.Types.ObjectId, ref: 'JobType', required: true }
}, { timestamps: true });

const Cv = mongoose.model('Cv', cvSchema);
module.exports = Cv;