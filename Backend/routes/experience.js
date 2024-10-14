const express = require('express');
const router = express.Router();
const { getExperiences } = require('../controllers/experience');

router.get('/', getExperiences);

module.exports = router;