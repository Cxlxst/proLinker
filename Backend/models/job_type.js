const mongoose = require('mongoose');

const jobTypeSchema = mongoose.Schema({
    name: { type: String, required: true }
}, { timestamps: true });

const JobType = mongoose.model('job_type', jobTypeSchema);
module.exports = JobType;
