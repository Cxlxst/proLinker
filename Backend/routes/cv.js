const express = require('express');
const router = express.Router();
const { getCVs, createCV, getCVById, updateCV, deleteCV } = require('../controllers/cv');
const { protect } = require('../middleware/auth');

router.get('/', getCVs);
router.post('/create', protect, createCV);
router.get('/:id', getCVById);
router.put('/:id', protect, updateCV);
router.delete('/:id', protect, deleteCV);

module.exports = router;