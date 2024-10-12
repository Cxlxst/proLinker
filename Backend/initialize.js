const { user, job_type, cv_user, cv, language, level } = require('./models/index.js');
const default_value = require('./default_value.json');

const initializeBdd = async () => {
    try {
        const models = { user, job_type, cv_user, cv, language, level };
        for (const [key, values] of Object.entries(default_value)) {
            for (const value of values) {
                const condition = value.name ? { name: value.name } : { email: value.email };
                const exists = await models[key].findOne(condition);
                if (!exists) await models[key].create(value);
            }
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation des données:', error);
    }
};

module.exports = { initializeBdd };