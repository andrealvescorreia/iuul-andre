class OperationErrors {
  static get CURRENCY_CODE_NOT_FOUND(): number { // "error-type": "unsupported-code"
    return 1
  }

  static get INVALID_CURRENCY_CODE(): number {
    return 2
  }

  static get EQUAL_CURRENCY_CODES(): number {
    return 3
  }

  static get INVALID_CURRENCY_VALUE(): number {
    return 4
  }

  static get COULD_NOT_CONNECT(): number {
    return 403
  }
}

export { OperationErrors }
