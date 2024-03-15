const AgendamentoValidator = require('../validators/AgendamentoValidator');

module.exports = class Agendamento {
  #cpfPaciente;

  #dataConsulta;

  #horaInicial;

  #horaFinal;

  constructor(cpfPaciente, dataConsulta, horaInicial, horaFinal, dataAtual = Date.now()) {
    this.#cpfPaciente = cpfPaciente;
    this.#dataConsulta = dataConsulta;
    this.#horaInicial = horaInicial;
    this.#horaFinal = horaFinal;
    AgendamentoValidator.valida(this, dataAtual);
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
