const language = require('../models/cv_language');

const getLanguages = async (req, res) => {
    try {
        const languages = await language.find();
        res.status(200).json(languages);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des langues du cv', error });
    }
};

module.exports = { getLanguages };