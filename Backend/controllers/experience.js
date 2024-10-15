const experience = require('../models/experience');

const getExperiences = async (req, res) => {
    try {
        const experiences = await experience.find();
        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des experiences', error });
    }
};

module.exports = { getExperiences };