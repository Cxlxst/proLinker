const express = require('express');
const router = express.Router();
const { getLanguages } = require('../controllers/cv_language');

router.get('/', getLanguages);

module.exports = router;