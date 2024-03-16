const HoraUtils = require('../utils/HoraUtils');
const DataHorarioUtils = require('../utils/DataHoraUtils');
const HoraAgendamento = require('./HoraAgendamento');

module.exports = class Consultorio {
  #pacientes = [];

  #agendamentos = [];

  static HORARIOS_FUNCIONAMENTO = [new HoraAgendamento('0800'), new HoraAgendamento('1900')];

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
      && HoraUtils.seSobrepoem(
        { inicio: agendamento.horaInicial.hora, fim: agendamento.horaFinal.hora },
        { inicio: horaInicial, fim: horaFinal },
      ));
  }

  foraDoHorarioDeFuncionamento(agendamento) {
    return (
      !agendamento.horaInicial.dentroDoLimite(...Consultorio.HORARIOS_FUNCIONAMENTO)
      || !agendamento.horaFinal.dentroDoLimite(...Consultorio.HORARIOS_FUNCIONAMENTO)
    );
  }

  pacienteTemAgendamentosFuturos(cpf, dataAtual = Date.now()) {
    return this.#agendamentos.some((agendamento) => {
      const dataAgendamento = DataHorarioUtils.toDate(
        agendamento.dataConsulta,
        agendamento.horaFinal.hora,
      );
      return agendamento.cpfPaciente === cpf && dataAgendamento > dataAtual;
    });
  }

  validaAgendamento(agendamento, dataAtual = Date.now()) {
    const dataInicio = DataHorarioUtils.toDate(
      agendamento.dataConsulta,
      agendamento.horaInicial.hora,
    );
    if (dataInicio < dataAtual) {
      throw new Error('só é possível fazer agendamentos para o futuro');
    }
    if (!this.pacienteEstaCadastrado(agendamento.cpfPaciente)) {
      throw new Error('cpf do paciente não encontrado');
    }
    if (this.foraDoHorarioDeFuncionamento(agendamento)) {
      throw new Error('horário da consulta informada está fora do horario de funcionamento');
    }
    if (this.horarioOcupado(
      agendamento.dataConsulta,
      agendamento.horaInicial.hora,
      agendamento.horaFinal.hora,
    )) {
      throw new Error('horário já reservado');
    }
    if (this.pacienteTemAgendamentosFuturos(agendamento.cpfPaciente, dataAtual)) {
      throw new Error('não é possível agendar pois o paciente ainda tem consultas pendentes');
    }
  }

  agendar(agendamento, dataAtual = Date.now()) {
    this.validaAgendamento(agendamento, dataAtual);
    this.#agendamentos.push(agendamento);
    return true;
  }
};
