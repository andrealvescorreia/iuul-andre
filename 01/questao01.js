const Vertice = require('./Vertice');
const GeraRelatorio = require('./GeraRelatorio');
const readline = require('readline-sync');


class LêVerticesGeraRelatorio {
  #vertices = [];
  lê(qtdVertices = 3) {
    console.log('Insira as coordenadas do vertice no formato x, y');
    for (let i = 0; i < qtdVertices; i++) {
      const entrada = readline.question(`v${i + 1} = `);
      this.#vertices.push(this.#converteEntradaParaVertice(entrada));
    }
  }

  gera() { // TODO: fazer injeção de dependencia do gerador.
    let gerador = new GeraRelatorio(this.#vertices);
    console.log('\n ==RELATORIO== \n' + gerador.gera());
  }

  #converteEntradaParaVertice(entrada) {
    let coords = entrada.split(',').map(numero => Number(numero));
    return new Vertice(coords[0], coords[1]);
  }
}

const leitorGerador = new LêVerticesGeraRelatorio();
leitorGerador.lê(3);
leitorGerador.gera();
