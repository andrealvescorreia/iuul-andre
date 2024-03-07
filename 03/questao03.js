const LeitorPoligono = require('./LeitorPoligono');
const readline = require('readline-sync');

try {
  let poligono = LeitorPoligono.lê();
  let rodando = true;
  while (rodando) {
    mostraDadosPoligono(poligono);
    let resposta = readline.question('\nAdicionar novo vertice? (s/n) ')
    if (resposta === 'n') rodando = false;
    else poligono = LeitorPoligono.lêNovoVertice(poligono);
  }
} catch (e) {
  console.log(e.message);
}


function mostraDadosPoligono(poligono) {
  const verticesStr = poligono.vertices.reduce((accStr, v) => accStr + `(${v.x},${v.y}) `, '');
  console.log('vertices: ', verticesStr);
  console.log('qtd vertices: ', poligono.qtdVertices);
  console.log('perímetro: ', poligono.perimetro.toFixed(5));
}