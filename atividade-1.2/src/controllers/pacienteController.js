const Paciente = require('../models/PacienteModel');
const PacienteDBModel = require('../databaseModels/PacienteDBModel');

exports.save = (req, res) => {
  try {
    const paciente = new Paciente(req.body, PacienteDBModel);
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
