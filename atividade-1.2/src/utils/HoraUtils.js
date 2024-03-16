const HoraValidator = require('../validators/HoraValidator');

module.exports = class HoraUtils {
  static horarioToDate(horarioStr) {
    if (typeof horarioStr !== 'string') { throw new Error(`horário deve ser string mas recebeu ${typeof horarioStr}`); }
    if (!HoraValidator.valida(horarioStr)) throw new Error(`${horarioStr} não segue o formato HHMM`);
    return new Date(`1/1/1970 ${horarioStr.slice(0, 2)}:${horarioStr.slice(-2)}:00`);
  }

  static obedeceBlocoDe15minutos(horarioStr) {
    if (!HoraValidator.valida(horarioStr)) { throw new Error(`${horarioStr} não segue o formato HHMM`); }
    const minutos = Number(horarioStr.slice(-2));
    if (minutos > 0 && minutos % 15 !== 0) return false;
    return true;
  }

  static dentroDoLimite(limiteInferiorHorario, limiteSuperiorHorario, horario) {
    const limiteInferiorDate = HoraUtils.horarioToDate(limiteInferiorHorario);
    const limiteSuperiorDate = HoraUtils.horarioToDate(limiteSuperiorHorario);
    const horarioDate = HoraUtils.horarioToDate(horario);
    return (horarioDate >= limiteInferiorDate && horarioDate < limiteSuperiorDate);
  }

  /**
   * Determina se dois horários se sobrepoem.
   *
   * @param {object} h1 - horario 1
   * @param {string} h1.inicio
   * @param {string} h1.fim
   * @param {object} h2 - horario 2
   * @param {string} h2.inicio
   * @param {string} h2.fim
   * @returns {boolean}
  */
  static seSobrepoem(h1, h2) {
    const { inicio: inicio1, fim: fim1 } = h1;
    const { inicio: inicio2, fim: fim2 } = h2;

    const sobreposicao1 = HoraUtils.dentroDoLimite(inicio1, fim1, inicio2) && fim1 !== inicio2;
    const sobreposicao2 = HoraUtils.dentroDoLimite(inicio1, fim1, fim2) && fim2 !== inicio1;
    const sobreposicao3 = HoraUtils.dentroDoLimite(inicio2, fim2, inicio1) && fim2 !== inicio1;
    const sobreposicao4 = HoraUtils.dentroDoLimite(inicio2, fim2, fim1) && fim1 !== inicio2;

    return sobreposicao1 || sobreposicao2 || sobreposicao3 || sobreposicao4;
  }
};
