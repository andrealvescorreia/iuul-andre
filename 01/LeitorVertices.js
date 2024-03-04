const Vertice = require('./Vertice');
const readline = require('readline-sync');


module.exports = class LeitorVertices {
  lê(qtdVertices = 3) {
    let vertices = [];
    console.log('Insira as coordenadas do vertice no formato x, y');
    for (let i = 0; i < qtdVertices; i++) {
      const entrada = readline.question(`v${i + 1} = `);
      vertices.push(this.#converteEntradaParaVertice(entrada));
    }
    return vertices;
  }

  #converteEntradaParaVertice(entrada) {
    let coords = entrada.split(',').map(numero => Number(numero));
    return new Vertice(coords[0], coords[1]);
  }
}