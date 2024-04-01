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
  static get INVALID_PATIENT_DOCUMENT() {
    return 1;
  }

  static get INVALID_PATIENT_NAME() {
    return 2;
  }

  static get INVALID_PATIENT_BIRTHDATE() {
    return 3;
  }

  static get INVALID_PATIENT_MONTHLY_INCOME() {
    return 4;
  }

  static get INVALID_PATIENT_MARITAL_STATUS() {
    return 5;
  }
}

export { OperationErrors, OperationStatus };
