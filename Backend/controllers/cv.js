const { cv, job_type, cv_language, level, language } = require('../models');

const createCV = async (req, res) => {
    try {
        const { job_type_name, languages, ...cvData } = req.body;
        const jobType = await job_type.findOne({ name: job_type_name });
        if (!jobType) return res.status(404).json({ message: 'Type de job non trouvé' });
        const newCV = await cv.create({ ...cvData, user_id: req.user._id, job_type_id: jobType._id });
        await Promise.all(languages.map(async lang => {
            const levelDoc = await level.findOne({ name: lang.level_name });
            const languageDoc = await language.findOne({ name: lang.name });
            if (!levelDoc || !languageDoc) throw new Error(`Niveau ou langue non trouvé`);
            await cv_language.create({ id_cv: newCV._id, id_language: languageDoc._id, id_level: levelDoc._id });
        }));

        res.status(201).json(newCV);
    } catch (error) {
        res.status(error.message.includes('Niveau ou langue non trouvé') ? 404 : 500).json({ message: error.message });
    }
};

const getCVs = async (req, res) => {
    try {
        const cvs = await cv.find().populate('job_type_id');
        const formattedCVs = await Promise.all(cvs.map(async cvDoc => {
            const languages = await cv_language.find({ id_cv: cvDoc._id }).populate('id_level').populate('id_language');
            const formattedLanguages = languages.map(lang => ({
                language: lang.id_language.name,
                level: lang.id_level.name
            }));
            return { ...cvDoc.toObject(), languages: formattedLanguages };
        }));
        res.status(200).json(formattedCVs);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des CVs', error });
    }
};

const getCVById = async (req, res) => {
    try {
        const cvDoc = await cv.findById(req.params.id).populate('job_type_id');
        if (!cvDoc) return res.status(404).json({ message: 'CV non trouvé' });
        const languages = await cv_language.find({ id_cv: req.params.id }).populate('id_level').populate('id_language');
        const formattedLanguages = languages.map(lang => ({
            language: lang.id_language.name,
            level: lang.id_level.name
        }));
        res.status(200).json({ ...cvDoc.toObject(), languages: formattedLanguages });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du CV', error });
    }
};

const updateCV = async (req, res) => {
    try {
        const { job_type_name, languages, ...cvData } = req.body;
        const jobType = await job_type.findOne({ name: job_type_name });
        if (!jobType) return res.status(404).json({ message: 'Type de job non trouvé' });
        const updatedCV = await cv.findByIdAndUpdate(req.params.id, { ...cvData, job_type_id: jobType._id }, { new: true });
        if (!updatedCV) return res.status(404).json({ message: 'CV non trouvé' });

        await cv_language.deleteMany({ id_cv: req.params.id });
        await Promise.all(languages.map(async lang => {
            const levelDoc = await level.findOne({ name: lang.level_name });
            const languageDoc = await language.findOne({ name: lang.name });
            if (!levelDoc || !languageDoc) throw new Error(`Niveau ou langue non trouvé`);
            await cv_language.create({ id_cv: updatedCV._id, id_language: languageDoc._id, id_level: levelDoc._id });
        }));

        const updatedLanguages = await cv_language.find({ id_cv: updatedCV._id }).populate('id_level').populate('id_language');
        const formattedLanguages = updatedLanguages.map(lang => ({
            language: lang.id_language.name,
            level: lang.id_level.name
        }));

        res.status(200).json({ ...updatedCV.toObject(), languages: formattedLanguages });
    } catch (error) {
        res.status(error.message.includes('Niveau ou langue non trouvé') ? 404 : 500).json({ message: error.message });
    }
};

const deleteCV = async (req, res) => {
    try {
        const deletedCV = await cv.findByIdAndDelete(req.params.id);
        if (!deletedCV) return res.status(404).json({ message: 'CV non trouvé' });
        await cv_language.deleteMany({ id_cv: req.params.id });
        res.status(200).json({ message: 'CV supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du CV', error });
    }
};

module.exports = { createCV, getCVs, getCVById, updateCV, deleteCV };
