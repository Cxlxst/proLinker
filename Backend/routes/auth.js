const express = require('express');
const { createUser, loginUser } = require('../controllers/auth');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API pour l'authentification
 */

router.post('/register', createUser);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Création d'un nouvel utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: Prénom
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 description: Nom
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 description: Adresse email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Mot de passe
 *                 example: "password123"
 *               phone:
 *                 type: string
 *                 description: Numéro de téléphone
 *                 example: "1234567890"
 *               birthdate:
 *                 type: string
 *                 format: date
 *                 description: Date d'anniversaire
 *                 example: "1990-01-01"
 *     responses:
 *       201:
 *         description: utilisateur crée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Id de l'utilisateur
 *                   example: "60c72b2f9b1e8b1e4c8e4f8a"
 *                 name:
 *                   type: string
 *                   description: Nom d'utilisateur
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   description: Adresse mail
 *                   example: "john.doe@example.com"
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Champs manquants ou utilisateur déjà existant
 *       500:
 *         description: Erreur interne du serveur
 */

router.post('/login', loginUser);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Adresse mail
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Mot de passe
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Utilisateur connecté
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Id de l'utilisateur
 *                   example: "60c72b2f9b1e8b1e4c8e4f8a"
 *                 name:
 *                   type: string
 *                   description: Nom d'utilisateur
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   description: Adresse mail
 *                   example: "john.doe@example.com"
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Identifiants invalides
 *       401:
 *         description: Accès non autorisé - adresse email ou mdp incorrect
 *       500:
 *         description: Erreur interne du serveur
 */


module.exports = router;