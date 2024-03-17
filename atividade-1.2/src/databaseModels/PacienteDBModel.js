const Paciente = require('../constructors/Paciente');

module.exports = class PacientesTable {
  static #pacientes = [];

  static create(body) {
    const paciente = new Paciente(body);
    PacientesTable.#pacientes.push(paciente);
    return paciente;
  }

  static find() {
    return PacientesTable.#pacientes;
  }

  static findByKey(chave, valor) {
    return PacientesTable.#pacientes.find((paciente) => paciente[chave] === valor);
  }

  /* static findByKeyAndUpdate(chave, valor, paciente) {
    // TODO
  } */

  static findByKeyAndDelete(chave, valor) {
    const pacientes = PacientesTable.#pacientes.filter((paciente) => paciente[chave] !== valor);
    const pacienteApagado = PacientesTable.findByKey(chave, valor);
    PacientesTable.#pacientes = pacientes;
    return pacienteApagado;
  }
};
