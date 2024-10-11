const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Récupère tous les utilisateurs
const getUsers = async (req, res) => {
  try {
    res.json(await User.find());
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

//get user by email
const getInfos = async (req, res) => {
  try{
    const userEmail = req.params.email;
    res.json(await User.findOne({ userEmail }));
  }catch(error){
    res.status(500).json({message: 'Email non trouvé'});
  }
}

module.exports = { getUsers, getInfos };
