const express = require('express');
const router = express.Router();
const { getCVs, createCV } = require('../controllers/cv');
const { protect } = require('../middleware/auth');

router.get('/', getCVs);
router.post('/create', protect, createCV);

module.exports = router;