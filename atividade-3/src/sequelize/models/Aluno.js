const { Sequelize, Model } = require('sequelize');

module.exports = class Aluno extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: Sequelize.STRING,
    }, {
      sequelize,
      modelName: 'aluno',
      tableName: 'alunos',
    });
    return this;
  }
};
