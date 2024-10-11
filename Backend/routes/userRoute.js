const express = require('express');
const { getUsers, getInfos } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getUsers);
router.get('/:email', protect, getInfos);

module.exports = router;
