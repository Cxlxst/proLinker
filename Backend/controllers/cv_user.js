const { cv: Cv, cv_user: Cv_user, user: User } = require('../models/index.js')

const getRecommandations = async (req, res) => {
    try {
        const cv_users = await Cv_user.find();
        res.status(200).json(cv_users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des recommandations', error });
    }
};

const addRecommandation = async (req, res) => {
    const cvId = req.params.id;
    const userId = req.user;
    if (!cvId || !userId) return res.status(400).json({ message: 'Champs manquants' });

    try {
        // verif User et Cv
        const resVerif = await verification(cvId, userId);
        if (resVerif !== 'OK') return res.status(404).json({ message: resVerif });

        // verif Reco
        const recoExists = await Cv_user.findOne({ id_cv: cvId, id_user: userId });
        if (recoExists) return res.status(400).json({ message: 'Vous avez déjà recommandé ce CV' });

        const cv_user = await Cv_user.create({ id_cv: cvId, id_user: userId });
        res.status(201).json({ id_cv: cv_user.id_cv, id_user: cv_user.id_user });
    } catch (error) {
        res.status(500).json({ message: 'Problème de recommandation', error: error.message });
    }
}

const deleteRecommandation = async (req, res) => {
    const cvId = req.params.id;
    const userId = req.user._id;
    if (!cvId || !userId) return res.status(400).json({ message: 'Champs manquants' });

    try {
        // verif User et Cv
        const resVerif = await verification(cvId, userId);
        if (resVerif !== 'OK') return res.status(404).json({ message: resVerif });

        // verif Reco
        const recoExists = await Cv_user.findOne({ id_cv: cvId, id_user: userId });
        if (!recoExists) return res.status(400).json({ message: 'Vous n\'avez pas de recommandation pour ce CV' });

        const cv_user = await Cv_user.deleteOne({ id_cv: cvId, id_user: userId });
        res.status(201).json({ message: "recommandation supprimée" });
    } catch (error) {
        res.status(500).json({ message: 'Problème de recommandation', error: error.message });
    }
}

//tous les users qui ont recommandé un CV
const allRecommandationsFromCv = async (req, res) => {
    const cvId = req.params.id;
    if (!cvId) return res.status(400).json({ message: 'CV manquant' });

    try {
        const recommendations = await Cv_user.find({ id_cv: cvId });

        if (recommendations.length === 0) {
            return res.status(404).json({ message: 'Aucune recommandation trouvée pour ce CV' });
        }

        const userIds = recommendations.map(reco => reco.id_user);
        const users = await User.find({ _id: { $in: userIds } });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: error.message });
    }
}

const allRecommandationsFromUser = async (req, res) => {
    const userId = req.user?._id;
    if (!userId) return res.status(400).json({ message: 'Identifiant utilisateur manquant.' });
    try {
        const recommendations = await Cv_user.find({ id_user: userId });
        if (recommendations.length === 0) {
            return res.status(200).json({ message: 'Vous n\'avez encore fait aucune recommandation.', cvs: [] });
        }
        const cvIds = recommendations.map(reco => reco.id_cv);
        const cvs = await Cv.find({ _id: { $in: cvIds } })
        if (cvs.length === 0) {
            return res.status(200).json({ message: 'Aucun CV correspondant à vos recommandations.', cvs: [] });
        }
        res.status(200).json(cvs);
    } catch (error) {
        console.error('Erreur lors de la récupération des CVs:', error);
        return res.status(500).json({ message: 'Erreur serveur. Veuillez réessayer plus tard.', error: error.message });
    }
};

//verif user et cv
async function verification(cvId, userId) {
    const cvExists = await Cv.findOne({ _id: cvId });
    const userExists = await User.findOne({ _id: userId });
    if (!cvExists) {
        return 'CV non trouvé';
    } else if (!userExists) {
        return 'Utilisateur non trouvé'
    } else {
        return 'OK';
    }
}


module.exports = { getRecommandations, addRecommandation, deleteRecommandation, allRecommandationsFromCv, allRecommandationsFromUser };