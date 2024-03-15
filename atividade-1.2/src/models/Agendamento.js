const AgendamentoValidator = require('../validators/AgendamentoValidator');

module.exports = class Agendamento {
  #cpfPaciente;

  #dataConsulta;

  #horaInicial;

  #horaFinal;

  constructor(cpfPaciente, dataConsulta, horaInicial, horaFinal) {
    this.#cpfPaciente = cpfPaciente;
    this.#dataConsulta = dataConsulta;
    this.#horaInicial = horaInicial;
    this.#horaFinal = horaFinal;
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
