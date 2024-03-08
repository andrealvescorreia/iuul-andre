const Vertice = require("../01/Vertice");
const Poligono = require("../03/Poligono");

module.exports = class Triangulo extends Poligono {
  #valida() {
    if (this.area == 0)
      throw new Error('Não é um triângulo.');
  }

  constructor(vertices = [v1, v2, v3]) {
    super(vertices);
    this.#valida();
  }

  get #tamanhoArestas() { // TODO: pensar em um nome melhor pra esse metodo?
    const ladoA = this.vertices[0].distancia(this.vertices[1]);
    const ladoB = this.vertices[0].distancia(this.vertices[2]);
    const ladoC = this.vertices[1].distancia(this.vertices[2]);
    return [ladoA, ladoB, ladoC]
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
    return new Triangulo(this.vertices);
  }

  addVertice() {
    return false;
  }
}