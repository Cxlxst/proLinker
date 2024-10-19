const express = require('express');
const router = express.Router();
const { getJobTypes } = require('../controllers/job_type');

/**
 * @swagger
 * tags:
 *   name: Types de Jobs
 *   description: API pour gérer les types de jobs des CVs
 */

router.get('/', getJobTypes);

/**
 * @swagger
 * /job_types/:
 *   get:
 *     summary: Récupérer tous les types de jobs
 *     tags: [Types de Jobs]
 *     responses:
 *       200:
 *         description: Liste de tous les types de jobs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID du type de job
 *                   name:
 *                     type: string
 *                     description: Nom du type de job
 *       500:
 *         description: Erreur interne du serveur lors de la récupération des types de jobs
 */

module.exports = router;