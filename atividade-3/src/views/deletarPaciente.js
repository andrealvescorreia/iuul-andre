const readline = require('readline-sync');
const pacienteController = require('../controllers/pacienteController');
const { tentarNovamente } = require('./utils');

function leCpf() {
  const cpf = readline.question('CPF: ');
  return cpf;
}

exports.deletarPaciente = () => {
  console.log('Excluir paciente');
  const cpf = leCpf();

  const res = pacienteController.delete({ body: { cpf } });
  if (!res.success) {
    console.log(`Erro: ${res.errors[0]}`);
    if (tentarNovamente()) {
      this.deletarPaciente();
    }
    return;
  }
  console.log('Paciente excluído com sucesso!');
  readline.question('Pressione Enter para continuar... ');
};
