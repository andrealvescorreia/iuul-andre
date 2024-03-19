class Paciente {
  constructor(cpf, nome, dataNascimento) {
    this.cpf = cpf;
    this.nome = nome;
    this.dataNascimento = dataNascimento;
  }
}

module.exports = class PacienteDBModel {
  static #pacientes = [];

  static #PRIMARY_KEY = 'cpf';

  static create(body) {
    const pacienteExistente = PacienteDBModel.findByKey(
      PacienteDBModel.#PRIMARY_KEY,
      body[PacienteDBModel.#PRIMARY_KEY],
    );
    if (pacienteExistente) return null;
    const paciente = new Paciente(body);
    PacienteDBModel.#pacientes.push(paciente);
    return paciente;
  }

  static find() {
    return PacienteDBModel.#pacientes;
  }

  static findByKey(chave, valor) {
    return PacienteDBModel.#pacientes.find((paciente) => paciente[chave] === valor);
  }

  static findByKeyAndDelete(chave, valor) {
    const pacientes = PacienteDBModel.#pacientes.filter((paciente) => paciente[chave] !== valor);
    const pacienteApagado = PacienteDBModel.findByKey(chave, valor);
    PacienteDBModel.#pacientes = pacientes;
    return pacienteApagado;
  }
};
