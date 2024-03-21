const Paciente = require('../models/Paciente');
const PacienteDBModel = require('../databaseModels/PacienteDBModel');
const AgendamentoDBModel = require('../databaseModels/AgendamentoDBModel');
const DataUtils = require('../utils/DataUtils');

/**
   * cria um paciente
   *
   * @param {object} req
   * @param {object} req.body - corpo da requisição
   * @param {string} req.body.cpf - sem caracteres especiais
   * @param {string} req.body.nome
   * @param {string} req.body.dataNascimento - formato DD/MM/AAAA
   * @returns {object} res
   * @param {object} res.body - corpo da resposta, com o paciente criado
   * @param {boolean} res.success
   * @param {Array} res.errors
  */
exports.save = (req) => {
  const res = {};
  res.success = true;
  try {
    const paciente = new Paciente(req.body, PacienteDBModel, AgendamentoDBModel);
    paciente.save();
    res.body = paciente.paciente;

    if (paciente.errors.length > 0) {
      res.errors = paciente.errors;
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
   * retorna pacientes
   *
   * @param {object} req
   * @param {object} req.body - corpo da requisição
   * @param {string} req.body.orderBy - parâmetro de ordenação opicional. Pode ser 'nome' ou 'cpf'
   * @returns {object} res
   * @returns {object} res.body - corpo da resposta, com os pacientes encontrados
   * @returns {boolean} res.success
   * @returns {Array} res.errors
  */
exports.index = (req) => {
  const res = {};
  res.success = true;
  res.body = {};
  try {
    const p = new Paciente(null, PacienteDBModel, AgendamentoDBModel);

    const pacientes = p.find(req.body.orderBy);
    pacientes.forEach((paciente) => {
      const idade = DataUtils.calculaIdade(paciente.dataNascimento);
      paciente.idade = idade;
      const consultaFutura = p.consultaFutura(paciente.cpf);
      if (consultaFutura) {
        paciente.consultaFutura = consultaFutura;
      }
    });
    res.body = pacientes;
  } catch (e) {
    console.log(e);
    res.success = false;
    res.errors = [e.message];
  }
  return res;
};

/**
   * retorna um paciente
   *
   * @param {object} req
   * @param {object} req.body - corpo da requisição
   * @param {string} req.body.cpf
   * @returns {object} res
   * @returns {object} res.body - corpo da resposta, com os pacientes encontrados
   * @returns {boolean} res.success
   * @returns {Array} res.errors
  */
exports.show = (req) => {
  const res = {};
  try {
    const p = new Paciente(null, PacienteDBModel, AgendamentoDBModel);
    res.body = p.findByCpf(req.body.cpf);
    res.success = !!res.body;
  } catch (e) {
    console.log(e);
    res.success = false;
    res.errors = [e.message];
  }
  return res;
};

/**
   * deleta um paciente
   *
   * @param {object} req
   * @param {object} req.body - corpo da requisição
   * @param {string} req.body.cpf - cpf do paciente a ser deletado.
   * @returns {object} res
   * @returns {object} res.body - corpo da resposta, com o paciente deletado
   * @returns {boolean} res.success
   * @returns {Array} res.errors
  */
exports.delete = (req) => {
  const res = {};
  res.success = true;
  try {
    const paciente = new Paciente({}, PacienteDBModel, AgendamentoDBModel);
    res.body = paciente.delete(req.body.cpf);
    if (paciente.errors.length > 0) {
      res.errors = paciente.errors;
      res.success = false;
    }
  } catch (e) {
    console.log(e);
    res.success = false;
    res.errors = [e.message];
  }
  return res;
};
