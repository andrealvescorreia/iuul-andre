const HorarioUtils = require('../utils/HorarioUtils');

module.exports = class Consultorio {
  #pacientes = [];

  #agendamentos = [];

  static HORARIOS_FUNCIONAMENTO = ['0800', '1900'];

  get pacientes() {
    return this.#pacientes;
  }

  get agendamentos() {
    return this.#agendamentos;
  }

  pacienteEstaCadastrado(cpf) {
    const encontrado = this.#pacientes.find((paciente) => paciente.cpf === cpf);
    if (encontrado) return true;
    return false;
  }

  horarioEstaLivre(data, horario) {
    // console.log(this.#agendamentos);
    const horarioJaAgendado = this.#agendamentos.find((agendamento) => (
      agendamento.dataConsulta === data
      && HorarioUtils.dentroDoLimite(agendamento.horaInicial, agendamento.horaFinal, horario)
    ));

    if (horarioJaAgendado) return false;
    return true;
  }

  cadastrar(paciente) {
    if (this.pacienteEstaCadastrado(paciente.cpf)) return false;
    this.#pacientes.push(paciente);
    return true;
  }

  descadastrar(cpf) {
    if (!this.pacienteEstaCadastrado(cpf)) return false;
    this.#pacientes = this.#pacientes.filter((paciente) => paciente.cpf !== cpf);
    return true;
  }

  agendar(agendamento) {
    if (!this.pacienteEstaCadastrado(agendamento.cpfPaciente)) throw new Error('cpf do paciente não encontrado');
    this.#agendamentos.push(agendamento);
    return true;
  }
};
