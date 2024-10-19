const express = require('express');
const router = express.Router();
const { getLanguages } = require('../controllers/language');

/**
 * @swagger
 * tags:
 *   name: Langues
 *   description: API pour gérer les langues des CVs
 */

router.get('/', getLanguages);

/**
 * @swagger
 * /languages/:
 *   get:
 *     summary: Récupérer toutes les langues
 *     tags: [Langues]
 *     responses:
 *       200:
 *         description: Liste de toutes les langues.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID de la langue
 *                   name:
 *                     type: string
 *                     description: Nom de la langue
 *       500:
 *         description: Erreur interne du serveur lors de la récupération des langues
 */

module.exports = router;