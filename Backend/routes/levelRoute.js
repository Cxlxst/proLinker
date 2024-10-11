const express = require('express');
const router = express.Router();
const { getLevels, createLevel, updateLevel, deleteLevel } = require('../controllers/levelController');

router.get('/', getLevels);
router.post('/', createLevel);
router.put('/:id', updateLevel);
router.delete('/:id', deleteLevel);

module.exports = router;
