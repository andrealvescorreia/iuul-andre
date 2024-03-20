const Paciente = require('../models/Paciente');
const PacienteDBModel = require('../databaseModels/PacienteDBModel');

exports.save = (req) => {
  const res = {};
  try {
    const paciente = new Paciente(req.body, PacienteDBModel);
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
    const p = new Paciente(null, PacienteDBModel);
    res.body = p.find(req.body.sortBy);
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
    const paciente = new Paciente(null, PacienteDBModel);
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
