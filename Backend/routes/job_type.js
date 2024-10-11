const express = require('express');
const router = express.Router();
const { getJobTypes } = require('../controllers/job_type');

router.get('/', getJobTypes);

module.exports = router;