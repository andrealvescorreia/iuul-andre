const Vertice = require('./Vertice');
const GeraRelatorio = require('./GeraRelatorio');
const readline = require('readline-sync');


class LeitorVertices {

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

const leitor = new LeitorVertices();
const vertices = leitor.lê(3);
const gerador = new GeraRelatorio(vertices);
console.log('\n ==RELATORIO== \n' + gerador.gera());
console.log(gerador.gera());
