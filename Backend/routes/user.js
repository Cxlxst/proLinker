const express = require('express');
const { getUsers, getInfos, updateUser } = require('../controllers/user');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/', protect, getUsers);
router.get('/:email', protect, getInfos);
router.put('/:id', protect, updateUser)

module.exports = router;
