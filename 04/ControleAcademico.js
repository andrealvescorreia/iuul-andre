const readline = require('readline-sync');
const Turma = require("./Turma");
const Aluno = require("./Aluno");

module.exports = class ControleAcademico {

  #turma = new Turma([]);
  #rodando;

  constructor(turma) {
    this.#turma = turma;
  }

  #listaAlunos() {
    console.log('==ALUNOS==')
    console.table(this.#turma.relatorio);
  }

  #inserirNovoAluno() {
    console.log('==INSERIR==');
    const matricula = readline.question('Matricula do aluno: ');
    if (this.#turma.matriculado(matricula)) {
      const resposta = readline.question('Aluno já matriculado. Tentar novamente? (s/n)');
      if (resposta == 's') return this.#inserirNovoAluno();
      return;
    }
    const nome = readline.question('Nome do aluno: ');
    this.#turma.insere(new Aluno(matricula, nome));
    console.log('Aluno matriculado com sucesso!');
  }

  #removerAluno() {
    console.log('==REMOVER==')
    const matricula = readline.question('Matricula do aluno: ');
    if (!this.#turma.matriculado(matricula)) {
      const resposta = readline.question('Aluno não matriculado. Tentar novamente? (s/n)');
      if (resposta == 's') return this.#removerAluno();
      return;
    }
    this.#turma.remove(matricula);
    console.log('Aluno removido com sucesso!');
  }

  #lancarNotaP1() {
    console.log('==NOTA P1==');
    const matricula = readline.question('Matricula do aluno: ');
    if (!this.#turma.matriculado(matricula)) {
      const resposta = readline.question('Aluno não matriculado. Tentar novamente? (s/n)');
      if (resposta == 's') return this.#lancarNotaP1();
      return;
    }
    const notaP1 = Number(readline.question('Nota da prova 1: '))
    this.#turma.lancaNotaP1(matricula, notaP1);
    console.log('Nota alterada com sucesso!');
  }

  #lancarNotaP2() {
    console.log('==NOTA P2==');
    const matricula = readline.question('Matricula do aluno: ');
    if (!this.#turma.matriculado(matricula)) {
      const resposta = readline.question('Aluno não matriculado. Tentar novamente? (s/n)');
      if (resposta == 's') return this.#lancarNotaP2();
      return;
    }
    const notaP2 = Number(readline.question('Nota da prova 2: '))
    this.#turma.lancaNotaP2(matricula, notaP2);
    console.log('Nota alterada com sucesso!');
  }

  #exit() {
    this.#rodando = false;
  }

  #acoes = [
    {
      id: '1',
      descricao: 'lista alunos na turma',
      executar: () => this.#listaAlunos()
    },
    {
      id: '2',
      descricao: 'inserir novo aluno',
      executar: () => this.#inserirNovoAluno()
    },
    {
      id: '3',
      descricao: 'remover aluno',
      executar: () => this.#removerAluno()
    },
    {
      id: '4',
      descricao: 'lançar a nota da prova 1 de um aluno',
      executar: () => this.#lancarNotaP1()
    },
    {
      id: '5',
      descricao: 'lançar a nota da prova 2 de um aluno',
      executar: () => this.#lancarNotaP2()
    },
    {
      id: '0',
      descricao: 'sair',
      executar: () => this.#exit()
    },
  ];

  #opcoes = this.#acoes.map(acao => {
    return `${acao.id}: ${acao.descricao}`
  });


  init() {
    this.#rodando = true;
    console.clear();
    console.log('Bem vindo ao controle acadêmico da turma!');
    console.log('A seguir estão as ações que voce pode realizar:\n')
    while (this.#rodando) {
      this.#opcoes.forEach(opcao => console.log(opcao));
      const entrada = readline.question('\nInsira a acao que deseja realizar: ');
      console.clear();
      this.#executarAcao(entrada);
      console.clear();
    }
    console.log('Saindo...');
  }

  #executarAcao(id) {
    const acao = this.#acoes.find(acao => acao.id == id);
    if (!acao) {
      console.log('Ação inválida.');
      return;
    }
    acao.executar();
    if (this.#rodando) readline.question('Pressione Enter para voltar ');
  }
}