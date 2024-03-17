const PacienteModel = require('../models/PacienteModel');
const PacientesTable = require('../database/PacientesTable');

exports.save = (req, res) => {
  try {
    const paciente = new PacienteModel(req.body, PacientesTable);
    paciente.save();

    if (paciente.errors.length > 0) {
      res.errors = paciente.errors;
      res.success = false;
      return;
    }
    res.success = true;
  } catch (e) {
    console.log(e);
    res.success = false;
    res.errors = [e.message];
  }
};
