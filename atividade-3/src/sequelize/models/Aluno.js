import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
    }, {
      sequelize,
    });
    return this;
  }
}
