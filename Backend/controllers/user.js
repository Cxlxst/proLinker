const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateToken } = require('./auth');


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
    res.json(await User.findOne({ email: userEmail }));
  }catch(error){
    res.status(500).json({message: 'Email non trouvé'});
  }
}

// Met à jour un utilisateur
const updateUser = async (req, res) => {
  const { firstname, lastname, email, phone, birthdate, currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    if (currentPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Mot de passe actuel incorrect' });
      }
    }
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.birthdate = birthdate || user.birthdate;
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      phone: updatedUser.phone,
      birthdate: updatedUser.birthdate,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

module.exports = { getUsers, getInfos, updateUser };
