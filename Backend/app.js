const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const apiRouter = require('./routes');
const { initializeBdd } = require('./initialize')

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(async () => { await initializeBdd(); console.log('MongoDB connecté') })
    .catch((error) => console.error(`Erreur de connexion à MongoDB : ${error.message}`));

// Recuperation des definitions de routes
app.use('/api/', apiRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
