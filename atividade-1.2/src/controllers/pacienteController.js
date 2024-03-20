const Paciente = require('../models/Paciente');
const PacienteDBModel = require('../databaseModels/PacienteDBModel');
const AgendamentoDBModel = require('../databaseModels/AgendamentoDBModel');

exports.save = (req) => {
  const res = {};
  try {
    const paciente = new Paciente(req.body, PacienteDBModel, AgendamentoDBModel);
    paciente.save();

    if (paciente.errors.length > 0) {
      res.errors = paciente.errors;
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

exports.index = (req) => {
  const res = {};
  try {
    const p = new Paciente(null, PacienteDBModel, AgendamentoDBModel);
    const pacientes = p.find(req.body.orderBy);
    pacientes.forEach((paciente) => {
      const consultaFutura = p.consultaFutura(paciente.cpf);
      if (consultaFutura) {
        paciente.consultaFutura = consultaFutura;
      }
    });
    res.body = pacientes;
    res.success = true;
  } catch (e) {
    console.log(e);
    res.success = false;
    res.errors = [e.message];
  }
  return res;
};

exports.delete = (req) => {
  const res = {};
  try {
    const paciente = new Paciente(req.body, PacienteDBModel, AgendamentoDBModel);
    paciente.delete(req.body.cpf);
    if (paciente.errors.length > 0) {
      res.errors = paciente.errors;
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
