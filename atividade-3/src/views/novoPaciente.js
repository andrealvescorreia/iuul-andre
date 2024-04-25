const readline = require('readline-sync');
const pacienteController = require('../controllers/pacienteController');
const { tentarNovamente } = require('./utils');
const CPFValidator = require('../validators/CPFValidator');
const DataValidator = require('../validators/DataValidator');
const DataUtils = require('../utils/DataUtils');

function leCpf() {
  const cpf = readline.question('CPF: ');
  const validaCpf = new CPFValidator(cpf);
  if (!validaCpf.valido()) {
    console.log('Erro: CPF inválido');
    console.log('Tente novamente\n');
    return leCpf();
  }

  const res = pacienteController.show({ body: { cpf } });
  if (res.body) {
    console.log('Erro: CPF já cadastrado');
    console.log('Tente novamente\n');
    return leCpf();
  }
  return cpf;
}

function leNome() {
  const nome = readline.question('Nome: ');
  if (nome.length < 5) {
    console.log('Erro: nome tem menos de 5 caracteres');
    console.log('Tente novamente\n');
    return leNome();
  }
  return nome;
}

function leDataNascimento() {
  const dataNascimento = readline.question('Data de nascimento: ');
  if (!DataValidator.valida(dataNascimento)) {
    console.log('Erro: data inválida');
    console.log('Tente novamente\n');
    return leDataNascimento();
  }
  if (DataUtils.calculaIdade(dataNascimento) < 13) {
    console.log('Erro: paciente deve ter pelo menos 13 anos.');
    console.log('Tente novamente\n');
    return leDataNascimento();
  }
  return dataNascimento;
}

exports.novoPaciente = () => {
  console.log('Cadastro de paciente');
  const cpf = leCpf();
  const nome = leNome();
  const dataNascimento = leDataNascimento();

  const paciente = { cpf, nome, dataNascimento };
  const res = pacienteController.save({ body: paciente });
  if (!res.success) {
    console.log(`Erro: ${res.errors}`);
    if (tentarNovamente()) {
      this.novoPaciente();
    }
    return;
  }
  console.log('\nPaciente cadastrado com sucesso!');
  readline.question('Pressione Enter para continuar... ');
};
