const HorarioUtils = require('../utils/HorarioUtils');
const DataHorarioUtils = require('../utils/DataHorarioUtils');

module.exports = class AgendamentoValidator {
  static valida(agendamento, dataAtual = Date.now()) {
    if (!HorarioUtils.obedeceBlocoDe15minutos(agendamento.horaInicial)
      || !HorarioUtils.obedeceBlocoDe15minutos(agendamento.horaFinal)) {
      throw new Error('apenas horários em blocos de 15 minutos são aceitos. ex: 1000, 1015, 1030, etc.');
    }
    const dataInicio = DataHorarioUtils.toDate(agendamento.dataConsulta, agendamento.horaInicial);
    if (dataInicio < dataAtual) {
      throw new Error('só é possível fazer agendamentos para o futuro');
    }
    const dataFim = DataHorarioUtils.toDate(agendamento.dataConsulta, agendamento.horaFinal);
    if (dataFim < dataInicio) {
      throw new Error('o horário do fim da consulta deve proceder o horário de início');
    }
    return true;
  }
};
