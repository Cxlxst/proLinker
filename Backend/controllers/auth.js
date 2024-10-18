const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Génère un token JWT
const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

// Crée un utilisateur
const createUser = async (req, res) => {
  const { firstname, lastname, email, password, phone, birthdate } = req.body;
  if (!firstname || !lastname || !email || !password, !phone || !birthdate) return res.status(400).json({ message: 'Champs manquants' });

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Utilisateur existant' });

    const user = await User.create(req.body);
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
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

module.exports = { createUser, loginUser, generateToken };
