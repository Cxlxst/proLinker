const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
  let token = req.headers.authorization && req.headers.authorization.startsWith('Bearer') ? req.headers.authorization.split(' ')[1] : null;
  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé, token manquant' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decoded.id);
    if (!user && decoded.email) {
      user = await User.findOne({ email: decoded.email });
    }

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide, non autorisé' });
  }
};

module.exports = { protect };