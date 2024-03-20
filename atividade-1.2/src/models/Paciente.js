const DataUtils = require('../utils/DataUtils');
const DataHoraUtils = require('../utils/DataHoraUtils');
const CPFValidator = require('../validators/CPFValidator');
const DataValidator = require('../validators/DataValidator');

module.exports = class Paciente {
  IDADE_MINIMA = 13;

  constructor(body, pacienteModel, agendamentoModel) {
    this.body = body;
    this.errors = [];
    this.paciente = null;
    this.pacienteModel = pacienteModel;
    this.agendamentoModel = agendamentoModel;
  }

  validaData() {
    if (!this.body.dataNascimento) {
      this.errors.push('dataNascimento é obrigatório');
    }
    if (!DataValidator.valida(this.body.dataNascimento)) {
      this.errors.push('data nascimento inválida');
      return;
    }
    const idade = DataUtils.calculaIdade(this.body.dataNascimento);
    if (idade < this.IDADE_MINIMA) this.errors.push(`idade inferior a idade mínima de ${this.IDADE_MINIMA}`);
  }

  validaCpf() {
    if (!this.body.cpf) {
      this.errors.push('cpf é obrigatório');
      return;
    }
    const cpf = new CPFValidator(this.body.cpf);
    if (!cpf.valido()) {
      this.errors.push('cpf inválido');
      return;
    }
    const pacienteExistente = this.pacienteModel.findByKey('cpf', this.body.cpf);
    if (pacienteExistente) {
      this.errors.push('paciente com cpf já cadastrado');
    }
  }

  validaNome() {
    if (!this.body.nome) {
      this.errors.push('nome é obrigatório');
      return;
    }
    if (this.body.nome.length < 5) this.errors.push('nome deve ter ao menos 5 caracteres');
  }

  validate() {
    this.validaNome();
    this.validaCpf();
    this.validaData();
  }

  save() {
    this.validate();
    if (this.errors.length > 0) return;

    // acessa o 'banco de dados';
    this.paciente = this.pacienteModel.create(this.body);
  }

  find() {
    return this.pacienteModel.find();
  }

  findByCpf(cpf) {
    return this.pacienteModel.findByKey('cpf', cpf);
  }

  delete(cpf) {
    if (typeof cpf !== 'string') {
      this.errors.push('cpf deve ser string');
      return null;
    }
    const pacienteEncontrado = this.pacienteModel.findByKey('cpf', cpf);
    if (!pacienteEncontrado) {
      this.errors.push('paciente não pôde ser deletado pois cpf não foi encontrado');
      return null;
    }
    if (this.consultaFutura(cpf)) {
      this.errors.push('paciente não pôde ser deletado pois tem uma consulta pendente');
      return null;
    }
    this.#deleteAgendamentos(cpf);
    const pacienteApagado = this.pacienteModel.findByKeyAndDelete('cpf', cpf);
    return pacienteApagado;
  }

  #deleteAgendamentos(cpf) {
    const agendamentos = this.agendamentoModel.find();
    const agendamentosCpf = agendamentos.filter((agendamento) => agendamento.cpfPaciente === cpf);
    agendamentosCpf.forEach((agendamento) => {
      this.agendamentoModel.findByKeyAndDelete('id', agendamento.id);
    });
  }

  consultaFutura(cpf) {
    // encontra a consulta do paciente
    const agendamentos = this.agendamentoModel.find();
    const dataAtual = Date.now();
    const consultaFutura = agendamentos.find((agendamento) => {
      const dataAgendamento = DataHoraUtils.toDate(
        agendamento.dataConsulta,
        agendamento.horaInicio,
      );
      return agendamento.cpfPaciente === cpf && dataAgendamento > dataAtual;
    });

    return consultaFutura || null;
  }
};
