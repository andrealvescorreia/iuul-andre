const GeraRelatorio = require('./GeraRelatorio');
const LeitorVertices = require('./LeitorVertices');

const leitor = new LeitorVertices();
const vertices = leitor.lê(3);
const gerador = new GeraRelatorio(vertices);
console.log('\n ==RELATORIO== \n' + gerador.gera());
