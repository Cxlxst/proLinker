const express = require('express');
const router = express.Router();
const { getRecommandations, addRecommandation, deleteRecommandation, allRecommandationsFromCv, allRecommandationsFromUser } = require('../controllers/cv_user');

router.get('/', getRecommandations);
router.post('/add', addRecommandation);
router.post('/delete', deleteRecommandation);
router.get('/allrecoFromCv/:id', allRecommandationsFromCv);
router.get('/allrecoFromUser/:id', allRecommandationsFromUser);

module.exports = router;