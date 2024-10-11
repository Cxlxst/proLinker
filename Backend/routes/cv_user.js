const express = require('express');
const router = express.Router();
const { getCVUsers } = require('../controllers/cv_user');

router.get('/', getCVUsers);

module.exports = router;