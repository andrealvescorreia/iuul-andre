const ValidadorCPF = require('../../../atividade-1.1/05/ValidadorCPF');
const Validador = require('../../../atividade-1.1/05/Validador');

module.exports = class PacienteValidator {
  static IDADE_MINIMA = 13;

  static validaNome(nome) {
    Validador.validaNome(nome);
    return true;
  }

  static validaCpf(cpf) {
    if (Number.isNaN(Number(cpf))) throw new Error('cpf deve ter digitos apenas');
    const cpfValidado = new ValidadorCPF(cpf);
    if (!cpfValidado.valido()) throw new Error('cpf inválido');
    return true;
  }

  static validaDataNascimento(dataNascStr) {
    Validador.validaData(dataNascStr);
    const idade = Validador.calculaIdade(dataNascStr);
    if (idade < PacienteValidator.IDADE_MINIMA) {
      throw new Error(`O paciente deve ter ao menos ${PacienteValidator.IDADE_MINIMA} anos`);
    }
    return true;
  }
};
