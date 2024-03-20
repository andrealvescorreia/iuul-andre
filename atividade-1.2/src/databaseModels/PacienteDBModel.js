module.exports = class PacienteDBModel {
  static #pacientes = [];

  static #id_count = 1;

  static #PRIMARY_KEY = 'cpf';

  /**
   * Cria um paciente na base de dados
   *
   * @param {object} paciente
   * @param {string} paciente.cpf
   * @param {string} paciente.nome
   * @param {string} paciente.dataNascimento
   * @returns {object} paciente criado
  */
  static create(paciente) {
    const pacienteExistente = PacienteDBModel.findByKey(
      PacienteDBModel.#PRIMARY_KEY,
      paciente[PacienteDBModel.#PRIMARY_KEY],
    );
    if (pacienteExistente) return null;
    const novoPaciente = { ...paciente, id: PacienteDBModel.#id_count };
    PacienteDBModel.#pacientes.push(novoPaciente);
    PacienteDBModel.#id_count++;
    return novoPaciente;
  }

  static find() {
    return PacienteDBModel.#pacientes;
  }

  static findByKey(chave, valor) {
    return PacienteDBModel.#pacientes.find((paciente) => paciente[chave] === valor) || null;
  }

  static findByKeyAndDelete(chave, valor) {
    const pacientes = PacienteDBModel.#pacientes.filter((paciente) => paciente[chave] !== valor);
    const pacienteApagado = PacienteDBModel.findByKey(chave, valor);
    PacienteDBModel.#pacientes = pacientes;
    return pacienteApagado;
  }
};
