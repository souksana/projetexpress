const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projetexpress', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('✅ Connexion à MySQL réussie'))
    .catch(err => console.error('❌ Erreur de connexion à MySQL :', err));

module.exports = sequelize;
