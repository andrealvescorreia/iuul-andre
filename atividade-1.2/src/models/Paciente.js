const PacienteValidator = require('../validators/PacienteValidator');

module.exports = class Paciente {
  #cpf = '';

  #nome = '';

  #dataNascimento = '';

  constructor(cpf, nome, dataNascimento) {
    PacienteValidator.validaNome(nome);
    PacienteValidator.validaCpf(cpf);
    PacienteValidator.validaDataNascimento(dataNascimento);
    this.#cpf = cpf;
    this.#nome = nome;
    this.#dataNascimento = dataNascimento;
  }

  get cpf() {
    return this.#cpf;
  }

  get nome() {
    return this.#nome;
  }

  get dataNascimento() {
    return this.#dataNascimento;
  }
};
