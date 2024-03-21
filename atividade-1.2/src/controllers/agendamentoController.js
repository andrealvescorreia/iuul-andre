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
  res.success = true;
  try {
    const agendamento = new Agendamento(req.body, AgendamentoDBModel, PacienteDBModel);
    agendamento.save();
    res.body = agendamento.agendamento;
    if (agendamento.errors.length > 0) {
      res.errors = agendamento.errors;
      res.success = false;
    }
  } catch (e) {
    console.log(e);
    res.success = false;
    res.errors = [e.message];
  }
  return res;
};

/**
   * exclui um agendamento
   *
   * @param {object} req
   * @param {object} req.body - corpo da requisição
   * @param {string} req.body.cpfPaciente - sem caracteres especiais
   * @param {string} req.body.dataConsulta - formato DD/MM/AAAA
   * @param {string} req.body.horaInicio - formato HHMM
   * @returns {object} res
   * @returns {object} res.body - corpo da resposta, com o agendamento criado
  */
exports.delete = (req) => {
  const res = {};
  res.success = true;
  try {
    const agendamento = new Agendamento(req.body, AgendamentoDBModel, PacienteDBModel);
    agendamento.delete();
    res.body = agendamento.agendamento;
    if (agendamento.errors.length > 0) {
      res.errors = agendamento.errors;
      res.success = false;
    }
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
   * @param {object} res.body - corpo da resposta, com as consultas encontradas
   * @param {boolean} res.success
   * @param {Array} res.errors
  */
exports.index = (req) => {
  const res = {};
  res.success = true;
  try {
    const a = new Agendamento(null, AgendamentoDBModel, PacienteDBModel);
    let agendamentos;
    const { periodo } = req.body;
    if (periodo) {
      agendamentos = a.find(periodo.dataInicio, periodo.dataFim);
    } else {
      agendamentos = a.find();
    }
    agendamentos.forEach((agendamento) => {
      const paciente = PacienteDBModel.findByKey('cpf', agendamento.cpfPaciente);
      agendamento.nomePaciente = paciente.nome;
    });
    res.body = agendamentos;
  } catch (e) {
    console.log(e);
    res.success = false;
    res.errors = [e.message];
  }
  return res;
};
