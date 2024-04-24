const DataUtils = require('../utils/DataUtils');

module.exports = class DataValidator {
  static valida(data) {
    if (!DataUtils.converteStringEmData(data)) return false;
    return true;
  }
};
