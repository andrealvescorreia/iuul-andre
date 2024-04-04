import { DateTime } from 'luxon';
import { OperationErrors } from '../controllers/operation-code.js';
import validaCPF from '../utils/cpf.js';

class ClienteModel {// "dataclass"
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

class Cliente {
  static IDADE_MINIMA = 18;

  static #estadoCivilValido(estadoCivil) {
    const ec = estadoCivil.toLowerCase();
    return (ec === 'c' || ec === 's' || ec === 'v' || ec === 'd');
  }

  static create(cpf, nome, dtNascimento, rendaMensal, estadoCivil) {
    const errors = [];
    // Executa as validações do Cliente
    if (!validaCPF(cpf)) errors.push({ code: OperationErrors.INVALID_CLIENT_DOCUMENT, field: 'cpf' });

    if (typeof nome !== 'string') errors.push({ code: OperationErrors.INVALID_CLIENT_NAME, field: 'nome' });

    else if (nome.length < 5) errors.push({ code: OperationErrors.INVALID_CLIENT_NAME, field: 'nome' });

    if (!dtNascimento.isValid) {
      errors.push({ code: OperationErrors.INVALID_CLIENT_BIRTHDATE, field: 'dtNascimento' });
    }

    if (dtNascimento > DateTime.now().minus({ year: Cliente.IDADE_MINIMA })) {
      errors.push({ code: OperationErrors.INVALID_CLIENT_BIRTHDATE, field: 'dtNascimento' });
    }

    if (rendaMensal !== undefined && rendaMensal <= 0) {
      errors.push({ code: OperationErrors.INVALID_CLIENT_MONTHLY_INCOME, field: 'rendaMensal' });
    }

    if (estadoCivil !== undefined && !Cliente.#estadoCivilValido(estadoCivil)) {
      errors.push({ code: OperationErrors.INVALID_CLIENT_MARITAL_STATUS, field: 'estadoCivil' });
    }

    // Retorna o objeto Cliente ou a lista de erros
    return errors.length === 0
      ? { success: new ClienteModel(cpf, nome, dtNascimento, rendaMensal, estadoCivil) }
      : { failure: errors };
  }

  static #missingFields(obj, requiredFields = ['cpf', 'nome', 'dtNascimento']) {
    const missingFields = [];
    requiredFields.forEach((field) => {
      if (!(field in obj) || obj[field] === undefined) {
        missingFields.push(field);
      }
    });
    return missingFields;
  }

  static createFromObject(clienteObj) {
    const missingFields = Cliente.#missingFields(clienteObj);
    if (missingFields.length > 0) {
      const errors = [];
      missingFields.forEach((field) => {
        errors.push({
          code: OperationErrors.MISSING_CLIENT_FIELD,
          field,
        });
      });
      return {
        failure: errors,
      };
    }
    return Cliente.create(
      clienteObj.cpf,
      clienteObj.nome,
      clienteObj.dtNascimento,
      clienteObj.rendaMensal,
      clienteObj.estadoCivil,
    );
  }
}

export default Cliente;
