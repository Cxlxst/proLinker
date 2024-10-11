const express = require('express');
const { getUsers, getInfos } = require('../controllers/user');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/', protect, getUsers);
router.get('/:email', protect, getInfos);

module.exports = router;
