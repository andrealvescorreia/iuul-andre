const Turma = require("./Turma");
const ControleAcademico = require("./ControleAcademico");

const ca = new ControleAcademico(new Turma([]));
ca.init();
