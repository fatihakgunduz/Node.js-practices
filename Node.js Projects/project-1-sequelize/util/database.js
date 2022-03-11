const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-js','root','fatih.,61',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
