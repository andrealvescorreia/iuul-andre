class Paciente {
  constructor(cpf, nome, dataNascimento) {
    this.cpf = cpf;
    this.nome = nome;
    this.dataNascimento = dataNascimento;
  }
}

module.exports = class PacientesTable {
  static #pacientes = [];

  static #PRIMARY_KEY = 'cpf';

  static create(body) {
    const pacienteExistente = PacientesTable.findByKey(
      PacientesTable.#PRIMARY_KEY,
      body[PacientesTable.#PRIMARY_KEY],
    );
    if (pacienteExistente) return null;
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
