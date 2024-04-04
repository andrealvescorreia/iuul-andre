import { OperationErrors } from '../controllers/operation-code.js';

class ClienteErrorMessagesPTBR {
  #messages;

  constructor() {
    this.#messages = new Map();

    this.#setupMessages();
  }

  #setupMessages() {
    this.#messages.set(
      OperationErrors.INVALID_CLIENT_DOCUMENT,
      'CPF inválido.',
    );
    this.#messages.set(
      OperationErrors.INVALID_CLIENT_NAME,
      'Nome inválido. Deve ter ao menos 5 caracteres.',
    );
    this.#messages.set(
      OperationErrors.INVALID_CLIENT_BIRTHDATE,
      'Data de nascimento inválida. Cliente deve ter ao menos 18 anos.',
    );
    this.#messages.set(
      OperationErrors.INVALID_CLIENT_MARITAL_STATUS,
      'Estado civil inválido. Deve ser S, C, D, ou V.',
    );
    this.#messages.set(
      OperationErrors.INVALID_CLIENT_MONTHLY_INCOME,
      'Renda mensla inválida. Deve ser superior a 0,00.',
    );
    this.#messages.set(
      OperationErrors.MISSING_CLIENT_FIELD,
      'Campo obrigratório faltando.',
    );
  }

  get messagesMap() {
    return this.#messages;
  }
}

export default ClienteErrorMessagesPTBR;
