const { Sequelize, Model } = require('sequelize');

module.exports = class Aluno extends Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
    }, {
      sequelize,
      modelName: 'aluno',
      tableName: 'alunos',
    });
    return this;
  }
};
