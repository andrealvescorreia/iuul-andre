module.exports = class Agendamento {
  constructor(cpfPaciente, dataConsulta, horaInicial, horaFinal) {
    this.cpfPaciente = cpfPaciente;
    this.dataConsulta = dataConsulta;
    this.horaInicial = horaInicial;
    this.horaFinal = horaFinal;
  }
};
