const DataValidator = require('../validators/DataValidator');
const HoraValidator = require('../validators/HoraValidator');
const HoraUtils = require('../utils/HoraUtils');
const DataHoraUtils = require('../utils/DataHoraUtils');
const DataUtils = require('../utils/DataUtils');

module.exports = class Agendamento {
  HORARIO_FUNCIONAMENTO = ['0800', '1900'];

  constructor(body, agendamentoModel, pacienteModel) {
    this.body = body;
    this.errors = [];
    this.agendamento = null;
    this.agendamentoModel = agendamentoModel;
    this.pacienteModel = pacienteModel;
  }

  validaData() {
    if (!this.body.dataConsulta) {
      this.errors.push('data consulta é obrigatória');
      return;
    }
    if (!DataValidator.valida(this.body.dataConsulta)) {
      this.errors.push('data consulta inválida');
    }
  }

  validaCpf() {
    if (!this.body.cpfPaciente) {
      this.errors.push('cpf paciente é obrigatório');
      return;
    }
    const pacienteEncontrado = this.pacienteModel.findByKey('cpf', this.body.cpfPaciente);
    if (!pacienteEncontrado) this.errors.push('cpf deve pertencer a um paciente existente');
  }

  validaHoraInicio() {
    const { horaInicio } = this.body;
    if (!horaInicio) {
      this.errors.push('hora inicio é obrigatória');
      return;
    }
    if (!HoraValidator.valida(horaInicio)) {
      this.errors.push('hora inicio inválida');
      return;
    }
    if (!HoraUtils.obedeceBlocoDe15minutos(horaInicio)) {
      this.errors.push('hora inicio não se encaixa em blocos de 15 minutos');
    }
    if (!HoraUtils.dentroDoLimite(...this.HORARIO_FUNCIONAMENTO, horaInicio)) {
      this.errors.push('hora inicio fora do horário de funcionamento');
    }
  }

  validaHoraFim() {
    const { horaFim } = this.body;
    if (!horaFim) {
      this.errors.push('hora fim é obrigatória');
      return;
    }
    if (!HoraValidator.valida(horaFim)) {
      this.errors.push('hora fim inválida');
      return;
    }
    if (!HoraUtils.obedeceBlocoDe15minutos(horaFim)) {
      this.errors.push('hora fim não se encaixa em blocos de 15 minutos');
    }
    if (!HoraUtils.dentroDoLimite(...this.HORARIO_FUNCIONAMENTO, horaFim)) {
      this.errors.push('hora fim fora do horário de funcionamento');
    }
  }

  validaHorario() {
    if (this.horaFimAntecedeHoraInicio()) {
      this.errors.push('hora fim antecede hora inicio');
      return;
    }
    if (this.agendamentoEstaNoPassado()) {
      this.errors.push('só é possível marcar consultas para o futuro');
    }
    if (this.horarioOcupado()) {
      this.errors.push('horário ocupado');
    }
    if (this.pacienteTemAgendamentoFuturo()) {
      this.errors.push('paciente tem uma consulta pendente');
    }
  }

  horaFimAntecedeHoraInicio() {
    return Number(this.body.horaFim) <= Number(this.body.horaInicio);
  }

  agendamentoEstaNoPassado() {
    const dataInicio = DataHoraUtils.toDate(this.body.dataConsulta, this.body.horaInicio);
    return dataInicio < Date.now();
  }

  pacienteTemAgendamentoFuturo(dataAtual = Date.now()) {
    const agendamentos = this.agendamentoModel.find();

    return agendamentos.some((agendamento) => {
      const dataAgendamento = DataHoraUtils.toDate(
        agendamento.dataConsulta,
        agendamento.horaFim,
      );
      return agendamento.cpfPaciente === this.body.cpfPaciente && dataAgendamento > dataAtual;
    });
  }

  horarioOcupado() {
    const agendamentos = this.agendamentoModel.find();
    return agendamentos.some((agendamento) => agendamento.dataConsulta === this.body.dataConsulta
      && HoraUtils.seSobrepoem(
        { inicio: agendamento.horaInicio, fim: agendamento.horaFim },
        { inicio: this.body.horaInicio, fim: this.body.horaFim },
      ));
  }

  validate() {
    this.validaCpf();
    this.validaData();
    this.validaHoraInicio();
    this.validaHoraFim();
    if (this.errors.length === 0) this.validaHorario();
  }

  save() {
    this.validate();
    if (this.errors.length > 0) return;

    // acessa o 'banco de dados';
    this.agendamento = this.agendamentoModel.create(this.body);
  }

  find() {
    return this.agendamentoModel.find();
  }

  #estaEntre(data, dataInicio, dataFim) {
    return data >= dataInicio && data <= dataFim;
  }

  findByPeriod(dataInicio, dataFim) {
    const agendamentos = this.agendamentoModel.find();
    const dataInicioDate = DataUtils.converteStringEmData(dataInicio);
    const dataFimDate = DataUtils.converteStringEmData(dataFim);
    return agendamentos.filter((agendamento) => {
      const agendamentoDate = DataUtils.converteStringEmData(agendamento.dataConsulta);
      return this.#estaEntre(agendamentoDate, dataInicioDate, dataFimDate);
    });
  }
};
