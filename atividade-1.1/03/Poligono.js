module.exports = class Poligono {
  #vertices = [];

  #verticesSaoDistintos() {
    for (let i = 0; i < this.#vertices.length; i++) {
      const vi = this.#vertices[i];
      for (let j = 0; j < this.#vertices.length; j++) {
        const vj = this.#vertices[j];

        if (i == j) continue;
        if (vi.equals(vj)) return false;
      }
    }
    return true;
  }

  #valida() {
    if (this.#vertices.length < 3) throw new Error('O polígono deve ter ao menos três vertices.');
    if (!this.#verticesSaoDistintos()) throw new Error('O polígono deve ter vertices distintos.');
  }

  constructor(vertices) {
    this.#vertices = [...vertices];
    this.#valida();
  }

  get vertices() {
    return this.#vertices;
  }

  get qtdVertices() {
    return this.#vertices.length;
  }

  #includes(vertice) {
    for (let i = 0; i < this.#vertices.length; i++) {
      const verticeExistente = this.#vertices[i];
      if (verticeExistente.equals(vertice)) return true;
    }
    return false;
  }

  addVertice(vertice) {
    if (this.#includes(vertice)) return false;
    this.#vertices.push(vertice);
    return true;
  }

  get perimetro() {
    let perimetro = 0;
    for (let i = 0; i < this.#vertices.length; i++) {
      const verticeAtual = this.#vertices[i];
      const proximoVertice = this.#vertices[(i + 1) % this.#vertices.length];
      perimetro += verticeAtual.distancia(proximoVertice);
    }
    return perimetro;
  }
}