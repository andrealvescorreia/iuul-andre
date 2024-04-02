import { DateTime } from 'luxon';
import { OperationErrors } from '../controllers/operation-code.js';
import validaCPF from '../utils/cpf.js';

class PacienteModel {// "dataclass"
  #cpf;

  #nome;

  #dtNascimento;

  #rendaMensal;

  #estadoCivil;

  constructor(cpf, nome, dtNascimento, rendaMensal = null, estadoCivil = null) {
    this.#cpf = cpf;
    this.#nome = nome;
    this.#dtNascimento = dtNascimento;
    this.#rendaMensal = rendaMensal;
    this.#estadoCivil = estadoCivil;
  }

  get cpf() {
    return this.#cpf;
  }

  get nome() {
    return this.#nome;
  }

  get dtNascimento() {
    return this.#dtNascimento;
  }

  get rendaMensal() {
    return this.#rendaMensal;
  }

  get estadoCivil() {
    return this.#estadoCivil;
  }
}

class Paciente {
  static IDADE_MINIMA = 18;

  static #estadoCivilValido(estadoCivil) {
    const ec = estadoCivil.toLowerCase();
    return (ec === 'c' || ec === 's' || ec === 'v' || ec === 'd');
  }

  static create(cpf, nome, dtNascimento, rendaMensal = null, estadoCivil = null) {
    const errors = [];

    // Executa as validações do Paciente
    if (!validaCPF(cpf)) errors.push(OperationErrors.INVALID_PATIENT_DOCUMENT);

    if (nome.length < 5) errors.push(OperationErrors.INVALID_PATIENT_NAME);

    if (dtNascimento > DateTime.now().minus({ year: Paciente.IDADE_MINIMA })) {
      errors.push(OperationErrors.INVALID_PATIENT_BIRTHDATE);
    }

    if (rendaMensal != null && rendaMensal <= 0) {
      errors.push(OperationErrors.INVALID_PATIENT_MONTHLY_INCOME);
    }

    if (estadoCivil != null && !Paciente.#estadoCivilValido(estadoCivil)) {
      errors.push(OperationErrors.INVALID_PATIENT_MARITAL_STATUS);
    }

    // Retorna o objeto Paciente ou a lista de erros
    return errors.length === 0
      ? { success: new PacienteModel(cpf, nome, dtNascimento, rendaMensal, estadoCivil) }
      : { failure: errors };
  }
}

export default Paciente;
