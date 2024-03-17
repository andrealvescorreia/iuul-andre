const PacientesTable = require('../database/PacientesTable');
const CPFValidator = require('../validators/CPFValidator');
// const PacienteValidator = require('../validators/PacienteValidator');

module.exports = class PacienteModel {
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
    const dataReg = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = this.body.dataNascimento.match(dataReg);
    if (!match) {
      this.errors.push('data nascimento não está no formato DD/MM/AAAA');
      return;
    }
    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10);
    const ano = parseInt(match[3], 10);

    const data = new Date(ano, mes - 1, dia);
    const dataInvalida = data.getFullYear() !== ano
      || data.getMonth() + 1 !== mes
      || data.getDate() !== dia;
    if (dataInvalida) this.errors.push('data nascimento inválida');
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
