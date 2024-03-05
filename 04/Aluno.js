module.exports = class Aluno {
  #matricula;
  #nome;
  constructor(matricula, nome) {
    this.#matricula = matricula;
    this.#nome = nome;
  }

  get matricula() {
    return this.#matricula;
  }

  get nome() {
    return this.#nome;
  }

}