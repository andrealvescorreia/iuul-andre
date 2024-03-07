const Triangulo = require('./Triangulo');
const LeitorVertices = require('../01/LeitorVertices');


module.exports = class LeitorTriangulos {
  lê(qtdTriangulos = 3) {
    let triangulos = [];
    console.log(`A seguir, informe os vertices de ${qtdTriangulos} triangulos`)
    for (let i = 0; i < qtdTriangulos; i++) {
      try {
        console.log(`\nInforme os vertices do ${i + 1}° Triangulo :`)
        const verticesTriangulo = LeitorVertices.lê(3);
        triangulos.push(new Triangulo(verticesTriangulo));
      } catch (error) {
        console.log(error.message);
        console.log('tente novamente.')
        i--;
      }
    }
    return triangulos;
  }

}