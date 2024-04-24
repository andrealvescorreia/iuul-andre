const readline = require('readline-sync');
const { executarAcao } = require('./utils');
const { novoAgendamento } = require('./novoAgendamento');
const { cancelarConsulta } = require('./cancelarConsulta');
const { listarAgenda } = require('./listarAgenda');
const pacienteController = require('../controllers/pacienteController');

class MenuAgenda {
  #rodando;

  #acoes = [
    {
      id: '1',
      descricao: 'Agendar consulta',
      executar: () => novoAgendamento(),
    },
    {
      id: '2',
      descricao: 'Cancelar agendamento',
      executar: () => cancelarConsulta(),
    },
    {
      id: '3',
      descricao: 'Listar agenda',
      executar: () => listarAgenda(),
    },
    {
      id: '4',
      descricao: 'Voltar p/ menu principal',
      executar: () => {
        this.#rodando = false;
      },
    },
  ];

  #existemPacientes() {
    const res = pacienteController.index({ body: {} });
    return res.body.length > 0;
  }

  init() {
    if (!this.#existemPacientes()) {
      console.log('Não é possível acessar a agenda pois ainda não exisem pacientes');
      readline.question('Pressione Enter para continuar... ');
      return;
    }
    this.#rodando = true;
    while (this.#rodando) {
      console.log('Agenda');
      this.#acoes.forEach((acao) => console.log(`${acao.id}-${acao.descricao}`));
      const entrada = readline.question('\n');
      console.clear();
      executarAcao(entrada, this.#acoes);
      console.clear();
    }
    console.log('Saindo...');
  }
}

module.exports = new MenuAgenda();
