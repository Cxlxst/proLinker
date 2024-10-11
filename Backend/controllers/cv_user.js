const cv_user = require('../models/cv_user');

const getCVUsers = async (req, res) => {
    try {
        const cv_users = await cv_user.find();
        res.status(200).json(cv_users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des niveaux', error });
    }
};

module.exports = { getCVUsers };