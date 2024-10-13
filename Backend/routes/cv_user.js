const express = require('express');
const router = express.Router();
const { getRecommandations, addRecommandation, deleteRecommandation, allRecommandationsFromCv, allRecommandationsFromUser } = require('../controllers/cv_user');
const { protect } = require('../middleware/auth');

router.get('/', protect, getRecommandations);
router.get('/add/:id', protect, addRecommandation);
router.get('/delete/:id', protect, deleteRecommandation);
router.get('/allrecoFromCv/:id', protect, allRecommandationsFromCv);
router.get('/allrecoFromUser', protect, allRecommandationsFromUser);

module.exports = router;