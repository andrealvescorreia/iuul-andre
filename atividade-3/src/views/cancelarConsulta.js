const readline = require('readline-sync');
const pacienteController = require('../controllers/pacienteController');
const agendamentoController = require('../controllers/agendamentoController');
const { tentarNovamente } = require('./utils');
const DataValidator = require('../validators/DataValidator');
const HoraValidator = require('../validators/HoraValidator');

function pacienteExiste(cpf) {
  const res = pacienteController.show({ body: { cpf } });
  return res.success;
}

function leCpf() {
  const cpf = readline.question('CPF: ');
  if (!pacienteExiste(cpf)) {
    console.log('Erro: paciente não cadastrado');
    console.log('Tente novamente\n');
    return leCpf();
  }
  return cpf;
}

function leDataConsulta() {
  const dataConsulta = readline.question('Data da consulta: ');
  if (!DataValidator.valida(dataConsulta)) {
    console.log('Erro: data inválida');
    console.log('Tente novamente\n');
    return leDataConsulta();
  }
  return dataConsulta;
}

function leHoraInicio() {
  const horaInicio = readline.question('Hora inicial: ');
  if (!HoraValidator.valida(horaInicio)) {
    console.log('Erro: hora inválida');
    console.log('Tente novamente\n');
    return leHoraInicio();
  }
  return horaInicio;
}

exports.cancelarConsulta = async () => {
  console.log('Cancelar agendamento');
  const cpfPaciente = leCpf();
  const dataConsulta = leDataConsulta();
  const horaInicio = leHoraInicio();
  const res = await agendamentoController.delete({
    body: { cpfPaciente, dataConsulta, horaInicio },
  });
  if (!res.success) {
    console.log(`Erro: ${res.errors[0]}`);
    if (tentarNovamente()) {
      this.cancelarConsulta();
    }
    return;
  }
  console.log('Agendamento cancelado com sucesso!');
  readline.question('Pressione Enter para continuar... ');
};
