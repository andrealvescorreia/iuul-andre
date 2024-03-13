const HorarioValidator = require('../validators/HorarioValidator');

module.exports = class HorarioUtils {
  static horarioToDate(horarioStr) {
    if (typeof horarioStr !== 'string') { throw new Error(`horário deve ser string mas recebeu ${typeof horarioStr}`); }
    if (!HorarioValidator.valido(horarioStr)) throw new Error('horário com formato inválido');
    return new Date(`1/1/1970 ${horarioStr.slice(0, 2)}:${horarioStr.slice(-2)}:00`);
  }

  static obedeceBlocoDe15minutos(horarioStr) {
    if (!HorarioValidator.valido(horarioStr)) { throw new Error('horário com formato inválido'); }
    const minutos = Number(horarioStr.slice(-2));
    if (minutos > 0 && minutos % 15 !== 0) return false;
    return true;
  }

  static dentroDoLimite(limiteInferiorHorario, limiteSuperiorHorario, horario) {
    const limiteInferiorDate = HorarioUtils.horarioToDate(limiteInferiorHorario);
    const limiteSuperiorDate = HorarioUtils.horarioToDate(limiteSuperiorHorario);
    const horarioDate = HorarioUtils.horarioToDate(horario);
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
    return (
      ((HorarioUtils.dentroDoLimite(h1.inicio, h1.fim, h2.inicio)
        && h1.fim !== h2.inicio)
        || (HorarioUtils.dentroDoLimite(h1.inicio, h1.fim, h2.fim)
          && h2.fim !== h1.inicio)
      )
      || (
        (HorarioUtils.dentroDoLimite(h2.inicio, h2.fim, h1.inicio)
          && h2.fim !== h1.inicio)
        || (HorarioUtils.dentroDoLimite(h2.inicio, h2.fim, h1.fim)
          && h1.fim !== h2.inicio)
      )
    );
  }
};
