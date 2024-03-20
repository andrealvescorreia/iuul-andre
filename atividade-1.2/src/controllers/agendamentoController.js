const Agendamento = require('../models/Agendamento');
const AgendamentoDBModel = require('../databaseModels/AgendamentoDBModel');
const PacienteDBModel = require('../databaseModels/PacienteDBModel');

/**
   * cria um agendamento
   *
   * @param {object} req
   * @param {object} req.body - corpo da requisição
   * @param {string} req.body.cpfPaciente - sem caracteres especiais
   * @param {string} req.body.dataConsulta - formato DD/MM/AAAA
   * @param {string} req.body.horaInicio - formato HHMM
   * @param {string} req.body.horaFim - formato HHMM
   * @returns {object} res
   * @returns {object} res.body - corpo da resposta, com o agendamento criado
  */
exports.save = (req) => {
  const res = {};
  try {
    const agendamento = new Agendamento(req.body, AgendamentoDBModel, PacienteDBModel);
    agendamento.save();
    res.body = agendamento.agendamento;
    if (agendamento.errors.length > 0) {
      res.errors = agendamento.errors;
      res.success = false;
    }
    res.success = true;
  } catch (e) {
    console.log(e);
    res.success = false;
    res.errors = [e.message];
  }
  return res;
};

/**
   * retorna agendamentos de consultas em ordem de data crescente
   *
   * @param {object} req
   * @param {object} req.body - corpo da requisição
   * @param {object} req.body.periodo - parâmetro opicional para delimitar o periodo das consultas
   * @param {string} req.body.periodo.dataInicio
   * @param {string} req.body.periodo.dataFim
   * @returns {object} res
   * @returns {object} res.body - corpo da resposta, com as consultas encontradas
   * @returns {boolean} res.success
   * @returns {Array} res.errors
  */
exports.index = () => {
  const res = {};
  try {
    const a = new Agendamento(null, AgendamentoDBModel, PacienteDBModel);
    res.body = a.find();
    res.success = true;
  } catch (e) {
    console.log(e);
    res.success = false;
    res.errors = [e.message];
  }
  return res;
};