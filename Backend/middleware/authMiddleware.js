const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token invalide, non autorisé' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Accès non autorisé, token manquant' });
  }
};

module.exports = { protect };
