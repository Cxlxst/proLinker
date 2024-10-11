const Level = require('../models/language');

const getLanguages = async (req, res) => {
    try {
        const levels = await Level.find();
        res.status(200).json(levels);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des niveaux', error });
    }
};

module.exports = { getLanguages };