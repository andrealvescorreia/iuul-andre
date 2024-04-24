const { DateTime } = require('luxon');

const { Sequelize, DataTypes } = require('sequelize');
const database = require('../database');
const validaCPF = require('../validators/CPFValidator');

const Paciente = database.define(
  'Paciente',
  {
    cpf: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
      validate: {
        ehValido(value) {
          if (validaCPF(value) === false) {
            throw new Error('cpf deve ser válido!');
          }
        },
      },
    },
    nome: {
      type: Sequelize.STRING,
      validate: {
        len: {
          min: 5,
          msg: 'O campo nome deve ter ao menos 5 caracteres',
        },
      },
      allowNull: false,
    },
    dataNascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        idadeEhValida(value) {
          if (DateTime.fromISO(value) > DateTime.now().minus({ year: 13 })) {
            throw new Error('pacientes atendidos apenas a partir dos 13 anos de idade');
          }
        },
      },
    },
  },
);

module.exports = Paciente;
