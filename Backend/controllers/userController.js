const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Génère un token JWT
const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// Récupère tous les utilisateurs
const getUsers = async (req, res) => {
  try {
    res.json(await User.find());
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Crée un utilisateur
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Champs manquants' });

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Utilisateur existant' });

    const user = await User.create({ name, email, password });
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Authentifie un utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
    } else {
      res.status(401).json({ message: 'Informations incorrectes' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { getUsers, createUser, loginUser };
