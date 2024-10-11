const mongoose = require('mongoose');

const cvUserSchema = mongoose.Schema({
    id_cv: { type: mongoose.Schema.Types.ObjectId, ref: 'Cv', required: true },
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const CvUser = mongoose.model('CvUser', cvUserSchema);
module.exports = CvUser;
