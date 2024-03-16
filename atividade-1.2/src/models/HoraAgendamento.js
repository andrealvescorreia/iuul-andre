const HoraValidator = require('../validators/HoraValidator');

module.exports = class HoraAgendamento {
  #hora;

  constructor(horaStr) {
    if (!HoraValidator.valida(horaStr)) throw new Error(`${horaStr} não segue o padrão HHMM`);
    this.#hora = horaStr;
  }

  get hora() { return this.#hora; }

  toDate() {
    return new Date(`1/1/1970 ${this.#hora.slice(0, 2)}:${this.#hora.slice(-2)}:00`);
  }

  obedeceBlocoDe15minutos() {
    const minutos = Number(this.#hora.slice(-2));
    if (minutos > 0 && minutos % 15 !== 0) return false;
    return true;
  }

  dentroDoLimite(horaLimiteInferior, horaLimiteSuperior) {
    const limiteInferiorDate = horaLimiteInferior.toDate();
    const limiteSuperiorDate = horaLimiteSuperior.toDate();
    const horarioDate = this.toDate();
    return (horarioDate >= limiteInferiorDate && horarioDate < limiteSuperiorDate);
  }
};
