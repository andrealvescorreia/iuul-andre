const Vertice = require('../01/Vertice');
const RelatorioVertices = require('../01/RelatorioVertices');

test('gera relatorio 3 vertices', () => {
  const v1 = new Vertice(0, 0);
  const v2 = new Vertice(2, 3);
  const v3 = new Vertice(2, 3);

  const vertices = [v1, v2, v3];

  const gerador = new RelatorioVertices(vertices);

  const relatorioEsperado =
    `v1 = (0,0)
  v2 = (2,3)
  v3 = (2,3)
  ---
  d(v1, v2) = 3.60555
  d(v1, v3) = 3.60555
  d(v2, v1) = 3.60555
  d(v2, v3) = 0
  d(v3, v1) = 3.60555
  d(v3, v2) = 0
  ---
  v1 != v2
  v1 != v3
  v2 != v1
  v2 == v3
  v3 != v1
  v3 == v2
  `.replace(/  +/g, '');

  expect(gerador.gera()).toBe(relatorioEsperado);
});