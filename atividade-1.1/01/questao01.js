const RelatorioVertices = require('./RelatorioVertices');
const LeitorVertices = require('./LeitorVertices');

console.log('A seguir, voce deve informar 3 vertices.')
const vertices = LeitorVertices.lê(3);
const gerador = new RelatorioVertices(vertices);
console.log('\n ==RELATORIO== \n' + gerador.gera());
