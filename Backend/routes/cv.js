const express = require('express');
const router = express.Router();
const { getCVs } = require('../controllers/cv');

router.get('/', getCVs);

module.exports = router;