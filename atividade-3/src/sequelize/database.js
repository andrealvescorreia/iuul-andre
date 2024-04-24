const Sequelize = require('sequelize');
const databaseConfig = require('./config/config.js');

const database = new Sequelize(databaseConfig);

module.exports = database;
