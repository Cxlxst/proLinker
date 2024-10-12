const mongoose = require('mongoose');

const cvLanguageSchema = mongoose.Schema({
    id_cv: { type: mongoose.Schema.Types.ObjectId, ref: 'cv', required: true },
    name: { type: String, required: true },
    id_level: { type: mongoose.Schema.Types.ObjectId, ref: 'level', required: true }
}, { timestamps: true });

const CvLanguage = mongoose.model('cv_language', cvLanguageSchema);
module.exports = CvLanguage;