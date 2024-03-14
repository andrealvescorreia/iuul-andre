const HorarioUtils = require('../utils/HorarioUtils');
const DataHorarioUtils = require('../utils/DataHorarioUtils');

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

  horarioEstaLivre(data, horaInicial, horaFinal) {
    let horarioEstaLivre = true;
    this.#agendamentos.forEach((agendamento) => {
      if (agendamento.dataConsulta === data
        && HorarioUtils.seSobrepoem(
          {
            inicio: agendamento.horaInicial,
            fim: agendamento.horaFinal,
          },
          {
            inicio: horaInicial,
            fim: horaFinal,
          },
        )) {
        horarioEstaLivre = false;
      }
    });

    return horarioEstaLivre;
  }

  #validaAgendamento(agendamento, dataAtual) {
    if (!this.pacienteEstaCadastrado(agendamento.cpfPaciente)) {
      throw new Error('cpf do paciente não encontrado');
    }
    if (!HorarioUtils.obedeceBlocoDe15minutos(agendamento.horaInicial)
      || !HorarioUtils.obedeceBlocoDe15minutos(agendamento.horaFinal)) {
      throw new Error('apenas horários em blocos de 15 minutos são aceitos. ex: 1000, 1015, 1030, etc.');
    }
    const dataInicio = DataHorarioUtils.toDate(agendamento.dataConsulta, agendamento.horaInicial);
    if (dataInicio < dataAtual) {
      throw new Error('só é possível fazer agendamentos para o futuro');
    }
    const dataFim = DataHorarioUtils.toDate(agendamento.dataConsulta, agendamento.horaFinal);
    if (dataFim < dataInicio) {
      throw new Error('o horário do fim da consulta deve proceder o horário de início');
    }
    if (!this.horarioEstaLivre(
      agendamento.dataConsulta,
      agendamento.horaInicial,
      agendamento.horaFinal,
    )) {
      throw new Error('horário já reservado');
    }
  }

  agendar(agendamento, dataAtual = Date.now()) {
    this.#validaAgendamento(agendamento, dataAtual);
    this.#agendamentos.push(agendamento);
    return true;
  }
};
