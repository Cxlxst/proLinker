const express = require('express');
const router = express.Router();
const { getRecommandations, addRecommandation, deleteRecommandation, allRecommandationsFromCv, allRecommandationsFromUser } = require('../controllers/cv_user');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Recommandations
 *   description: API pour gérer les recommandations de CV
 */

router.get('/', protect, getRecommandations);

/**
 * @swagger
 * /recommandations/:
 *   get:
 *     summary: Récupérer toutes les recommandations
 *     tags: [Recommandations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste de toutes les recommandations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_cv:
 *                     type: string
 *                     description: ID du CV recommandé
 *                   id_user:
 *                     type: string
 *                     description: ID de l'utilisateur qui a recommandé
 *       500:
 *         description: Erreur interne du serveur
 */

router.get('/add/:id', protect, addRecommandation);

/**
 * @swagger
 * /recommandations/add/{id}:
 *   get:
 *     summary: Ajouter une recommandation pour un CV
 *     tags: [Recommandations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du CV à recommander
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Recommandation ajoutée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_cv:
 *                   type: string
 *                   description: ID du CV recommandé
 *                 id_user:
 *                   type: string
 *                   description: ID de l'utilisateur ayant recommandé
 *       400:
 *         description: Champs manquants ou validation échouée
 *       404:
 *         description: CV ou utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/delete/:id', protect, deleteRecommandation);

/**
 * @swagger
 * /recommandations/delete/{id}:
 *   get:
 *     summary: Supprimer une recommandation pour un CV
 *     tags: [Recommandations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du CV pour lequel la recommandation sera supprimée
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Recommandation supprimée avec succès
 *       400:
 *         description: Champs manquants ou validation échouée
 *       404:
 *         description: CV ou utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/allrecoFromCv/:id', protect, allRecommandationsFromCv);

/**
 * @swagger
 * /recommandations/allrecoFromCv/{id}:
 *   get:
 *     summary: Récupérer tous les utilisateurs qui ont recommandé un CV
 *     tags: [Recommandations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du CV pour lequel récupérer les recommandations
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des utilisateurs ayant recommandé le CV
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID de l'utilisateur
 *                   name:
 *                     type: string
 *                     description: Nom de l'utilisateur
 *                   email:
 *                     type: string
 *                     description: Email de l'utilisateur
 *       400:
 *         description: CV manquant
 *       404:
 *         description: Aucune recommandation trouvée pour ce CV
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/allrecoFromUser', protect, allRecommandationsFromUser);


/**
 * @swagger
 * /recommandations/allrecoFromUser:
 *   get:
 *     summary: Récupérer tous les CVs recommandés par l'utilisateur connecté
 *     tags: [Recommandations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des CVs recommandés par l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID du CV
 *                   job_type_id:
 *                     type: string
 *                     description: Type de poste
 *                   title:
 *                     type: string
 *                     description: Titre du CV
 *       400:
 *         description: Identifiant utilisateur manquant
 *       500:
 *         description: Erreur interne du serveur
 */

module.exports = router;