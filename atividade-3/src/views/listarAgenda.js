const readline = require('readline-sync');
const agendamentoController = require('../controllers/agendamentoController');

exports.listarAgenda = async () => {
  const resposta = readline.question('Apresentar a agenda T-Toda ou P-Periodo: ');
  let agendamentos;
  let res;
  if (resposta.toUpperCase() === 'P') {
    const dataInicio = readline.question('Data inicial: ');
    const dataFim = readline.question('Data final: ');
    res = await agendamentoController.index({ body: { periodo: { dataInicio, dataFim } } });
    agendamentos = res.body;
  } else {
    res = await agendamentoController.index({ body: {} });
    agendamentos = res.body;
  }
  console.table(agendamentos);
  readline.question('Pressione Enter para continuar... ');
};
