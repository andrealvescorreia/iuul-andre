const readline = require('readline-sync');
const pacienteController = require('../controllers/pacienteController');

exports.listarPacientesOrdenadoPor = async (chave) => {
  const res = await pacienteController.index({ body: { orderBy: chave } });
  const pacientes = res.body;

  console.log(`
--------------------------------
CPF   Nome    Dt.Nasc.  Idade
--------------------------------`);
  pacientes.forEach((paciente) => {
    console.log(paciente.cpf, paciente.nome, paciente.dataNascimento, paciente.idade);
    if (paciente.consultaFutura) {
      console.log(`Agendado para: ${paciente.consultaFutura.dataConsulta}`);
      console.log(`${paciente.consultaFutura.horaInicio} às ${paciente.consultaFutura.horaFim}`);
    }
    console.log('');
  });
  console.log('--------------------------------');
  readline.question('Pressione Enter para continuar... ');
};
