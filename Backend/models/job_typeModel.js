const mongoose = require('mongoose');

const jobTypeSchema = mongoose.Schema({
    id_job_type: { type: Number, required: true },
    name: { type: String, required: true }
}, { timestamps: true });

const JobType = mongoose.model('JobType', jobTypeSchema);
module.exports = JobType;
