const readline = require('readline-sync');
const { executarAcao } = require('./utils');
const paciente = require('./paciente');
const agenda = require('./agenda');

class MenuPrincipal {
  #rodando;

  #acoes = [
    {
      id: '1',
      descricao: 'Cadastro de pacientes',
      executar: () => paciente.init(),
    },
    {
      id: '2',
      descricao: 'Agenda',
      executar: () => agenda.init(),
    },
    {
      id: '3',
      descricao: 'Fim',
      executar: () => { this.#rodando = false; },
    },
  ];

  init() {
    this.#rodando = true;
    while (this.#rodando) {
      console.log('Menu Principal');
      this.#acoes.forEach((acao) => console.log(`${acao.id}-${acao.descricao}`));
      const entrada = readline.question('\n');
      console.clear();
      executarAcao(entrada, this.#acoes);
      console.clear();
    }
    console.log('Saindo...');
  }
}

module.exports = new MenuPrincipal();
