const Turma = require("./Turma");
const Aluno = require("./Aluno");
const ControleAcademico = require("./ControleAcademico");

// Os dados predefinidos seguem o exmplo da atividade.

const alunosPredefinidos = [
  new Aluno('23456', 'Bruno Carvalho'),
  new Aluno('45678', 'Joao Santos'),
  new Aluno('34567', 'Fernanda Abreu'),
  new Aluno('12345', 'Ana de Almeida'),
];

const turmaPredefinida = new Turma(alunosPredefinidos);
turmaPredefinida.lancaNotaP1('12345', 8.0);
turmaPredefinida.lancaNotaP2('12345', 9.5);
turmaPredefinida.lancaNotaP1('23456', 7.0);
turmaPredefinida.lancaNotaP2('34567', 8.5);

const ca = new ControleAcademico(turmaPredefinida);

ca.init();
