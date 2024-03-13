const HorarioValidator = require('../validators/HorarioValidator');

module.exports = class HorarioUtils {
  static horarioToDate(horarioStr) {
    if (typeof horarioStr !== 'string') { throw new Error(`horário deve ser string mas recebeu ${typeof horarioStr}`); }
    if (!HorarioValidator.valido(horarioStr)) throw new Error('horário com formato inválido');
    return new Date(`1/1/1970 ${horarioStr.slice(0, 2)}:${horarioStr.slice(-2)}:00`);
  }

  static dentroDoLimite(limiteInferiorHorario, limiteSuperiorHorario, horario) {
    const limiteInferiorDate = HorarioUtils.horarioToDate(limiteInferiorHorario);
    const limiteSuperiorDate = HorarioUtils.horarioToDate(limiteSuperiorHorario);
    const horarioDate = HorarioUtils.horarioToDate(horario);
    return (horarioDate >= limiteInferiorDate && horarioDate < limiteSuperiorDate);
  }
};
