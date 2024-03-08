const Poligono = require('./Poligono');
const LeitorVertices = require('../01/LeitorVertices');
const readline = require('readline-sync');

module.exports = class LeitorPoligono {
  static lê() {
    const qtdVertices = Number(readline.question('Quantos vertices deseja que o poligono tenha inicialmente? '))
    const verticesPoligono = LeitorVertices.lê(qtdVertices);
    return new Poligono(verticesPoligono);// throwable
  }

  static lêNovoVertice(poligono) {
    const novoVertice = LeitorVertices.lê(1)[0];
    if (!poligono.addVertice(novoVertice))
      console.log('O vertice não foi inserido pois já existe.');
    return poligono;
  }
}
