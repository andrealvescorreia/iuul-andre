const DataUtils = require('../utils/DataUtils');
const CPFValidator = require('../validators/CPFValidator');
const DataValidator = require('../validators/DataValidator');

module.exports = class Paciente {
  IDADE_MINIMA = 13;

  constructor(body, pacienteModel, agendamentoModel) {
    this.body = body;
    this.errors = [];
    this.paciente = null;
    this.pacienteModel = pacienteModel;
    this.agendamentoModel = agendamentoModel;
  }

  validaData() {
    if (!this.body.dataNascimento) {
      this.errors.push('dataNascimento é obrigatório');
    }
    if (!DataValidator.valida(this.body.dataNascimento)) {
      this.errors.push('data nascimento inválida');
      return;
    }
    const idade = DataUtils.calculaIdade(this.body.dataNascimento);
    if (idade < this.IDADE_MINIMA) this.errors.push(`idade inferior a idade mínima de ${this.IDADE_MINIMA}`);
  }

  validaCpf() {
    if (!this.body.cpf) {
      this.errors.push('cpf é obrigatório');
      return;
    }
    const cpf = new CPFValidator(this.body.cpf);
    if (!cpf.valido()) {
      this.errors.push('cpf inválido');
      return;
    }
    const pacienteExistente = this.pacienteModel.findByKey('cpf', this.body.cpf);
    if (pacienteExistente) {
      this.errors.push('paciente com cpf já cadastrado');
    }
  }

  validaNome() {
    if (!this.body.nome) {
      this.errors.push('nome é obrigatório');
      return;
    }
    if (this.body.nome.length < 5) this.errors.push('nome deve ter ao menos 5 caracteres');
  }

  validate() {
    this.validaNome();
    this.validaCpf();
    this.validaData();
  }

  save() {
    this.validate();
    if (this.errors.length > 0) return;

    // acessa o 'banco de dados';
    this.paciente = this.pacienteModel.create(this.body);
  }

  find() {
    return this.pacienteModel.find();
  }

  findByCpf(cpf) {
    return this.pacienteModel.findByKey('cpf', cpf);
  }

  delete(cpf) {
    if (typeof cpf !== 'string') return null;
    const pacienteApagado = this.pacienteModel.findByKeyAndDelete('cpf', cpf);
    this.paciente = null;
    return pacienteApagado;
  }
};