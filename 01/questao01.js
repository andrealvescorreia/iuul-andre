const RelatorioVertices = require('./RelatorioVertices');
const LeitorVertices = require('./LeitorVertices');

const leitor = new LeitorVertices();
const vertices = leitor.lê(3);
const gerador = new RelatorioVertices(vertices);
console.log('\n ==RELATORIO== \n' + gerador.gera());
