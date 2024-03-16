const HorarioUtils = require('../utils/HoraUtils');
const DataHorarioUtils = require('../utils/DataHoraUtils');
const DataValidator = require('./DataValidator');
const HoraValidator = require('./HoraValidator');

module.exports = class AgendamentoValidator {
  static valida(agendamento) {
    DataValidator.validaData(agendamento.dataConsulta);
    HoraValidator.valida(agendamento.horaInicial);
    HoraValidator.valida(agendamento.horaFinal);

    if (!HorarioUtils.obedeceBlocoDe15minutos(agendamento.horaInicial.hora)
      || !HorarioUtils.obedeceBlocoDe15minutos(agendamento.horaFinal.hora)) {
      throw new Error('apenas horários em blocos de 15 minutos são aceitos. ex: 1000, 1015, 1030, etc.');
    }
    const dataInicio = DataHorarioUtils.toDate(agendamento.dataConsulta, agendamento.horaInicial.hora);
    const dataFim = DataHorarioUtils.toDate(agendamento.dataConsulta, agendamento.horaFinal.hora);
    if (dataFim <= dataInicio) {
      throw new Error('o horário do fim da consulta deve proceder o horário de início');
    }
    return true;
  }
};
