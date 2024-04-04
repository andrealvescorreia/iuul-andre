/**
 * Classe com os códigos de SUCESSO e FALHA de uma operação
 * no controller
 */
class OperationStatus {
  static get SUCCESS() {
    return 1;
  }

  static get FAILURE() {
    return 2;
  }
}

/**
* Classe com todos os códigos de erro das operações
*/
class OperationErrors {
  static get INVALID_CLIENT_DOCUMENT() {
    return 1;
  }

  static get INVALID_CLIENT_NAME() {
    return 2;
  }

  static get INVALID_CLIENT_BIRTHDATE() {
    return 3;
  }

  static get INVALID_CLIENT_MONTHLY_INCOME() {
    return 4;
  }

  static get INVALID_CLIENT_MARITAL_STATUS() {
    return 5;
  }

  static get MISSING_CLIENT_FIELD() {
    return 6;
  }
}

export { OperationErrors, OperationStatus };
