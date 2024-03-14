const HorarioUtils = require('../utils/HorarioUtils');
const AgendamentoValidator = require('../validators/AgendamentoValidator');

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
    return this.#pacientes.some((paciente) => paciente.cpf === cpf);
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

  horarioOcupado(data, horaInicial, horaFinal) {
    return this.#agendamentos.some((agendamento) => agendamento.dataConsulta === data
      && HorarioUtils.seSobrepoem(
        { inicio: agendamento.horaInicial, fim: agendamento.horaFinal },
        { inicio: horaInicial, fim: horaFinal },
      ));
  }

  foraDoHorarioDeFuncionamento(agendamento) {
    return (
      !HorarioUtils.dentroDoLimite(...Consultorio.HORARIOS_FUNCIONAMENTO, agendamento.horaInicial)
      || !HorarioUtils.dentroDoLimite(...Consultorio.HORARIOS_FUNCIONAMENTO, agendamento.horaFinal)
    );
  }

  pacienteTemAgendamentosFuturos(cpf) {
    return this.#agendamentos.some((agendamento) => agendamento.cpfPaciente === cpf);
  }

  validaAgendamento(agendamento, dataAtual = Date.now()) {
    AgendamentoValidator.valida(agendamento, dataAtual);

    if (!this.pacienteEstaCadastrado(agendamento.cpfPaciente)) {
      throw new Error('cpf do paciente não encontrado');
    }
    if (this.foraDoHorarioDeFuncionamento(agendamento)) {
      throw new Error('horário da consulta informada está fora do horario de funcionamento');
    }
    if (this.horarioOcupado(
      agendamento.dataConsulta,
      agendamento.horaInicial,
      agendamento.horaFinal,
    )) {
      throw new Error('horário já reservado');
    }
  }

  agendar(agendamento, dataAtual = Date.now()) {
    this.validaAgendamento(agendamento, dataAtual);
    this.#agendamentos.push(agendamento);
    return true;
  }
};
