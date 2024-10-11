const CV = require('../models/cv');

const getCVs = async (req, res) => {
    try {
        const CVs = await CV.find();
        res.status(200).json(CVs);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des niveaux', error });
    }
};

module.exports = { getCVs };