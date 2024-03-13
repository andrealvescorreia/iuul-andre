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

  // TODO move to HorarioUtils
  horariosSeSobrepoem(horaInicial1, horaFinal1, horaInicial2, horaFinal2) {
    return (
      ((HorarioUtils.dentroDoLimite(horaInicial1, horaFinal1, horaInicial2)
        && horaFinal1 !== horaInicial2)
        || (HorarioUtils.dentroDoLimite(horaInicial1, horaFinal1, horaFinal2))
      )
      || (
        (HorarioUtils.dentroDoLimite(horaInicial2, horaFinal2, horaInicial1)
          && horaFinal2 !== horaInicial1)
        || (HorarioUtils.dentroDoLimite(horaInicial2, horaFinal2, horaFinal1)
          && horaFinal1 !== horaInicial2)
      )
    );
  }

  horarioEstaLivre(data, horaInicial, horaFinal) {
    // console.log(this.#agendamentos);
    let horarioEstaLivre = true;
    this.#agendamentos.forEach((agendamento) => {
      if (agendamento.dataConsulta === data
        && this.horariosSeSobrepoem(
          agendamento.horaInicial,
          agendamento.horaFinal,
          horaInicial,
          horaFinal,
        )) {
        horarioEstaLivre = false;
      }
    });

    return horarioEstaLivre;
  }

  agendar(agendamento) {
    if (!this.pacienteEstaCadastrado(agendamento.cpfPaciente)) {
      throw new Error('cpf do paciente não encontrado');
    }
    if (!this.horarioEstaLivre(
      agendamento.dataConsulta,
      agendamento.horaInicial,
      agendamento.horaFinal,
    )) {
      throw new Error('horário já reservado');
    }
    this.#agendamentos.push(agendamento);
    return true;
  }
};
