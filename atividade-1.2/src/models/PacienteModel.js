const PacientesTable = require('../database/PacientesTable');
const DataUtils = require('../utils/DataUtils');
const CPFValidator = require('../validators/CPFValidator');
const DataValidator = require('../validators/DataValidator');

module.exports = class PacienteModel {
  IDADE_MINIMA = 13;

  constructor(body) {
    this.body = body;
    this.errors = [];
    this.paciente = null;
  }

  checaCamposObrigatórios() {
    if (!this.body.cpf) {
      this.errors.push('cpf é obrigatório');
      return;
    }
    if (!this.body.nome) {
      this.errors.push('nome é obrigatório');
    }
    if (!this.body.dataNascimento) {
      this.errors.push('dataNascimento é obrigatório');
    }
  }

  validaData() {
    if (!DataValidator.valida(this.body.dataNascimento)) this.errors.push('data nascimento inválida');
    const idade = DataUtils.calculaIdade(this.body.dataNascimento);
    if (idade < this.IDADE_MINIMA) this.errors.push(`idade inferior a idade mínima de ${this.IDADE_MINIMA}`);
  }

  validaCpf() {
    const cpf = new CPFValidator(this.body.cpf);
    if (!cpf.valido()) this.errors.push('cpf inválido');
  }

  validaNome() {
    if (this.body.nome.length < 5) this.errors.push('nome deve ter ao menos 5 caracteres');
  }

  validate() {
    this.checaCamposObrigatórios();
    this.validaNome();
    this.validaCpf();
    this.validaData();
  }

  save() {
    this.validate();
    if (this.errors.length > 0) return;

    // acessa o 'banco de dados';
    this.paciente = PacientesTable.create(this.body);
  }
};
