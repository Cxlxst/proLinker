const mongoose = require('mongoose');

const cvLanguageSchema = mongoose.Schema({
    id_cv_language: { type: Number, required: true },
    id_cv: { type: mongoose.Schema.Types.ObjectId, ref: 'Cv', required: true },
    id_language: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', required: true },
    id_level: { type: mongoose.Schema.Types.ObjectId, ref: 'Level', required: true }
}, { timestamps: true });

const CvLanguage = mongoose.model('cv_language', cvLanguageSchema);
module.exports = CvLanguage;