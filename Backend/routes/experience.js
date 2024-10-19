const express = require('express');
const router = express.Router();
const { getExperiences } = require('../controllers/experience');

/**
 * @swagger
 * tags:
 *   name: Expériences
 *   description: API pour gérer les expériences des CVs
 */

router.get('/', getExperiences);
/**
 * @swagger
 * /experiences/:
 *   get:
 *     summary: Récupérer toutes les expériences des CVs
 *     tags: [Expériences]
 *     responses:
 *       200:
 *         description: Liste de toutes les expériences des CVs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID de l'expérience
 *                   name:
 *                     type: string
 *                     description: Nom de l'expérience
 *                   beginning:
 *                     type: string
 *                     format: date
 *                     description: Date de début de l'expérience
 *                   end:
 *                     type: string
 *                     format: date
 *                     description: Date de fin de l'expérience
 *                   current:
 *                     type: boolean
 *                     description: Indique si l'expérience est en cours
 *                   structureName:
 *                     type: string
 *                     description: Nom de la structure où l'expérience a eu lieu
 *                   description:
 *                     type: string
 *                     description: Description de l'expérience
 *       500:
 *         description: Erreur interne du serveur lors de la récupération des expériences
 */


module.exports = router;