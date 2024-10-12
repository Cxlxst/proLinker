const mongoose = require('mongoose');

const cvUserSchema = mongoose.Schema({
    id_cv: { type: mongoose.Schema.Types.ObjectId, ref: 'cv', required: true },
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
}, { timestamps: true });

const CvUser = mongoose.model('cv_user', cvUserSchema);
module.exports = CvUser;
