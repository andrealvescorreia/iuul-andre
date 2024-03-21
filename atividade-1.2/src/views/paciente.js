const readline = require('readline-sync');
const { executarAcao } = require('./utils');
const { novoPaciente } = require('./novoPaciente');
const { deletarPaciente } = require('./deletarPaciente');
const { listarPacientesOrdenadoPor } = require('./listarPacientesOrdenadoPor');

class MenuPaciente {
  #rodando;

  #acoes = [
    {
      id: '1',
      descricao: 'Cadastrar novo paciente',
      executar: () => novoPaciente(),
    },
    {
      id: '2',
      descricao: 'Excluir paciente',
      executar: () => deletarPaciente(),
    },
    {
      id: '3',
      descricao: 'Listar pacientes (ordenar por CPF)',
      executar: () => listarPacientesOrdenadoPor('cpf'),
    },
    {
      id: '4',
      descricao: 'Listar pacientes (ordenar por nome)',
      executar: () => listarPacientesOrdenadoPor('nome'),
    },
    {
      id: '5',
      descricao: 'Voltar para o menu principal',
      executar: () => this.#exit(),
    },
  ];

  #exit() {
    this.#rodando = false;
  }

  init() {
    this.#rodando = true;
    while (this.#rodando) {
      console.log('Menu do Cadastro de Pacientes');
      this.#acoes.forEach((acao) => console.log(`${acao.id}-${acao.descricao}`));
      const entrada = readline.question('\n');
      console.clear();
      executarAcao(entrada, this.#acoes);
      console.clear();
    }
    console.log('Saindo...');
  }
}

module.exports = new MenuPaciente();
