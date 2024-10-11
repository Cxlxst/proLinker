const job_type = require('../models/job_type');

const getJobTypes = async (req, res) => {
    try {
        const job_types = await job_type.find();
        res.status(200).json(job_types);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des niveaux', error });
    }
};

module.exports = { getJobTypes };