const { Sequelize } = require('sequelize');
const database = require('../database');

const Universidade = database.define(
  'Universidade',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: Sequelize.STRING,
  },
);

module.exports = Universidade;
