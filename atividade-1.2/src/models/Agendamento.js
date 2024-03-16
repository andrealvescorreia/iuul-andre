const AgendamentoValidator = require('../validators/AgendamentoValidator');
const HoraAgendamento = require('./HoraAgendamento');

module.exports = class Agendamento {
  #cpfPaciente;

  #dataConsulta;

  #horaInicial;

  #horaFinal;

  /**
   * @param {string} cpfPaciente
   * @param {string} dataConsulta
   * @param {object} horaInicialStr
   * @param {object} horaFinalStr
  */
  constructor(cpfPaciente, dataConsulta, horaInicialStr, horaFinalStr) {
    this.#cpfPaciente = cpfPaciente;
    this.#dataConsulta = dataConsulta;
    this.#horaInicial = new HoraAgendamento(horaInicialStr);
    this.#horaFinal = new HoraAgendamento(horaFinalStr);
    AgendamentoValidator.valida(this);
  }

  get cpfPaciente() {
    return this.#cpfPaciente;
  }

  get dataConsulta() {
    return this.#dataConsulta;
  }

  get horaInicial() {
    return this.#horaInicial;
  }

  get horaFinal() {
    return this.#horaFinal;
  }
};
