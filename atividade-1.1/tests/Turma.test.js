const Aluno = require("../04/Aluno");
const Turma = require("../04/Turma");

describe('testes turma', () => {
  let alunos;
  let turma;

  function initializaTurma() {
    alunos = [
      new Aluno('23456', 'Bruno Carvalho'),
      new Aluno('45678', 'Joao Santos'),
      new Aluno('34567', 'Fernanda Abreu'),
      new Aluno('12345', 'Ana de Almeida'),
    ];
    turma = new Turma(alunos);
  }

  beforeEach(() => {
    initializaTurma();
  });

  test('cria turma', () => {
    expect(turma.alunos).toEqual(alunos);
  });

  test('insere novo aluno na turma', () => {
    const novoAluno = new Aluno('01231', 'André');
    turma.insere(novoAluno);
    expect(turma.alunos).toEqual([...alunos, novoAluno]);
  });

  test('não deve matricular aluno que ja tem matricula', () => {
    const novoAluno = new Aluno('12345', 'Maria');
    expect(turma.insere(novoAluno)).toBe(false);
    expect(turma.alunos).toEqual(alunos);
  });

  test('remove único aluno da turma', () => {
    alunos = [new Aluno('12345', 'Ana de Almeida')];
    turma = new Turma(alunos);
    turma.remove('12345');
    expect(turma.alunos).toEqual([]);
  });

  test('remove aluno da turma', () => {
    turma.remove('34567');
    const alunosEsperados = alunos.filter(aluno => aluno.matricula != '34567');
    expect(turma.alunos).toEqual(alunosEsperados);
  });

  test('tenta remover aluno inexistente da turma', () => {
    expect(turma.remove('010101')).toBe(false);
    expect(turma.alunos).toEqual(alunos);
  });

  test('alunos sem notas', () => {
    expect(turma.notaP1('12345')).toBe(null);
    expect(turma.notaP2('12345')).toBe(null);
    expect(turma.notaP1('23456')).toBe(null);
    expect(turma.notaP2('23456')).toBe(null);
  });

  test('novo aluno sem nota', () => {
    turma.insere(new Aluno('400289', 'André'))
    expect(turma.notaP1('400289')).toBe(null);
    expect(turma.notaP2('400289')).toBe(null);
  });

  test('Lança nota da prova 1 aluno', () => {
    turma.lancaNotaP1('12345', 10.0);
    turma.lancaNotaP1('23456', 6.5);

    expect(turma.notaP1('12345')).toBe(10.0);
    expect(turma.notaP1('23456')).toBe(6.5);
    expect(turma.notaP2('12345')).toBe(null);
    expect(turma.notaP2('23456')).toBe(null);
  });

  test('Lança nota da prova 2 do aluno', () => {
    turma.lancaNotaP2('12345', 3.0);
    turma.lancaNotaP2('23456', 1.5);

    expect(turma.notaP2('12345')).toBe(3.0);
    expect(turma.notaP2('23456')).toBe(1.5);
    expect(turma.notaP1('12345')).toBe(null);
    expect(turma.notaP1('23456')).toBe(null);
  });

  test('Nota final aluno que fez as duas provas', () => {
    turma.lancaNotaP1('12345', 8.0);
    turma.lancaNotaP2('12345', 9.5);

    expect(turma.notaFinal('12345')).toBe(8.8);
  });

  test('Nota final aluno que so fez a prova 1', () => {
    turma.lancaNotaP1('12345', 10.0);
    expect(turma.notaFinal('12345')).toBe(5.0);
  });

  test('Nota final aluno que so fez a prova 2', () => {
    turma.lancaNotaP2('12345', 7.0);
    expect(turma.notaFinal('12345')).toBe(3.5);
  });

  test('Nota final aluno que não fez nenhuma prova', () => {
    expect(turma.notaFinal('12345')).toBe(0);
  });

  test('Relatório da turma', () => {
    turma.lancaNotaP1('12345', 8.0);
    turma.lancaNotaP2('12345', 9.5);
    turma.lancaNotaP1('23456', 7.0);
    turma.lancaNotaP2('34567', 8.5);

    const relatorioEsperado = [
      { matricula: '12345', nome: 'Ana de Almeida', notaP1: 8.0, notaP2: 9.5, notaFinal: 8.8 },
      { matricula: '23456', nome: 'Bruno Carvalho', notaP1: 7.0, notaP2: null, notaFinal: 3.5 },
      { matricula: '34567', nome: 'Fernanda Abreu', notaP1: null, notaP2: 8.5, notaFinal: 4.3 },
      { matricula: '45678', nome: 'Joao Santos', notaP1: null, notaP2: null, notaFinal: 0.0 },
    ];
    expect(turma.relatorio).toEqual(relatorioEsperado);
  });
});