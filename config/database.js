const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projetexpress', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('connexion à MySQL réussie'))
    .catch(err => console.error('erreur de connexion à MySQL :', err));

module.exports = sequelize;
