module.exports = class HoraValidator {
  static valida(horarioStr) {
    if (typeof horarioStr !== 'string') return false;
    const horaRegex = /^(0[0-9]|1[0-9]|2[0-3])[0-5][0-9]$/;
    const match = horarioStr.match(horaRegex);
    if (!match) return false;
    return true;
  }
};
