const Sequelize = require('sequelize');

const sequelize = new Sequelize('--db-name--','---user---','---password---',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
