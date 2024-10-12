const Level = require('../models/level');

const getLevels = async (req, res) => {
    try {
        const levels = await Level.find();
        res.status(200).json(levels);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des niveaux', error });
    }
};

const createLevel = async (req, res) => {
    const { id_level, name } = req.body;
    try {
        const newLevel = new Level({
            id_level,
            name
        });

        const savedLevel = await newLevel.save();
        res.status(201).json(savedLevel);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du niveau', error });
    }
};

const updateLevel = async (req, res) => {
    const { id } = req.params;
    const { id_level, name } = req.body;
    try {
        const updatedLevel = await Level.findByIdAndUpdate(id, { id_level, name }, { new: true });
        if (!updatedLevel) {
            return res.status(404).json({ message: 'Niveau non trouvé' });
        }
        res.status(200).json(updatedLevel);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du niveau', error });
    }
};

const deleteLevel = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedLevel = await Level.findByIdAndDelete(id);
        if (!deletedLevel) {
            return res.status(404).json({ message: 'Niveau non trouvé' });
        }
        res.status(200).json({ message: 'Niveau supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du niveau', error });
    }
};

module.exports = { getLevels, createLevel, updateLevel, deleteLevel };
