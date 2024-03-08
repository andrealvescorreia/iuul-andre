class NotaAluno {
  constructor(matricula, notaP1 = null, notaP2 = null) {
    this.matricula = matricula;
    this.notaP1 = notaP1;
    this.notaP2 = notaP2;
  }
}

module.exports = class Turma {
  #alunos = [];
  #notasAlunos = [];

  constructor(alunos) {
    this.#alunos = [...alunos];
    this.#alunos.forEach(aluno => {
      this.#notasAlunos.push(new NotaAluno(aluno.matricula, null, null));
    });
  }

  get alunos() {
    return this.#alunos;
  }

  matriculado(matricula) {
    const encontrado = this.#alunos.find(aluno => aluno.matricula === matricula);
    return encontrado ? true : false;
  }

  insere(novoAluno) {
    if (this.matriculado(novoAluno.matricula)) return false;
    this.#alunos.push(novoAluno);
    this.#notasAlunos.push(new NotaAluno(novoAluno.matricula))
    return true;
  }

  remove(matricula) {
    if (!this.matriculado(matricula)) return false;
    this.#alunos = this.#alunos.filter(aluno => aluno.matricula != matricula)
  }

  #encontraNotasAluno(matricula) {
    const notasAluno = this.#notasAlunos.find(notas => notas.matricula == matricula);
    return notasAluno;
  }

  lancaNotaP1(matricula, nota) {
    const notasAluno = (this.#encontraNotasAluno(matricula));
    if (!notasAluno) return false;
    notasAluno.notaP1 = nota;
    return true;
  }

  lancaNotaP2(matricula, nota) {
    const notasAluno = (this.#encontraNotasAluno(matricula));
    if (!notasAluno) return false;
    notasAluno.notaP2 = nota;
    return true;
  }

  notaP1(matricula) {
    const notasAluno = (this.#encontraNotasAluno(matricula));
    if (!notasAluno) return false;
    return notasAluno.notaP1;
  }

  notaP2(matricula) {
    const notasAluno = (this.#encontraNotasAluno(matricula));
    if (!notasAluno) return false;
    return notasAluno.notaP2;
  }

  notaFinal(matricula) {
    const notasAluno = (this.#encontraNotasAluno(matricula));
    if (!notasAluno) return false;

    const notaP1 = notasAluno.notaP1 || 0;
    const notaP2 = notasAluno.notaP2 || 0;
    const notaFinal = Number(((notaP1 + notaP2) / 2).toFixed(1))
    return notaFinal;
  }

  #relatorioAluno(aluno) {
    return {
      nome: aluno.nome,
      matricula: aluno.matricula,
      notaP1: this.notaP1(aluno.matricula),
      notaP2: this.notaP2(aluno.matricula),
      notaFinal: this.notaFinal(aluno.matricula)
    }
  }


  #ordemAlfabetica(relatorio) {
    relatorio.sort((a, b) => {
      const nomeA = a.nome.toLowerCase();
      const nomeB = b.nome.toLowerCase();
      if (nomeA < nomeB) return -1;
      if (nomeA > nomeB) return 1;
      return 0;
    });
    return relatorio;
  }

  get relatorio() {
    const relatorio = [];
    this.#alunos.forEach(aluno => {
      relatorio.push(this.#relatorioAluno(aluno));
    })
    return this.#ordemAlfabetica(relatorio);
  }

}