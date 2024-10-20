const express = require('express');
const router = express.Router();
const { getCVs, createCV, getCVById, updateCV, deleteCV, search } = require('../controllers/cv');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: CVs
 *   description: API de gestion des CVs
 */

router.get('/', getCVs);

/**
 * @swagger
 * /api/cvs:
 *   get:
 *     summary: Récupère tous les CVs
 *     tags: [CVs]
 *     responses:
 *       200:
 *         description: Liste des CVs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   job_type_id:
 *                     type: string
 *                     description: ID du type de job
 *                   user_id:
 *                     type: string
 *                     description: ID de l'utilisateur ayant créé le CV
 *                   languages:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         level:
 *                           type: string
 *                   experiences:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                         name:
 *                           type: string
 *                         beginning:
 *                           type: string
 *                         end:
 *                           type: string
 *                         current:
 *                           type: boolean
 *                         structureName:
 *                           type: string
 *                         description:
 *                           type: string
 *       500:
 *         description: Erreur lors de la récupération des CVs
 */

router.get('/connect', protect, getCVs);

/**
 * @swagger
 * /api/cvs/connect:
 *   get:
 *     summary: Récupère tous les CVs pour les utilisateurs connectés
 *     tags: [CVs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des CVs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   job_type_id:
 *                     type: string
 *                     description: ID du type de job
 *                   user_id:
 *                     type: string
 *                     description: ID de l'utilisateur ayant créé le CV
 *                   languages:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         level:
 *                           type: string
 *                   experiences:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                         name:
 *                           type: string
 *                         beginning:
 *                           type: string
 *                         end:
 *                           type: string
 *                         current:
 *                           type: boolean
 *                         structureName:
 *                           type: string
 *                         description:
 *                           type: string
 *       500:
 *         description: Erreur lors de la récupération des CVs
 */

router.post('/create', protect, createCV);

/**
 * @swagger
 * /api/cvs/create:
 *   post:
 *     summary: Crée un nouveau CV
 *     tags: [CVs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               job_type_name:
 *                 type: string
 *                 description: Nom du type de job
 *               languages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     level_name:
 *                       type: string
 *               experiences:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     type:
 *                       type: string
 *                     beginning:
 *                       type: string
 *                     end:
 *                       type: string
 *                     current:
 *                       type: boolean
 *                     structureName:
 *                       type: string
 *                     description:
 *                       type: string
 *     responses:
 *       201:
 *         description: CV créé avec succès
 *       500:
 *         description: Erreur lors de la création du CV
 */

router.get('/:id', getCVById);

/**
 * @swagger
 * /api/cvs/{id}:
 *   get:
 *     summary: Récupère un CV par ID
 *     tags: [CVs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du CV
 *     responses:
 *       200:
 *         description: CV récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 job_type_id:
 *                   type: string
 *                 user_id:
 *                   type: string
 *                 languages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       level_name:
 *                         type: string
 *                 experiences:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                       name:
 *                         type: string
 *                       beginning:
 *                         type: string
 *                       end:
 *                         type: string
 *                       current:
 *                         type: boolean
 *                       structureName:
 *                         type: string
 *                       description:
 *                         type: string
 *       404:
 *         description: CV non trouvé
 *       500:
 *         description: Erreur lors de la récupération du CV
 */

router.put('/:id', protect, updateCV);

/**
 * @swagger
 * /api/cvs/{id}:
 *   put:
 *     summary: Met à jour un CV
 *     tags: [CVs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du CV
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               job_type_name:
 *                 type: string
 *                 description: Nom du type de job
 *               languages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     level_name:
 *                       type: string
 *               experiences:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     type:
 *                       type: string
 *                     beginning:
 *                       type: string
 *                     end:
 *                       type: string
 *                     current:
 *                       type: boolean
 *                     structureName:
 *                       type: string
 *                     description:
 *                       type: string
 *     responses:
 *       200:
 *         description: CV mis à jour avec succès
 *       404:
 *         description: CV non trouvé
 *       500:
 *         description: Erreur lors de la mise à jour du CV
 */

router.delete('/:id', protect, deleteCV);

/**
 * @swagger
 * /api/cvs/{id}:
 *   delete:
 *     summary: Supprime un CV
 *     tags: [CVs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du CV
 *     responses:
 *       200:
 *         description: CV supprimé avec succès
 *       404:
 *         description: CV non trouvé
 *       500:
 *         description: Erreur lors de la suppression du CV
 */

router.get('/search/:term', search);

module.exports = router;