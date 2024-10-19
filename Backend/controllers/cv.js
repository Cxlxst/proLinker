const { cv, job_type, cv_language, level, language, experience, cv_user, user } = require('../models');

const createCV = async (req, res) => {
    try {
        const { job_type_name, languages, experiences, formations, ...cvData } = req.body;
        const jobType = await job_type.findOne({ name: job_type_name });
        if (!jobType) return res.status(404).json({ message: 'Type de job non trouvé' });
        const newCV = await cv.create({ ...cvData, user_id: req.user._id, job_type_id: jobType._id });
        await Promise.all(languages.map(async lang => {
            const levelDoc = await level.findOne({ name: lang.level_name });
            const languageDoc = await language.findOne({ name: lang.name });
            if (!levelDoc || !languageDoc) throw new Error('Niveau ou langue non trouvé');
            await cv_language.create({ id_cv: newCV._id, id_language: languageDoc._id, id_level: levelDoc._id });
        }));
        await Promise.all(experiences.map(async exp => {
            exp.cvId = newCV._id;
            exp.type = "Experience"
            await experience.create(exp);
        }));
        await Promise.all(formations.map(async form => {
            form.cvId = newCV._id;
            form.type = "Formation"
            await experience.create(form);
        }));
        res.status(201).json(newCV);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getCVs = async (req, res) => {
    try {
        let connect = false;
        if (req?.user && req?.user._id) connect = true;
        const cvs = await cv.find().populate('job_type_id').populate({ path: 'user_id', select: '-password' });
        const formattedCVs = await Promise.all(cvs.map(async cvDoc => {
            const languages = await cv_language.find({ id_cv: cvDoc._id }).populate('id_level').populate('id_language');
            const experiences = await experience.find({ cvId: cvDoc._id });
            const like = connect ? await cv_user.findOne({ id_cv: cvDoc._id, id_user: req.user._id }) : {};
            const formattedLanguages = languages.map(lang => ({ name: lang.id_language.name, level: lang.id_level.name }));
            const usersRecommandation = await allRecommandationsFromCv(cvDoc._id);
            const formattedExperiences = experiences.map(exp => ({ type: exp.type, name: exp.name, beginning: exp.beginning, end: exp.end, current: exp.current, structureName: exp.structureName, description: exp.description }));
            return { ...cvDoc.toObject(), languages: formattedLanguages, experiences: formattedExperiences, recommandation: like, usersRecommandation: usersRecommandation };
            // return { ...cvDoc.toObject(), languages: formattedLanguages, experiences: formattedExperiences, recommandation: like};
        }));
        res.status(200).json(formattedCVs);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des CVs', error });
    }
};

//tous les users qui ont recommandé un CV
const allRecommandationsFromCv = async (id) => {
    const cvId = id;
    try {
        const recommendations = await cv_user.find({ id_cv: cvId });
        if (recommendations.length === 0) {
            return { message: 'Aucune recommandation trouvée pour ce CV' };
        }
        const userIds = recommendations.map(reco => reco.id_user);
        const users = await user.find({ _id: { $in: userIds } });
        return { users : users };

    } catch (error) {
        return { message: 'Erreur lors de la récupération des utilisateurs', error: error.message };
    }
}

const getCVById = async (req, res) => {
    try {
        const cvDoc = await cv.findOne({ user_id: req.params.id }).populate('job_type_id').populate({ path: 'user_id', select: '-password' });
        const languages = await cv_language.find({ id_cv: cvDoc._id }).populate('id_level').populate('id_language');
        const experiences = await experience.find({ cvId: cvDoc._id });
        const formattedLanguages = languages.map(lang => ({ name: lang.id_language.name, level_name: lang.id_level.name }));
        const formattedExperiences = experiences.map(exp => ({ type: exp.type, name: exp.name, beginning: exp.beginning, end: exp.end, current: exp.current, structureName: exp.structureName, description: exp.description }));
        res.status(200).json({ ...cvDoc.toObject(), languages: formattedLanguages, experiences: formattedExperiences });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du CV', error });
    }
};

const updateCV = async (req, res) => {
    try {
        const { job_type_name, languages, experiences, formations, ...cvData } = req.body;
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
        await experience.deleteMany({ cvId: req.params.id });
        await Promise.all(experiences.map(async exp => {
            exp.cvId = updatedCV._id;
            exp.type = "Experience";
            await experience.create(exp);
        }));
        await Promise.all(formations.map(async form => {
            form.cvId = updatedCV._id;
            form.type = "Formation";
            await experience.create(form);
        }));
        res.status(200).json(updatedCV);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteCV = async (req, res) => {
    try {
        const deletedCV = await cv.findByIdAndDelete(req.params.id);
        if (!deletedCV) return res.status(404).json({ message: 'CV non trouvé' });
        await cv_language.deleteMany({ id_cv: req.params.id });
        await experience.deleteMany({ cvId: req.params.id });
        res.status(200).json({ message: 'CV, langues et expériences associées supprimés avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du CV', error });
    }
};

module.exports = { createCV, getCVs, getCVById, updateCV, deleteCV };
