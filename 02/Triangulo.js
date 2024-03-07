const Vertice = require("../01/Vertice");

module.exports = class Triangulo {
  #v1;
  #v2;
  #v3;

  #valido() {
    return this.area != 0;
  }

  constructor([v1, v2, v3]) {
    this.#v1 = v1;
    this.#v2 = v2;
    this.#v3 = v3;
    if (!this.#valido()) throw new Error('Não é um triângulo.');
  }

  get vertices() {
    return [this.#v1, this.#v2, this.#v3];
  }

  get #tamanhoArestas() { // TODO: pensar em um nome melhor pra esse metodo?
    const ladoA = this.#v1.distancia(this.#v2);
    const ladoB = this.#v1.distancia(this.#v3);
    const ladoC = this.#v2.distancia(this.#v3);
    return [ladoA, ladoB, ladoC]
  }

  get perimetro() {
    return this.#tamanhoArestas.reduce((acSoma, aresta) => acSoma + aresta);
  }

  get area() {
    const [ladoA, ladoB, ladoC] = this.#tamanhoArestas;
    const S = this.perimetro / 2;
    return Math.sqrt(S * (S - ladoA) * (S - ladoB) * (S - ladoC))
  }

  get tipo() {
    let [ladoA, ladoB, ladoC] = this.#tamanhoArestas;

    // O toFixed foi usado para fazer uma pequena aproximação, 
    // permitindo melhor identificação de triângulos esquiláteros.
    ladoA = Number(ladoA.toFixed(8));
    ladoB = Number(ladoB.toFixed(8));
    ladoC = Number(ladoC.toFixed(8));
    if (ladoA === ladoB && ladoA === ladoC) return 'equilátero';
    if (ladoA === ladoB || ladoA === ladoC || ladoB === ladoC) return 'isósceles';
    return 'escaleno';
  }

  equals(triangulo) {
    let thisVerticesCoords = [];
    this.vertices.forEach(vertice => {
      thisVerticesCoords.push([vertice.x, vertice.y])
    });
    thisVerticesCoords.sort();

    let outroVerticesCoords = [];
    triangulo.vertices.forEach(vertice => {
      outroVerticesCoords.push([vertice.x, vertice.y])
    });
    outroVerticesCoords.sort();

    return JSON.stringify(thisVerticesCoords) === JSON.stringify(outroVerticesCoords)
  }

  clone() {
    return new Triangulo([this.#v1, this.#v2, this.#v3]);
  }
}