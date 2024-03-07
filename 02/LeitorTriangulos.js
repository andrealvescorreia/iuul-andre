const Triangulo = require('./Triangulo');
const LeitorVertices = require('../01/LeitorVertices');


module.exports = class LeitorTriangulos {
  lê(qtdTriangulos = 3) {
    let triangulos = [];
    console.log(`A seguir, informe os vertices de ${qtdTriangulos} triangulos\n`)
    for (let i = 0; i < qtdTriangulos; i++) {
      console.log(`Informe os vertices do ${i + 1}° Triangulo :`)
      const verticesTriangulo = LeitorVertices.lê(3);
      triangulos.push(new Triangulo(verticesTriangulo));
    }
    return triangulos;
  }

}