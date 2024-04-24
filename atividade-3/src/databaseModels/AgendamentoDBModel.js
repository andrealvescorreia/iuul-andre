module.exports = class AgendamentoDBModel {
  static #agendamentos = [];

  static #id_count = 1;

  static #PRIMARY_KEY = 'id';

  /**
   * Cria um agendamento na base de dados
   *
   * @param {object} agendamento
   * @param {string} agendamento.cpfPaciente
   * @param {string} agendamento.dataConsulta
   * @param {string} agendamento.horaInicio
   * @param {string} agendamento.horaFim
   * @returns {object} agendamento criado
  */
  static create(agendamento) {
    const novoAgendamento = { ...agendamento, id: AgendamentoDBModel.#id_count };
    AgendamentoDBModel.#agendamentos.push(novoAgendamento);
    AgendamentoDBModel.#id_count++;
    return novoAgendamento;
  }

  static find() {
    return AgendamentoDBModel.#agendamentos;
  }

  static findByKey(chave, valor) {
    return AgendamentoDBModel.#agendamentos.find(
      (agendamento) => agendamento[chave] === valor,
    ) || null;
  }

  static findByKeyAndDelete(chave, valor) {
    const agendamentos = AgendamentoDBModel.#agendamentos.filter(
      (agendamento) => agendamento[chave] !== valor,
    );
    const agendamentoApagado = AgendamentoDBModel.findByKey(chave, valor);
    AgendamentoDBModel.#agendamentos = agendamentos;
    return agendamentoApagado;
  }
};
