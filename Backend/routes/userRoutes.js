const express = require('express');
const { getUsers, createUser, loginUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getUsers);

router.post('/register', createUser);
router.post('/login', loginUser);

module.exports = router;
