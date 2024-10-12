const { cv_user, cv, job_type, cv_language, level, user } = require('../models');

const createCV = async (req, res) => {
    try {
        const { job_type_name, languages, ...cvData } = req.body;
        const jobType = await job_type.findOne({ name: job_type_name });
        if (!jobType) return res.status(404).json({ message: 'Type de job non trouvé' });
        const newCV = await cv.create({ ...cvData, user_id: req.user._id, job_type_id: jobType._id });
        await Promise.all(languages?.map(async lang => {
            const levelDoc = await level.findOne({ name: lang.level_name });
            if (!levelDoc) throw new Error(`Niveau non trouvé pour ${lang.name}`);
            await cv_language.create({ id_cv: newCV._id, id_language: lang.name, id_level: levelDoc._id });
        }));

        res.status(201).json(newCV);
    } catch (error) {
        res.status(error.message.includes('Niveau non trouvé') ? 404 : 500).json({ message: error.message });
    }
};


const getCVs = async (req, res) => {
    try {
        res.status(200).json(await cv.find());
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des CVs', error });
    }
};

module.exports = { createCV, getCVs };
