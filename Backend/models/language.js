const mongoose = require('mongoose');

const LanguageSchema = mongoose.Schema({
    name: { type: String, required: true }
}, { timestamps: true });

const Language = mongoose.model('language', LanguageSchema);
module.exports = Language;
