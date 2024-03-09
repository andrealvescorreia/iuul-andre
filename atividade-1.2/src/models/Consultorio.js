module.exports = class Consultorio {
  #pacientes = [];

  constructor() {
    this.#pacientes = [];
  }

  get pacientes() {
    return this.#pacientes;
  }

  #pacienteEstaCadastrado(cpf) {
    const encontrado = this.#pacientes.find((paciente) => paciente.cpf === cpf);
    if (encontrado) return true;
    return false;
  }

  cadastrar(paciente) {
    if (this.#pacienteEstaCadastrado(paciente.cpf)) return false;
    this.#pacientes.push(paciente);
    return true;
  }

  descadastrar(cpf) {
    if (!this.#pacienteEstaCadastrado(cpf)) return false;
    this.#pacientes = this.#pacientes.filter((paciente) => paciente.cpf !== cpf);
    return true;
  }
};
