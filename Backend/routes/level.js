const express = require('express');
const router = express.Router();
const { getLevels, createLevel, updateLevel, deleteLevel } = require('../controllers/level');

/**
 * @swagger
 * tags:
 *   name: Niveaux
 *   description: API pour gérer les niveaux des CVs
 */

router.get('/', getLevels);
/**
 * @swagger
 * /levels/:
 *   get:
 *     summary: Récupérer tous les niveaux
 *     tags: [Niveaux]
 *     responses:
 *       200:
 *         description: Liste de tous les niveaux.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID du niveau
 *                   id_level:
 *                     type: string
 *                     description: Identifiant du niveau
 *                   name:
 *                     type: string
 *                     description: Nom du niveau
 *       500:
 *         description: Erreur interne lors de la récupération des niveaux
 */

router.post('/', createLevel);

/**
 * @swagger
 * /levels/:
 *   post:
 *     summary: Créer un nouveau niveau
 *     tags: [Niveaux]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_level:
 *                 type: string
 *                 description: Identifiant du niveau
 *               name:
 *                 type: string
 *                 description: Nom du niveau
 *     responses:
 *       201:
 *         description: Nouveau niveau créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID du niveau créé
 *                 id_level:
 *                   type: string
 *                   description: Identifiant du niveau
 *                 name:
 *                   type: string
 *                   description: Nom du niveau
 *       500:
 *         description: Erreur interne lors de la création du niveau
 */

router.put('/:id', updateLevel);
/**
 * @swagger
 * /levels/{id}:
 *   put:
 *     summary: Mettre à jour un niveau
 *     tags: [Niveaux]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du niveau à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_level:
 *                 type: string
 *                 description: Identifiant du niveau
 *               name:
 *                 type: string
 *                 description: Nom du niveau
 *     responses:
 *       200:
 *         description: Niveau mis à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID du niveau mis à jour
 *                 id_level:
 *                   type: string
 *                   description: Identifiant du niveau
 *                 name:
 *                   type: string
 *                   description: Nom du niveau
 *       404:
 *         description: Niveau non trouvé
 *       500:
 *         description: Erreur interne lors de la mise à jour du niveau
 */

router.delete('/:id', deleteLevel);
/**
 * @swagger
 * /levels/{id}:
 *   delete:
 *     summary: Supprimer un niveau
 *     tags: [Niveaux]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du niveau à supprimer
 *     responses:
 *       200:
 *         description: Niveau supprimé avec succès.
 *       404:
 *         description: Niveau non trouvé
 *       500:
 *         description: Erreur interne lors de la suppression du niveau
 */

module.exports = router;
