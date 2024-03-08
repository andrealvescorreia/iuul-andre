const LeitorTriangulos = require('./LeitorTriangulos');
const RelatorioTriangulos = require('./RelatorioTriangulos');

const leitor = new LeitorTriangulos();
const triangulos = leitor.lê(3);
const gerador = new RelatorioTriangulos(triangulos);
console.log('\n==RELATORIO==\n' + gerador.gera());